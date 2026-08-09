<template>
    <section id="how-it-works" class="how-it-works">

        <div class="container">

            <div class="section-header">

                <span class="section-badge">
                    How It Works
                </span>

                <h2>
                    Getting started is
                    simple and fast.
                </h2>

                <p>
                    Buy your favourite subscriptions in just a few easy
                    steps. No complicated process, no unnecessary delays.
                </p>

            </div>

            <div class="steps">

                <!-- Step 1 -->

                <div class="step-card">

                    <div class="step-number">
                        1
                    </div>

                    <div class="step-icon">
                        👤
                    </div>

                    <h3>Create Account</h3>

                    <p>
                        Register or log in to your CupidSubs account
                        to access all available subscriptions.
                    </p>

                </div>

                <div class="line"></div>

                <!-- Step 2 -->

                <div class="step-card">

                    <div class="step-number">
                        2
                    </div>

                    <div class="step-icon">
                        📦
                    </div>

                    <h3>Browse Products</h3>

                    <p>
                        Explore Spotify, Netflix,
                        ChatGPT Plus and many more premium services.
                    </p>

                </div>

                <div class="line"></div>

                <!-- Step 3 -->

                <div class="step-card">

                    <div class="step-number">
                        3
                    </div>

                    <div class="step-icon">
                        💳
                    </div>

                    <h3>Secure Payment</h3>

                    <p>
                        Complete your payment safely using our
                        trusted payment gateway.
                    </p>

                </div>

                <div class="line"></div>

                <!-- Step 4 -->

                <div class="step-card">

                    <div class="step-number">
                        4
                    </div>

                    <div class="step-icon">
                        ⚡
                    </div>

                    <h3>Instant Delivery</h3>

                    <p>
                        Receive your subscription details within
                        minutes after payment.
                    </p>

                </div>

            </div>

            <div class="bottom-btn">

                <a href="/register" class="register-btn">
                    Create Free Account
                </a>

            </div>

        </div>

    </section>
</template>

<style scoped>
/* ===========================
   HOW IT WORKS
=========================== */

.how-it-works {

    padding: 120px 0;

    background: #ffffff;

}


/* ===========================
   CONTAINER
=========================== */

.container {

    width: min(1200px, 92%);

    margin: auto;

}


/* ===========================
   SECTION HEADER
=========================== */

.section-header {

    max-width: 700px;

    margin: 0 auto 80px;

    text-align: center;

}


.section-badge {

    display: inline-flex;

    align-items: center;

    justify-content: center;

    padding: 8px 15px;

    margin-bottom: 20px;

    border: 1px solid #dededb;

    border-radius: 999px;

    background: #f7f7f5;

    color: #555555;

    font-size: 13px;

    font-weight: 600;

    letter-spacing: .02em;

}


.section-header h2 {

    margin: 0 0 18px;

    color: #171717;

    font-size: 2.8rem;

    line-height: 1.15;

    font-weight: 750;

    letter-spacing: -.045em;

}


.section-header p {

    max-width: 620px;

    margin: 0 auto;

    color: #737373;

    font-size: 1.02rem;

    line-height: 1.8;

}


/* ===========================
   STEPS
=========================== */

.steps {

    display: flex;

    align-items: flex-start;

    justify-content: center;

    gap: 20px;

}


/* ===========================
   STEP CARD
=========================== */

.step-card {

    position: relative;

    flex: 1;

    max-width: 260px;

    text-align: center;

}


/* ===========================
   STEP NUMBER
=========================== */

.step-number {

    width: 38px;

    height: 38px;

    display: flex;

    align-items: center;

    justify-content: center;

    margin: 0 auto 22px;

    border: 1px solid #d5d5d2;

    border-radius: 50%;

    background: #ffffff;

    color: #171717;

    font-size: 14px;

    font-weight: 700;

}


/* ===========================
   STEP ICON
=========================== */

.step-icon {

    width: 82px;

    height: 82px;

    display: flex;

    align-items: center;

    justify-content: center;

    margin: 0 auto 25px;

    border: 1px solid #dededb;

    border-radius: 18px;

    background: #f7f7f5;

    font-size: 34px;

    transition:
        transform .25s ease,
        border-color .25s ease,
        background .25s ease;

}


.step-card:hover .step-icon {

    transform: translateY(-4px);

    border-color: #c8c8c5;

    background: #f2f2ef;

}


/* ===========================
   STEP TITLE
=========================== */

.step-card h3 {

    margin: 0 0 12px;

    color: #171717;

    font-size: 1.25rem;

    line-height: 1.35;

    font-weight: 700;

    letter-spacing: -.02em;

}


/* ===========================
   STEP DESCRIPTION
=========================== */

.step-card p {

    margin: 0;

    color: #777777;

    font-size: .92rem;

    line-height: 1.75;

}


/* ===========================
   CONNECTING LINE
=========================== */

.line {

    flex: 0 0 65px;

    height: 1px;

    margin-top: 19px;

    background: #dcdcd8;

}


/* ===========================
   BOTTOM BUTTON
=========================== */

.bottom-btn {

    display: flex;

    justify-content: center;

    margin-top: 70px;

}


.register-btn {

    display: inline-flex;

    align-items: center;

    justify-content: center;

    min-height: 50px;

    padding: 14px 27px;

    border: 1px solid #171717;

    border-radius: 10px;

    background: #171717;

    color: #ffffff;

    font-size: .92rem;

    font-weight: 600;

    text-decoration: none;

    transition:
        background .2s ease,
        border-color .2s ease,
        transform .2s ease;

}


.register-btn:hover {

    background: #303030;

    border-color: #303030;

    transform: translateY(-2px);

}


.register-btn:active {

    transform: scale(.985);

}


/* ===========================
   TABLET
=========================== */

@media (max-width: 992px) {

    .how-it-works {

        padding: 90px 0;

    }


    .section-header {

        margin-bottom: 60px;

    }


    .section-header h2 {

        font-size: 2.35rem;

    }


    .steps {

        flex-direction: column;

        align-items: center;

        gap: 0;

    }


    .step-card {

        width: 100%;

        max-width: 440px;

    }


    .line {

        flex: none;

        width: 1px;

        height: 55px;

        margin: 0;

    }

}


/* ===========================
   MOBILE
=========================== */

@media (max-width: 768px) {

    .how-it-works {

        padding: 75px 0;

    }


    .container {

        width: min(92%, 520px);

    }


    .section-header {

        margin-bottom: 50px;

    }


    .section-badge {

        font-size: 12px;

        padding: 7px 13px;

    }


    .section-header h2 {

        font-size: 2.05rem;

        line-height: 1.2;

    }


    .section-header p {

        font-size: .95rem;

        line-height: 1.7;

    }


    .step-icon {

        width: 72px;

        height: 72px;

        border-radius: 16px;

        font-size: 30px;

    }


    .step-card h3 {

        font-size: 1.18rem;

    }


    .step-card p {

        font-size: .9rem;

    }


    .bottom-btn {

        margin-top: 55px;

    }

}


/* ===========================
   SMALL PHONES
=========================== */

@media (max-width: 480px) {

    .how-it-works {

        padding: 65px 0;

    }


    .section-header h2 {

        font-size: 1.8rem;

    }


    .section-header p {

        font-size: .9rem;

    }


    .step-icon {

        width: 68px;

        height: 68px;

        font-size: 28px;

    }


    .step-card h3 {

        font-size: 1.1rem;

    }


    .step-card p {

        font-size: .86rem;

        line-height: 1.7;

    }


    .line {

        height: 45px;

    }


    .register-btn {

        width: 100%;

        max-width: 280px;

    }

}


/* ===========================
   VERY SMALL PHONES
=========================== */

@media (max-width: 380px) {

    .section-header h2 {

        font-size: 1.65rem;

    }


    .step-card p {

        font-size: .84rem;

    }

}


/* ===========================
   REDUCED MOTION
=========================== */

@media (prefers-reduced-motion: reduce) {

    .step-icon,
    .register-btn {

        transition: none;

    }

}
</style>