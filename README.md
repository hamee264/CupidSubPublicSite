# CupidSubs

CupidSubs is a digital subscription marketplace that allows customers to purchase and manage digital subscriptions from one platform.

The application is built with Vue 3 and Vite, with Supabase handling authentication, database operations, and backend services.

---

## 🚀 Live Website

https://cupidsub.netlify.app

---

## 🛠️ Tech Stack

- Vue 3
- Vite
- JavaScript
- HTML5
- CSS3
- Bootstrap
- Bootstrap Icons
- Pinia
- Vue Router
- Supabase
- PostgreSQL
- Netlify

---

## ✨ Features

### Authentication

- Email and password registration
- Email and password login
- Google authentication
- Password visibility toggle
- Form validation
- Authentication error handling
- Protected customer routes
- Guest-only authentication pages
- Persistent Supabase sessions
- Automatic authentication state synchronization

### Customer Dashboard

- Customer dashboard
- Subscription marketplace
- Product checkout
- Order history
- Active subscriptions
- Notifications
- Customer profile
- Account settings

### Marketplace

Customers can browse available digital subscriptions and purchase the products they need.

Examples include:

- Netflix
- Spotify
- YouTube
- TV subscriptions
- Other digital services

---

## 🔐 Authentication Flow

CupidSubs uses Supabase Authentication.

### Email Authentication

```text
Customer
   ↓
Register
   ↓
Supabase Auth
   ↓
Customer Account
   ↓
Customer Record
   ↓
Dashboard


