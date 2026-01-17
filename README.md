# 🌿 AgroMart - Organic Plants & Seeds E-commerce

AgroMart is a modern, responsive e-commerce platform built with **React** and **Redux Toolkit**. It is designed for gardening enthusiasts to browse and purchase fresh plants, seeds, and fertilizers. The application features a dedicated User Panel with advanced filtering and an Admin Dashboard for inventory management.

## 🚀 Live Demo
**Check out the live site here:** [Your Vercel Link Here](https://nsr-agromart-online-shop.vercel.app/)

---

## ✨ Features

### 👤 User Panel
* **Dynamic Product Catalog:** View a wide range of plants and seeds fetched from a central data source.
* **Advanced Filtering:** * **Category Filter:** Browse by Seeds, Plants, or Fertilizers.
    * **Search Functionality:** Real-time search for products by name or category.
    * **Price Sorting:** Sort products from Low-to-High or High-to-Low.
    * **Rating Filter:** Filter products based on star ratings (e.g., 4 stars & above).
* **Shopping Cart:** Add/remove items and manage quantities using Redux state management.
* **Authentication:** Secure Login/Logout functionality (only logged-in users can add items to the cart).
* **Responsive Design:** Fully optimized for Mobile, Tablet, and Desktop.
* **Dark Mode:** Aesthetic dark and light mode support across all pages.

### 🛡️ Admin Dashboard
* **Inventory Management:** * **Create:** Add new products with image URLs, prices, and stock counts.
    * **Read:** Real-time list of all available stock.
    * **Update:** Edit existing product details (Price, Stock, Name, Category).
    * **Delete:** Remove products from the inventory.
* **Data Persistence:** Uses `localStorage` to ensure products and inventory changes remain even after page refreshes.
* **Initial Sync:** Automatically syncs with `ProductData.js` if the local storage is empty.

---

## 🛠️ Tech Stack
* **Frontend:** React.js
* **State Management:** Redux Toolkit
* **Styling:** Tailwind CSS
* **Routing:** React Router DOM
* **Deployment:** Vercel

---

## 📁 Folder Structure
```text
src/
├── assets/          # Static images and icons
├── components/      # Reusable UI components (Navbar, Footer, etc.)
├── data/            # Centralized product database (ProductData.js)
├── features/        # Redux slices (authSlice, cartSlice, productSlice)
├── pages/           # Main views (Home, AdminPanel, Login)
└── App.js           # Main application logic and routing
