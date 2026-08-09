<template>
    <section id="testimonials" class="testimonials">

        <div class="container">

            <div class="section-header">

                <span class="section-badge">
                    Testimonials
                </span>

                <h2>
                    Trusted by hundreds of happy customers
                </h2>

                <p>
                    See why customers across Nigeria choose CupidSubs
                    for their favourite premium subscriptions.
                </p>

            </div>

            <!-- Stats -->

            <div class="stats">

                <div class="stat">

                    <h3>500+</h3>

                    <span>Happy Customers</span>

                </div>

                <div class="stat">

                    <h3>20+</h3>

                    <span>Premium Services</span>

                </div>

                <div class="stat">

                    <h3>99%</h3>

                    <span>Successful Deliveries</span>

                </div>

                <div class="stat">

                    <h3>24/7</h3>

                    <span>Customer Support</span>

                </div>

            </div>

            <!-- Reviews -->

            <div class="reviews">

                <div class="review-card">

                    <div class="stars">
                        ★★★★★
                    </div>

                    <p class="review-text">
                        "I received my Spotify Premium in less than
                        five minutes. The process was smooth and
                        customer support replied immediately."
                    </p>

                    <div class="user">

                        <div class="avatar">
                            D
                        </div>

                        <div>

                            <h4>Daniel A.</h4>

                            <span>Spotify Premium</span>

                        </div>

                    </div>

                </div>

                <div class="review-card">

                    <div class="stars">
                        ★★★★★
                    </div>

                    <p class="review-text">
                        "Very affordable compared to other vendors.
                        My Netflix account was activated instantly.
                        Definitely recommended."
                    </p>

                    <div class="user">

                        <div class="avatar">
                            S
                        </div>

                        <div>

                            <h4>Sarah O.</h4>

                            <span>Netflix Premium</span>

                        </div>

                    </div>

                </div>

                <div class="review-card">

                    <div class="stars">
                        ★★★★★
                    </div>

                    <p class="review-text">
                        "ChatGPT Plus was activated within minutes.
                        Easy payment and excellent support throughout."
                    </p>

                    <div class="user">

                        <div class="avatar">
                            M
                        </div>

                        <div>

                            <h4>Michael E.</h4>

                            <span>ChatGPT Plus</span>

                        </div>

                    </div>

                </div>

            </div>

            <div class="cta">

                <h3>
                    Ready to enjoy premium subscriptions?
                </h3>

                <a href="/register" class="cta-btn">
                    Create Free Account
                </a>

            </div>

        </div>

    </section>
</template>

<style scoped>
/* ===========================
   TESTIMONIALS
=========================== */

.testimonials {

    padding: 120px 0;

    background: #f7f7f5;

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

    max-width: 720px;

    margin: 0 auto 70px;

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

    background: #ffffff;

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

    margin: auto;

    color: #737373;

    font-size: 1.02rem;

    line-height: 1.8;

}


/* ===========================
   STATS
=========================== */

.stats {

    display: grid;

    grid-template-columns: repeat(4, 1fr);

    gap: 18px;

    margin-bottom: 70px;

}


.stat {

    padding: 30px 20px;

    background: #ffffff;

    border: 1px solid #dededb;

    border-radius: 14px;

    text-align: center;

    transition:
        transform .25s ease,
        border-color .25s ease,
        background .25s ease;

}


.stat:hover {

    transform: translateY(-4px);

    border-color: #c8c8c5;

    background: #fcfcfb;

}


.stat h3 {

    margin: 0 0 7px;

    color: #171717;

    font-size: 2rem;

    line-height: 1;

    font-weight: 750;

    letter-spacing: -.035em;

}


.stat span {

    color: #777777;

    font-size: .88rem;

}


/* ===========================
   REVIEWS
=========================== */

.reviews {

    display: grid;

    grid-template-columns: repeat(3, 1fr);

    gap: 20px;

}


.review-card {

    display: flex;

    flex-direction: column;

    min-height: 290px;

    padding: 32px;

    background: #ffffff;

    border: 1px solid #dededb;

    border-radius: 16px;

    transition:
        transform .25s ease,
        border-color .25s ease;

}


.review-card:hover {

    transform: translateY(-5px);

    border-color: #c8c8c5;

}


/* ===========================
   STARS
=========================== */

.stars {

    margin-bottom: 20px;

    color: #292929;

    font-size: 16px;

    letter-spacing: 2px;

}


/* ===========================
   REVIEW TEXT
=========================== */

.review-text {

    margin: 0 0 30px;

    color: #555555;

    font-size: .94rem;

    line-height: 1.8;

}


/* ===========================
   USER
=========================== */

.user {

    display: flex;

    align-items: center;

    gap: 13px;

    margin-top: auto;

}


.avatar {

    width: 46px;

    height: 46px;

    display: flex;

    align-items: center;

    justify-content: center;

    flex-shrink: 0;

    border-radius: 50%;

    background: #171717;

    color: #ffffff;

    font-size: 14px;

    font-weight: 700;

}


.user h4 {

    margin: 0 0 4px;

    color: #171717;

    font-size: .92rem;

    font-weight: 700;

}


.user span {

    color: #858585;

    font-size: .78rem;

}


/* ===========================
   CTA
=========================== */

.cta {

    margin-top: 85px;

    padding: 55px 30px;

    border: 1px solid #dededb;

    border-radius: 18px;

    background: #ffffff;

    text-align: center;

}


.cta h3 {

    margin: 0 0 25px;

    color: #171717;

    font-size: 1.8rem;

    line-height: 1.3;

    font-weight: 700;

    letter-spacing: -.025em;

}


.cta-btn {

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


.cta-btn:hover {

    background: #303030;

    border-color: #303030;

    transform: translateY(-2px);

}


.cta-btn:active {

    transform: scale(.985);

}


/* ===========================
   TABLET
=========================== */

@media (max-width: 992px) {

    .testimonials {

        padding: 90px 0;

    }


    .section-header {

        margin-bottom: 55px;

    }


    .section-header h2 {

        font-size: 2.35rem;

    }


    .stats {

        grid-template-columns: repeat(2, 1fr);

        margin-bottom: 55px;

    }


    .reviews {

        grid-template-columns: 1fr;

        max-width: 560px;

        margin: auto;

    }


    .review-card {

        min-height: auto;

    }


    .cta {

        margin-top: 65px;

    }

}


/* ===========================
   MOBILE
=========================== */

@media (max-width: 768px) {

    .testimonials {

        padding: 75px 0;

    }


    .container {

        width: min(92%, 520px);

    }


    .section-header {

        margin-bottom: 45px;

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


    .stats {

        gap: 12px;

        margin-bottom: 45px;

    }


    .stat {

        padding: 24px 16px;

    }


    .stat h3 {

        font-size: 1.8rem;

    }


    .review-card {

        padding: 28px;

    }


    .review-text {

        font-size: .9rem;

    }


    .cta {

        margin-top: 55px;

        padding: 40px 22px;

        border-radius: 15px;

    }


    .cta h3 {

        font-size: 1.55rem;

    }

}


/* ===========================
   SMALL PHONES
=========================== */

@media (max-width: 480px) {

    .testimonials {

        padding: 65px 0;

    }


    .section-header h2 {

        font-size: 1.8rem;

    }


    .section-header p {

        font-size: .9rem;

    }


    .stats {

        grid-template-columns: 1fr;

    }


    .stat {

        padding: 22px;

    }


    .review-card {

        padding: 24px;

    }


    .stars {

        font-size: 15px;

    }


    .cta {

        padding: 35px 18px;

    }


    .cta h3 {

        font-size: 1.4rem;

    }


    .cta-btn {

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


    .review-text {

        font-size: .86rem;

    }

}


/* ===========================
   REDUCED MOTION
=========================== */

@media (prefers-reduced-motion: reduce) {

    .stat,
    .review-card,
    .cta-btn {

        transition: none;

    }

}
</style>