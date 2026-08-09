<template>
    <div class="marketplace-page">

        <!-- =========================
             HEADER
        ========================== -->

        <section class="marketplace-header">

            <div>
                <span class="eyebrow">
                    Marketplace
                </span>

                <h1>
                    Find a subscription.
                </h1>

                <p>
                    Browse available subscriptions and choose the service
                    that works for you.
                </p>
            </div>

        </section>


        <!-- =========================
             FILTER BAR
        ========================== -->

        <section class="filter-section">

            <div class="search-box">

                <i class="bi bi-search"></i>

                <input v-model="searchQuery" type="text" placeholder="Search subscriptions..." />

                <button v-if="searchQuery" class="clear-search" @click="searchQuery = ''" title="Clear search">
                    <i class="bi bi-x"></i>
                </button>

            </div>


            <div class="category-tabs">

                <button :class="{ active: selectedCategory === 'all' }" @click="selectedCategory = 'all'">
                    All
                </button>

                <button v-for="category in categories" :key="category"
                    :class="{ active: selectedCategory === category }" @click="selectedCategory = category">
                    {{ category }}
                </button>

            </div>

        </section>


        <!-- =========================
             LOADING
        ========================== -->

        <div v-if="loading" class="loading-state">

            <div class="loading-spinner"></div>

            <p>
                Loading subscriptions...
            </p>

        </div>


        <!-- =========================
             CONTENT
        ========================== -->

        <template v-else>

            <!-- Results header -->

            <div class="results-header">

                <div>

                    <span class="results-count">
                        {{ filteredProducts.length }}
                        {{ filteredProducts.length === 1 ? 'subscription' : 'subscriptions' }}
                    </span>

                </div>

                <div v-if="searchQuery || selectedCategory !== 'all'" class="filter-status">
                    <span>
                        Filters applied
                    </span>

                    <button @click="clearFilters">
                        Clear
                    </button>
                </div>

            </div>


            <!-- Products -->

            <section v-if="filteredProducts.length" class="products-grid">

                <article v-for="product in filteredProducts" :key="product.id" class="product-card">

                    <!-- Product top -->

                    <div class="product-top">

                        <div class="product-logo">

                            <img v-if="product.image_url" :src="product.image_url" :alt="product.name" />

                            <i v-else class="bi bi-play-fill"></i>

                        </div>


                        <span class="availability" :class="{
                            unavailable: !isAvailable(product)
                        }">
                            {{
                                isAvailable(product)
                                    ? 'Available'
                                    : 'Unavailable'
                            }}
                        </span>

                    </div>


                    <!-- Product information -->

                    <div class="product-info">

                        <span class="product-category">
                            {{ product.category || 'Subscription' }}
                        </span>

                        <h2>
                            {{ product.name }}
                        </h2>

                        <p>
                            {{ product.description || 'Premium digital subscription.' }}
                        </p>

                    </div>


                    <!-- Product details -->

                    <div class="product-details">

                        <div class="detail">

                            <span>
                                Duration
                            </span>

                            <strong>
                                {{ product.duration || 'Subscription' }}
                            </strong>

                        </div>


                        <div class="detail">

                            <span>
                                Provider
                            </span>

                            <strong>
                                {{ product.provider_name || 'CupidSubs' }}
                            </strong>

                        </div>

                    </div>


                    <!-- Product footer -->

                    <div class="product-footer">

                        <div class="product-price">

                            <span>
                                From
                            </span>

                            <strong>
                                ₦{{ formatMoney(product.price) }}
                            </strong>

                        </div>


                        <button class="buy-button" :disabled="!isAvailable(product)" @click="goToCheckout(product)">

                            <span>
                                {{
                                    isAvailable(product)
                                        ? 'Buy now'
                                        : 'Unavailable'
                                }}
                            </span>

                            <i class="bi bi-arrow-up-right"></i>

                        </button>

                    </div>

                </article>

            </section>


            <!-- Empty -->

            <div v-else class="empty-state">

                <div class="empty-icon">
                    <i class="bi bi-search"></i>
                </div>

                <h2>
                    No subscriptions found
                </h2>

                <p>
                    Try changing your search or selecting another category.
                </p>

                <button class="reset-button" @click="clearFilters">
                    Clear filters
                </button>

            </div>

        </template>


        <!-- =========================
             ERROR
        ========================== -->

        <div v-if="error" class="error-message">

            <i class="bi bi-exclamation-circle"></i>

            <span>
                {{ error }}
            </span>

            <button @click="loadProducts">
                Try again
            </button>

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


/* =================================
   STATE
================================= */

const loading = ref(true)

const error = ref('')

const products = ref([])

const searchQuery = ref('')

const selectedCategory = ref('all')


/* =================================
   CATEGORIES
================================= */

const categories = computed(() => {

    const values = products.value
        .map(product => product.category)
        .filter(Boolean)

    return [...new Set(values)]

})


/* =================================
   FILTERED PRODUCTS
================================= */

const filteredProducts = computed(() => {

    let result = [...products.value]


    /* Search */

    const query = searchQuery.value
        .trim()
        .toLowerCase()


    if (query) {

        result = result.filter(product => {

            const name =
                String(product.name || '').toLowerCase()

            const description =
                String(product.description || '').toLowerCase()

            const category =
                String(product.category || '').toLowerCase()

            const provider =
                String(product.provider_name || '').toLowerCase()

            return (
                name.includes(query) ||
                description.includes(query) ||
                category.includes(query) ||
                provider.includes(query)
            )

        })

    }


    /* Category */

    if (selectedCategory.value !== 'all') {

        result = result.filter(product => {

            return product.category === selectedCategory.value

        })

    }


    return result

})


/* =================================
   LOAD PRODUCTS
================================= */

async function loadProducts() {

    loading.value = true

    error.value = ''


    try {

        const {
            data,
            error: productsError
        } = await supabase
            .from('products')
            .select('*')
            .eq('status', 'active')
            .order('created_at', {
                ascending: false
            })


        if (productsError) {

            throw productsError

        }


        products.value = data || []

    } catch (err) {

        console.error(
            'Marketplace error:',
            err
        )

        error.value =
            'Unable to load subscriptions.'

    } finally {

        loading.value = false

    }

}


/* =================================
   AVAILABILITY
================================= */

function isAvailable(product) {

    if (product.status !== 'active') {
        return false
    }


    if (
        product.stock !== null &&
        product.stock !== undefined
    ) {

        return Number(product.stock) > 0

    }


    return true

}


/* =================================
   MONEY
================================= */

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


/* =================================
   CHECKOUT
================================= */

function goToCheckout(product) {

    if (!isAvailable(product)) {
        return
    }


    router.push({
        name: 'checkout',
        query: {
            product: product.id
        }
    })

}


/* =================================
   FILTERS
================================= */

function clearFilters() {

    searchQuery.value = ''

    selectedCategory.value = 'all'

}


/* =================================
   INIT
================================= */

onMounted(() => {

    loadProducts()

})

</script>


<style scoped>
/* =========================================
   PAGE
========================================= */

.marketplace-page {
    width: 100%;
    max-width: 1500px;
    margin: 0 auto;
    padding: 36px 40px 60px;
}


/* =========================================
   HEADER
========================================= */

.marketplace-header {
    margin-bottom: 30px;
}

.eyebrow {
    display: block;
    margin-bottom: 8px;
    color: #8a8a8a;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
}

.marketplace-header h1 {
    margin: 0;
    color: #151515;
    font-size: clamp(28px, 3vw, 42px);
    font-weight: 700;
    letter-spacing: -0.04em;
}

.marketplace-header p {
    max-width: 580px;
    margin: 10px 0 0;
    color: #777;
    font-size: 14px;
    line-height: 1.6;
}


/* =========================================
   FILTER SECTION
========================================= */

.filter-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 25px;
}


/* Search */

.search-box {
    position: relative;
    display: flex;
    align-items: center;
    width: 330px;
}

.search-box>i {
    position: absolute;
    left: 14px;
    color: #999;
    font-size: 13px;
}

.search-box input {
    width: 100%;
    height: 42px;
    padding: 0 38px 0 38px;
    border: 1px solid #e5e5e5;
    border-radius: 8px;
    outline: none;
    background: #fff;
    color: #222;
    font-family: inherit;
    font-size: 12px;
    transition: border-color 0.2s ease;
}

.search-box input:focus {
    border-color: #aaa;
}

.search-box input::placeholder {
    color: #aaa;
}

.clear-search {
    position: absolute;
    right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25px;
    height: 25px;
    border: 0;
    background: transparent;
    color: #999;
    cursor: pointer;
}


/* Categories */

.category-tabs {
    display: flex;
    align-items: center;
    gap: 5px;
    overflow-x: auto;
}

.category-tabs::-webkit-scrollbar {
    display: none;
}

.category-tabs button {
    flex-shrink: 0;
    padding: 9px 13px;
    border: 1px solid transparent;
    border-radius: 7px;
    background: transparent;
    color: #777;
    font-size: 11px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
}

.category-tabs button:hover {
    color: #222;
}

.category-tabs button.active {
    border-color: #ddd;
    background: #fff;
    color: #171717;
}


/* =========================================
   RESULTS
========================================= */

.results-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;
}

.results-count {
    color: #888;
    font-size: 11px;
    font-weight: 600;
}

.filter-status {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #999;
    font-size: 11px;
}

.filter-status button {
    padding: 0;
    border: 0;
    background: transparent;
    color: #333;
    font-size: 11px;
    font-weight: 600;
    text-decoration: underline;
    cursor: pointer;
}


/* =========================================
   PRODUCTS
========================================= */

.products-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
}

.product-card {
    min-width: 0;
    padding: 20px;
    border: 1px solid #e8e8e8;
    border-radius: 10px;
    background: #fff;
    transition:
        border-color 0.2s ease,
        transform 0.2s ease;
}

.product-card:hover {
    border-color: #d0d0d0;
    transform: translateY(-2px);
}


/* Product top */

.product-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 15px;
}

.product-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 52px;
    height: 52px;
    overflow: hidden;
    border: 1px solid #e8e8e8;
    border-radius: 10px;
    background: #f5f5f5;
    color: #444;
    font-size: 19px;
}

.product-logo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.availability {
    padding: 5px 8px;
    border-radius: 20px;
    background: #edf8f0;
    color: #27753e;
    font-size: 9px;
    font-weight: 600;
}

.availability.unavailable {
    background: #f5f5f5;
    color: #999;
}


/* Product information */

.product-info {
    margin-top: 20px;
}

.product-category {
    color: #999;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

.product-info h2 {
    overflow: hidden;
    margin: 7px 0 7px;
    color: #1b1b1b;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: -0.02em;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.product-info p {
    display: -webkit-box;
    overflow: hidden;
    min-height: 32px;
    margin: 0;
    color: #999;
    font-size: 11px;
    line-height: 1.5;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}


/* =========================================
   PRODUCT DETAILS
========================================= */

.product-details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-top: 20px;
    padding: 13px 0;
    border-top: 1px solid #f0f0f0;
    border-bottom: 1px solid #f0f0f0;
}

.detail {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.detail span {
    color: #aaa;
    font-size: 9px;
}

.detail strong {
    overflow: hidden;
    color: #444;
    font-size: 10px;
    font-weight: 600;
    text-overflow: ellipsis;
    white-space: nowrap;
}


/* =========================================
   FOOTER
========================================= */

.product-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
    margin-top: 17px;
}

.product-price {
    display: flex;
    flex-direction: column;
    gap: 3px;
}

.product-price span {
    color: #aaa;
    font-size: 9px;
}

.product-price strong {
    color: #171717;
    font-size: 16px;
    font-weight: 700;
}

.buy-button {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 12px;
    border: 1px solid #171717;
    border-radius: 7px;
    background: #171717;
    color: #fff;
    font-size: 10px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s ease;
}

.buy-button:hover:not(:disabled) {
    background: #333;
}

.buy-button:disabled {
    border-color: #e5e5e5;
    background: #f4f4f4;
    color: #aaa;
    cursor: not-allowed;
}


/* =========================================
   EMPTY
========================================= */

.empty-state {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 90px 25px;
    border: 1px solid #e8e8e8;
    border-radius: 10px;
    background: #fff;
    text-align: center;
}

.empty-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 52px;
    height: 52px;
    margin-bottom: 16px;
    border-radius: 50%;
    background: #f5f5f5;
    color: #777;
    font-size: 18px;
}

.empty-state h2 {
    margin: 0;
    color: #222;
    font-size: 15px;
}

.empty-state p {
    margin: 8px 0 18px;
    color: #999;
    font-size: 11px;
}

.reset-button {
    padding: 10px 15px;
    border: 1px solid #ddd;
    border-radius: 7px;
    background: #fff;
    color: #333;
    font-size: 11px;
    font-weight: 600;
    cursor: pointer;
}

.reset-button:hover {
    border-color: #aaa;
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

.error-message button {
    margin-left: auto;
    border: 0;
    background: transparent;
    color: #333;
    font-size: 11px;
    font-weight: 600;
    text-decoration: underline;
    cursor: pointer;
}


/* =========================================
   RESPONSIVE
========================================= */

@media (max-width: 1100px) {

    .products-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .filter-section {
        align-items: flex-start;
        flex-direction: column;
    }

    .search-box {
        width: 100%;
        max-width: 420px;
    }

}


@media (max-width: 800px) {

    .marketplace-page {
        padding: 25px 18px 45px;
    }

    .products-grid {
        grid-template-columns: 1fr;
    }

}


@media (max-width: 520px) {

    .marketplace-header h1 {
        font-size: 30px;
    }

    .search-box {
        max-width: none;
    }

    .product-card {
        padding: 17px;
    }

}
</style>