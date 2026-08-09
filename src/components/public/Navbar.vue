<template>
    <header>

        <!-- ========================= -->
        <!-- Top Bar -->
        <!-- ========================= -->

        <div class="top-bar">

            <div class="container">

                <div class="top-left">

                    <span class="top-indicator"></span>

                    Instant Delivery
                    <span class="separator">•</span>
                    Secure Payments
                    <span class="separator">•</span>
                    24/7 Support

                </div>


                <div class="top-right">

                    <a href="#">
                        Help Center
                    </a>

                    <a href="#contact">
                        Contact
                    </a>

                </div>

            </div>

        </div>


        <!-- ========================= -->
        <!-- Navbar -->
        <!-- ========================= -->

        <nav class="navbar" :class="{ scrolled: isScrolled }">

            <div class="container">

                <!-- ========================= -->
                <!-- Logo -->
                <!-- ========================= -->

                <a href="#home" class="logo">

                    <div class="brand-icon">

                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>

                    </div>

                    <span class="brand-name">
                        CupidSubs
                    </span>

                </a>


                <!-- ========================= -->
                <!-- Desktop Navigation -->
                <!-- ========================= -->

                <ul class="nav-links">

                    <li>
                        <a href="#home">
                            Home
                        </a>
                    </li>

                    <li>
                        <a href="#products">
                            Products
                        </a>
                    </li>

                    <li>
                        <a href="#how-it-works">
                            How It Works
                        </a>
                    </li>

                    <li>
                        <a href="#faq">
                            FAQ
                        </a>
                    </li>

                    <li>
                        <a href="#contact">
                            Contact
                        </a>
                    </li>

                </ul>


                <!-- ========================= -->
                <!-- Actions -->
                <!-- ========================= -->

                <div class="actions">

                    <!-- Search -->

                    <button class="search-btn" aria-label="Search">

                        <i class="bi bi-search"></i>

                    </button>


                    <!-- Login -->

                    <a href="/login" class="login-btn">
                        Login
                    </a>


                    <!-- Register -->

                    <a href="/register" class="register-btn">
                        Create Account
                    </a>


                    <!-- Mobile Menu -->

                    <button class="menu-btn" @click="toggleMenu" :aria-label="mobileMenu
                        ? 'Close menu'
                        : 'Open menu'
                        ">

                        <span :class="{ active: mobileMenu }"></span>

                        <span :class="{ active: mobileMenu }"></span>

                        <span :class="{ active: mobileMenu }"></span>

                    </button>

                </div>

            </div>

        </nav>


        <!-- ========================= -->
        <!-- Overlay -->
        <!-- ========================= -->

        <transition name="fade">

            <div v-if="mobileMenu" class="overlay" @click="closeMenu"></div>

        </transition>


        <!-- ========================= -->
        <!-- Mobile Menu -->
        <!-- ========================= -->

        <transition name="slide">

            <aside v-if="mobileMenu" class="mobile-menu">

                <!-- Mobile Menu Header -->

                <div class="mobile-menu-header">

                    <span>
                        Menu
                    </span>

                    <button @click="closeMenu" aria-label="Close menu">

                        <i class="bi bi-x-lg"></i>

                    </button>

                </div>


                <!-- Links -->

                <nav class="mobile-links">

                    <a href="#home" @click="closeMenu">
                        <span>Home</span>
                        <i class="bi bi-arrow-right"></i>
                    </a>

                    <a href="#products" @click="closeMenu">
                        <span>Products</span>
                        <i class="bi bi-arrow-right"></i>
                    </a>

                    <a href="#how-it-works" @click="closeMenu">
                        <span>How It Works</span>
                        <i class="bi bi-arrow-right"></i>
                    </a>

                    <a href="#faq" @click="closeMenu">
                        <span>FAQ</span>
                        <i class="bi bi-arrow-right"></i>
                    </a>

                    <a href="#contact" @click="closeMenu">
                        <span>Contact</span>
                        <i class="bi bi-arrow-right"></i>
                    </a>

                </nav>


                <!-- Mobile Actions -->

                <div class="mobile-actions">

                    <a href="/login" class="mobile-login">
                        Login
                    </a>

                    <a href="/register" class="mobile-register">
                        Create Account
                    </a>

                </div>

            </aside>

        </transition>

    </header>
</template>


<script setup>

import {
    ref,
    onMounted,
    onUnmounted
} from "vue";


const mobileMenu = ref(false);

const isScrolled = ref(false);


/* ==========================================
   MOBILE MENU
========================================== */

const toggleMenu = () => {

    mobileMenu.value =
        !mobileMenu.value;

    document.body.style.overflow =
        mobileMenu.value
            ? "hidden"
            : "";

};


const closeMenu = () => {

    mobileMenu.value = false;

    document.body.style.overflow = "";

};


/* ==========================================
   SCROLL
========================================== */

const handleScroll = () => {

    isScrolled.value =
        window.scrollY > 20;

};


/* ==========================================
   LIFECYCLE
========================================== */

onMounted(() => {

    window.addEventListener(
        "scroll",
        handleScroll
    );

});


onUnmounted(() => {

    window.removeEventListener(
        "scroll",
        handleScroll
    );

    document.body.style.overflow = "";

});

</script>


<style scoped>
/* ==========================================
   RESET
========================================== */

* {

    margin: 0;

    padding: 0;

    box-sizing: border-box;

}


a {

    text-decoration: none;

}


html {

    scroll-behavior: smooth;

}


/* ==========================================
   HEADER
========================================== */

header {

    position: sticky;

    top: 0;

    z-index: 1000;

}


/* ==========================================
   CONTAINER
========================================== */

.container {

    width: min(1200px,
            92%);

    margin: auto;

}


/* ==========================================
   TOP BAR
========================================== */

.top-bar {

    height: 38px;

    background: #111827;

    color: #e5e7eb;

    font-size: 11px;

}


.top-bar .container {

    height: 100%;

    display: flex;

    align-items: center;

    justify-content: space-between;

}


.top-left {

    display: flex;

    align-items: center;

    gap: 7px;

    color: #cbd5e1;

}


.top-indicator {

    width: 6px;

    height: 6px;

    border-radius: 50%;

    background: #ffffff;

    opacity: .7;

}


.separator {

    color: #64748b;

}


.top-right {

    display: flex;

    align-items: center;

    gap: 22px;

}


.top-right a {

    color: #cbd5e1;

    font-size: 11px;

    transition:
        color .2s ease;

}


.top-right a:hover {

    color: #ffffff;

}


/* ==========================================
   NAVBAR
========================================== */

.navbar {

    height: 78px;

    background: #ffffff;

    border-bottom: 1px solid #f1f5f9;

    transition:
        background .25s ease,
        border-color .25s ease,
        box-shadow .25s ease;

}


.navbar.scrolled {

    background:
        rgba(255, 255, 255, .94);

    backdrop-filter: blur(14px);

    border-bottom-color:
        rgba(229, 231, 235, .85);

}


/* ==========================================
   NAVBAR CONTAINER
========================================== */

.navbar .container {

    height: 100%;

    display: flex;

    align-items: center;

    justify-content: space-between;

}


/* ==========================================
   LOGO
========================================== */

.logo {

    display: flex;

    align-items: center;

    gap: 10px;

    color: #111827;

}


.brand-icon {

    display: grid;

    grid-template-columns:
        repeat(2, 8px);

    gap: 3px;

}


.brand-icon span {

    width: 8px;

    height: 8px;

    border-radius: 3px;

    background: #111827;

}


.brand-icon span:nth-child(2) {

    opacity: .75;

}


.brand-icon span:nth-child(3) {

    opacity: .45;

}


.brand-icon span:nth-child(4) {

    opacity: .2;

}


.brand-name {

    font-size: 17px;

    font-weight: 700;

    letter-spacing: -.2px;

}


/* ==========================================
   DESKTOP NAVIGATION
========================================== */

.nav-links {

    display: flex;

    align-items: center;

    gap: 30px;

    list-style: none;

}


.nav-links a {

    position: relative;

    color: #64748b;

    font-size: 13px;

    font-weight: 500;

    transition:
        color .2s ease;

}


.nav-links a:hover {

    color: #111827;

}


.nav-links a::after {

    content: "";

    position: absolute;

    left: 0;

    bottom: -8px;

    width: 0;

    height: 1px;

    background: #111827;

    transition:
        width .2s ease;

}


.nav-links a:hover::after {

    width: 100%;

}


/* ==========================================
   ACTIONS
========================================== */

.actions {

    display: flex;

    align-items: center;

    gap: 10px;

}


/* ==========================================
   SEARCH
========================================== */

.search-btn {

    width: 38px;

    height: 38px;

    display: flex;

    align-items: center;

    justify-content: center;

    border: 1px solid transparent;

    border-radius: 9px;

    background: transparent;

    color: #64748b;

    cursor: pointer;

    transition:
        background .2s ease,
        color .2s ease,
        border-color .2s ease;

}


.search-btn i {

    font-size: 15px;

}


.search-btn:hover {

    background: #f8fafc;

    border-color: #e5e7eb;

    color: #111827;

}


/* ==========================================
   LOGIN
========================================== */

.login-btn {

    height: 38px;

    display: flex;

    align-items: center;

    justify-content: center;

    padding: 0 17px;

    border: 1px solid #e5e7eb;

    border-radius: 9px;

    color: #374151;

    background: #ffffff;

    font-size: 12px;

    font-weight: 600;

    transition:
        background .2s ease,
        color .2s ease,
        border-color .2s ease;

}


.login-btn:hover {

    background: #f8fafc;

    border-color: #d1d5db;

    color: #111827;

}


/* ==========================================
   REGISTER
========================================== */

.register-btn {

    height: 38px;

    display: flex;

    align-items: center;

    justify-content: center;

    padding: 0 18px;

    border: 1px solid #111827;

    border-radius: 9px;

    background: #111827;

    color: #ffffff;

    font-size: 12px;

    font-weight: 600;

    transition:
        background .2s ease,
        border-color .2s ease,
        transform .2s ease;

}


.register-btn:hover {

    background: #252b35;

    border-color: #252b35;

    transform:
        translateY(-1px);

}


/* ==========================================
   HAMBURGER
========================================== */

.menu-btn {

    display: none;

    position: relative;

    width: 40px;

    height: 40px;

    border: 1px solid #e5e7eb;

    border-radius: 9px;

    background: #ffffff;

    cursor: pointer;

}


.menu-btn span {

    position: absolute;

    left: 10px;

    width: 19px;

    height: 2px;

    background: #111827;

    transition:
        transform .25s ease,
        opacity .25s ease;

}


.menu-btn span:nth-child(1) {

    top: 12px;

}


.menu-btn span:nth-child(2) {

    top: 19px;

}


.menu-btn span:nth-child(3) {

    top: 26px;

}


.menu-btn span.active:nth-child(1) {

    top: 19px;

    transform:
        rotate(45deg);

}


.menu-btn span.active:nth-child(2) {

    opacity: 0;

}


.menu-btn span.active:nth-child(3) {

    top: 19px;

    transform:
        rotate(-45deg);

}


/* ==========================================
   OVERLAY
========================================== */

.overlay {

    position: fixed;

    inset: 0;

    background:
        rgba(15, 23, 42, .28);

    backdrop-filter:
        blur(2px);

    z-index: 998;

}


/* ==========================================
   MOBILE MENU
========================================== */

.mobile-menu {

    position: fixed;

    top: 126px;

    right: 20px;

    width: 320px;

    padding: 20px;

    background: #ffffff;

    border: 1px solid #e5e7eb;

    border-radius: 14px;

    z-index: 999;

    box-shadow:
        0 18px 45px rgba(15, 23, 42, .10);

}


/* ==========================================
   MOBILE MENU HEADER
========================================== */

.mobile-menu-header {

    display: flex;

    align-items: center;

    justify-content: space-between;

    padding-bottom: 16px;

    border-bottom: 1px solid #f1f5f9;

}


.mobile-menu-header span {

    color: #111827;

    font-size: 13px;

    font-weight: 700;

}


.mobile-menu-header button {

    width: 30px;

    height: 30px;

    border: none;

    border-radius: 7px;

    background: #f8fafc;

    color: #64748b;

    cursor: pointer;

}


.mobile-menu-header button:hover {

    color: #111827;

}


/* ==========================================
   MOBILE LINKS
========================================== */

.mobile-links {

    display: flex;

    flex-direction: column;

    padding: 8px 0;

}


.mobile-links a {

    min-height: 46px;

    display: flex;

    align-items: center;

    justify-content: space-between;

    padding: 0 10px;

    border-radius: 8px;

    color: #64748b;

    font-size: 13px;

    font-weight: 500;

    transition:
        background .2s ease,
        color .2s ease;

}


.mobile-links a:hover {

    background: #f8fafc;

    color: #111827;

}


.mobile-links a i {

    color: #cbd5e1;

    font-size: 12px;

}


.mobile-links a:hover i {

    color: #64748b;

}


/* ==========================================
   MOBILE ACTIONS
========================================== */

.mobile-actions {

    display: grid;

    grid-template-columns:
        1fr 1fr;

    gap: 9px;

    padding-top: 16px;

    border-top: 1px solid #f1f5f9;

}


.mobile-login,
.mobile-register {

    height: 42px;

    display: flex;

    align-items: center;

    justify-content: center;

    border-radius: 9px;

    font-size: 12px;

    font-weight: 600;

}


.mobile-login {

    border: 1px solid #e5e7eb;

    background: #ffffff;

    color: #374151;

}


.mobile-login:hover {

    background: #f8fafc;

    color: #111827;

}


.mobile-register {

    border: 1px solid #111827;

    background: #111827;

    color: #ffffff;

}


.mobile-register:hover {

    background: #252b35;

}


/* ==========================================
   ANIMATIONS
========================================== */

.fade-enter-active,
.fade-leave-active {

    transition:
        opacity .25s ease;

}


.fade-enter-from,
.fade-leave-to {

    opacity: 0;

}


.slide-enter-active,
.slide-leave-active {

    transition:
        opacity .25s ease,
        transform .25s ease;

}


.slide-enter-from,
.slide-leave-to {

    opacity: 0;

    transform:
        translateY(-10px);

}


/* ==========================================
   TABLET
========================================== */

@media (max-width: 992px) {

    .nav-links {

        display: none;

    }


    .search-btn,
    .login-btn,
    .register-btn {

        display: none;

    }


    .menu-btn {

        display: block;

    }

}


/* ==========================================
   MOBILE
========================================== */

@media (max-width: 768px) {

    .top-right {

        display: none;

    }


    .top-bar .container {

        justify-content: center;

    }


    .mobile-menu {

        width:
            calc(100% - 30px);

        right: 15px;

        top: 126px;

    }

}


/* ==========================================
   SMALL PHONES
========================================== */

@media (max-width: 500px) {

    .top-bar {

        height: 36px;

        font-size: 9px;

    }


    .navbar {

        height: 70px;

    }


    .brand-name {

        font-size: 16px;

    }


    .mobile-menu {

        top: 106px;

    }

}


/* ==========================================
   REDUCED MOTION
========================================== */

@media (prefers-reduced-motion: reduce) {

    * {

        transition: none !important;

        animation: none !important;

    }

}
</style>