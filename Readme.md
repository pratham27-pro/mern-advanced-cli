# MERN Advanced CLI

A production-ready, batteries-included CLI to scaffold advanced **MERN stack** (MongoDB, Express, React, Node.js) applications with modern best practices.  
Generate a full-stack project with authentication, Tailwind CSS, Vite, and a clean MVC architecture in seconds!

---

## ✨ Features

- **Full-Stack Generator:** Instantly creates both backend (Express/MongoDB) and frontend (React/Vite/Tailwind) folders.
- **Production-Ready Backend:**
  - Express.js with ES Modules
  - MongoDB with Mongoose
  - JWT Authentication (Login, Signup, Auth Middleware)
  - MVC Structure (controllers, models, routes, middlewares, services, utils, configs)
  - CORS, Helmet, Rate Limiting, and Error Handling
  - Environment variable support with `.env.example`
- **Modern Frontend:**
  - React 18 + Vite for blazing fast development
  - React Router v6
  - Tailwind CSS v4.1.8
  - React Hot Toast for notifications
  - Context-based Auth with hooks
  - Ready-to-use components: Navbar, Footer, Homepage, Login, Signup
- **Customizable Generation:**
  - `--frontend-only` or `--backend-only` options
- **NPM & NPX Friendly:** Use globally or via `npx` with zero install
- **Clean Code:** ES Modules, logical separation, and clear project structure

---

## 🚀 Quick Start

### 1. Install Globally
    npm install -g mern-advanced-cli

#### Or use directly with npx (no install needed):
    npx mern-advanced-cli create my-app


### 2. Scaffold a New Project
    mern-advanced create my-app
    Options:
- `--frontend-only` : Generate only the React frontend
- `--backend-only`  : Generate only the Express backend

### 3. Run Your App
cd my-app

Start backend
cd backend
npm install
npm run dev

Start frontend (in a new terminal)
cd ../frontend
npm install
npm run dev


---

## 🏗 Project Structure
my-app/
├── backend/
│   ├── package.json
│   ├── .env.example
│   └── src/
│       ├── app.js
│       ├── server.js
│       ├── constants.js
│       ├── config/
│       ├── controllers/
│       ├── db/
│       ├── middlewares/
│       ├── models/
│       ├── routes/
│       ├── services/
│       └── utils/
└── frontend/
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── index.html
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── index.css
        ├── components/
        ├── context/
        ├── hooks/
        ├── pages/
        ├── services/
        └── utils/


---

## 🔒 Authentication Workflow

- **Signup:** `/api/auth/register` (backend) — creates user, hashes password, returns JWT
- **Login:** `/api/auth/login` (backend) — verifies credentials, returns JWT
- **Protected Routes:** Auth middleware verifies JWT
- **Frontend:** AuthContext and hooks manage login state, store token in localStorage

---

## ⚙️ Backend Features

- **Express.js** with ES Modules
- **MongoDB** connection via Mongoose
- **JWT Auth**: Secure login/signup, protected routes
- **MVC Structure**: Clear separation of concerns
- **CORS Config**: Secure cross-origin requests
- **Helmet & Rate Limiting**: Security best practices
- **Validation**: Express-validator for input validation
- **Error Handling**: Centralized error middleware
- **Environment Config**: `.env.example` provided

---

## 🎨 Frontend Features

- **React 18** with Vite for fast HMR
- **Tailwind CSS 4.1.8**: Utility-first styling
- **React Router v6**: Modern routing
- **React Hot Toast**: User-friendly notifications
- **Auth Context**: Global authentication state
- **Ready-to-use Pages**: Homepage, Login, Signup, Navbar, Footer
- **API Service**: Axios with JWT support
- **Hooks**: Custom `useAuth` for easy auth state management

---

## 📝 Usage Examples

### Create a full-stack app
    mern-advanced create my-app


### Create only frontend
    mern-advanced create my-frontend --frontend-only


### Create only backend
    mern-advanced create my-backend --backend-only


---

## 🛠 Customization

- **Edit generated code** as needed for your business logic.
- **Add more models/routes** to backend or pages/components to frontend.
- **Configure environment variables** in `.env` files.

---

## 🧑‍💻 Contributing

1. Fork this repo
2. Create your feature branch (`git checkout -b feature/awesome-feature`)
3. Commit your changes (`git commit -am 'Add awesome feature'`)
4. Push to the branch (`git push origin feature/awesome-feature`)
5. Open a pull request

---

## 📄 License

MIT

---

## 🙋 FAQ

**Q:** Can I use this with my own MongoDB URI?  
**A:** Yes! Set `MONGODB_URI` and `DB_NAME` in your `.env` file in the backend folder.

**Q:** Can I use this on Windows/Mac/Linux?  
**A:** Yes, it works cross-platform.

**Q:** How do I update the CLI?  
**A:** Run `npm install -g mern-advanced-cli@latest`

**Q:** Can I use this CLI with Yarn or PNPM?  
**A:** Absolutely! The generated projects are standard Node.js projects and work with `npm`, `yarn`, or `pnpm`.

**Q:** What if I only want the frontend or backend?  
**A:** Use the `--frontend-only` or `--backend-only` flags when running the `create` command.

**Q:** How do I add new routes or models?  
**A:** Simply add new files to the `backend/src/routes` or `backend/src/models` folders. The project uses a standard MVC structure for easy extensibility.

**Q:** Can I use a different CSS framework?  
**A:** Yes. The frontend is set up with Tailwind CSS by default, but you can remove Tailwind and add any other CSS framework you prefer.

**Q:** How do I deploy my app to production?  
**A:** The generated code is ready for deployment. You can deploy the backend to platforms like Heroku, Render, or DigitalOcean, and the frontend (after `npm run build`) to Vercel, Netlify, or any static hosting provider.

**Q:** Is TypeScript supported?  
**A:** The generated code is JavaScript by default, but you can migrate to TypeScript if desired. Contributions for TypeScript templates are welcome!

**Q:** Where can I report bugs or request features?  
**A:** Please open an issue on the [GitHub repository](https://github.com/pratham27-pro/mern-advanced-cli/issues).

**Q:** Can I contribute my own templates or improvements?  
**A:** Yes! Fork the repo, make your changes, and submit a pull request.

**Q:** What should I do if I get a permissions error during install?  
**A:** Try running the install command with elevated permissions or use a Node version manager like `nvm` to avoid global permission issues.

**Q:** Does the CLI support environment variable customization?  
**A:** Yes, both frontend and backend come with `.env.example` files for easy environment variable management.


---

## 📫 Support

- [Open an issue](https://github.com/pratham27-pro/mern-advanced-cli/issues) for bugs or feature requests.
- PRs welcome!

**Happy hacking! 🚀**

