<template>
    <section id="faq" class="faq">

        <div class="container">

            <div class="section-header">

                <span class="section-badge">
                    FAQ
                </span>

                <h2>
                    Frequently Asked Questions
                </h2>

                <p>
                    Everything you need to know before purchasing your
                    premium subscriptions.
                </p>

            </div>


            <!-- FAQ List -->

            <div class="faq-list">

                <div v-for="(faq, index) in faqs" :key="index" class="faq-item" :class="{ active: active === index }">

                    <button class="faq-question" type="button" :aria-expanded="active === index" @click="toggle(index)">

                        <span>
                            {{ faq.question }}
                        </span>

                        <span class="icon">
                            {{ active === index ? "−" : "+" }}
                        </span>

                    </button>


                    <transition name="accordion">

                        <div v-if="active === index" class="faq-answer">

                            {{ faq.answer }}

                        </div>

                    </transition>

                </div>

            </div>

        </div>

    </section>
</template>


<script setup>

import { ref } from "vue";


const active = ref(0);


const faqs = [

    {
        question: "How long does delivery take?",

        answer:
            "Most subscriptions are delivered within a few minutes after successful payment."
    },

    {
        question: "Do I need an international card?",

        answer:
            "No. You can pay locally using the available payment methods on CupidSubs."
    },

    {
        question: "Is my payment secure?",

        answer:
            "Yes. Every payment is processed securely through trusted payment gateways."
    },

    {
        question: "What happens after payment?",

        answer:
            "Once payment is confirmed, your subscription is activated and delivered to your account."
    },

    {
        question: "Can I contact support?",

        answer:
            "Absolutely. Our support team is available via WhatsApp whenever you need assistance."
    }

];


const toggle = (index) => {

    active.value =
        active.value === index
            ? null
            : index;

};

</script>


<style scoped>
/* ==========================================
   FAQ SECTION
========================================== */

.faq {

    padding: 120px 0;

    background: #ffffff;

}


/* ==========================================
   CONTAINER
========================================== */

.container {

    width: min(900px, 92%);

    margin: auto;

}


/* ==========================================
   SECTION HEADER
========================================== */

.section-header {

    text-align: center;

    margin-bottom: 60px;

}


.section-badge {

    display: inline-flex;

    align-items: center;
    justify-content: center;

    padding: 9px 17px;

    border: 1px solid #e5e7eb;

    border-radius: 999px;

    background: #f8fafc;

    color: #374151;

    font-size: 13px;

    font-weight: 600;

    margin-bottom: 18px;

}


.section-header h2 {

    margin: 0 0 18px;

    color: #111827;

    font-size: 2.8rem;

    line-height: 1.15;

    font-weight: 800;

    letter-spacing: -.5px;

}


.section-header p {

    max-width: 650px;

    margin: auto;

    color: #6b7280;

    font-size: 1rem;

    line-height: 1.8;

}


/* ==========================================
   FAQ LIST
========================================== */

.faq-list {

    display: flex;

    flex-direction: column;

    gap: 14px;

}


/* ==========================================
   FAQ ITEM
========================================== */

.faq-item {

    overflow: hidden;

    border: 1px solid #e5e7eb;

    border-radius: 14px;

    background: #ffffff;

    transition:
        border-color .25s ease,
        background .25s ease;

}


.faq-item:hover {

    border-color: #cfd3d8;

}


.faq-item.active {

    border-color: #d1d5db;

    background: #fafafa;

}


/* ==========================================
   QUESTION
========================================== */

.faq-question {

    display: flex;

    align-items: center;
    justify-content: space-between;

    width: 100%;

    min-height: 72px;

    padding: 20px 24px;

    border: none;

    background: transparent;

    color: #111827;

    font-family: inherit;

    font-size: 16px;

    font-weight: 600;

    line-height: 1.5;

    text-align: left;

    cursor: pointer;

}


.faq-question span:first-child {

    padding-right: 20px;

}


.faq-question:hover {

    color: #000000;

}


/* ==========================================
   ICON
========================================== */

.icon {

    display: flex;

    align-items: center;
    justify-content: center;

    flex-shrink: 0;

    width: 30px;
    height: 30px;

    border: 1px solid #e5e7eb;

    border-radius: 50%;

    background: #f8fafc;

    color: #111827;

    font-size: 20px;

    font-weight: 400;

    line-height: 1;

    transition:
        background .25s ease,
        border-color .25s ease,
        transform .25s ease;

}


.faq-item.active .icon {

    background: #111827;

    border-color: #111827;

    color: #ffffff;

}


/* ==========================================
   ANSWER
========================================== */

.faq-answer {

    padding:

        0 24px 24px;

    color: #6b7280;

    font-size: 14px;

    line-height: 1.85;

}


/* ==========================================
   ACCORDION ANIMATION
========================================== */

.accordion-enter-active,
.accordion-leave-active {

    transition:

        opacity .25s ease,
        transform .25s ease;

}


.accordion-enter-from,
.accordion-leave-to {

    opacity: 0;

    transform:
        translateY(-8px);

}


/* ==========================================
   TABLET
========================================== */

@media (max-width: 768px) {

    .faq {

        padding: 90px 0;

    }


    .section-header {

        margin-bottom: 45px;

    }


    .section-header h2 {

        font-size: 2.2rem;

    }


    .section-header p {

        font-size: .95rem;

    }


    .faq-question {

        min-height: 66px;

        padding: 18px 20px;

        font-size: 15px;

    }


    .faq-answer {

        padding:

            0 20px 20px;

        font-size: 13px;

    }

}


/* ==========================================
   MOBILE
========================================== */

@media (max-width: 576px) {

    .faq {

        padding: 75px 0;

    }


    .container {

        width: min(92%, 900px);

    }


    .section-badge {

        padding: 8px 15px;

        font-size: 12px;

    }


    .section-header h2 {

        font-size: 1.9rem;

    }


    .section-header p {

        font-size: .9rem;

        line-height: 1.7;

    }


    .faq-list {

        gap: 12px;

    }


    .faq-item {

        border-radius: 12px;

    }


    .faq-question {

        min-height: 62px;

        padding: 16px;

        font-size: 14px;

    }


    .faq-question span:first-child {

        padding-right: 15px;

    }


    .icon {

        width: 28px;
        height: 28px;

        font-size: 18px;

    }


    .faq-answer {

        padding:

            0 16px 18px;

        font-size: 13px;

        line-height: 1.75;

    }

}


/* ==========================================
   SMALL PHONES
========================================== */

@media (max-width: 380px) {

    .section-header h2 {

        font-size: 1.7rem;

    }


    .faq-question {

        font-size: 13px;

    }

}
</style>