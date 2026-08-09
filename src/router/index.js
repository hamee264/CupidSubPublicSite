// src/router/index.js

import { createRouter, createWebHistory } from "vue-router";

// Layouts
import PublicLayout from "../layouts/PublicLayout.vue";
import AuthLayout from "../layouts/AuthLayout.vue";
import DashboardLayout from "../layouts/DashboardLayout.vue";

// Public
import Home from "../views/public/Home.vue";

// Auth
import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";
import ForgotPassword from "../views/auth/ForgotPassword.vue";
import AuthCallback from "../views/auth/AuthCallback.vue";

// Dashboard
import Dashboard from "../views/dashboard/Dashboard.vue";
import Marketplace from "../views/dashboard/Marketplace.vue";
import Checkout from "../views/dashboard/Checkout.vue";
import Orders from "../views/dashboard/Orders.vue";
import Subscriptions from "../views/dashboard/Subscriptions.vue";
import Notifications from "../views/dashboard/Notifications.vue";
import Settings from "../views/dashboard/Settings.vue";
import Profile from "../views/dashboard/Profile.vue";

const routes = [
  // =========================
  // PUBLIC
  // =========================

  {
    path: "/",
    component: PublicLayout,

    children: [
      {
        path: "",
        name: "home",
        component: Home,
      },
    ],
  },

  // =========================
  // AUTH
  // =========================

  {
    path: "/",
    component: AuthLayout,

    children: [
      {
        path: "login",
        name: "login",
        component: Login,
      },

      {
        path: "register",
        name: "register",
        component: Register,
      },

      {
        path: "forgot-password",
        name: "forgot-password",
        component: ForgotPassword,
      },

      {
        path: "auth/callback",
        name: "AuthCallback",
        component: AuthCallback,
      },
    ],
  },

  // =========================
  // CUSTOMER APP
  // =========================

  {
    path: "/app",
    component: DashboardLayout,

    children: [
      {
        path: "",
        name: "dashboard",
        component: Dashboard,
      },

      {
        path: "marketplace",
        name: "marketplace",
        component: Marketplace,
      },

      {
        path: "checkout",
        name: "checkout",
        component: Checkout,
      },

      {
        path: "orders",
        name: "orders",
        component: Orders,
      },

      {
        path: "subscriptions",
        name: "subscriptions",
        component: Subscriptions,
      },

      {
        path: "notifications",
        name: "notifications",
        component: Notifications,
      },

      {
        path: "settings",
        name: "settings",
        component: Settings,
      },

      {
        path: "/order-success",
        name: "OrderSuccess",
        component: () => import("../views/dashboard/OrderSuccess.vue"),
      },

      {
        path: "profile",
        name: "profile",
        component: Profile,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),

  routes,

  scrollBehavior() {
    return {
      top: 0,
    };
  },
});

export default router;
