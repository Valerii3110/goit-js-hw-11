📸 Pixabay Image Search App

A clean, modern, and modular image search application inspired by TailwindUI and Next.js documentation style.
The project implements asynchronous API requests, pagination, notifications, and a responsive gallery with a lightbox effect.

🚀 Live Demo

🔗 https://valerii3110.github.io/goit-js-hw-11/

✨ Overview

This project is a fully functional image search client built using the Pixabay API.
It demonstrates:

modular JavaScript structure

API integration with Axios

pagination and incremental loading

responsive gallery rendering

UI notifications

a clean, modern interface

Designed in a minimalistic style following TailwindUI spacing, clarity, and layout principles.

🛠 Tech Stack
Technology	Purpose
JavaScript (ES Modules)	Core logic & modular architecture
Axios	API requests
Pixabay API	Image data source
SimpleLightbox	Image viewer modal
iziToast	UI notifications
Vite	Development environment & build tool
CSS3	Layout & gallery styling
📂 Project Structure
goit-js-hw-11/
├─ src/
│  ├─ js/
│  │  ├─ pixabay-api.js        # API service module
│  │  ├─ render-functions.js   # Gallery rendering logic
│  │  └─ main.js               # App entry point
│  ├─ css/
│  │  └─ styles.css            # Global styles
│  └─ index.html               # Main page
├─ vite.config.js
├─ package.json
└─ README.md

📦 Installation & Setup

Clone the project:

git clone https://github.com/Valerii3110/goit-js-hw-11.git


Install dependencies:

npm install


Start development server:

npm run dev


Build for production:

npm run build

🌱 Features

🔍 Search images in real-time using Pixabay API

🖼 Dynamic gallery rendering with grid layout

🔦 SimpleLightbox integration for viewing images

🔄 “Load More” pagination with smooth scrolling

📢 iziToast notifications for success, warnings, or errors

⚡ Fast performance with Vite

📱 Fully responsive layout

🎨 Design Principles

This project follows TailwindUI-inspired guidelines:

whitespace-driven layout

consistent spacing scale

modern, clean UI blocks

readable typography

simple, component-like structure

mobile-first responsiveness

🚧 Roadmap / Future Enhancements

Add infinite scroll mode

Improve gallery animations

Add search history panel

Add theme switcher (light/dark mode)

Add more metadata (likes, tags, downloads) in UI

Improve accessibility (keyboard navigation, ARIA labels)

👤 Author

Valerii3110
GitHub: https://github.com/Valerii3110

📄 License

This project is released under the MIT License.
   проходить лінтинг та збірку перед деплоєм.
3. Якщо всі кроки пройшли успішно, зібрана продакшн версія файлів проекту
   відправляється у гілку `gh-pages`. В іншому випадку, у лозі виконання скрипта
   буде вказано в чому проблема.
