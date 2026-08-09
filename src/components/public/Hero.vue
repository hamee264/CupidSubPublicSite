<template>
    <section id="home" class="hero">

        <div class="container">

            <!-- Left -->

            <div class="hero-content">

                <span class="hero-badge">
                    🇳🇬 Trusted by Hundreds of Nigerians
                </span>

                <h1 class="hero-title">
                    Premium streaming,
                    <br>
                    <span>made affordable for Nigerians.</span>
                </h1>

                <p class="hero-text">
                    Enjoy Spotify Premium from just
                    <strong>₦600</strong>
                    — no international card required.
                    We also offer Netflix, Apple Music,
                    YouTube Premium, Crunchyroll and more
                    with instant activation and WhatsApp support.
                </p>

                <div class="hero-features">

                    <div class="feature">
                        ✅ Instant Access
                    </div>

                    <div class="feature">
                        🔒 Secure Payments
                    </div>

                    <div class="feature">
                        💬 WhatsApp Support
                    </div>

                    <div class="feature">
                        💰 Affordable Pricing
                    </div>

                </div>

                <div class="hero-buttons">

                    <a href="#products" class="btn-primary">
                        Browse Products
                    </a>

                    <a href="/register" class="btn-secondary">
                        Get Started
                    </a>

                </div>

            </div>

            <!-- Right -->

            <div class="hero-image">

                <div class="image-card">

                    <img src="/src/assets/total22.webp" alt="CupidSubs">

                </div>

            </div>

        </div>

    </section>
</template>

<style scoped>
/* ===========================
   Hero Section
=========================== */

.hero {

    min-height: calc(100vh - 122px);

    display: flex;
    align-items: center;

    padding: 80px 0;

    background: #f8f9fb;

    overflow: hidden;

}


/* ===========================
   Container
=========================== */

.container {

    width: min(1250px, 92%);

    margin: auto;

    display: grid;

    grid-template-columns: 1.05fr .95fr;

    gap: 70px;

    align-items: center;

}


/* ===========================
   Left Content
=========================== */

.hero-content {

    max-width: 650px;

}


/* ===========================
   Badge
=========================== */

.hero-badge {

    display: inline-flex;

    align-items: center;

    padding: 9px 16px;

    background: #ffffff;

    color: #4b5563;

    border: 1px solid #e5e7eb;

    border-radius: 999px;

    font-size: 13px;

    font-weight: 600;

    margin-bottom: 24px;

}


/* ===========================
   Title
=========================== */

.hero-title {

    margin: 0 0 24px;

    color: #111827;

    font-size: 4rem;

    line-height: 1.08;

    font-weight: 800;

    letter-spacing: -2px;

}


.hero-title span {

    color: #6b7280;

}


/* ===========================
   Description
=========================== */

.hero-text {

    max-width: 620px;

    margin: 0 0 32px;

    color: #6b7280;

    font-size: 1.08rem;

    line-height: 1.85;

}


.hero-text strong {

    color: #111827;

    font-weight: 700;

}


/* ===========================
   Features
=========================== */

.hero-features {

    display: grid;

    grid-template-columns: repeat(2, 1fr);

    gap: 12px;

    margin-bottom: 35px;

}


.feature {

    display: flex;

    align-items: center;

    gap: 9px;

    padding: 14px 16px;

    background: #ffffff;

    border: 1px solid #e5e7eb;

    border-radius: 12px;

    color: #374151;

    font-size: 14px;

    font-weight: 600;

    transition:
        transform .25s ease,
        border-color .25s ease,
        background .25s ease;

}


.feature:hover {

    transform: translateY(-2px);

    border-color: #cfd4dc;

    background: #fafafa;

}


/* ===========================
   Buttons
=========================== */

.hero-buttons {

    display: flex;

    align-items: center;

    gap: 12px;

    flex-wrap: wrap;

}


.btn-primary {

    display: inline-flex;

    align-items: center;

    justify-content: center;

    min-height: 50px;

    padding: 0 26px;

    border: 1px solid #111827;

    border-radius: 10px;

    background: #111827;

    color: #ffffff;

    font-size: 14px;

    font-weight: 600;

    text-decoration: none;

    transition:
        background .25s ease,
        border-color .25s ease,
        transform .25s ease;

}


.btn-primary:hover {

    background: #252b35;

    border-color: #252b35;

    transform: translateY(-2px);

}


.btn-secondary {

    display: inline-flex;

    align-items: center;

    justify-content: center;

    min-height: 50px;

    padding: 0 26px;

    border: 1px solid #d1d5db;

    border-radius: 10px;

    background: #ffffff;

    color: #111827;

    font-size: 14px;

    font-weight: 600;

    text-decoration: none;

    transition:
        background .25s ease,
        border-color .25s ease,
        transform .25s ease;

}


.btn-secondary:hover {

    background: #f3f4f6;

    border-color: #9ca3af;

    transform: translateY(-2px);

}


/* ===========================
   Right Image
=========================== */

.hero-image {

    position: relative;

    display: flex;

    align-items: center;

    justify-content: center;

}


.image-card {

    position: relative;

    width: 100%;

    max-width: 600px;

}


.image-card img {

    display: block;

    width: 100%;

    height: auto;

    object-fit: contain;

    animation: float 5s ease-in-out infinite;

}


/* ===========================
   Subtle Background Decoration
=========================== */

.image-card::before {

    content: "";

    position: absolute;

    width: 360px;

    height: 360px;

    top: 50%;

    left: 50%;

    transform: translate(-50%, -50%);

    background: #e5e7eb;

    border-radius: 50%;

    filter: blur(70px);

    opacity: .55;

    z-index: -1;

}


.image-card::after {

    content: "";

    position: absolute;

    width: 110px;

    height: 110px;

    top: 5%;

    right: 0;

    border-radius: 50%;

    background: #f1f3f5;

    filter: blur(20px);

    z-index: -1;

}


/* ===========================
   Floating Animation
=========================== */

@keyframes float {

    0% {

        transform: translateY(0);

    }

    50% {

        transform: translateY(-12px);

    }

    100% {

        transform: translateY(0);

    }

}


/* ===========================
   Large Screens
=========================== */

@media (max-width: 1200px) {

    .container {

        gap: 50px;

    }


    .hero-title {

        font-size: 3.5rem;

    }


    .image-card {

        max-width: 550px;

    }

}


/* ===========================
   Tablet
=========================== */

@media (max-width: 992px) {

    .hero {

        min-height: auto;

        padding: 70px 0;

    }


    .container {

        grid-template-columns: 1fr;

        gap: 45px;

    }


    .hero-image {

        order: -1;

    }


    .hero-content {

        max-width: 760px;

        margin: auto;

        text-align: center;

    }


    .hero-title {

        font-size: 3rem;

    }


    .hero-text {

        margin-left: auto;

        margin-right: auto;

    }


    .hero-features {

        max-width: 680px;

        margin-left: auto;

        margin-right: auto;

        margin-bottom: 32px;

    }


    .hero-buttons {

        justify-content: center;

    }


    .image-card {

        max-width: 560px;

    }

}


/* ===========================
   Mobile
=========================== */

@media (max-width: 768px) {

    .hero {

        padding: 45px 0 70px;

    }


    .hero-title {

        font-size: 2.6rem;

        letter-spacing: -1.3px;

    }


    .hero-text {

        font-size: 1rem;

        line-height: 1.75;

    }


    .hero-features {

        grid-template-columns: 1fr;

    }


    .feature {

        justify-content: center;

    }


    .image-card {

        max-width: 450px;

    }

}


/* ===========================
   Small Phones
=========================== */

@media (max-width: 576px) {

    .hero {

        padding: 30px 0 60px;

    }


    .hero-badge {

        padding: 8px 14px;

        font-size: 12px;

    }


    .hero-title {

        font-size: 2.15rem;

        letter-spacing: -1px;

    }


    .hero-text {

        font-size: .94rem;

    }


    .hero-buttons {

        flex-direction: column;

        width: 100%;

    }


    .btn-primary,
    .btn-secondary {

        width: 100%;

    }


    .feature {

        padding: 13px 15px;

        font-size: 14px;

    }


    .image-card {

        max-width: 350px;

    }


    .image-card::before {

        width: 250px;

        height: 250px;

    }

}


/* ===========================
   Very Small Phones
=========================== */

@media (max-width: 380px) {

    .hero-title {

        font-size: 1.85rem;

    }


    .hero-text {

        font-size: .9rem;

    }


    .image-card {

        max-width: 290px;

    }

}


/* ===========================
   Reduced Motion
=========================== */

@media (prefers-reduced-motion: reduce) {

    .image-card img {

        animation: none;

    }


    .feature,
    .btn-primary,
    .btn-secondary {

        transition: none;

    }

}
</style>
