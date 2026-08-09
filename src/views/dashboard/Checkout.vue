<template>
    <div class="checkout-page">

        <div class="container py-5">

            <!-- Header -->
            <div class="checkout-header mb-5">
                <span class="checkout-label">SECURE CHECKOUT</span>

                <h1>Complete your order</h1>

                <p>
                    Make your payment and submit your proof to complete your order.
                </p>
            </div>


            <div v-if="loading" class="loading-state">
                <div class="spinner"></div>
                <p>Loading checkout...</p>
            </div>


            <div v-else-if="error" class="error-box">
                <i class="bi bi-exclamation-circle"></i>
                <span>{{ error }}</span>
            </div>


            <div v-else class="checkout-grid">

                <!-- LEFT -->
                <div class="checkout-main">

                    <!-- Customer Information -->
                    <section class="checkout-card">

                        <div class="card-heading">
                            <div class="step-number">01</div>

                            <div>
                                <h3>Customer information</h3>
                                <p>Enter the details we should use for your order.</p>
                            </div>
                        </div>


                        <div class="form-grid">

                            <div class="form-group full-width">
                                <label>Full name</label>

                                <input v-model="form.customer_name" type="text" placeholder="Enter your full name" />
                            </div>


                            <div class="form-group">
                                <label>Email address</label>

                                <input v-model="form.customer_email" type="email" placeholder="you@example.com" />
                            </div>


                            <div class="form-group">
                                <label>Phone number</label>

                                <input v-model="form.customer_phone" type="tel" placeholder="08012345678" />
                            </div>

                        </div>

                    </section>


                    <!-- Payment -->
                    <section class="checkout-card">

                        <div class="card-heading">
                            <div class="step-number">02</div>

                            <div>
                                <h3>Bank transfer</h3>
                                <p>Transfer the exact amount to the account below.</p>
                            </div>
                        </div>


                        <!-- Bank Details -->
                        <div class="bank-box">

                            <div class="bank-top">
                                <div>
                                    <span class="bank-label">BANK ACCOUNT</span>
                                    <h4>{{ settings.bank_name }}</h4>
                                </div>

                                <i class="bi bi-bank"></i>
                            </div>


                            <div class="bank-details">

                                <div class="bank-detail">
                                    <span>Account name</span>
                                    <strong>{{ settings.account_name }}</strong>
                                </div>


                                <div class="bank-detail">
                                    <span>Account number</span>

                                    <div class="account-number">
                                        <strong>{{ settings.account_number }}</strong>

                                        <button type="button" @click="copyAccountNumber">
                                            <i class="bi bi-copy"></i>
                                            {{ copied ? 'Copied' : 'Copy' }}
                                        </button>
                                    </div>
                                </div>

                            </div>


                            <div v-if="settings.payment_instructions" class="payment-instructions">
                                <i class="bi bi-info-circle"></i>

                                <p>{{ settings.payment_instructions }}</p>
                            </div>

                        </div>


                        <div class="amount-to-pay">

                            <span>Total to pay</span>

                            <strong>
                                {{ formatCurrency(product.price) }}
                            </strong>

                        </div>

                    </section>


                    <!-- Sender Information -->
                    <section class="checkout-card">

                        <div class="card-heading">
                            <div class="step-number">03</div>

                            <div>
                                <h3>Payment details</h3>
                                <p>
                                    Enter the details of the account you used to make
                                    the transfer.
                                </p>
                            </div>
                        </div>


                        <div class="form-grid">

                            <div class="form-group full-width">
                                <label>Name on sender account</label>

                                <input v-model="form.sender_name" type="text"
                                    placeholder="Name on the account you transferred from" />
                            </div>


                            <div class="form-group">
                                <label>Sender's bank</label>

                                <input v-model="form.sender_bank" type="text" placeholder="e.g. GTBank" />
                            </div>


                            <div class="form-group">
                                <label>Sender's account number</label>

                                <input v-model="form.sender_account_number" type="text" inputmode="numeric"
                                    placeholder="Account number" />
                            </div>


                            <div class="form-group full-width">
                                <label>Payment reference</label>

                                <input v-model="form.payment_reference" type="text"
                                    placeholder="Transaction reference (optional)" />

                                <small>
                                    Enter the transaction reference if your bank provided one.
                                </small>
                            </div>

                        </div>

                    </section>


                    <!-- Proof -->
                    <section class="checkout-card">

                        <div class="card-heading">
                            <div class="step-number">04</div>

                            <div>
                                <h3>Payment proof</h3>
                                <p>Upload a screenshot or image showing your payment.</p>
                            </div>
                        </div>


                        <label class="upload-box">

                            <input type="file" accept="image/*" @change="handleFile" />

                            <div v-if="!proofPreview" class="upload-content">

                                <div class="upload-icon">
                                    <i class="bi bi-cloud-arrow-up"></i>
                                </div>

                                <strong>Upload payment proof</strong>

                                <span>
                                    PNG, JPG or WEBP • Maximum 5MB
                                </span>

                            </div>


                            <div v-else class="preview-content">

                                <img :src="proofPreview" alt="Payment proof preview" />

                                <div class="preview-info">
                                    <strong>{{ proofFile.name }}</strong>

                                    <span>
                                        Click to replace image
                                    </span>
                                </div>

                            </div>

                        </label>

                    </section>


                    <!-- Submit -->
                    <button class="submit-button" type="button" :disabled="submitting" @click="submitOrder">

                        <span v-if="submitting">
                            <i class="bi bi-arrow-repeat spin"></i>
                            Submitting order...
                        </span>

                        <span v-else>
                            Submit order
                            <i class="bi bi-arrow-right"></i>
                        </span>

                    </button>

                </div>


                <!-- RIGHT -->
                <aside class="checkout-sidebar">

                    <div class="summary-card">

                        <span class="summary-label">ORDER SUMMARY</span>

                        <div class="product-summary">

                            <div class="product-image">

                                <img v-if="product.image" :src="product.image" :alt="product.name" />

                                <i v-else class="bi bi-box"></i>

                            </div>


                            <div class="product-info">

                                <h3>{{ product.name }}</h3>

                                <span v-if="product.provider">
                                    {{ product.provider }}
                                </span>

                                <small v-if="product.duration">
                                    {{ product.duration }}
                                </small>

                            </div>

                        </div>


                        <div class="summary-line">
                            <span>Product</span>
                            <strong>
                                {{ formatCurrency(product.price) }}
                            </strong>
                        </div>


                        <div class="summary-line">
                            <span>Payment method</span>
                            <strong>Bank Transfer</strong>
                        </div>


                        <div class="summary-total">
                            <span>Total</span>

                            <strong>
                                {{ formatCurrency(product.price) }}
                            </strong>
                        </div>

                    </div>


                    <div class="notice-card">

                        <i class="bi bi-shield-check"></i>

                        <div>
                            <strong>Payment verification</strong>

                            <p>
                                Your order will remain pending until our team
                                verifies your payment.
                            </p>
                        </div>

                    </div>

                </aside>

            </div>

        </div>

    </div>
</template>


<script setup>

import {
    ref,
    onMounted
} from 'vue'

import {
    useRoute,
    useRouter
} from 'vue-router'

import {
    supabase
} from '../../lib/supabase'


const route = useRoute()
const router = useRouter()


/* =========================
   STATE
========================= */

const loading = ref(true)

const submitting = ref(false)

const error = ref('')

const product = ref(null)

const settings = ref({})

const proofFile = ref(null)

const proofPreview = ref(null)

const copied = ref(false)


/* =========================
   CUSTOMER FORM
========================= */

const form = ref({

    customer_name: '',

    customer_email: '',

    customer_phone: '',

    sender_name: '',

    sender_bank: '',

    sender_account_number: '',

    payment_reference: ''

})


/* =========================
   LOAD CHECKOUT
========================= */

const loadCheckout = async () => {

    loading.value = true

    error.value = ''


    try {

        /* =========================
           PRODUCT ID
        ========================= */

        const productId = route.query.product


        if (!productId) {

            throw new Error(
                'No product was selected.'
            )

        }


        /* =========================
           LOAD PRODUCT
        ========================= */

        const {
            data: productData,
            error: productError
        } = await supabase
            .from('products')
            .select('*')
            .eq('id', productId)
            .single()


        if (productError) {

            throw productError

        }


        if (!productData) {

            throw new Error(
                'The selected product could not be found.'
            )

        }


        product.value = productData


        /* =========================
           LOAD PAYMENT SETTINGS
        ========================= */

        const {
            data: settingsData,
            error: settingsError
        } = await supabase
            .from('settings')
            .select('*')
            .limit(1)
            .single()


        if (settingsError) {

            throw settingsError

        }


        settings.value = settingsData || {}


        /* =========================
           GET CURRENT USER
        ========================= */

        const {
            data: {
                user
            }
        } = await supabase.auth.getUser()


        if (user) {

            form.value.customer_email =
                user.email || ''


            form.value.customer_name =
                user.user_metadata?.full_name || ''


            /*
             * Some users may have their
             * name stored under "name".
             */

            if (
                !form.value.customer_name &&
                user.user_metadata?.name
            ) {

                form.value.customer_name =
                    user.user_metadata.name

            }

        }

    } catch (err) {

        console.error(
            'Checkout loading error:',
            err
        )


        error.value =
            err.message ||
            'Unable to load checkout.'

    } finally {

        loading.value = false

    }

}


/* =========================
   PAYMENT PROOF
========================= */

const handleFile = (event) => {

    const file =
        event.target.files?.[0]


    if (!file) {
        return
    }


    /* =========================
       CHECK FILE TYPE
    ========================= */

    if (!file.type.startsWith('image/')) {

        alert(
            'Please upload an image file.'
        )

        event.target.value = ''

        return

    }


    /* =========================
       CHECK FILE SIZE
    ========================= */

    if (
        file.size >
        5 * 1024 * 1024
    ) {

        alert(
            'Payment proof must not exceed 5MB.'
        )

        event.target.value = ''

        return

    }


    /* =========================
       REMOVE OLD PREVIEW
    ========================= */

    if (proofPreview.value) {

        URL.revokeObjectURL(
            proofPreview.value
        )

    }


    /* =========================
       STORE FILE
    ========================= */

    proofFile.value = file


    proofPreview.value =
        URL.createObjectURL(file)

}


/* =========================
   COPY ACCOUNT NUMBER
========================= */

const copyAccountNumber = async () => {

    const accountNumber =
        settings.value.account_number


    if (!accountNumber) {
        return
    }


    try {

        await navigator.clipboard.writeText(
            accountNumber
        )


        copied.value = true


        setTimeout(() => {

            copied.value = false

        }, 2000)


    } catch (err) {

        console.error(
            'Copy error:',
            err
        )

    }

}


/* =========================
   GENERATE ORDER NUMBER
========================= */

const generateOrderNumber = () => {

    const timestamp =
        Date.now()
            .toString()
            .slice(-8)


    const random =
        Math.floor(
            100 +
            Math.random() * 900
        )


    return `CUP-${timestamp}-${random}`

}


/* =========================
   VALIDATION
========================= */

const validateForm = () => {

    /* Customer name */

    if (
        !form.value.customer_name.trim()
    ) {

        alert(
            'Please enter your full name.'
        )

        return false

    }


    /* Customer email */

    if (
        !form.value.customer_email.trim()
    ) {

        alert(
            'Please enter your email address.'
        )

        return false

    }


    /* Customer phone */

    if (
        !form.value.customer_phone.trim()
    ) {

        alert(
            'Please enter your phone number.'
        )

        return false

    }


    /* Sender name */

    if (
        !form.value.sender_name.trim()
    ) {

        alert(
            'Please enter the sender account name.'
        )

        return false

    }


    /* Sender bank */

    if (
        !form.value.sender_bank.trim()
    ) {

        alert(
            'Please enter the sender bank.'
        )

        return false

    }


    /* Sender account */

    if (
        !form.value.sender_account_number.trim()
    ) {

        alert(
            'Please enter the sender account number.'
        )

        return false

    }


    /* Payment proof */

    if (!proofFile.value) {

        alert(
            'Please upload your payment proof.'
        )

        return false

    }


    return true

}


/* =========================
   SUBMIT ORDER
========================= */

const submitOrder = async () => {

    /* =========================
       VALIDATE
    ========================= */

    if (!validateForm()) {
        return
    }


    submitting.value = true
    error.value = ''


    try {

        /* =========================
           GET AUTHENTICATED USER
        ========================= */

        const {
            data: {
                user
            }
        } = await supabase.auth.getUser()


        if (!user) {

            throw new Error(
                'Please log in before placing an order.'
            )

        }


        /* =========================
           CHECK PRODUCT
        ========================= */

        if (!product.value) {

            throw new Error(
                'Product information is missing.'
            )

        }


        /* =========================
           CHECK PAYMENT PROOF
        ========================= */

        if (!proofFile.value) {

            throw new Error(
                'Payment proof is required.'
            )

        }


        /* =========================
           FILE EXTENSION
        ========================= */

        const fileExtension =
            proofFile.value.name
                .split('.')
                .pop()
                .toLowerCase()


        /* =========================
           STORAGE PATH
        ========================= */

        const fileName =
            `${user.id}/${Date.now()}-${crypto.randomUUID()}.${fileExtension}`


        /* =========================
           UPLOAD PAYMENT PROOF
        ========================= */

        const {
            error: uploadError
        } = await supabase.storage
            .from('payment-proofs')
            .upload(
                fileName,
                proofFile.value,
                {
                    cacheControl: '3600',
                    upsert: false,
                    contentType:
                        proofFile.value.type
                }
            )


        if (uploadError) {

            console.error(
                'Payment proof upload error:',
                uploadError
            )

            throw new Error(
                `Unable to upload payment proof: ${uploadError.message}`
            )

        }


        /* =========================
           GENERATE ORDER NUMBER
        ========================= */

        const orderNumber =
            generateOrderNumber()


        /* =========================
           CREATE ORDER
        ========================= */

        const {
            data: order,
            error: orderError
        } = await supabase
            .from('orders')
            .insert({

                /* Customer */

                customer_id:
                    user.id,

                customer_name:
                    form.value.customer_name.trim(),

                customer_email:
                    form.value.customer_email.trim(),

                customer_phone:
                    form.value.customer_phone.trim(),


                /* Product */

                product_id:
                    product.value.id,


                /* Amount */

                amount:
                    Number(
                        product.value.price
                    ),


                /* Payment */

                payment_method:
                    'bank_transfer',

                payment_reference:
                    form.value.payment_reference.trim()
                    || null,

                payment_proof:
                    fileName,

                payment_status:
                    'pending',


                /* Order */

                status:
                    'pending',

                delivery_method:
                    'manual',

                fulfillment_status:
                    'pending',


                /* Sender */

                sender_name:
                    form.value.sender_name.trim(),

                sender_bank:
                    form.value.sender_bank.trim(),

                sender_account_number:
                    form.value.sender_account_number.trim(),


                /* Order number */

                order_number:
                    orderNumber

            })
            .select()
            .single()


        if (orderError) {

            console.error(
                'Order creation error:',
                orderError
            )

            throw orderError

        }


        /* =================================================
           ORDER CREATED
           
           NOW SEND ADMIN NOTIFICATION
           
           Telegram + Email are handled by:
           
           send-admin-notification
        ================================================= */

        console.log(
            'Order created successfully:',
            order
        )


        /* =========================
           SEND ADMIN NOTIFICATION
        ========================= */

        try {

            const {
                data: notificationData,
                error: notificationError
            } = await supabase.functions.invoke(
                'send-admin-notification',
                {
                    body: {

                        customer_name:
                            form.value.customer_name.trim(),

                        product_name:
                            product.value.name,

                        amount:
                            Number(
                                product.value.price
                            ),

                        order_id:
                            order.order_number

                    }
                }
            )


            /* =========================
               NOTIFICATION ERROR
            ========================= */

            if (notificationError) {

                console.error(
                    'Admin notification error:',
                    notificationError
                )

            } else {

                console.log(
                    'Admin notification sent:',
                    notificationData
                )

            }

        } catch (notificationError) {

            /*
             * IMPORTANT:
             *
             * Notification failure should NOT
             * cancel an already-created order.
             */

            console.error(
                'Unable to send admin notification:',
                notificationError
            )

        }


        /* =========================
           SUCCESS
        ========================= */

        router.push({

            name: 'OrderSuccess',

            query: {
                order:
                    order.order_number
            }

        })


    } catch (err) {

        console.error(
            'Checkout submission error:',
            err
        )


        error.value =
            err?.message ||
            'Something went wrong while submitting your order.'


        /* =========================
           SCROLL TO ERROR
        ========================= */

        window.scrollTo({

            top: 0,

            behavior: 'smooth'

        })

    } finally {

        submitting.value = false

    }

}


/* =========================
   CURRENCY
========================= */

const formatCurrency = (amount) => {

    const currency =
        settings.value.currency ||
        'NGN'


    return new Intl.NumberFormat(
        'en-NG',
        {
            style: 'currency',
            currency
        }
    ).format(
        Number(amount || 0)
    )

}


/* =========================
   CLEANUP PREVIEW
========================= */

const cleanupPreview = () => {

    if (proofPreview.value) {

        URL.revokeObjectURL(
            proofPreview.value
        )

        proofPreview.value = null

    }

}


/* =========================
   INITIALIZE
========================= */

onMounted(() => {

    loadCheckout()

})

</script>

<style scoped>
.checkout-page {
    min-height: 100vh;
    background: #f7f7f7;
    color: #171717;
}

.container {
    max-width: 1180px;
    margin: 0 auto;
}


/* HEADER */

.checkout-header {
    max-width: 700px;
}

.checkout-label {
    display: inline-block;
    margin-bottom: 12px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1.5px;
    color: #777;
}

.checkout-header h1 {
    margin: 0 0 12px;
    font-size: 38px;
    font-weight: 700;
    letter-spacing: -1px;
}

.checkout-header p {
    margin: 0;
    color: #777;
    font-size: 15px;
}


/* GRID */

.checkout-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 350px;
    gap: 28px;
    align-items: start;
}


/* CARDS */

.checkout-card,
.summary-card,
.notice-card {
    background: #fff;
    border: 1px solid #e7e7e7;
}

.checkout-card {
    padding: 28px;
    margin-bottom: 20px;
}


/* CARD HEADING */

.card-heading {
    display: flex;
    gap: 15px;
    align-items: flex-start;
    margin-bottom: 25px;
}

.step-number {
    width: 36px;
    height: 36px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #111;
    color: #fff;
    font-size: 11px;
    font-weight: 700;
}

.card-heading h3 {
    margin: 0 0 5px;
    font-size: 17px;
}

.card-heading p {
    margin: 0;
    color: #888;
    font-size: 13px;
}


/* FORM */

.form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;
}

.form-group {
    display: flex;
    flex-direction: column;
}

.full-width {
    grid-column: 1 / -1;
}

.form-group label {
    margin-bottom: 8px;
    font-size: 13px;
    font-weight: 600;
}

.form-group input {
    width: 100%;
    height: 48px;
    padding: 0 14px;
    border: 1px solid #ddd;
    outline: none;
    background: #fff;
    color: #171717;
    font-size: 14px;
    transition: border-color .2s ease;
}

.form-group input:focus {
    border-color: #111;
}

.form-group small {
    margin-top: 7px;
    color: #999;
    font-size: 11px;
}


/* BANK */

.bank-box {
    border: 1px solid #ddd;
    padding: 22px;
}

.bank-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 18px;
    border-bottom: 1px solid #eee;
}

.bank-label,
.summary-label {
    display: block;
    margin-bottom: 7px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 1.2px;
    color: #999;
}

.bank-top h4 {
    margin: 0;
    font-size: 18px;
}

.bank-top i {
    font-size: 25px;
}

.bank-details {
    padding: 18px 0;
}

.bank-detail {
    margin-bottom: 18px;
}

.bank-detail:last-child {
    margin-bottom: 0;
}

.bank-detail span {
    display: block;
    margin-bottom: 6px;
    color: #888;
    font-size: 12px;
}

.bank-detail strong {
    font-size: 15px;
}

.account-number {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
}

.account-number button {
    border: 1px solid #ddd;
    background: #fff;
    padding: 8px 12px;
    cursor: pointer;
    font-size: 12px;
}

.payment-instructions {
    display: flex;
    gap: 10px;
    padding-top: 17px;
    border-top: 1px solid #eee;
}

.payment-instructions i {
    margin-top: 2px;
}

.payment-instructions p {
    margin: 0;
    color: #666;
    font-size: 12px;
    line-height: 1.6;
}


/* AMOUNT */

.amount-to-pay {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #eee;
}

.amount-to-pay span {
    color: #777;
    font-size: 13px;
}

.amount-to-pay strong {
    font-size: 21px;
}


/* UPLOAD */

.upload-box {
    display: block;
    min-height: 170px;
    border: 1px dashed #ccc;
    cursor: pointer;
    transition: border-color .2s ease;
}

.upload-box:hover {
    border-color: #111;
}

.upload-box input {
    display: none;
}

.upload-content {
    min-height: 170px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 25px;
}

.upload-icon {
    width: 45px;
    height: 45px;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f2f2f2;
    font-size: 20px;
}

.upload-content strong {
    margin-bottom: 5px;
    font-size: 14px;
}

.upload-content span {
    color: #999;
    font-size: 11px;
}

.preview-content {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px;
}

.preview-content img {
    width: 100px;
    height: 100px;
    object-fit: cover;
}

.preview-info {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.preview-info strong {
    font-size: 13px;
    word-break: break-all;
}

.preview-info span {
    color: #999;
    font-size: 11px;
}


/* SUBMIT */

.submit-button {
    width: 100%;
    height: 54px;
    border: none;
    background: #111;
    color: #fff;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    transition: background .2s ease;
}

.submit-button:hover {
    background: #292929;
}

.submit-button:disabled {
    opacity: .6;
    cursor: not-allowed;
}


/* SIDEBAR */

.checkout-sidebar {
    position: sticky;
    top: 25px;
}

.summary-card {
    padding: 24px;
}

.product-summary {
    display: flex;
    gap: 14px;
    padding: 18px 0;
    border-bottom: 1px solid #eee;
}

.product-image {
    width: 65px;
    height: 65px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f3f3f3;
    overflow: hidden;
}

.product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.product-image i {
    font-size: 22px;
    color: #999;
}

.product-info {
    min-width: 0;
}

.product-info h3 {
    margin: 0 0 5px;
    font-size: 14px;
}

.product-info span,
.product-info small {
    display: block;
    color: #888;
    font-size: 11px;
}

.product-info small {
    margin-top: 4px;
}


/* SUMMARY */

.summary-line {
    display: flex;
    justify-content: space-between;
    gap: 15px;
    padding: 15px 0;
    border-bottom: 1px solid #eee;
}

.summary-line span {
    color: #777;
    font-size: 12px;
}

.summary-line strong {
    font-size: 12px;
    text-align: right;
}

.summary-total {
    display: flex;
    justify-content: space-between;
    padding-top: 20px;
}

.summary-total span {
    font-size: 14px;
    font-weight: 600;
}

.summary-total strong {
    font-size: 20px;
}


/* NOTICE */

.notice-card {
    display: flex;
    gap: 12px;
    padding: 18px;
    margin-top: 15px;
}

.notice-card>i {
    font-size: 19px;
}

.notice-card strong {
    display: block;
    margin-bottom: 5px;
    font-size: 13px;
}

.notice-card p {
    margin: 0;
    color: #777;
    font-size: 11px;
    line-height: 1.5;
}


/* STATES */

.loading-state {
    min-height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #777;
}

.spinner {
    width: 28px;
    height: 28px;
    margin-bottom: 12px;
    border: 2px solid #ddd;
    border-top-color: #111;
    border-radius: 50%;
    animation: spin .7s linear infinite;
}

.error-box {
    display: flex;
    gap: 10px;
    align-items: center;
    padding: 18px;
    border: 1px solid #ddd;
    background: #fff;
    color: #555;
}

.spin {
    display: inline-block;
    animation: spin .8s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}


/* RESPONSIVE */

@media (max-width: 900px) {

    .checkout-grid {
        grid-template-columns: 1fr;
    }

    .checkout-sidebar {
        position: static;
        order: -1;
    }

}


@media (max-width: 600px) {

    .checkout-header h1 {
        font-size: 30px;
    }

    .checkout-card {
        padding: 20px;
    }

    .form-grid {
        grid-template-columns: 1fr;
    }

    .full-width {
        grid-column: auto;
    }

    .account-number {
        align-items: flex-start;
        flex-direction: column;
    }

}
</style>