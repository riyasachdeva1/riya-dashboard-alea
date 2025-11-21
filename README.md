Riya Dashboard Alea  
A modern React + Vite + Tailwind CSS project for team management and dashboards.

📦 Tech Stack  
- React  
- Vite  
- Tailwind CSS (latest)  
- PostCSS / Autoprefixer  
- Basic routing / state management  

 🧰 Features  
- Dashboard home page showing overview metrics  
- Task list with filters/search  
- Task details view  
- Team members page  
- Responsive layout  
- Tailwind-based UI for speed and customization  


📁 Folder Structure  
riya-dashboard-alea/
├── public/
├── src/
│ ├── assets/
│ ├── components/
│ ├── pages/
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
├── package.json
├── tailwind.config.cjs
├── postcss.config.cjs
└── vite.config.js


 🛠 Setup & Installation  
1. Clone the repo  : 
   ```bash
   git clone https://github.com/riyasachdeva1/riya-dashboard-alea.git
   cd riya-dashboard-alea


2. Install dependencies:
```bash
npm install

3.Run development server:
```bash 
npm run dev



🎨 Tailwind CSS Setup

1. Installed via:
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p


2.tailwind.config.cjs includes:
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}


3. src/index.css contains:
@tailwind base;
@tailwind components;
@tailwind utilities;



🖼 Screenshots

Dashboard Home

![Dashboard Home](./src/assets/screenshots/dashboard-home.png)

Task List Page

![Task List](./src/assets/screenshots/task-list.png)

Task Details Page

![Task Details](./src/assets/screenshots/task-details.png)

Team Members Page

![Team Members](./src/assets/screenshots/team-members.png)



🔮 Future Enhancements
Dark mode toggle

Real-backend integration (REST/GraphQL)

Drag & drop tasks

User roles & permissions

Export reports



📬 Author: Riya Sachdeva
