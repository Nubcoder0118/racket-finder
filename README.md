# 🏸 Racket Finder

A full-stack **Badminton Racket Finder** web app that helps players discover the perfect racket based on their play style, budget, and preferences.  
Users can favorite rackets ❤️ (saved in MongoDB), compare two rackets, and explore personalized recommendations through an interactive quiz interface.

---

## 🌐 Live Demo  
> Coming soon — hosted React frontend and Express backend.

---

## ⚙️ Features

- 🎯 **Interactive Quiz** — answer three quick questions about your play type, budget, and preferred racket style to get tailored recommendations.  
- ❤️ **Favorites System** — click the heart icon to save or remove rackets from your favorites; they’re stored persistently in MongoDB Atlas.  
- 🔍 **Comparison Tool** — view two rackets side-by-side to compare stats and prices.  
- 🖼️ **Local Image Hosting** — all racket images are served locally from an Express static folder.  

---

## 🧰 Tech Stack

| Area | Technology |
|------|-------------|
| Frontend | React |
| Backend | Node.js + Express |
| Database | MongoDB Atlas (Mongoose) |
| Styling | CSS3, Gradient animations |
| Tools | Nodemon, dotenv, CORS, Git |

---

## 📁 Folder Structure

racket-finder2/
│
├── badminton-backend/
│ ├── server.js
│ ├── routes/
│ │ └── racket.js
│ ├── models/
│ │ └── Racket.js
│ ├── public/images/
│ ├── package.json
│ └── .env
│
└── racket-finder-clean/
├── src/
│ ├── App.js
│ ├── Comparison.jsx
│ ├── App.css
│ └── components/
│ ├── Header.jsx
│ ├── Quiz.jsx
│ ├── Flashcard.jsx
│ ├── RacketResults.jsx
│ └── FavoritesList.jsx
├── package.json
└── README.md

yaml
Copy code

---

## 🚀 Getting Started

To start the project, first clone the repository:

```bash
git clone https://github.com/<your-username>/racket-finder2.git
cd racket-finder2
Next, install dependencies for both the backend and frontend, configure your MongoDB connection, and run both servers:

bash
Copy code
# Backend setup
cd badminton-backend
npm install

# Create a .env file with your connection string
echo "MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/rackets
PORT=8000" > .env

# Start the backend
npm run dev
Then open a second terminal for the frontend:

bash
Copy code
cd racket-finder-clean
npm install
npm start
Finally, open your browser and go to 👉 http://localhost:3000
