# 🛍️ ShopiVerse - Full Stack E-commerce Platform

A modern, scalable e-commerce platform built with the MERN stack, featuring secure authentication, payment processing.

![ShopiVerse Banner](https://res.cloudinary.com/dtogfz0uu/image/upload/v1754166401/Screenshot_2025-08-03_015059_zcsujd.png)

## 🌟 Features

### 🔐 Authentication & Security
- JWT-based authentication with refresh tokens
- Secure password hashing with bcrypt
- Role-based access control (Customer/Admin)
- Protected routes and API endpoints

### 🛒 Shopping Experience
- Dynamic product catalog with search and filters
- Real-time cart management
- Wishlist functionality
- Product reviews and ratings
- Order tracking system

### 💳 Payment & Checkout
- Secure payment processing with Stripe
- Multiple payment methods support
- Order confirmation emails
- Invoice generation

### 📱 User Experience
- Fully responsive design
- Progressive Web App (PWA) features
- Fast loading with optimized images
- SEO-friendly structure

## 🚀 Live Demo

- **Frontend**: [https://shopiverse-nine.vercel.app](https://shopiverse-nine.vercel.app)
- **Backend**: [https://shopiverse-ionp.onrender.com](https://shopiverse-ionp.onrender.com)


## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router v6** - Client-side routing
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Stripe** - Payment processing

### Deployment
- **Vercel** - Frontend hosting
- **Render/Railway** - Backend hosting
- **MongoDB Atlas** - Database hosting

## 📁 Project Structure

```
shopiverse/
├── frontend/                     # React frontend
│   ├── public/
│   │   ├── shopi-verse-logo.png
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── pages/             # Page components
│   │   ├── context/           # Context files
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── backend/                     # Node.js backend
│   ├── controllers/           # Route controllers
│   ├── models/               # Database models
│   ├── routes/               # API routes
│   ├── middleware/           # Custom middleware
│   ├── config/              # Configuration files
│   ├── package.json
│   └── server.js
├── .gitignore
├── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Stripe account for payments
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/shopiverse.git
cd shopiverse
```

### 2. Backend Setup
```bash
cd server
npm install

# Create environment file
cp .env.example .env
# Edit .env with your configurations

# Start development server
npm run dev
```

### 3. Frontend Setup
```bash
cd client
npm install

# Start development server
npm run dev
```

### 4. Access the Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
```

```
### Authentication Endpoints
```
POST /api/register     # User registration
POST /api/login        # User login
```

### Order Endpoints
```
GET    /api/orders          # Get user orders
POST   /api/orders          # Create new order
GET    /api/orders/:id      # Get single order
```



## 🧪 Testing

```bash
# Run backend tests
cd server
npm run dev

# Run frontend tests
cd client
npm run dev
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Mayur Pawar**
- GitHub: [@mayurCoder2004](https://github.com/mayurCoder2004)
- LinkedIn: [Mayur Pawar](https://www.linkedin.com/in/mayur-pawar-551a05278)

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - The web framework used
- [Node.js](https://nodejs.org/) - Backend runtime
- [MongoDB](https://www.mongodb.com/) - Database
- [Stripe](https://stripe.com/) - Payment processing
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework

⭐ **Star this repository if you found it helpful!**
