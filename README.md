# 🏸 Racket Finder

A full-stack **Badminton Racket Finder** web app that helps players discover the perfect racket based on their play style, budget, and preferences.  
Users can favorite rackets ❤️ (saved in MongoDB), compare two rackets, and explore personalized recommendations through an interactive quiz interface.

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

🚀 Installation & Setup
1. Clone the repository:
   git clone https://github.com/<your-username>/racket-finder.git
   cd racket-finder2
2. Install dependencies:
   cd racket-finder-clean
   npm install
3. Set up your .env file
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/rackets
   PORT=8000
4. Run the backend:
   npm run dev
5. Run the front end:
   open another terminal and run:
   npm start




   




