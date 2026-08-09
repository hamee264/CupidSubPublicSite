<template>
    <section id="products" class="products">

        <div class="container">

            <div class="section-header">

                <span class="section-badge">
                    Featured Products
                </span>

                <h2>
                    Choose your favourite
                    premium subscription
                </h2>

                <p>
                    Get instant access to premium streaming,
                    music and AI tools at affordable prices.
                    Fast delivery and WhatsApp support included.
                </p>

            </div>

            <div class="products-grid">

                <!-- Spotify -->

                <div class="product-card">

                    <div class="product-icon spotify">

                        <img src="/src/assets/total22.webp" alt="Spotify">

                    </div>

                    <h3>
                        Spotify Premium
                    </h3>

                    <p>
                        Music Streaming
                    </p>

                    <ul>

                        <li>✔ Instant Activation</li>

                        <li>✔ WhatsApp Support</li>

                        <li>✔ Affordable Plans</li>

                    </ul>

                    <a href="/login" class="product-btn">
                        View Plans
                    </a>

                </div>

                <!-- Netflix -->

                <div class="product-card">

                    <div class="product-icon netflix">

                        <img src="/src/assets/total22.webp" alt="Netflix">

                    </div>

                    <h3>
                        Netflix Premium
                    </h3>

                    <p>
                        Movies & TV
                    </p>

                    <ul>

                        <li>✔ HD & 4K Plans</li>

                        <li>✔ Instant Delivery</li>

                        <li>✔ Secure Purchase</li>

                    </ul>

                    <a href="/login" class="product-btn">
                        View Plans
                    </a>

                </div>

                <!-- ChatGPT -->

                <div class="product-card">

                    <div class="product-icon chatgpt">

                        <img src="/src/assets/total22.webp" alt="ChatGPT">

                    </div>

                    <h3>
                        ChatGPT Plus
                    </h3>

                    <p>
                        AI Assistant
                    </p>

                    <ul>

                        <li>✔ GPT-5 Access</li>

                        <li>✔ Fast Activation</li>

                        <li>✔ Premium Support</li>

                    </ul>

                    <a href="/login" class="product-btn">
                        View Plans
                    </a>

                </div>

            </div>

        </div>

    </section>
</template>

<style scoped>
/* ===========================
   PRODUCTS SECTION
=========================== */

.products {

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

    max-width: 700px;

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

    margin: 0 0 20px;

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
   PRODUCTS GRID
=========================== */

.products-grid {

    display: grid;

    grid-template-columns:
        repeat(3, minmax(0, 1fr));

    gap: 24px;

}


/* ===========================
   PRODUCT CARD
=========================== */

.product-card {

    position: relative;

    display: flex;

    flex-direction: column;

    min-height: 440px;

    padding: 32px;

    background: #ffffff;

    border: 1px solid #e3e3e0;

    border-radius: 18px;

    transition:
        transform .25s ease,
        border-color .25s ease,
        background .25s ease;

}


.product-card:hover {

    transform: translateY(-5px);

    border-color: #c9c9c5;

    background: #fdfdfc;

}


/* ===========================
   PRODUCT ICON
=========================== */

.product-icon {

    width: 68px;

    height: 68px;

    display: flex;

    align-items: center;

    justify-content: center;

    margin-bottom: 28px;

    border-radius: 16px;

    border: 1px solid #e2e2df;

    background: #f5f5f3;

}


/*
   Keep all product icons neutral.
*/

.spotify,
.netflix,
.chatgpt {

    background: #f5f5f3;

}


.product-icon img {

    width: 42px;

    height: 42px;

    object-fit: contain;

}


/* ===========================
   PRODUCT TITLE
=========================== */

.product-card h3 {

    margin: 0 0 7px;

    color: #171717;

    font-size: 1.45rem;

    line-height: 1.3;

    font-weight: 700;

    letter-spacing: -.025em;

}


.product-card>p {

    margin: 0 0 25px;

    color: #858585;

    font-size: .94rem;

    line-height: 1.5;

}


/* ===========================
   FEATURES
=========================== */

.product-card ul {

    list-style: none;

    padding: 0;

    margin: 0 0 30px;

}


.product-card li {

    display: flex;

    align-items: center;

    gap: 9px;

    margin-bottom: 13px;

    color: #4d4d4d;

    font-size: .92rem;

    line-height: 1.5;

}


/*
   Make the existing ✔ symbol
   subtle rather than bright.
*/

.product-card li::first-letter {

    color: #171717;

}


/* ===========================
   PRODUCT BUTTON
=========================== */

.product-btn {

    display: flex;

    align-items: center;

    justify-content: center;

    width: 100%;

    min-height: 50px;

    margin-top: auto;

    padding: 13px 18px;

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


.product-btn:hover {

    background: #303030;

    border-color: #303030;

}


.product-btn:active {

    transform: scale(.985);

}


/* ===========================
   TABLET
=========================== */

@media (max-width: 992px) {

    .products {

        padding: 90px 0;

    }


    .products-grid {

        grid-template-columns: 1fr;

        max-width: 520px;

        margin: auto;

    }


    .product-card {

        min-height: auto;

    }


    .section-header {

        margin-bottom: 50px;

    }


    .section-header h2 {

        font-size: 2.35rem;

    }

}


/* ===========================
   MOBILE
=========================== */

@media (max-width: 768px) {

    .products {

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


    .products-grid {

        gap: 18px;

    }


    .product-card {

        padding: 28px;

        border-radius: 16px;

    }


    .product-icon {

        width: 62px;

        height: 62px;

        margin-bottom: 23px;

    }


    .product-icon img {

        width: 38px;

        height: 38px;

    }


    .product-card h3 {

        font-size: 1.35rem;

    }


    .product-card>p {

        font-size: .9rem;

    }

}


/* ===========================
   SMALL PHONES
=========================== */

@media (max-width: 480px) {

    .products {

        padding: 65px 0;

    }


    .section-header h2 {

        font-size: 1.8rem;

    }


    .section-header p {

        font-size: .9rem;

    }


    .product-card {

        padding: 24px;

    }


    .product-card li {

        font-size: .88rem;

    }


    .product-btn {

        min-height: 48px;

        font-size: .9rem;

    }

}


/* ===========================
   VERY SMALL PHONES
=========================== */

@media (max-width: 380px) {

    .section-header h2 {

        font-size: 1.65rem;

    }


    .product-card {

        padding: 22px;

    }

}


/* ===========================
   REDUCED MOTION
=========================== */

@media (prefers-reduced-motion: reduce) {

    .product-card,
    .product-btn {

        transition: none;

    }

}
</style>