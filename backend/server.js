import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import dotenv from 'dotenv/config';
import passport from "passport"; // ✅ Add this line
import { protect } from './middleware/authMiddleware.js';
import "./passport.js";
import session from 'express-session';
import router from './routes/authRoutes.js';
import { updateUserProfile } from './controllers/authController.js';
import productRoutes from './routes/productRoutes.js';
import paymentRoutes from "./routes/payment.js";
import orderRoutes from './routes/orderRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

// Google OAuth 
app.use(
  session({
    secret: "keyboard cat", // change this
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Google OAuth routes
app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false, // ❗ Important to skip sessions
  }),
  (req, res) => {
    const token = generateToken(req.user._id);
    // Redirect to frontend with token (or send JSON)
    res.redirect(`${process.env.CLIENT_URL}/oauth-success?token=${token}`);
  }
);

app.get("/success", (req, res) => {
  res.send(req.user); // or redirect to frontend with token
});

app.use("/api/auth", authRoutes);
app.use('/api/users', authRoutes);
app.get("/profile", protect, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});
router.put("/profile", protect, updateUserProfile);
app.use("/api/products", productRoutes);
app.use("/api", paymentRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
