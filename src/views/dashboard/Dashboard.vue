<template>
    <div class="dashboard-page">

        <!-- Header -->
        <section class="dashboard-header">

            <div>
                <span class="eyebrow">Dashboard</span>

                <h1>
                    Welcome back<span v-if="firstName">, {{ firstName }}</span>.
                </h1>

                <p>
                    Here's an overview of your subscriptions and recent activity.
                </p>
            </div>

            <button class="shop-button" @click="goToMarketplace">
                <span>Browse subscriptions</span>
                <i class="bi bi-arrow-up-right"></i>
            </button>

        </section>


        <!-- Loading -->
        <div v-if="loading" class="loading-state">
            <div class="loading-spinner"></div>
            <p>Loading your dashboard...</p>
        </div>


        <!-- Dashboard -->
        <template v-else>

            <!-- Stats -->
            <section class="stats-grid">

                <!-- Active subscriptions -->
                <div class="stat-card">

                    <div class="stat-top">
                        <span class="stat-label">
                            Active subscriptions
                        </span>

                        <div class="stat-icon">
                            <i class="bi bi-play-circle"></i>
                        </div>
                    </div>

                    <div class="stat-value">
                        {{ activeSubscriptions }}
                    </div>

                    <p class="stat-description">
                        Your currently active purchases
                    </p>

                </div>


                <!-- Total orders -->
                <div class="stat-card">

                    <div class="stat-top">
                        <span class="stat-label">
                            Total orders
                        </span>

                        <div class="stat-icon">
                            <i class="bi bi-bag"></i>
                        </div>
                    </div>

                    <div class="stat-value">
                        {{ totalOrders }}
                    </div>

                    <p class="stat-description">
                        Orders placed on CupidSubs
                    </p>

                </div>


                <!-- Pending orders -->
                <div class="stat-card">

                    <div class="stat-top">
                        <span class="stat-label">
                            Pending orders
                        </span>

                        <div class="stat-icon">
                            <i class="bi bi-clock"></i>
                        </div>
                    </div>

                    <div class="stat-value">
                        {{ pendingOrders }}
                    </div>

                    <p class="stat-description">
                        Orders currently being processed
                    </p>

                </div>


                <!-- Total spent -->
                <div class="stat-card">

                    <div class="stat-top">
                        <span class="stat-label">
                            Total spent
                        </span>

                        <div class="stat-icon">
                            <i class="bi bi-wallet2"></i>
                        </div>
                    </div>

                    <div class="stat-value money">
                        ₦{{ formatMoney(totalSpent) }}
                    </div>

                    <p class="stat-description">
                        Total value of your orders
                    </p>

                </div>

            </section>


            <!-- Main content -->
            <section class="dashboard-content">

                <!-- Recent orders -->
                <div class="content-card orders-card">

                    <div class="card-header">

                        <div>
                            <span class="card-eyebrow">
                                Activity
                            </span>

                            <h2>Recent orders</h2>
                        </div>

                        <button class="view-button" @click="goToOrders">
                            View all
                            <i class="bi bi-arrow-right"></i>
                        </button>

                    </div>


                    <!-- Empty -->
                    <div v-if="recentOrders.length === 0" class="empty-state">
                        <div class="empty-icon">
                            <i class="bi bi-bag"></i>
                        </div>

                        <h3>No orders yet</h3>

                        <p>
                            Your recent purchases will appear here.
                        </p>

                        <button class="empty-button" @click="goToMarketplace">
                            Explore subscriptions
                        </button>
                    </div>


                    <!-- Orders -->
                    <div v-else class="orders-list">

                        <div v-for="order in recentOrders" :key="order.id" class="order-row">

                            <div class="order-product">

                                <div class="product-icon">
                                    <i class="bi bi-box"></i>
                                </div>

                                <div>
                                    <h3>
                                        {{ order.productName }}
                                    </h3>

                                    <span>
                                        #{{ getOrderNumber(order) }}
                                    </span>
                                </div>

                            </div>


                            <div class="order-price">
                                ₦{{ formatMoney(order.amount) }}
                            </div>


                            <div class="status-badge" :class="getStatusClass(order)">
                                {{ getStatusText(order) }}
                            </div>


                            <div class="order-date">
                                {{ formatDate(order.created_at) }}
                            </div>

                        </div>

                    </div>

                </div>


                <!-- Right column -->
                <div class="side-column">

                    <!-- Active subscriptions -->
                    <div class="content-card subscription-card">

                        <div class="card-header">

                            <div>
                                <span class="card-eyebrow">
                                    Your services
                                </span>

                                <h2>Subscriptions</h2>
                            </div>

                            <button class="icon-button" @click="goToSubscriptions" title="View subscriptions">
                                <i class="bi bi-arrow-up-right"></i>
                            </button>

                        </div>


                        <div v-if="activeSubscriptionItems.length === 0" class="small-empty">
                            <i class="bi bi-collection"></i>

                            <p>
                                You don't have any active subscriptions yet.
                            </p>

                            <button @click="goToMarketplace">
                                Find a subscription
                            </button>
                        </div>


                        <div v-else class="subscription-list">

                            <div v-for="subscription in activeSubscriptionItems" :key="subscription.id"
                                class="subscription-item">

                                <div class="subscription-logo">
                                    <i class="bi bi-play"></i>
                                </div>

                                <div class="subscription-info">

                                    <h3>
                                        {{ subscription.productName }}
                                    </h3>

                                    <span>
                                        {{ subscription.duration || 'Subscription' }}
                                    </span>

                                </div>

                                <span class="active-dot">
                                    Active
                                </span>

                            </div>

                        </div>

                    </div>


                    <!-- Quick actions -->
                    <div class="content-card quick-card">

                        <div class="card-header">

                            <div>
                                <span class="card-eyebrow">
                                    Quick access
                                </span>

                                <h2>Quick actions</h2>
                            </div>

                        </div>


                        <div class="quick-actions">

                            <button @click="goToMarketplace">
                                <span class="quick-icon">
                                    <i class="bi bi-grid"></i>
                                </span>

                                <span>
                                    <strong>Browse marketplace</strong>
                                    <small>Find a subscription</small>
                                </span>

                                <i class="bi bi-chevron-right"></i>
                            </button>


                            <button @click="goToOrders">
                                <span class="quick-icon">
                                    <i class="bi bi-receipt"></i>
                                </span>

                                <span>
                                    <strong>View orders</strong>
                                    <small>Check your purchases</small>
                                </span>

                                <i class="bi bi-chevron-right"></i>
                            </button>


                            <button @click="goToProfile">
                                <span class="quick-icon">
                                    <i class="bi bi-person"></i>
                                </span>

                                <span>
                                    <strong>My profile</strong>
                                    <small>Manage your account</small>
                                </span>

                                <i class="bi bi-chevron-right"></i>
                            </button>

                        </div>

                    </div>

                </div>

            </section>

        </template>


        <!-- Error -->
        <div v-if="error" class="error-message">
            <i class="bi bi-exclamation-circle"></i>
            {{ error }}
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

const profile = ref(null)

const orders = ref([])

const products = ref([])


/* --------------------------------
   USER
-------------------------------- */

const firstName = computed(() => {

    if (profile.value?.full_name) {

        return profile.value.full_name
            .trim()
            .split(' ')[0]

    }

    if (user.value?.email) {

        return user.value.email
            .split('@')[0]

    }

    return ''

})


/* --------------------------------
   ORDER STATS
-------------------------------- */

const totalOrders = computed(() => {

    return orders.value.length

})


const pendingOrders = computed(() => {

    return orders.value.filter(order => {

        const status = String(
            order.status || order.fulfillment_status || ''
        ).toLowerCase()

        return [
            'pending',
            'processing',
            'awaiting',
            'paid'
        ].includes(status)

    }).length

})


const activeSubscriptions = computed(() => {

    return orders.value.filter(order => {

        const status = String(
            order.status || order.fulfillment_status || ''
        ).toLowerCase()

        return [
            'completed',
            'fulfilled',
            'active'
        ].includes(status)

    }).length

})


const totalSpent = computed(() => {

    return orders.value.reduce((total, order) => {

        const amount = Number(order.amount || 0)

        return total + amount

    }, 0)

})


/* --------------------------------
   RECENT ORDERS
-------------------------------- */

const recentOrders = computed(() => {

    return orders.value
        .slice()
        .sort((a, b) => {

            return new Date(b.created_at) -
                new Date(a.created_at)

        })
        .slice(0, 5)
        .map(order => {

            const product = products.value.find(
                item => item.id === order.product_id
            )

            return {
                ...order,
                productName: product?.name || 'Subscription'
            }

        })

})


/* --------------------------------
   ACTIVE SUBSCRIPTIONS
-------------------------------- */

const activeSubscriptionItems = computed(() => {

    return orders.value
        .filter(order => {

            const status = String(
                order.status || order.fulfillment_status || ''
            ).toLowerCase()

            return [
                'completed',
                'fulfilled',
                'active'
            ].includes(status)

        })
        .slice(0, 4)
        .map(order => {

            const product = products.value.find(
                item => item.id === order.product_id
            )

            return {
                ...order,
                productName: product?.name || 'Subscription',
                duration: product?.duration || ''
            }

        })

})


/* --------------------------------
   LOAD USER
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

        router.push('/login')

        return false

    }


    return true

}


/* --------------------------------
   LOAD PROFILE
-------------------------------- */

async function loadProfile() {

    if (!user.value) return


    const {
        data,
        error: profileError
    } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.value.id)
        .maybeSingle()


    if (profileError) {

        console.warn(
            'Profile could not be loaded:',
            profileError.message
        )

        return

    }


    profile.value = data

}


/* --------------------------------
   LOAD ORDERS
-------------------------------- */

async function loadOrders() {

    if (!user.value) return


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

}


/* --------------------------------
   LOAD PRODUCTS
-------------------------------- */

async function loadProducts() {

    if (!orders.value.length) {

        products.value = []

        return

    }


    const productIds = [
        ...new Set(
            orders.value
                .map(order => order.product_id)
                .filter(Boolean)
        )
    ]


    if (!productIds.length) return


    const {
        data,
        error: productsError
    } = await supabase
        .from('products')
        .select(`
            id,
            name,
            duration
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
   LOAD DASHBOARD
-------------------------------- */

async function loadDashboard() {

    loading.value = true

    error.value = ''


    try {

        const loggedIn = await loadUser()

        if (!loggedIn) return


        await loadProfile()

        await loadOrders()

        await loadProducts()

    } catch (err) {

        console.error(
            'Dashboard error:',
            err
        )

        error.value =
            'Unable to load your dashboard. Please try again.'

    } finally {

        loading.value = false

    }

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
    ).format(Number(value) || 0)

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
    ).format(new Date(date))

}


function getOrderNumber(order) {

    return (
        order.order_number ||
        String(order.id).slice(0, 8)
    )

}


function getStatusText(order) {

    const status = String(
        order.status ||
        order.fulfillment_status ||
        'pending'
    ).toLowerCase()


    if (
        status === 'completed' ||
        status === 'fulfilled' ||
        status === 'active'
    ) {

        return 'Completed'

    }


    if (
        status === 'processing' ||
        status === 'paid'
    ) {

        return 'Processing'

    }


    if (status === 'cancelled') {

        return 'Cancelled'

    }


    return 'Pending'

}


function getStatusClass(order) {

    const status = String(
        order.status ||
        order.fulfillment_status ||
        'pending'
    ).toLowerCase()


    if (
        status === 'completed' ||
        status === 'fulfilled' ||
        status === 'active'
    ) {

        return 'status-success'

    }


    if (
        status === 'processing' ||
        status === 'paid'
    ) {

        return 'status-processing'

    }


    if (status === 'cancelled') {

        return 'status-danger'

    }


    return 'status-pending'

}


/* --------------------------------
   NAVIGATION
-------------------------------- */

function goToMarketplace() {

    router.push('/app/marketplace')

}


function goToOrders() {

    router.push('/app/orders')

}


function goToSubscriptions() {

    router.push('/app/subscriptions')

}


function goToProfile() {

    router.push('/dashboard/profile')

}


/* --------------------------------
   INIT
-------------------------------- */

onMounted(() => {

    loadDashboard()

})

</script>


<style scoped>
/* =========================================
   PAGE
========================================= */

.dashboard-page {
    width: 100%;
    max-width: 1500px;
    margin: 0 auto;
    padding: 36px 40px 60px;
}


/* =========================================
   HEADER
========================================= */

.dashboard-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 30px;
    margin-bottom: 34px;
}

.eyebrow,
.card-eyebrow {
    display: block;
    margin-bottom: 8px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #8a8a8a;
}

.dashboard-header h1 {
    margin: 0;
    color: #151515;
    font-size: clamp(28px, 3vw, 42px);
    font-weight: 700;
    letter-spacing: -0.04em;
}

.dashboard-header p {
    margin: 10px 0 0;
    color: #777;
    font-size: 14px;
}

.shop-button {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 13px 18px;
    border: 1px solid #171717;
    border-radius: 8px;
    background: #171717;
    color: #fff;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
}

.shop-button:hover {
    background: #333;
}

.shop-button i {
    font-size: 14px;
}


/* =========================================
   STATS
========================================= */

.stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-bottom: 24px;
}

.stat-card {
    min-height: 150px;
    padding: 22px;
    border: 1px solid #e8e8e8;
    border-radius: 10px;
    background: #fff;
}

.stat-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
}

.stat-label {
    color: #777;
    font-size: 12px;
    font-weight: 600;
}

.stat-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    border: 1px solid #ededed;
    border-radius: 8px;
    color: #333;
    font-size: 14px;
}

.stat-value {
    margin-top: 22px;
    color: #151515;
    font-size: 27px;
    font-weight: 700;
    letter-spacing: -0.03em;
}

.stat-value.money {
    font-size: 22px;
}

.stat-description {
    margin: 6px 0 0;
    color: #999;
    font-size: 11px;
}


/* =========================================
   MAIN CONTENT
========================================= */

.dashboard-content {
    display: grid;
    grid-template-columns: minmax(0, 1.65fr) minmax(320px, 0.85fr);
    gap: 24px;
}

.content-card {
    border: 1px solid #e8e8e8;
    border-radius: 10px;
    background: #fff;
}

.orders-card {
    min-width: 0;
}

.card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding: 22px 24px;
    border-bottom: 1px solid #eeeeee;
}

.card-header h2 {
    margin: 0;
    color: #171717;
    font-size: 17px;
    font-weight: 700;
    letter-spacing: -0.02em;
}

.view-button {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 7px 0;
    border: 0;
    background: transparent;
    color: #555;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
}

.view-button:hover {
    color: #111;
}


/* =========================================
   ORDERS
========================================= */

.orders-list {
    width: 100%;
}

.order-row {
    display: grid;
    grid-template-columns: minmax(200px, 1fr) 120px 110px 110px;
    align-items: center;
    gap: 15px;
    padding: 17px 24px;
    border-bottom: 1px solid #f0f0f0;
}

.order-row:last-child {
    border-bottom: 0;
}

.order-product {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
}

.product-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 38px;
    height: 38px;
    border: 1px solid #e8e8e8;
    border-radius: 8px;
    color: #555;
    font-size: 14px;
}

.order-product h3 {
    overflow: hidden;
    margin: 0 0 4px;
    color: #222;
    font-size: 13px;
    font-weight: 600;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.order-product span {
    color: #999;
    font-size: 10px;
}

.order-price {
    color: #222;
    font-size: 12px;
    font-weight: 600;
}

.order-date {
    color: #999;
    font-size: 11px;
    text-align: right;
}

.status-badge {
    width: fit-content;
    padding: 5px 9px;
    border-radius: 20px;
    font-size: 10px;
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
   SIDE COLUMN
========================================= */

.side-column {
    display: flex;
    flex-direction: column;
    gap: 24px;
}


/* =========================================
   SUBSCRIPTIONS
========================================= */

.subscription-list {
    padding: 5px 24px 10px;
}

.subscription-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 15px 0;
    border-bottom: 1px solid #f0f0f0;
}

.subscription-item:last-child {
    border-bottom: 0;
}

.subscription-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 38px;
    height: 38px;
    border-radius: 8px;
    background: #f4f4f4;
    color: #333;
}

.subscription-info {
    min-width: 0;
    flex: 1;
}

.subscription-info h3 {
    overflow: hidden;
    margin: 0 0 4px;
    color: #222;
    font-size: 12px;
    font-weight: 600;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.subscription-info span {
    color: #999;
    font-size: 10px;
}

.active-dot {
    color: #31804a;
    font-size: 10px;
    font-weight: 600;
}


/* =========================================
   EMPTY STATES
========================================= */

.empty-state {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 55px 25px;
    text-align: center;
}

.empty-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 52px;
    height: 52px;
    margin-bottom: 15px;
    border-radius: 50%;
    background: #f5f5f5;
    color: #777;
    font-size: 18px;
}

.empty-state h3 {
    margin: 0;
    color: #222;
    font-size: 14px;
}

.empty-state p {
    margin: 7px 0 18px;
    color: #999;
    font-size: 12px;
}

.empty-button {
    padding: 10px 14px;
    border: 1px solid #ddd;
    border-radius: 7px;
    background: #fff;
    color: #333;
    font-size: 11px;
    font-weight: 600;
    cursor: pointer;
}

.empty-button:hover {
    border-color: #aaa;
}

.small-empty {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 30px 24px;
    text-align: center;
}

.small-empty>i {
    margin-bottom: 12px;
    color: #aaa;
    font-size: 22px;
}

.small-empty p {
    max-width: 220px;
    margin: 0 0 14px;
    color: #999;
    font-size: 11px;
    line-height: 1.6;
}

.small-empty button {
    border: 0;
    background: transparent;
    color: #222;
    font-size: 11px;
    font-weight: 600;
    text-decoration: underline;
    cursor: pointer;
}


/* =========================================
   QUICK ACTIONS
========================================= */

.quick-actions {
    padding: 7px 24px 14px;
}

.quick-actions button {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 12px;
    padding: 13px 0;
    border: 0;
    border-bottom: 1px solid #f0f0f0;
    background: transparent;
    text-align: left;
    cursor: pointer;
}

.quick-actions button:last-child {
    border-bottom: 0;
}

.quick-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 35px;
    height: 35px;
    border: 1px solid #e8e8e8;
    border-radius: 7px;
    color: #555;
    font-size: 13px;
}

.quick-actions button>span:nth-child(2) {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 3px;
}

.quick-actions strong {
    color: #333;
    font-size: 11px;
    font-weight: 600;
}

.quick-actions small {
    color: #999;
    font-size: 10px;
}

.quick-actions button>i {
    color: #aaa;
    font-size: 10px;
}

.quick-actions button:hover strong {
    color: #111;
}


/* =========================================
   ICON BUTTON
========================================= */

.icon-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 31px;
    height: 31px;
    border: 1px solid #e5e5e5;
    border-radius: 7px;
    background: #fff;
    color: #555;
    cursor: pointer;
}

.icon-button:hover {
    border-color: #bbb;
    color: #111;
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
    animation: spin 0.8s linear infinite;
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
    margin-top: 20px;
    padding: 13px 15px;
    border: 1px solid #f0d6d6;
    border-radius: 8px;
    background: #fff8f8;
    color: #a33b3b;
    font-size: 12px;
}


/* =========================================
   RESPONSIVE
========================================= */

@media (max-width: 1200px) {

    .stats-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .dashboard-content {
        grid-template-columns: 1fr;
    }

    .side-column {
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: start;
    }

}


@media (max-width: 800px) {

    .dashboard-page {
        padding: 25px 18px 45px;
    }

    .dashboard-header {
        align-items: flex-start;
        flex-direction: column;
    }

    .shop-button {
        width: 100%;
        justify-content: center;
    }

    .stats-grid {
        grid-template-columns: 1fr 1fr;
    }

    .side-column {
        display: flex;
    }

    .order-row {
        grid-template-columns: 1fr auto;
    }

    .order-price {
        text-align: right;
    }

    .status-badge {
        grid-column: 1;
    }

    .order-date {
        grid-column: 2;
        grid-row: 2;
    }

}


@media (max-width: 520px) {

    .stats-grid {
        grid-template-columns: 1fr;
    }

    .dashboard-header h1 {
        font-size: 30px;
    }

    .stat-card {
        min-height: 135px;
    }

    .order-row {
        grid-template-columns: 1fr;
        gap: 10px;
    }

    .order-price {
        text-align: left;
    }

    .status-badge {
        grid-column: auto;
    }

    .order-date {
        grid-column: auto;
        grid-row: auto;
        text-align: left;
    }

}
</style>