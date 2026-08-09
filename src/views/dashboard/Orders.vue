<template>
    <div class="orders-page">

        <!-- Header -->
        <section class="page-header">

            <div>
                <span class="eyebrow">Purchase history</span>

                <h1>Orders</h1>

                <p>
                    View and track all your CupidSubs purchases.
                </p>
            </div>

            <button class="shop-button" @click="goToMarketplace">
                Browse subscriptions
                <i class="bi bi-arrow-up-right"></i>
            </button>

        </section>


        <!-- Loading -->
        <div v-if="loading" class="loading-state">
            <div class="loading-spinner"></div>

            <p>
                Loading your orders...
            </p>
        </div>


        <template v-else>

            <!-- Toolbar -->
            <section class="orders-toolbar">

                <div class="order-count">
                    <strong>{{ filteredOrders.length }}</strong>

                    <span>
                        {{ filteredOrders.length === 1 ? 'order' : 'orders' }}
                    </span>
                </div>


                <div class="toolbar-right">

                    <!-- Search -->
                    <div class="search-box">

                        <i class="bi bi-search"></i>

                        <input v-model="searchQuery" type="text" placeholder="Search orders..." />

                    </div>


                    <!-- Filter -->
                    <select v-model="statusFilter">

                        <option value="all">
                            All statuses
                        </option>

                        <option value="pending">
                            Pending
                        </option>

                        <option value="processing">
                            Processing
                        </option>

                        <option value="completed">
                            Completed
                        </option>

                        <option value="cancelled">
                            Cancelled
                        </option>

                    </select>

                </div>

            </section>


            <!-- Empty -->
            <section v-if="filteredOrders.length === 0" class="empty-state">

                <div class="empty-icon">
                    <i class="bi bi-receipt"></i>
                </div>

                <h2>
                    {{ orders.length === 0
                        ? 'No orders yet'
                        : 'No orders found'
                    }}
                </h2>

                <p>
                    {{
                        orders.length === 0
                            ? 'Your purchases will appear here after you place an order.'
                            : 'Try changing your search or filter.'
                    }}
                </p>

                <button v-if="orders.length === 0" @click="goToMarketplace">
                    Explore subscriptions
                    <i class="bi bi-arrow-right"></i>
                </button>

            </section>


            <!-- Orders -->
            <section v-else class="orders-card">

                <!-- Desktop heading -->
                <div class="table-header">

                    <span>Order</span>
                    <span>Product</span>
                    <span>Amount</span>
                    <span>Status</span>
                    <span>Date</span>
                    <span></span>

                </div>


                <div v-for="order in filteredOrders" :key="order.id" class="order-row" @click="openOrder(order)">

                    <!-- Order -->
                    <div class="order-number">

                        <strong>
                            #{{ getOrderNumber(order) }}
                        </strong>

                        <span>
                            {{ getDeliveryMethod(order) }}
                        </span>

                    </div>


                    <!-- Product -->
                    <div class="product-cell">

                        <div class="product-icon">
                            <i class="bi bi-box"></i>
                        </div>

                        <div>
                            <strong>
                                {{ getProductName(order) }}
                            </strong>

                            <span>
                                {{ getProductDuration(order) }}
                            </span>
                        </div>

                    </div>


                    <!-- Amount -->
                    <div class="amount-cell">

                        ₦{{ formatMoney(order.amount) }}

                    </div>


                    <!-- Status -->
                    <div>

                        <span class="status-badge" :class="getStatusClass(order)">
                            {{ getStatusText(order) }}
                        </span>

                    </div>


                    <!-- Date -->
                    <div class="date-cell">

                        {{ formatDate(order.created_at) }}

                    </div>


                    <!-- Arrow -->
                    <div class="row-arrow">

                        <i class="bi bi-chevron-right"></i>

                    </div>

                </div>

            </section>

        </template>


        <!-- Error -->
        <div v-if="error" class="error-message">
            <i class="bi bi-exclamation-circle"></i>

            {{ error }}

            <button @click="loadOrders">
                Retry
            </button>
        </div>


        <!-- Order modal -->
        <div v-if="selectedOrder" class="modal-backdrop" @click.self="closeOrder">

            <div class="order-modal">

                <div class="modal-header">

                    <div>
                        <span class="eyebrow">
                            Order details
                        </span>

                        <h2>
                            #{{ getOrderNumber(selectedOrder) }}
                        </h2>
                    </div>

                    <button class="close-button" @click="closeOrder">
                        <i class="bi bi-x-lg"></i>
                    </button>

                </div>


                <div class="modal-body">

                    <!-- Product -->
                    <div class="detail-product">

                        <div class="large-product-icon">
                            <i class="bi bi-box"></i>
                        </div>

                        <div>

                            <h3>
                                {{ getProductName(selectedOrder) }}
                            </h3>

                            <p>
                                {{ getProductDuration(selectedOrder) }}
                            </p>

                        </div>

                    </div>


                    <!-- Status -->
                    <div class="detail-status">

                        <span>
                            Order status
                        </span>

                        <strong :class="getStatusClass(selectedOrder)">
                            {{ getStatusText(selectedOrder) }}
                        </strong>

                    </div>


                    <!-- Details -->
                    <div class="details-grid">

                        <div class="detail-item">

                            <span>Amount</span>

                            <strong>
                                ₦{{ formatMoney(selectedOrder.amount) }}
                            </strong>

                        </div>


                        <div class="detail-item">

                            <span>Payment</span>

                            <strong>
                                {{ getPaymentStatus(selectedOrder) }}
                            </strong>

                        </div>


                        <div class="detail-item">

                            <span>Delivery</span>

                            <strong>
                                {{ getDeliveryMethod(selectedOrder) }}
                            </strong>

                        </div>


                        <div class="detail-item">

                            <span>Date</span>

                            <strong>
                                {{ formatDate(selectedOrder.created_at) }}
                            </strong>

                        </div>

                    </div>


                    <!-- Reference -->
                    <div v-if="selectedOrder.payment_reference" class="reference-box">

                        <span>
                            Payment reference
                        </span>

                        <strong>
                            {{ selectedOrder.payment_reference }}
                        </strong>

                    </div>


                    <!-- Customer -->
                    <div class="customer-section">

                        <span class="section-label">
                            Customer information
                        </span>

                        <div class="customer-details">

                            <div>
                                <span>Name</span>

                                <strong>
                                    {{ selectedOrder.customer_name || '-' }}
                                </strong>
                            </div>

                            <div>
                                <span>Email</span>

                                <strong>
                                    {{ selectedOrder.customer_email || '-' }}
                                </strong>
                            </div>

                            <div>
                                <span>Phone</span>

                                <strong>
                                    {{ selectedOrder.customer_phone || '-' }}
                                </strong>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>
</template>


<script setup>

import {
    ref,
    computed,
    onMounted
} from 'vue'

import {
    useRouter
} from 'vue-router'

import {
    supabase
} from '../../lib/supabase'


const router = useRouter()


/* --------------------------------
   STATE
-------------------------------- */

const loading = ref(true)

const error = ref('')

const user = ref(null)

const orders = ref([])

const products = ref([])

const searchQuery = ref('')

const statusFilter = ref('all')

const selectedOrder = ref(null)


/* --------------------------------
   FILTERED ORDERS
-------------------------------- */

const filteredOrders = computed(() => {

    let result = [...orders.value]


    if (statusFilter.value !== 'all') {

        result = result.filter(order => {

            const status = getRawStatus(order)

            if (statusFilter.value === 'completed') {

                return [
                    'completed',
                    'fulfilled',
                    'active'
                ].includes(status)

            }

            if (statusFilter.value === 'processing') {

                return [
                    'processing',
                    'paid'
                ].includes(status)

            }

            return status === statusFilter.value

        })

    }


    if (searchQuery.value.trim()) {

        const query =
            searchQuery.value
                .trim()
                .toLowerCase()

        result = result.filter(order => {

            const productName =
                getProductName(order).toLowerCase()

            const orderNumber =
                getOrderNumber(order).toLowerCase()

            return (
                productName.includes(query) ||
                orderNumber.includes(query)
            )

        })

    }


    return result

})


/* --------------------------------
   USER
-------------------------------- */

async function loadUser() {

    const {
        data,
        error: authError
    } = await supabase.auth.getUser()


    if (authError) {

        throw authError

    }


    user.value = data.user


    if (!user.value) {

        router.push({ name: 'login' })

        return false

    }


    return true

}


/* --------------------------------
   ORDERS
-------------------------------- */

async function loadOrders() {

    loading.value = true

    error.value = ''


    try {

        const loggedIn = await loadUser()

        if (!loggedIn) return


        const {
            data,
            error: ordersError
        } = await supabase
            .from('orders')
            .select('*')
            .eq('customer_id', user.value.id)
            .order('created_at', {
                ascending: false
            })


        if (ordersError) {

            throw ordersError

        }


        orders.value = data || []


        await loadProducts()

    } catch (err) {

        console.error(
            'Orders error:',
            err
        )

        error.value =
            'Unable to load your orders. Please try again.'

    } finally {

        loading.value = false

    }

}


/* --------------------------------
   PRODUCTS
-------------------------------- */

async function loadProducts() {

    const productIds = [
        ...new Set(
            orders.value
                .map(order => order.product_id)
                .filter(Boolean)
        )
    ]


    if (!productIds.length) {

        products.value = []

        return

    }


    const {
        data,
        error: productsError
    } = await supabase
        .from('products')
        .select(`
            id,
            name,
            duration,
            image,
            image_url
        `)
        .in('id', productIds)


    if (productsError) {

        console.warn(
            'Products could not be loaded:',
            productsError.message
        )

        return

    }


    products.value = data || []

}


/* --------------------------------
   PRODUCT HELPERS
-------------------------------- */

function getProduct(order) {

    return products.value.find(
        product => product.id === order.product_id
    )

}


function getProductName(order) {

    return getProduct(order)?.name || 'Subscription'

}


function getProductDuration(order) {

    return getProduct(order)?.duration || 'Subscription'

}


/* --------------------------------
   STATUS
-------------------------------- */

function getRawStatus(order) {

    return String(
        order.status ||
        order.fulfillment_status ||
        'pending'
    ).toLowerCase()

}


function getStatusText(order) {

    const status = getRawStatus(order)


    if (
        [
            'completed',
            'fulfilled',
            'active'
        ].includes(status)
    ) {

        return 'Completed'

    }


    if (
        [
            'processing',
            'paid'
        ].includes(status)
    ) {

        return 'Processing'

    }


    if (status === 'cancelled') {

        return 'Cancelled'

    }


    return 'Pending'

}


function getStatusClass(order) {

    const status = getRawStatus(order)


    if (
        [
            'completed',
            'fulfilled',
            'active'
        ].includes(status)
    ) {

        return 'status-success'

    }


    if (
        [
            'processing',
            'paid'
        ].includes(status)
    ) {

        return 'status-processing'

    }


    if (status === 'cancelled') {

        return 'status-danger'

    }


    return 'status-pending'

}


function getPaymentStatus(order) {

    const status =
        String(
            order.payment_status || ''
        ).toLowerCase()


    if (status === 'paid') {

        return 'Paid'

    }

    if (status === 'failed') {

        return 'Failed'

    }

    if (status === 'pending') {

        return 'Pending'

    }

    return order.payment_status || 'Pending'

}


/* --------------------------------
   ORDER HELPERS
-------------------------------- */

function getOrderNumber(order) {

    return (
        order.order_number ||
        String(order.id).slice(0, 8)
    )

}


function getDeliveryMethod(order) {

    if (!order.delivery_method) {

        return 'Automatic'

    }


    return String(
        order.delivery_method
    )
        .replace(/_/g, ' ')
        .replace(/\b\w/g, char => char.toUpperCase())

}


/* --------------------------------
   FORMATTING
-------------------------------- */

function formatMoney(value) {

    return new Intl.NumberFormat(
        'en-NG',
        {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        }
    ).format(
        Number(value) || 0
    )

}


function formatDate(date) {

    if (!date) return '-'


    return new Intl.DateTimeFormat(
        'en-NG',
        {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        }
    ).format(
        new Date(date)
    )

}


/* --------------------------------
   MODAL
-------------------------------- */

function openOrder(order) {

    selectedOrder.value = order

}


function closeOrder() {

    selectedOrder.value = null

}


/* --------------------------------
   NAVIGATION
-------------------------------- */

function goToMarketplace() {

    router.push({
        name: 'marketplace'
    })

}


/* --------------------------------
   INIT
-------------------------------- */

onMounted(() => {

    loadOrders()

})

</script>


<style scoped>
.orders-page {
    width: 100%;
    max-width: 1500px;
    margin: 0 auto;
    padding: 36px 40px 60px;
}


/* =========================================
   HEADER
========================================= */

.page-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 30px;
    margin-bottom: 30px;
}

.eyebrow {
    display: block;
    margin-bottom: 8px;
    color: #8a8a8a;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: .12em;
    text-transform: uppercase;
}

.page-header h1 {
    margin: 0;
    color: #151515;
    font-size: clamp(30px, 3vw, 42px);
    font-weight: 700;
    letter-spacing: -.04em;
}

.page-header p {
    margin: 10px 0 0;
    color: #777;
    font-size: 14px;
}

.shop-button {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 13px 18px;
    border: 1px solid #171717;
    border-radius: 8px;
    background: #171717;
    color: #fff;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: .2s ease;
}

.shop-button:hover {
    background: #333;
}


/* =========================================
   TOOLBAR
========================================= */

.orders-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 14px;
}

.order-count {
    display: flex;
    align-items: baseline;
    gap: 5px;
    color: #999;
    font-size: 12px;
}

.order-count strong {
    color: #222;
    font-size: 14px;
}

.toolbar-right {
    display: flex;
    align-items: center;
    gap: 10px;
}

.search-box {
    display: flex;
    align-items: center;
    gap: 9px;
    width: 230px;
    height: 36px;
    padding: 0 12px;
    border: 1px solid #e4e4e4;
    border-radius: 7px;
    background: #fff;
}

.search-box i {
    color: #aaa;
    font-size: 12px;
}

.search-box input {
    width: 100%;
    border: 0;
    outline: 0;
    background: transparent;
    color: #222;
    font-size: 11px;
}

.toolbar-right select {
    height: 36px;
    padding: 0 11px;
    border: 1px solid #e4e4e4;
    border-radius: 7px;
    outline: 0;
    background: #fff;
    color: #444;
    font-size: 11px;
}


/* =========================================
   TABLE
========================================= */

.orders-card {
    overflow: hidden;
    border: 1px solid #e8e8e8;
    border-radius: 10px;
    background: #fff;
}

.table-header,
.order-row {
    display: grid;
    grid-template-columns:
        150px minmax(180px, 1fr) 110px 115px 110px 35px;
    align-items: center;
    gap: 18px;
}

.table-header {
    min-height: 48px;
    padding: 0 22px;
    border-bottom: 1px solid #ededed;
    color: #999;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: .04em;
    text-transform: uppercase;
}

.order-row {
    min-height: 76px;
    padding: 12px 22px;
    border-bottom: 1px solid #f0f0f0;
    cursor: pointer;
    transition: background .15s ease;
}

.order-row:last-child {
    border-bottom: 0;
}

.order-row:hover {
    background: #fafafa;
}


/* =========================================
   ORDER CELLS
========================================= */

.order-number {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.order-number strong {
    color: #222;
    font-size: 11px;
}

.order-number span {
    color: #aaa;
    font-size: 9px;
}

.product-cell {
    display: flex;
    align-items: center;
    gap: 11px;
    min-width: 0;
}

.product-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    border: 1px solid #e7e7e7;
    border-radius: 7px;
    color: #555;
    font-size: 13px;
}

.product-cell>div:last-child {
    min-width: 0;
}

.product-cell strong {
    display: block;
    overflow: hidden;
    color: #222;
    font-size: 11px;
    font-weight: 600;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.product-cell span {
    display: block;
    margin-top: 4px;
    color: #999;
    font-size: 9px;
}

.amount-cell {
    color: #222;
    font-size: 11px;
    font-weight: 600;
}

.date-cell {
    color: #999;
    font-size: 10px;
}

.row-arrow {
    color: #aaa;
    font-size: 10px;
}


/* =========================================
   STATUS
========================================= */

.status-badge {
    display: inline-flex;
    width: fit-content;
    padding: 5px 9px;
    border-radius: 20px;
    font-size: 9px;
    font-weight: 600;
}

.status-success {
    background: #edf8f0;
    color: #27753e;
}

.status-processing {
    background: #f3f4f5;
    color: #555;
}

.status-pending {
    background: #fff7e7;
    color: #936a16;
}

.status-danger {
    background: #fff0f0;
    color: #a33b3b;
}


/* =========================================
   EMPTY
========================================= */

.empty-state {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 80px 25px;
    border: 1px solid #e8e8e8;
    border-radius: 10px;
    background: #fff;
    text-align: center;
}

.empty-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 54px;
    height: 54px;
    margin-bottom: 16px;
    border-radius: 50%;
    background: #f5f5f5;
    color: #777;
}

.empty-state h2 {
    margin: 0;
    color: #222;
    font-size: 15px;
}

.empty-state p {
    max-width: 360px;
    margin: 8px 0 20px;
    color: #999;
    font-size: 11px;
    line-height: 1.6;
}

.empty-state button {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    border: 1px solid #ddd;
    border-radius: 7px;
    background: #fff;
    color: #333;
    font-size: 11px;
    font-weight: 600;
    cursor: pointer;
}


/* =========================================
   LOADING
========================================= */

.loading-state {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-height: 400px;
    color: #999;
}

.loading-state p {
    margin-top: 14px;
    font-size: 12px;
}

.loading-spinner {
    width: 28px;
    height: 28px;
    border: 2px solid #e8e8e8;
    border-top-color: #222;
    border-radius: 50%;
    animation: spin .8s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}


/* =========================================
   ERROR
========================================= */

.error-message {
    display: flex;
    align-items: center;
    gap: 9px;
    margin-top: 18px;
    padding: 13px 15px;
    border: 1px solid #f0d6d6;
    border-radius: 8px;
    background: #fff8f8;
    color: #a33b3b;
    font-size: 11px;
}

.error-message button {
    margin-left: auto;
    border: 0;
    background: transparent;
    color: #222;
    font-size: 11px;
    font-weight: 600;
    text-decoration: underline;
    cursor: pointer;
}


/* =========================================
   MODAL
========================================= */

.modal-backdrop {
    position: fixed;
    z-index: 1000;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 25px;
    background: rgba(0, 0, 0, .45);
}

.order-modal {
    width: min(560px, 100%);
    max-height: 90vh;
    overflow-y: auto;
    border-radius: 12px;
    background: #fff;
}

.modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 22px 24px;
    border-bottom: 1px solid #eee;
}

.modal-header h2 {
    margin: 0;
    color: #171717;
    font-size: 20px;
}

.close-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: 1px solid #e5e5e5;
    border-radius: 7px;
    background: #fff;
    color: #555;
    cursor: pointer;
}

.modal-body {
    padding: 24px;
}


/* =========================================
   MODAL CONTENT
========================================= */

.detail-product {
    display: flex;
    align-items: center;
    gap: 13px;
    padding-bottom: 22px;
    border-bottom: 1px solid #eee;
}

.large-product-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 9px;
    background: #f5f5f5;
    color: #555;
}

.detail-product h3 {
    margin: 0;
    color: #222;
    font-size: 14px;
}

.detail-product p {
    margin: 5px 0 0;
    color: #999;
    font-size: 10px;
}

.detail-status {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 0;
}

.detail-status span {
    color: #888;
    font-size: 11px;
}

.detail-status strong {
    font-size: 10px;
}

.details-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px;
    overflow: hidden;
    border: 1px solid #eee;
    border-radius: 8px;
    background: #eee;
}

.detail-item {
    padding: 14px;
    background: #fff;
}

.detail-item span {
    display: block;
    margin-bottom: 6px;
    color: #999;
    font-size: 9px;
}

.detail-item strong {
    color: #222;
    font-size: 11px;
}

.reference-box {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-top: 16px;
    padding: 13px;
    border: 1px solid #eee;
    border-radius: 8px;
    background: #fafafa;
}

.reference-box span {
    color: #999;
    font-size: 9px;
}

.reference-box strong {
    overflow-wrap: anywhere;
    color: #333;
    font-size: 10px;
    font-weight: 600;
}

.customer-section {
    margin-top: 22px;
}

.section-label {
    display: block;
    margin-bottom: 12px;
    color: #777;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .08em;
}

.customer-details {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.customer-details>div {
    display: flex;
    justify-content: space-between;
    gap: 20px;
}

.customer-details span {
    color: #999;
    font-size: 10px;
}

.customer-details strong {
    color: #333;
    font-size: 10px;
    text-align: right;
}


/* =========================================
   RESPONSIVE
========================================= */

@media (max-width: 900px) {

    .orders-page {
        padding: 28px 20px 50px;
    }

    .table-header {
        display: none;
    }

    .order-row {
        grid-template-columns: 1fr auto;
        gap: 12px;
        padding: 17px;
    }

    .product-cell {
        grid-column: 1 / -1;
        grid-row: 1;
    }

    .order-number {
        grid-column: 1;
        grid-row: 2;
    }

    .amount-cell {
        grid-column: 2;
        grid-row: 2;
        text-align: right;
    }

    .order-row>div:nth-child(4) {
        grid-column: 1;
        grid-row: 3;
    }

    .date-cell {
        grid-column: 2;
        grid-row: 3;
        text-align: right;
    }

    .row-arrow {
        display: none;
    }

}


@media (max-width: 650px) {

    .page-header {
        align-items: flex-start;
        flex-direction: column;
    }

    .shop-button {
        width: 100%;
        justify-content: center;
    }

    .orders-toolbar {
        align-items: stretch;
        flex-direction: column;
    }

    .toolbar-right {
        width: 100%;
    }

    .search-box {
        flex: 1;
        width: auto;
    }

}


@media (max-width: 480px) {

    .orders-page {
        padding: 22px 15px 40px;
    }

    .toolbar-right {
        flex-direction: column;
    }

    .search-box,
    .toolbar-right select {
        width: 100%;
    }

    .modal-backdrop {
        padding: 12px;
    }

    .modal-body {
        padding: 18px;
    }

}
</style>