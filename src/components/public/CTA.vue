<template>
    <section class="cta">

        <div class="container">

            <div class="cta-card">

                <span class="badge">
                    Ready to Get Started?
                </span>

                <h2>
                    Start enjoying premium subscriptions
                    today.
                </h2>

                <p>
                    Join hundreds of satisfied customers enjoying
                    Spotify, Netflix, ChatGPT Plus, YouTube Premium,
                    Apple Music and more at affordable prices.
                </p>

                <div class="buttons">

                    <a href="/register" class="btn-primary">
                        Create Free Account
                    </a>

                    <a href="https://wa.me/+2348120212189" target="_blank" rel="noopener noreferrer"
                        class="btn-secondary">
                        Chat on WhatsApp
                    </a>

                </div>

            </div>

        </div>

    </section>
</template>


<style scoped>
/* ==========================================
   CTA SECTION
========================================== */

.cta {

    padding: 120px 0;

    background: #f8fafc;

}


/* ==========================================
   CONTAINER
========================================== */

.container {

    width: min(1200px, 92%);

    margin: auto;

}


/* ==========================================
   CTA CARD
========================================== */

.cta-card {

    position: relative;

    overflow: hidden;

    padding: 80px 60px;

    border: 1px solid #1f2937;

    border-radius: 28px;

    background: #111827;

    color: #ffffff;

    text-align: center;

}


/* Subtle decorative element */

.cta-card::before {

    content: "";

    position: absolute;

    width: 280px;
    height: 280px;

    top: -160px;
    right: -100px;

    border: 1px solid rgba(255, 255, 255, .08);

    border-radius: 50%;

}


.cta-card::after {

    content: "";

    position: absolute;

    width: 220px;
    height: 220px;

    bottom: -150px;
    left: -80px;

    border: 1px solid rgba(255, 255, 255, .06);

    border-radius: 50%;

}


/* ==========================================
   CONTENT LAYER
========================================== */

.cta-card>* {

    position: relative;

    z-index: 1;

}


/* ==========================================
   BADGE
========================================== */

.badge {

    display: inline-flex;

    align-items: center;
    justify-content: center;

    padding: 9px 17px;

    border: 1px solid rgba(255, 255, 255, .15);

    border-radius: 999px;

    background: rgba(255, 255, 255, .06);

    color: #e5e7eb;

    font-size: 13px;

    font-weight: 600;

    margin-bottom: 25px;

}


/* ==========================================
   HEADING
========================================== */

.cta-card h2 {

    max-width: 780px;

    margin: 0 auto 20px;

    color: #ffffff;

    font-size: 3rem;

    line-height: 1.2;

    font-weight: 800;

    letter-spacing: -.7px;

}


/* ==========================================
   DESCRIPTION
========================================== */

.cta-card p {

    max-width: 700px;

    margin: 0 auto 40px;

    color: #cbd5e1;

    font-size: 1rem;

    line-height: 1.9;

}


/* ==========================================
   BUTTONS
========================================== */

.buttons {

    display: flex;

    align-items: center;
    justify-content: center;

    gap: 14px;

    flex-wrap: wrap;

}


/* ==========================================
   PRIMARY BUTTON
========================================== */

.btn-primary {

    display: inline-flex;

    align-items: center;
    justify-content: center;

    min-height: 52px;

    padding: 14px 28px;

    border: 1px solid #ffffff;

    border-radius: 11px;

    background: #ffffff;

    color: #111827;

    font-size: 14px;

    font-weight: 700;

    text-decoration: none;

    transition:
        background .25s ease,
        color .25s ease,
        transform .25s ease;

}


.btn-primary:hover {

    background: #e5e7eb;

    border-color: #e5e7eb;

    transform: translateY(-2px);

}


/* ==========================================
   SECONDARY BUTTON
========================================== */

.btn-secondary {

    display: inline-flex;

    align-items: center;
    justify-content: center;

    min-height: 52px;

    padding: 14px 28px;

    border: 1px solid #4b5563;

    border-radius: 11px;

    background: transparent;

    color: #ffffff;

    font-size: 14px;

    font-weight: 600;

    text-decoration: none;

    transition:
        background .25s ease,
        border-color .25s ease,
        color .25s ease,
        transform .25s ease;

}


.btn-secondary:hover {

    background: #ffffff;

    border-color: #ffffff;

    color: #111827;

    transform: translateY(-2px);

}


/* ==========================================
   TABLET
========================================== */

@media (max-width: 992px) {

    .cta {

        padding: 100px 0;

    }


    .cta-card {

        padding: 70px 45px;

    }


    .cta-card h2 {

        font-size: 2.6rem;

    }

}


/* ==========================================
   MOBILE
========================================== */

@media (max-width: 768px) {

    .cta {

        padding: 80px 0;

    }


    .cta-card {

        padding: 60px 25px;

        border-radius: 22px;

    }


    .cta-card h2 {

        font-size: 2.1rem;

        letter-spacing: -.4px;

    }


    .cta-card p {

        font-size: .95rem;

        line-height: 1.8;

    }


    .buttons {

        flex-direction: column;

        width: 100%;

    }


    .btn-primary,
    .btn-secondary {

        width: 100%;

    }

}


/* ==========================================
   SMALL PHONES
========================================== */

@media (max-width: 480px) {

    .cta {

        padding: 65px 0;

    }


    .cta-card {

        padding: 50px 20px;

        border-radius: 18px;

    }


    .badge {

        font-size: 12px;

        padding: 8px 14px;

    }


    .cta-card h2 {

        font-size: 1.8rem;

    }


    .cta-card p {

        font-size: .9rem;

    }


    .btn-primary,
    .btn-secondary {

        min-height: 50px;

        font-size: 13px;

    }

}


/* ==========================================
   REDUCED MOTION
========================================== */

@media (prefers-reduced-motion: reduce) {

    .btn-primary,
    .btn-secondary {

        transition: none;

    }

}
</style>