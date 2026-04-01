const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { GoogleGenAI } = require('@google/genai');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const User = require('./models/User');
const Attendance = require('./models/Attendance');
const Membership = require('./models/Membership');
const Class = require('./models/Class');
const { protect } = require('./middleware/auth');

dotenv.config();
const app = express();

// Security Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', apiLimiter);

// Database Connection
mongoose.connect(process.env.MONGO_URI, {})
.then(async () => {
  console.log('MongoDB Connected');
  console.log('Environment Check:');
  console.log(' - GEMINI_API_KEY:', process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'mock-key-for-now' ? 'SET (Valid)' : 'NOT SET or MOCK');
  console.log(' - RAZORPAY_KEY_ID:', process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_ID !== 'YOUR_RAZORPAY_KEY_ID' ? 'SET (Valid)' : 'NOT SET');
  
  // Seed Classes if none exist
  try {
    const classCount = await Class.countDocuments();
    if (classCount === 0) {
      await Class.insertMany([
        { name: 'HIIT Blast', trainerName: 'Alex Johnson', time: 'Mon 08:00 AM', capacity: 20 },
        { name: 'Yoga Core', trainerName: 'Sarah Smith', time: 'Tue 06:30 PM', capacity: 15 },
        { name: 'Strength Foundations', trainerName: 'Mike Davis', time: 'Wed 05:00 PM', capacity: 12 },
        { name: 'Cardio Kickboxing', trainerName: 'Emma Wilson', time: 'Thu 07:00 AM', capacity: 25 },
      ]);
      console.log('Dummy classes seeded successfully');
    }
  } catch (error) {
    console.error('Failed to seed classes:', error);
  }
})
.catch(err => console.log(err));

// --- API ROUTES ---

// 1. Auth & Users
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Generate a unique memberId (like FIT-12345)
    const memberId = 'FIT-' + Math.floor(10000 + Math.random() * 90000);

    const user = await User.create({
      name, email, password: hashedPassword, role, memberId
    });

    res.status(201).json({
      _id: user._id, name: user.name, email: user.email, role: user.role, memberId: user.memberId
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user._id, role: user.role, name: user.name, memberId: user.memberId }, process.env.JWT_SECRET, {
        expiresIn: '30d'
      });
      res.json({ token, user: { _id: user._id, name: user.name, email: user.email, role: user.role, memberId: user.memberId }});
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/auth/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch(error) {
    res.status(500).json({ message: error.message });
  }
});

// 2. Attendance (QR Check-In)
app.post('/api/attendance/checkin', protect, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const existingAttendance = await Attendance.findOne({
      userId: req.user.id,
      checkInTime: {
        $gte: today,
        $lt: tomorrow
      }
    });

    if (existingAttendance) {
      return res.status(400).json({ message: 'Attendance already registered for today' });
    }

    const attendance = await Attendance.create({
      userId: req.user.id,
      status: 'present'
    });
    res.status(201).json({ message: 'Attendance marked successfully!', attendance });
  } catch(error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/attendance/my-history', protect, async (req, res) => {
    try {
        const history = await Attendance.find({ userId: req.user.id }).sort({ checkInTime: -1 });
        res.json(history);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

// 3. AI Assistant
app.post('/api/ai/chat', protect, async (req, res) => {
  try {
    const { message, trainerName } = req.body;
    
    let personaPrompt = `You are a helpful fitness assistant for the gym 'FitTrack'. The member is asking: ${message}. Keep the answer brief, motivating, and related to fitness, diet, or gym operations.`;
    if (trainerName) {
        personaPrompt = `You are ${trainerName}, an expert fitness trainer at 'FitTrack' gym. The member is asking you: ${message}. Reply directly as the trainer, keeping your answer brief, highly motivating, and highly personalized as an expert.`;
    }

    // Check if real API key is set
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'mock-key-for-now') {
        return res.json({ 
            reply: trainerName ? `This is a mock response from ${trainerName}. Please configure GEMINI_API_KEY to chat with real AI trainers!` : 'This is a mock response from your FitTrack AI Assistant. To enable real AI responses, please configure your GEMINI_API_KEY in the backend .env file. I can help you with workout plans, diet tips, and general gym queries!' 
        });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: personaPrompt
    });

    res.json({ reply: response.text });
  } catch(error) {
    console.error('AI Error:', error);
    res.status(500).json({ message: 'AI service temporarily unavailable', error: error.message });
  }
});

// 4. Memberships (Get basic plan info for a user)
app.get('/api/membership/my-plan', protect, async (req, res) => {
    try {
        const membership = await Membership.findOne({ userId: req.user.id }).sort({ endDate: -1 });
        if(!membership) return res.json(null);
        res.json(membership);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

// 5. Payments (Razorpay)
app.post('/api/payment/create-order', protect, async (req, res) => {
    try {
        const { amount } = req.body;
        
        if (!process.env.RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID === 'YOUR_RAZORPAY_KEY_ID') {
           return res.status(400).json({ message: "Razorpay keys not configured in backend .env" });
        }

        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const options = {
            amount: amount,  // amount in the smallest currency unit (paise)
            currency: "INR",
            receipt: `receipt_order_${Date.now()}`
        };

        const order = await instance.orders.create(options);
        // Include key_id so frontend doesn't need to hardcode it
        res.json({ ...order, razorpay_key_id: process.env.RAZORPAY_KEY_ID });
    } catch (error) {
        console.error("Order creation error", error);
        res.status(500).json({ message: error.message || 'Something went wrong' });
    }
});

app.post('/api/payment/verify', protect, async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, planType } = req.body;
        
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === expectedSign) {
            // Give user the membership they paid for. Add Membership context logic here
            const newMembership = new Membership({
                userId: req.user.id,
                planName: planType,
                status: 'active',
                startDate: new Date(),
                endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)) // 1 month validity
            });
            await newMembership.save();
            
            return res.status(200).json({ message: "Payment verified successfully", membership: newMembership });
        } else {
            return res.status(400).json({ message: "Invalid signature sent!" });
        }
    } catch (error) {
        console.error("Verification Error", error);
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
});

// 6. Classes
app.get('/api/classes', protect, async (req, res) => {
    try {
        const classes = await Class.find();
        res.json(classes);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/classes/:id/book', protect, async (req, res) => {
    try {
        const membership = await Membership.findOne({ userId: req.user.id, status: 'active' });
        if (!membership) {
            return res.status(403).json({ message: "Active membership required to book classes." });
        }
        
        const gymClass = await Class.findById(req.params.id);
        if (!gymClass) return res.status(404).json({ message: "Class not found" });
        
        if (gymClass.attendees.length >= gymClass.capacity) {
            return res.status(400).json({ message: "Class is full" });
        }

        const userIdStr = req.user.id.toString();
        const alreadyBooked = gymClass.attendees.some(id => id.toString() === userIdStr);
        if (alreadyBooked) {
            return res.status(400).json({ message: "You are already booked for this class" });
        }

        gymClass.attendees.push(req.user.id);
        await gymClass.save();

        res.json({ message: "Class booked successfully", gymClass });
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/classes/:id/unbook', protect, async (req, res) => {
    try {
        const gymClass = await Class.findById(req.params.id);
        if (!gymClass) return res.status(404).json({ message: "Class not found" });
        
        const userIdStr = req.user.id.toString();
        gymClass.attendees = gymClass.attendees.filter(id => id.toString() !== userIdStr);
        await gymClass.save();

        res.json({ message: "Class unbooked successfully", gymClass });
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
