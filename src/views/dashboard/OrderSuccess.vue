<template>
    <div class="success-page">

        <div class="success-container">

            <!-- Success Icon -->

            <div class="success-icon">
                <i class="bi bi-check-lg"></i>
            </div>


            <!-- Header -->

            <span class="success-label">
                ORDER SUBMITTED
            </span>

            <h1>
                Your order has been submitted.
            </h1>

            <p class="success-description">
                We've received your order and payment proof.
                Your payment will be reviewed before your subscription
                is activated.
            </p>


            <!-- Order Number -->

            <div class="order-number-card">

                <span>
                    ORDER NUMBER
                </span>

                <strong>
                    {{ orderNumber }}
                </strong>

                <button type="button" @click="copyOrderNumber">
                    <i class="bi bi-copy"></i>

                    {{ copied ? 'Copied' : 'Copy' }}
                </button>

            </div>


            <!-- Status -->

            <div class="status-card">

                <div class="status-icon">
                    <i class="bi bi-clock"></i>
                </div>

                <div>

                    <strong>
                        Payment verification pending
                    </strong>

                    <p>
                        Our team will verify your payment and process
                        your subscription. You'll be able to track the
                        order from your orders page.
                    </p>

                </div>

            </div>


            <!-- Actions -->

            <div class="actions">

                <button class="primary-button" type="button" @click="goToOrders">
                    View my orders
                    <i class="bi bi-arrow-right"></i>
                </button>


                <button class="secondary-button" type="button" @click="goToMarketplace">
                    Back to marketplace
                </button>

            </div>


            <!-- Note -->

            <p class="bottom-note">
                Keep your order number for reference.
            </p>

        </div>

    </div>
</template>


<script setup>

import {
    ref,
    computed
} from 'vue'

import {
    useRoute,
    useRouter
} from 'vue-router'


const route = useRoute()
const router = useRouter()


const copied = ref(false)


/* =========================
   ORDER NUMBER
========================= */

const orderNumber = computed(() => {

    return route.query.order || ''

})


/* =========================
   COPY
========================= */

const copyOrderNumber = async () => {

    if (!orderNumber.value) {
        return
    }

    try {

        await navigator.clipboard.writeText(
            orderNumber.value
        )

        copied.value = true

        setTimeout(() => {

            copied.value = false

        }, 2000)

    } catch (error) {

        console.error(
            'Unable to copy order number:',
            error
        )

    }

}


/* =========================
   NAVIGATION
========================= */

const goToOrders = () => {

    router.push({
        name: 'orders'
    })

}


const goToMarketplace = () => {

    router.push({
        name: 'Marketplace'
    })

}

</script>


<style scoped>
.success-page {
    min-height: 100vh;
    padding: 70px 20px;
    background: #f7f7f7;
    color: #171717;
}


.success-container {
    width: 100%;
    max-width: 650px;
    margin: 0 auto;
    text-align: center;
}


/* =========================
   SUCCESS ICON
========================= */

.success-icon {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 64px;
    height: 64px;

    margin: 0 auto 25px;

    border-radius: 50%;

    background: #111;
    color: #fff;

    font-size: 25px;
}


/* =========================
   HEADER
========================= */

.success-label {
    display: block;

    margin-bottom: 12px;

    color: #888;

    font-size: 10px;
    font-weight: 700;

    letter-spacing: 1.5px;
}


.success-container h1 {
    max-width: 580px;

    margin: 0 auto 14px;

    color: #171717;

    font-size: 36px;
    font-weight: 700;

    letter-spacing: -1px;
}


.success-description {
    max-width: 520px;

    margin: 0 auto;

    color: #777;

    font-size: 14px;
    line-height: 1.7;
}


/* =========================
   ORDER NUMBER
========================= */

.order-number-card {
    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 15px;

    margin-top: 35px;
    padding: 18px 20px;

    border: 1px solid #e3e3e3;

    background: #fff;

    text-align: left;
}


.order-number-card>span {
    color: #999;

    font-size: 9px;
    font-weight: 700;

    letter-spacing: 1px;
}


.order-number-card strong {
    margin-left: auto;

    color: #171717;

    font-size: 13px;
}


.order-number-card button {
    display: inline-flex;
    align-items: center;
    gap: 6px;

    padding: 8px 10px;

    border: 1px solid #ddd;

    background: #fff;

    color: #444;

    font-size: 10px;
    font-weight: 600;

    cursor: pointer;
}


.order-number-card button:hover {
    border-color: #aaa;
}


/* =========================
   STATUS
========================= */

.status-card {
    display: flex;
    align-items: flex-start;

    gap: 14px;

    margin-top: 15px;
    padding: 20px;

    border: 1px solid #e3e3e3;

    background: #fff;

    text-align: left;
}


.status-icon {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 38px;
    height: 38px;

    flex-shrink: 0;

    background: #f3f3f3;

    color: #555;

    font-size: 15px;
}


.status-card strong {
    display: block;

    margin-bottom: 6px;

    color: #222;

    font-size: 13px;
}


.status-card p {
    margin: 0;

    color: #777;

    font-size: 11px;

    line-height: 1.6;
}


/* =========================
   ACTIONS
========================= */

.actions {
    display: flex;
    flex-direction: column;

    gap: 10px;

    margin-top: 25px;
}


.primary-button,
.secondary-button {
    width: 100%;
    height: 48px;

    font-size: 12px;
    font-weight: 600;

    cursor: pointer;

    transition:
        background .2s ease,
        border-color .2s ease;
}


.primary-button {
    display: flex;
    align-items: center;
    justify-content: center;

    gap: 9px;

    border: 1px solid #111;

    background: #111;

    color: #fff;
}


.primary-button:hover {
    background: #292929;
}


.secondary-button {
    border: 1px solid #ddd;

    background: #fff;

    color: #333;
}


.secondary-button:hover {
    border-color: #aaa;
}


/* =========================
   NOTE
========================= */

.bottom-note {
    margin: 22px 0 0;

    color: #aaa;

    font-size: 10px;
}


/* =========================
   RESPONSIVE
========================= */

@media (max-width: 600px) {

    .success-page {
        padding: 45px 18px;
    }


    .success-container h1 {
        font-size: 29px;
    }


    .order-number-card {
        align-items: flex-start;
        flex-direction: column;
    }


    .order-number-card strong {
        margin-left: 0;
    }


    .order-number-card button {
        width: 100%;
        justify-content: center;
    }

}
</style>