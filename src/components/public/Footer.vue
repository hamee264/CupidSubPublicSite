<template>

    <section class="footer">

        <div class="container">

            <!-- ==========================================
                 FOOTER TOP
            =========================================== -->

            <div class="footer-top">

                <!-- Brand -->

                <div class="footer-brand">

                    <a href="#home" class="logo">

                        <div class="logo-grid">

                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>

                        </div>

                        <div class="logo-content">

                            <h2>
                                CupidSubs
                            </h2>

                            <p>
                                Affordable premium subscriptions
                                with fast delivery and reliable support.
                            </p>

                        </div>

                    </a>

                </div>


                <!-- Links -->

                <div class="footer-links">

                    <!-- Products -->

                    <div class="footer-column">

                        <h4>
                            Products
                        </h4>

                        <a href="#products">
                            Spotify
                        </a>

                        <a href="#products">
                            Netflix
                        </a>

                        <a href="#products">
                            ChatGPT
                        </a>

                        <a href="#products">
                            YouTube Premium
                        </a>

                    </div>


                    <!-- Company -->

                    <div class="footer-column">

                        <h4>
                            Company
                        </h4>

                        <a href="#home">
                            Home
                        </a>

                        <a href="#products">
                            Products
                        </a>

                        <a href="#how-it-works">
                            How It Works
                        </a>

                        <a href="#faq">
                            FAQ
                        </a>

                    </div>


                    <!-- Support -->

                    <div class="footer-column">

                        <h4>
                            Support
                        </h4>

                        <a href="#contact">
                            Contact
                        </a>

                        <a href="#">
                            WhatsApp
                        </a>

                        <a href="#">
                            Help Center
                        </a>

                        <a href="#">
                            Email Support
                        </a>

                    </div>


                    <!-- Account -->

                    <div class="footer-column">

                        <h4>
                            Account
                        </h4>

                        <a href="/login">
                            Sign In
                        </a>

                        <a href="/register">
                            Create Account
                        </a>

                        <a href="/login">
                            My Account
                        </a>

                    </div>

                </div>

            </div>


            <!-- ==========================================
                 FOOTER BOTTOM
            =========================================== -->

            <div class="footer-bottom">

                <p>
                    © 2026 CupidSubs. All rights reserved.
                </p>

                <div class="footer-bottom-links">

                    <a href="#">
                        Privacy Policy
                    </a>

                    <a href="#">
                        Terms of Service
                    </a>

                </div>

            </div>

        </div>

    </section>

</template>


<style scoped>
/* ==========================================
   FOOTER
========================================== */

.footer {

    background: #0f172a;

    color: #ffffff;

    padding: 85px 0 30px;

}


/* ==========================================
   CONTAINER
========================================== */

.container {

    width: min(1200px, 92%);

    margin: auto;

}


/* ==========================================
   FOOTER TOP
========================================== */

.footer-top {

    display: grid;

    grid-template-columns: 1fr 2fr;

    gap: 80px;

    padding-bottom: 65px;

    border-bottom: 1px solid rgba(255, 255, 255, .08);

}


/* ==========================================
   BRAND
========================================== */

.logo {

    display: inline-flex;

    align-items: flex-start;

    gap: 16px;

    color: #ffffff;

    text-decoration: none;

}


.logo-grid {

    display: grid;

    grid-template-columns: repeat(2, 9px);

    gap: 4px;

    margin-top: 5px;

}


.logo-grid span {

    width: 9px;

    height: 9px;

    border-radius: 3px;

    background: #ffffff;

}


.logo-grid span:nth-child(2) {

    opacity: .75;

}


.logo-grid span:nth-child(3) {

    opacity: .45;

}


.logo-grid span:nth-child(4) {

    opacity: .2;

}


.logo-content h2 {

    margin: 0 0 9px;

    color: #ffffff;

    font-size: 1.7rem;

    font-weight: 750;

    letter-spacing: -.4px;

}


.logo-content p {

    max-width: 270px;

    margin: 0;

    color: #94a3b8;

    font-size: 13px;

    line-height: 1.8;

}


/* ==========================================
   FOOTER LINKS
========================================== */

.footer-links {

    display: grid;

    grid-template-columns: repeat(4, 1fr);

    gap: 30px;

}


.footer-column h4 {

    margin: 0 0 20px;

    color: #ffffff;

    font-size: 13px;

    font-weight: 700;

}


.footer-column a {

    display: block;

    width: fit-content;

    margin-bottom: 14px;

    color: #94a3b8;

    font-size: 13px;

    text-decoration: none;

    transition:
        color .2s ease,
        transform .2s ease;

}


.footer-column a:hover {

    color: #ffffff;

    transform: translateX(2px);

}


/* ==========================================
   FOOTER BOTTOM
========================================== */

.footer-bottom {

    display: flex;

    align-items: center;

    justify-content: space-between;

    gap: 20px;

    padding-top: 28px;

}


.footer-bottom p {

    margin: 0;

    color: #64748b;

    font-size: 12px;

}


.footer-bottom-links {

    display: flex;

    align-items: center;

    gap: 24px;

}


.footer-bottom-links a {

    color: #64748b;

    font-size: 12px;

    text-decoration: none;

    transition: color .2s ease;

}


.footer-bottom-links a:hover {

    color: #ffffff;

}


/* ==========================================
   TABLET
========================================== */

@media (max-width: 992px) {

    .footer {

        padding-top: 70px;

    }


    .footer-top {

        grid-template-columns: 1fr;

        gap: 55px;

    }


    .footer-brand {

        max-width: 400px;

    }


    .footer-links {

        grid-template-columns: repeat(4, 1fr);

    }

}


/* ==========================================
   MOBILE
========================================== */

@media (max-width: 768px) {

    .footer {

        padding: 65px 0 25px;

    }


    .footer-top {

        gap: 45px;

        padding-bottom: 45px;

    }


    .footer-links {

        grid-template-columns: repeat(2, 1fr);

        gap: 40px 25px;

    }


    .footer-bottom {

        flex-direction: column;

        align-items: flex-start;

    }


    .footer-bottom-links {

        gap: 18px;

    }

}


/* ==========================================
   SMALL PHONES
========================================== */

@media (max-width: 480px) {

    .footer {

        padding: 55px 0 22px;

    }


    .footer-links {

        grid-template-columns: 1fr 1fr;

        gap: 35px 20px;

    }


    .logo-content h2 {

        font-size: 1.5rem;

    }


    .logo-content p {

        font-size: 12px;

    }


    .footer-column h4 {

        margin-bottom: 16px;

    }


    .footer-column a {

        font-size: 12px;

        margin-bottom: 12px;

    }


    .footer-bottom {

        gap: 15px;

    }


    .footer-bottom-links {

        flex-wrap: wrap;

    }

}


/* ==========================================
   REDUCED MOTION
========================================== */

@media (prefers-reduced-motion: reduce) {

    .footer-column a,
    .footer-bottom-links a {

        transition: none;

    }

}
</style>