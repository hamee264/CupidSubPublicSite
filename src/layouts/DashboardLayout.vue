<template>
    <div class="dashboard-layout">

        <!-- Mobile Overlay -->

        <div v-if="sidebarOpen" class="sidebar-overlay" @click="sidebarOpen = false"></div>


        <!-- Sidebar -->

        <aside class="sidebar" :class="{ 'sidebar-open': sidebarOpen }">

            <!-- Brand -->

            <div class="sidebar-brand">

                <RouterLink to="/" class="brand" @click="closeSidebar">

                    <div class="brand-icon">

                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>

                    </div>

                    <span class="brand-name">
                        CupidSubs
                    </span>

                </RouterLink>


                <!-- Mobile Close -->

                <button class="sidebar-close" @click="closeSidebar" aria-label="Close menu">

                    <i class="bi bi-x-lg"></i>

                </button>

            </div>


            <!-- Navigation -->

            <nav class="sidebar-nav">

                <p class="nav-label">
                    MENU
                </p>


                <RouterLink to="/app" class="nav-item" :class="{ active: route.path === '/app' }" @click="closeSidebar">

                    <i class="bi bi-grid"></i>

                    <span>
                        Dashboard
                    </span>

                </RouterLink>


                <RouterLink to="/app/marketplace" class="nav-item" @click="closeSidebar">

                    <i class="bi bi-shop"></i>

                    <span>
                        Marketplace
                    </span>

                </RouterLink>


                <RouterLink to="/app/orders" class="nav-item" @click="closeSidebar">

                    <i class="bi bi-receipt"></i>

                    <span>
                        Orders
                    </span>

                </RouterLink>


                <RouterLink to="/app/subscriptions" class="nav-item" @click="closeSidebar">

                    <i class="bi bi-play-circle"></i>

                    <span>
                        Subscriptions
                    </span>

                </RouterLink>


                <p class="nav-label second-label">
                    ACCOUNT
                </p>


                <RouterLink to="/app/notifications" class="nav-item" @click="closeSidebar">

                    <i class="bi bi-bell"></i>

                    <span>
                        Notifications
                    </span>

                    <span v-if="notificationCount > 0" class="notification-badge">
                        {{ notificationCount }}
                    </span>

                </RouterLink>


                <RouterLink to="/app/profile" class="nav-item" @click="closeSidebar">

                    <i class="bi bi-person"></i>

                    <span>
                        Profile
                    </span>

                </RouterLink>


                <RouterLink to="/app/settings" class="nav-item" @click="closeSidebar">

                    <i class="bi bi-gear"></i>

                    <span>
                        Settings
                    </span>

                </RouterLink>

            </nav>


            <!-- Sidebar Bottom -->

            <div class="sidebar-bottom">

                <div class="sidebar-help">

                    <div class="help-icon">

                        <i class="bi bi-headset"></i>

                    </div>

                    <div>

                        <strong>
                            Need help?
                        </strong>

                        <span>
                            Contact support
                        </span>

                    </div>

                </div>


                <button class="logout-btn" @click="logout" :disabled="loggingOut">

                    <i v-if="!loggingOut" class="bi bi-box-arrow-right"></i>

                    <i v-else class="bi bi-arrow-repeat spin"></i>

                    <span>
                        {{ loggingOut ? "Signing out..." : "Sign Out" }}
                    </span>

                </button>

            </div>

        </aside>


        <!-- Main -->

        <div class="dashboard-main">


            <!-- Topbar -->

            <header class="topbar">

                <div class="topbar-left">

                    <!-- Mobile Menu -->

                    <button class="menu-btn" @click="sidebarOpen = true" aria-label="Open menu">

                        <i class="bi bi-list"></i>

                    </button>


                    <!-- Page title -->

                    <div class="page-heading">

                        <span class="eyebrow">
                            CUSTOMER PORTAL
                        </span>

                        <h1>
                            {{ pageTitle }}
                        </h1>

                    </div>

                </div>


                <div class="topbar-right">


                    <!-- Notifications -->

                    <RouterLink to="/app/notifications" class="topbar-icon" aria-label="Notifications">

                        <i class="bi bi-bell"></i>

                        <span v-if="notificationCount > 0" class="topbar-dot"></span>

                    </RouterLink>


                    <!-- Divider -->

                    <div class="topbar-divider"></div>


                    <!-- Profile -->

                    <RouterLink to="/app/profile" class="user-menu">

                        <div class="user-avatar">

                            {{ userInitials }}

                        </div>


                        <div class="user-info">

                            <strong>
                                {{ customerName }}
                            </strong>

                            <span>
                                {{ customerEmail }}
                            </span>

                        </div>


                        <i class="bi bi-chevron-down"></i>

                    </RouterLink>

                </div>

            </header>


            <!-- Page Content -->

            <main class="dashboard-content">

                <RouterView />

            </main>

        </div>

    </div>
</template>


<script setup>

import {
    computed,
    onMounted,
    ref
} from "vue";

import {
    useRoute,
    useRouter
} from "vue-router";

import {
    supabase
} from "../lib/supabase.js";


const route = useRoute();

const router = useRouter();


/* ==========================================
   STATE
========================================== */

const sidebarOpen = ref(false);

const loggingOut = ref(false);

const customer = ref(null);

const notificationCount = ref(0);


/* ==========================================
   PAGE TITLES
========================================== */

const pageTitles = {

    "/app":
        "Dashboard",

    "/app/marketplace":
        "Marketplace",

    "/app/checkout":
        "Checkout",

    "/app/orders":
        "Orders",

    "/app/subscriptions":
        "Subscriptions",

    "/app/notifications":
        "Notifications",

    "/app/profile":
        "Profile",

    "/app/settings":
        "Settings"

};


const pageTitle = computed(() => {

    return pageTitles[route.path] || "Dashboard";

});


/* ==========================================
   CUSTOMER
========================================== */

const customerName = computed(() => {

    return customer.value?.full_name ||
        "Customer";

});


const customerEmail = computed(() => {

    return customer.value?.email ||
        "Welcome to CupidSubs";

});


/* ==========================================
   INITIALS
========================================== */

const userInitials = computed(() => {

    const name =
        customer.value?.full_name ||
        customer.value?.email ||
        "C";

    const parts =
        name.trim().split(/\s+/);


    if (parts.length >= 2) {

        return (
            parts[0][0] +
            parts[parts.length - 1][0]
        ).toUpperCase();

    }


    return name
        .substring(0, 2)
        .toUpperCase();

});


/* ==========================================
   LOAD CUSTOMER
========================================== */

const loadCustomer = async () => {

    try {

        const {
            data: {
                user
            }
        } = await supabase.auth.getUser();


        if (!user) {

            router.replace("/login");

            return;

        }


        const {
            data,
            error
        } = await supabase
            .from("customers")
            .select("*")
            .eq("id", user.id)
            .maybeSingle();


        if (error) {

            console.error(
                "Unable to load customer:",
                error
            );

            return;

        }


        customer.value = data;

    } catch (error) {

        console.error(
            "Customer loading failed:",
            error
        );

    }

};


/* ==========================================
   LOGOUT
========================================== */

const logout = async () => {

    try {

        loggingOut.value = true;


        const {
            error
        } = await supabase.auth.signOut();


        if (error) {

            throw error;

        }


        router.replace("/login");

    } catch (error) {

        console.error(
            "Logout failed:",
            error
        );

    } finally {

        loggingOut.value = false;

    }

};


/* ==========================================
   CLOSE SIDEBAR
========================================== */

const closeSidebar = () => {

    sidebarOpen.value = false;

};


/* ==========================================
   INIT
========================================== */

onMounted(() => {

    loadCustomer();

});

</script>

<style scoped>
/* ==========================================
   LAYOUT
========================================== */

.dashboard-layout {

    min-height: 100vh;

    background: #f7f7f7;

    color: #171717;

    display: flex;

}


/* ==========================================
   SIDEBAR
========================================== */

.sidebar {

    width: 255px;

    height: 100vh;

    position: fixed;

    top: 0;
    left: 0;

    background: #ffffff;

    border-right: 1px solid #e5e5e5;

    display: flex;

    flex-direction: column;

    z-index: 1000;

}


/* ==========================================
   BRAND
========================================== */

.sidebar-brand {

    height: 76px;

    padding: 0 24px;

    display: flex;

    align-items: center;

    justify-content: space-between;

    border-bottom: 1px solid #eeeeee;

}


.brand {

    display: flex;

    align-items: center;

    gap: 10px;

    text-decoration: none;

}


.brand-icon {

    display: grid;

    grid-template-columns: repeat(2, 8px);

    gap: 3px;

}


.brand-icon span {

    width: 8px;
    height: 8px;

    border-radius: 2px;

    background: #111;

}


.brand-icon span:nth-child(2) {
    opacity: .72;
}


.brand-icon span:nth-child(3) {
    opacity: .45;
}


.brand-icon span:nth-child(4) {
    opacity: .22;
}


.brand-name {

    color: #171717;

    font-size: 1.05rem;

    font-weight: 700;

    letter-spacing: -.3px;

}


/* ==========================================
   CLOSE
========================================== */

.sidebar-close {

    display: none;

    border: none;

    background: transparent;

    color: #777;

    font-size: 20px;

    cursor: pointer;

}


/* ==========================================
   NAVIGATION
========================================== */

.sidebar-nav {

    padding: 25px 14px;

    flex: 1;

    overflow-y: auto;

}


.nav-label {

    padding: 0 12px;

    margin: 0 0 10px;

    color: #999;

    font-size: 9px;

    font-weight: 700;

    letter-spacing: .14em;

}


.second-label {

    margin-top: 30px;

}


/* ==========================================
   NAV ITEM
========================================== */

.nav-item {

    position: relative;

    display: flex;

    align-items: center;

    gap: 13px;

    width: 100%;

    min-height: 44px;

    padding: 0 13px;

    margin-bottom: 4px;

    border-radius: 7px;

    color: #777;

    text-decoration: none;

    font-size: 13px;

    font-weight: 500;

    transition:
        background .2s ease,
        color .2s ease;

}


.nav-item i {

    width: 20px;

    text-align: center;

    font-size: 16px;

}


.nav-item:hover {

    background: #f5f5f5;

    color: #171717;

}


/*
 * Active routes
 */

.nav-item.router-link-active {

    background: #f1f1f1;

    color: #111;

    font-weight: 600;

}


/*
 * Exact dashboard active state
 */

.nav-item.active {

    background: #f1f1f1;

    color: #111;

    font-weight: 600;

}


/* ==========================================
   NOTIFICATION BADGE
========================================== */

.notification-badge {

    margin-left: auto;

    min-width: 20px;

    height: 20px;

    padding: 0 6px;

    border-radius: 10px;

    display: flex;

    align-items: center;

    justify-content: center;

    background: #111;

    color: #fff;

    font-size: 9px;

    font-weight: 700;

}


/* ==========================================
   SIDEBAR BOTTOM
========================================== */

.sidebar-bottom {

    padding: 16px;

    border-top: 1px solid #eeeeee;

}


/* ==========================================
   HELP
========================================== */

.sidebar-help {

    display: flex;

    align-items: center;

    gap: 10px;

    padding: 12px;

    margin-bottom: 12px;

    background: #f7f7f7;

    border: 1px solid #eeeeee;

    border-radius: 7px;

}


.help-icon {

    width: 34px;

    height: 34px;

    border-radius: 7px;

    background: #ededed;

    color: #444;

    display: flex;

    align-items: center;

    justify-content: center;

}


.sidebar-help strong {

    display: block;

    font-size: 11px;

    color: #333;

}


.sidebar-help span {

    display: block;

    font-size: 10px;

    color: #999;

    margin-top: 2px;

}


/* ==========================================
   LOGOUT
========================================== */

.logout-btn {

    width: 100%;

    height: 42px;

    border: 1px solid #e2e2e2;

    background: #fff;

    border-radius: 7px;

    color: #777;

    display: flex;

    align-items: center;

    justify-content: center;

    gap: 9px;

    font-size: 12px;

    font-weight: 600;

    cursor: pointer;

    transition:
        background .2s ease,
        color .2s ease,
        border-color .2s ease;

}


.logout-btn:hover:not(:disabled) {

    color: #9b3b3b;

    border-color: #e3caca;

    background: #fff8f8;

}


.logout-btn:disabled {

    opacity: .6;

    cursor: not-allowed;

}


/* ==========================================
   MAIN
========================================== */

.dashboard-main {

    width: calc(100% - 255px);

    margin-left: 255px;

    min-height: 100vh;

}


/* ==========================================
   TOPBAR
========================================== */

.topbar {

    height: 76px;

    padding: 0 30px;

    background: rgba(255, 255, 255, .97);

    border-bottom: 1px solid #e5e5e5;

    display: flex;

    align-items: center;

    justify-content: space-between;

    position: sticky;

    top: 0;

    z-index: 900;

}


.topbar-left {

    display: flex;

    align-items: center;

    gap: 15px;

}


.menu-btn {

    display: none;

    border: none;

    background: transparent;

    color: #333;

    font-size: 23px;

    cursor: pointer;

}


/* ==========================================
   PAGE HEADING
========================================== */

.page-heading .eyebrow {

    display: block;

    color: #999;

    font-size: 8px;

    font-weight: 700;

    letter-spacing: .14em;

    margin-bottom: 4px;

}


.page-heading h1 {

    margin: 0;

    color: #171717;

    font-size: 18px;

    font-weight: 700;

    letter-spacing: -.2px;

}


/* ==========================================
   TOPBAR RIGHT
========================================== */

.topbar-right {

    display: flex;

    align-items: center;

    gap: 18px;

}


.topbar-icon {

    position: relative;

    width: 38px;

    height: 38px;

    display: flex;

    align-items: center;

    justify-content: center;

    border-radius: 7px;

    color: #777;

    text-decoration: none;

    transition:
        background .2s ease,
        color .2s ease;

}


.topbar-icon:hover {

    background: #f5f5f5;

    color: #171717;

}


.topbar-icon i {

    font-size: 17px;

}


/* ==========================================
   NOTIFICATION DOT
========================================== */

.topbar-dot {

    position: absolute;

    top: 8px;

    right: 8px;

    width: 6px;

    height: 6px;

    border-radius: 50%;

    background: #111;

    border: 1px solid #fff;

}


/* ==========================================
   DIVIDER
========================================== */

.topbar-divider {

    width: 1px;

    height: 30px;

    background: #e5e5e5;

}


/* ==========================================
   USER
========================================== */

.user-menu {

    display: flex;

    align-items: center;

    gap: 10px;

    text-decoration: none;

    color: #171717;

}


.user-avatar {

    width: 38px;

    height: 38px;

    border-radius: 50%;

    background: #111;

    color: #fff;

    display: flex;

    align-items: center;

    justify-content: center;

    font-size: 11px;

    font-weight: 700;

}


.user-info {

    display: flex;

    flex-direction: column;

    min-width: 100px;

}


.user-info strong {

    color: #333;

    font-size: 11px;

    font-weight: 600;

    white-space: nowrap;

    overflow: hidden;

    text-overflow: ellipsis;

    max-width: 140px;

}


.user-info span {

    color: #999;

    font-size: 9px;

    margin-top: 2px;

    white-space: nowrap;

    overflow: hidden;

    text-overflow: ellipsis;

    max-width: 140px;

}


.user-menu>i {

    color: #999;

    font-size: 10px;

}


/* ==========================================
   CONTENT
========================================== */

.dashboard-content {

    padding: 30px;

    max-width: 1600px;

    margin: 0 auto;

}


/* ==========================================
   SPIN
========================================== */

.spin {

    animation:
        spin .8s linear infinite;

}


@keyframes spin {

    to {

        transform:
            rotate(360deg);

    }

}


/* ==========================================
   OVERLAY
========================================== */

.sidebar-overlay {

    display: none;

}


/* ==========================================
   TABLET
========================================== */

@media (max-width: 992px) {

    .sidebar {

        width: 235px;

    }


    .dashboard-main {

        width: calc(100% - 235px);

        margin-left: 235px;

    }


    .topbar {

        padding: 0 22px;

    }


    .dashboard-content {

        padding: 25px;

    }


    .user-info {

        display: none;

    }


    .user-menu>i {

        display: none;

    }

}


/* ==========================================
   MOBILE
========================================== */

@media (max-width: 768px) {

    .sidebar {

        width: 270px;

        transform:
            translateX(-100%);

        transition:
            transform .3s ease;

        box-shadow:
            15px 0 40px rgba(0, 0, 0, .08);

    }


    .sidebar.sidebar-open {

        transform:
            translateX(0);

    }


    .sidebar-close {

        display: block;

    }


    .sidebar-overlay {

        display: block;

        position: fixed;

        inset: 0;

        background:
            rgba(0, 0, 0, .35);

        z-index: 950;

        backdrop-filter: blur(2px);

    }


    .dashboard-main {

        width: 100%;

        margin-left: 0;

    }


    .topbar {

        height: 68px;

        padding: 0 18px;

    }


    .menu-btn {

        display: flex;

        align-items: center;

        justify-content: center;

    }


    .page-heading .eyebrow {

        display: none;

    }


    .page-heading h1 {

        font-size: 17px;

    }


    .topbar-right {

        gap: 8px;

    }


    .topbar-divider {

        display: none;

    }


    .user-avatar {

        width: 36px;

        height: 36px;

    }


    .dashboard-content {

        padding: 20px 16px;

    }

}


/* ==========================================
   SMALL PHONES
========================================== */

@media (max-width: 480px) {

    .topbar {

        padding: 0 14px;

    }


    .topbar-icon {

        width: 34px;

        height: 34px;

    }


    .user-avatar {

        width: 34px;

        height: 34px;

    }


    .dashboard-content {

        padding: 16px 12px;

    }

}


/* ==========================================
   REDUCED MOTION
========================================== */

@media (prefers-reduced-motion: reduce) {

    * {

        transition: none !important;

        animation: none !important;

    }

}
</style>