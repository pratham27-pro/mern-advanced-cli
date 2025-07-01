export function getBackendTemplates(projectName) {
  return {
    'package.json': getPackageJson(projectName),
    'src/app.js': getAppJs(),
    'src/server.js': getServerJs(),
    'src/db/database.js': getDatabaseConfig(),
    'src/config/cors.js': getCorsConfig(),
    'src/constants.js': getConstants(),
    'src/models/auth-user.model.js': getAuthUserModel(),
    'src/controllers/auth.controller.js': getAuthController(),
    'src/routes/authRoutes.js': getAuthRoutes(),
    'src/middlewares/auth.middleware.js': getAuthMiddleware(),
    'src/utils/ApiError.js': getApiError(),
    'src/utils/ApiResponse.js': getApiResponse(),
    'src/utils/asyncHandler.js': getAsynchHandler(),
    'src/utils/error.js': getErrorHandler(),
    '.env.example': getEnvExample(),
    '.gitignore': getGitignore(),
    '.prettierrc': getPrettier(),
    '.prettierignore': getPrettierIgnore(),
    'README.md': getBackendReadme(projectName)
  };
}

function getPackageJson(projectName) {
  return JSON.stringify({
    "name": `${projectName}-backend`,
    "version": "1.0.0",
    "type": "module",
    "description": "Backend for MERN application",
    "main": "src/server.js",
    "scripts": {
      "start": "node src/server.js",
      "dev": "nodemon src/server.js",
      "test": "jest"
    },
    "dependencies": {
      "express": "^4.18.2",
      "mongoose": "^7.5.0",
      "cors": "^2.8.5",
      "dotenv": "^16.3.1",
      "bcryptjs": "^2.4.3",
      "jsonwebtoken": "^9.0.2",
      "express-validator": "^7.0.1",
      "express-rate-limit": "^6.10.0"
    },
    "devDependencies": {
      "nodemon": "^3.1.4",
      "prettier": "^3.3.3"
    }
  }, null, 2);
}

function getAppJs() {
  return `import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { corsOptions } from './config/cors.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// CORS
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Check if everything is working
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Backend is running!' });
});
app.get('/api/auth/signin', (req, res) => {
    res.status(200).json({ message: 'Signin is running!' });
});
app.get('/api/auth/signup', (req, res) => {
    res.status(200).json({ message: 'Signup is running!' });
});

// Routes
app.use('/api/auth', authRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

export default app;`;
}

function getServerJs() {
  return `import app from './app.js';
import { connectDB } from './db/database.js';
import { PORT } from './constants.js';
import dotenv from 'dotenv';

dotenv.config({
    path: './.env'
});

// Connect to MongoDB
connectDB()
    .then(() => {
        app.listen(PORT, '0.0.0.0', () => {
            console.log(\`Server is running at port ${process.env.PORT}\`);
        });
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!", err);
    });

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});`;
}

function getDatabaseConfig() {
  return `import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(\`${process.env.MONGODB_URI}/${DB_NAME}\`);
        console.log(\`/n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}\`);
        
    } catch (error) {
        console.log("MONGODB connection Failed", error);
        process.exit(1);
    }
}

export default connectDB;`
};

function getCorsConfig() {
  return `export const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      process.env.FRONTEND_URL
    ];

    // Allow requests with no origin (mobile apps, etc.)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
    'Cache-Control'
  ],
  exposedHeaders: ['Authorization']
};`;
}

function getConstants() {
  return `export const PORT = process.env.PORT || 5000;
export const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
export const JWT_EXPIRE = process.env.JWT_EXPIRE || '30d';
export const BCRYPT_ROUNDS = 12;
export const DB_NAME = "your db name"; // your Database cluster name here

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};

export const MESSAGES = {
  USER_CREATED: 'User created successfully',
  USER_UPDATED: 'User updated successfully',
  USER_DELETED: 'User deleted successfully',
  LOGIN_SUCCESS: 'Login successful',
  LOGOUT_SUCCESS: 'Logout successful',
  INVALID_CREDENTIALS: 'Invalid credentials',
  USER_NOT_FOUND: 'User not found',
  EMAIL_EXISTS: 'Email already exists',
  UNAUTHORIZED: 'Unauthorized access',
  SERVER_ERROR: 'Internal server error'
};`;
}

function getAuthUserModel() {
  return `import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRE, BCRYPT_ROUNDS } from '../constants.js';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'Please provide a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  avatar: {
    type: String,
    default: null
  },
  lastLogin: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  this.password = await bcrypt.hash(this.password, BCRYPT_ROUNDS);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Generate JWT token
userSchema.methods.generateToken = function() {
  return jwt.sign(
    { 
      id: this._id,
      email: this.email,
      role: this.role 
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRE }
  );
};

// Update last login
userSchema.methods.updateLastLogin = function() {
  this.lastLogin = new Date();
  return this.save({ validateBeforeSave: false });
};

export default mongoose.model('User', userSchema);`;
}

function getAuthController() {
  return `import AuthUser from "../models/auth-user.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    console.log("Received signup request with data:", req.body); 
    const { username, email, password } = req.body;
  
    try {
        const existingUser = await AuthUser.findOne({ email });
        if (existingUser) {
            console.log("Email already in use:", email); 
            return next(errorHandler(409, "Email already in use."));
        }
  
        const hashedPassword = bcryptjs.hashSync(password, 10);
  
        const newUser = new AuthUser({ username, email, password: hashedPassword });
        await newUser.save();
  
        console.log("New user created:", newUser);

        const userData = { ...newUser._doc };
        delete userData.password; 
  
        console.log("Returning user data:", userData);
        return res.status(201).json(userData); 
    } catch (error) {
        console.error("Signup error:", error);
        return next(errorHandler(500, "Error while doing user signup."));
    }
};



export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await AuthUser.findOne({ email });
        if (!validUser) {
            return next(errorHandler(401, "Invalid email/credentials"));
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password);  
        if (!validPassword) return next(errorHandler(401, "Invalid credentials"));

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: hashedPassword, ...rest} = validUser._doc;

        const expiry = new Date(Date.now() + 3600000); // 1hr
        res.cookie("access-token", token, {httpOnly: true, expires: expiry}).status(200).json(validUser);

    } catch (error) {
        next(error);
        console.log("Error while login of the user");
    }
};`;
}

function getAuthRoutes() {
  return `import express from "express";
import { signin, signup } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);


export default authRouter;`;
}

function getAuthMiddleware() {
  return `import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken || req.header("Authorization")?.replace(/^Bearer\s/, "");

  if (!token) {
    return next(new ApiError(401, "Access token is missing"));
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken._id).select("-password -refreshToken");

    if (!user) {
      return next(new ApiError(401, "Invalid token or user does not exist"));
    }

    req.user = user;
    next();
  } catch (error) {
    const errorMessage =
      error.name === "TokenExpiredError"
        ? "Access token has expired"
        : "Invalid access token";
    return next(new ApiError(401, errorMessage));
  }
});
`;
}

function getApiError() {
  return `class ApiError extends Error {
    constructor (
        statusCode,
        message= "Something went wrong",
        errors = [],
        stack = ""
    ) {
        super(message)
        this.statusCode = statusCode
        this.data = null        // Study this from documentation
        this.message = message
        this.success = false;
        this.errors = errors

        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export {ApiError};`;
};

function getApiResponse() {
  return `class ApiResponse {
    constructor(statusCode, data, message = "Success") {
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}

export {ApiResponse};`;
};

function getAsynchHandler() {
  return `const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve().catch((err) => next(err))
    }
}

export {asyncHandler}`;
};

function getErrorHandler() {
  return `export const errorHandler = (statusCode, message) => {
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    return error;
};`;
};

function getEnvExample() {
  return `# Server Configuration
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/your-database-name
DB_NAME=mern-app

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=30d

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Email Configuration (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password

# Cloudinary (Optional)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret`;
}

function getGitignore() {
  return `# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
logs
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# nyc test coverage
.nyc_output

# Dependency directories
node_modules/
jspm_packages/

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db`;
}

function getPrettier() {
  return `{
    "singleQuote": false,
    "bracketSpacing": true,
    "tabWidth": 2,
    "trailingComma": "es5",
    "semi": true
}`
};

function getPrettierIgnore() {
  return `/.vscode
/nodemodules
./dist

*.env
.env.*`
}

function getBackendReadme(projectName) {
  return `# ${projectName} Backend

## Features

- **Express.js** server with ES6 modules
- **MongoDB** with Mongoose ODM
- **JWT** authentication
- **CORS** configuration
- **Rate limiting** and security headers
- **Input validation** with express-validator
- **Error handling** middleware
- **MVC architecture**

## Getting Started

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Create environment file:
\`\`\`bash
cp .env.example .env
\`\`\`

3. Update environment variables in \`.env\`

4. Start development server:
\`\`\`bash
npm run dev
\`\`\`

## API Endpoints

### Authentication
- \`POST /api/auth/register\` - Register new user
- \`POST /api/auth/login\` - Login user
- \`POST /api/auth/logout\` - Logout user
- \`GET /api/auth/me\` - Get current user

### Health Check
- \`GET /health\` - Server health status

## Project Structure

\`\`\`
src/
├── config/          # Configuration files
├── controllers/     # Route controllers
├── middlewares/     # Custom middleware
├── models/          # Database models
├── routes/          # API routes
├── utils/           # Utility functions
├── app.js           # Express app setup
├── server.js        # Server entry point
└── constants.js     # Application constants
\`\`\``;
}
