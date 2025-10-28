# 🏸 Racket Finder

A full-stack **Badminton Racket Finder** web app that helps players discover the perfect racket based on their play style, budget, and preferences.  
Users can favorite rackets ❤️ (stored in MongoDB), compare two rackets, and browse equipment interactively through a quiz interface.

---

## 🌐 Live Demo  
> Coming soon — hosted React frontend & Express backend.

---

## ⚙️ Features

### 🎯 Racket Finder Quiz  
- Answer 3 quick questions about your play type, budget, and preferred style.  
- Instantly get personalized racket recommendations.

### ❤️ Favorites System  
- Click the heart icon on a racket to save it to your favorites.  
- Favorites are stored persistently in **MongoDB Atlas**.  
- Click again to un-favorite (removes from both UI and database).

### 🔍 Comparison Tool  
- Compare two rackets side-by-side to evaluate stats and pricing.

### 🖼️ Local Image Hosting  
- Racket images are served from an Express static `/public/images` folder.

---

## 🧰 Tech Stack

| Area | Technology |
|------|-------------|
| Frontend | React (Vite / CRA) |
| Backend | Node.js + Express |
| Database | MongoDB Atlas (Mongoose ORM) |
| Styling | CSS3 + custom gradient animation |
| Tools | Nodemon, dotenv, CORS, Git, Atlas |

---

## 📁 Folder Structure

