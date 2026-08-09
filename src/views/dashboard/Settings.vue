<template>
    <div class="settings-page">

        <div class="settings-container">

            <!-- Header -->
            <section class="settings-header">

                <div>
                    <span class="eyebrow">
                        Preferences
                    </span>

                    <h1>
                        Settings
                    </h1>

                    <p>
                        Manage your account preferences and checkout experience.
                    </p>
                </div>

            </section>


            <!-- =========================
                 NOTIFICATIONS
            ========================== -->

            <section class="settings-card">

                <div class="section-heading">

                    <div>

                        <span class="section-number">
                            01
                        </span>

                        <h2>
                            Notifications
                        </h2>

                        <p>
                            Choose which updates you want to receive from CupidSubs.
                        </p>

                    </div>

                </div>


                <div class="settings-list">

                    <!-- Order Updates -->
                    <div class="setting-item">

                        <div class="setting-icon">
                            <i class="bi bi-bag-check"></i>
                        </div>

                        <div class="setting-content">

                            <strong>
                                Order updates
                            </strong>

                            <p>
                                Receive important updates about your orders.
                            </p>

                        </div>

                        <button type="button" class="toggle" :class="{ active: settings.orderUpdates }"
                            :aria-pressed="settings.orderUpdates" @click="toggleSetting('orderUpdates')">

                            <span></span>

                        </button>

                    </div>


                    <div class="setting-divider"></div>


                    <!-- Payment Updates -->
                    <div class="setting-item">

                        <div class="setting-icon">
                            <i class="bi bi-credit-card"></i>
                        </div>

                        <div class="setting-content">

                            <strong>
                                Payment updates
                            </strong>

                            <p>
                                Get updates when your payment is being reviewed
                                or verified.
                            </p>

                        </div>

                        <button type="button" class="toggle" :class="{ active: settings.paymentUpdates }"
                            :aria-pressed="settings.paymentUpdates" @click="toggleSetting('paymentUpdates')">

                            <span></span>

                        </button>

                    </div>


                    <div class="setting-divider"></div>


                    <!-- Promotions -->
                    <div class="setting-item">

                        <div class="setting-icon">
                            <i class="bi bi-megaphone"></i>
                        </div>

                        <div class="setting-content">

                            <strong>
                                Promotions & offers
                            </strong>

                            <p>
                                Receive occasional information about new products
                                and special offers.
                            </p>

                        </div>

                        <button type="button" class="toggle" :class="{ active: settings.promotions }"
                            :aria-pressed="settings.promotions" @click="toggleSetting('promotions')">

                            <span></span>

                        </button>

                    </div>

                </div>

            </section>


            <!-- =========================
                 CHECKOUT PREFERENCES
            ========================== -->

            <section class="settings-card">

                <div class="section-heading">

                    <div>

                        <span class="section-number">
                            02
                        </span>

                        <h2>
                            Checkout preferences
                        </h2>

                        <p>
                            Control how checkout behaves on this device.
                        </p>

                    </div>

                </div>


                <div class="settings-list">

                    <div class="setting-item">

                        <div class="setting-icon">
                            <i class="bi bi-person-check"></i>
                        </div>

                        <div class="setting-content">

                            <strong>
                                Remember checkout information
                            </strong>

                            <p>
                                Remember your basic checkout information on
                                this device for faster future purchases.
                            </p>

                        </div>

                        <button type="button" class="toggle" :class="{ active: settings.rememberCheckout }"
                            :aria-pressed="settings.rememberCheckout" @click="toggleCheckoutPreference">

                            <span></span>

                        </button>

                    </div>

                </div>


                <!-- Privacy notice -->
                <div class="privacy-notice">

                    <i class="bi bi-shield-check"></i>

                    <div>

                        <strong>
                            Your information stays on this device
                        </strong>

                        <p>
                            This preference uses your browser's local storage.
                            We do not store payment details here.
                        </p>

                    </div>

                </div>

            </section>


            <!-- =========================
                 ACCOUNT
            ========================== -->

            <section class="settings-card">

                <div class="section-heading">

                    <div>

                        <span class="section-number">
                            03
                        </span>

                        <h2>
                            Account
                        </h2>

                        <p>
                            Manage your CupidSubs account.
                        </p>

                    </div>

                </div>


                <!-- Profile -->
                <div class="account-item">

                    <div class="account-icon">
                        <i class="bi bi-person"></i>
                    </div>

                    <div class="account-content">

                        <strong>
                            Profile
                        </strong>

                        <p>
                            View and update your personal information.
                        </p>

                    </div>

                    <button type="button" class="outline-button" @click="goToProfile">

                        View profile

                        <i class="bi bi-arrow-right"></i>

                    </button>

                </div>


                <div class="setting-divider"></div>


                <!-- Account Status -->
                <div class="account-item">

                    <div class="account-icon">
                        <i class="bi bi-check-circle"></i>
                    </div>

                    <div class="account-content">

                        <strong>
                            Account status
                        </strong>

                        <p>
                            Your CupidSubs account is currently active.
                        </p>

                    </div>

                    <span class="active-status">

                        <span class="status-dot"></span>

                        Active

                    </span>

                </div>


                <div class="setting-divider"></div>


                <!-- Sign Out -->
                <div class="account-item">

                    <div class="account-icon signout-icon">
                        <i class="bi bi-box-arrow-right"></i>
                    </div>

                    <div class="account-content">

                        <strong>
                            Sign out
                        </strong>

                        <p>
                            Sign out of your CupidSubs account on this device.
                        </p>

                    </div>

                    <button type="button" class="danger-button" :disabled="signingOut" @click="signOut">

                        <span v-if="signingOut">
                            Signing out...
                        </span>

                        <span v-else>
                            Sign out
                        </span>

                    </button>

                </div>

            </section>


            <!-- Saved Message -->
            <transition name="fade">

                <div v-if="savedMessage" class="saved-message">

                    <i class="bi bi-check-circle"></i>

                    {{ savedMessage }}

                </div>

            </transition>

        </div>

    </div>
</template>


<script setup>

import {
    ref,
    onMounted
} from 'vue'

import {
    useRouter
} from 'vue-router'

import {
    supabase
} from '../../lib/supabase'


const router = useRouter()


/* =========================
   STATE
========================= */

const signingOut = ref(false)

const savedMessage = ref('')


/* =========================
   SETTINGS
========================= */

const settings = ref({

    orderUpdates: true,

    paymentUpdates: true,

    promotions: false,

    rememberCheckout: true

})


/* =========================
   STORAGE KEY
========================= */

const SETTINGS_KEY =
    'cupidsubs_customer_settings'


/* =========================
   LOAD SETTINGS
========================= */

const loadSettings = () => {

    try {

        const saved =
            localStorage.getItem(
                SETTINGS_KEY
            )


        if (!saved) {
            return
        }


        const parsed =
            JSON.parse(saved)


        settings.value = {

            ...settings.value,

            ...parsed

        }


    } catch (err) {

        console.error(
            'Unable to load settings:',
            err
        )

    }

}


/* =========================
   SAVE SETTINGS
========================= */

const saveSettings = () => {

    try {

        localStorage.setItem(

            SETTINGS_KEY,

            JSON.stringify(
                settings.value
            )

        )


        showSavedMessage()


    } catch (err) {

        console.error(
            'Unable to save settings:',
            err
        )

    }

}


/* =========================
   TOGGLE SETTING
========================= */

const toggleSetting = (setting) => {

    settings.value[setting] =
        !settings.value[setting]


    saveSettings()

}


/* =========================
   CHECKOUT PREFERENCE
========================= */

const toggleCheckoutPreference = () => {

    settings.value.rememberCheckout =
        !settings.value.rememberCheckout


    saveSettings()


    /*
     * If the user turns this off,
     * remove previously remembered
     * checkout information.
     */

    if (
        !settings.value.rememberCheckout
    ) {

        localStorage.removeItem(
            'cupidsubs_checkout_information'
        )

    }

}


/* =========================
   SAVED MESSAGE
========================= */

let messageTimer = null


const showSavedMessage = () => {

    savedMessage.value =
        'Settings saved.'


    clearTimeout(
        messageTimer
    )


    messageTimer = setTimeout(() => {

        savedMessage.value = ''

    }, 2000)

}


/* =========================
   PROFILE
========================= */

const goToProfile = () => {

    router.push({
        name: 'profile'
    })

}


/* =========================
   SIGN OUT
========================= */

const signOut = async () => {

    signingOut.value = true


    try {

        const {
            error
        } = await supabase.auth.signOut()


        if (error) {
            throw error
        }


        router.push({
            name: 'Login'
        })


    } catch (err) {

        console.error(
            'Sign out error:',
            err
        )

    } finally {

        signingOut.value = false

    }

}


/* =========================
   INIT
========================= */

onMounted(() => {

    loadSettings()

})

</script>


<style scoped>
/* =========================
   PAGE
========================= */

.settings-page {
    min-height: 100vh;

    background: #f7f7f7;

    color: #171717;
}


.settings-container {
    width: 100%;

    max-width: 1050px;

    margin: 0 auto;

    padding: 42px 35px 70px;
}


/* =========================
   HEADER
========================= */

.settings-header {
    margin-bottom: 30px;
}


.eyebrow {
    display: block;

    margin-bottom: 8px;

    color: #888;

    font-size: 10px;
    font-weight: 700;

    letter-spacing: 1.5px;

    text-transform: uppercase;
}


.settings-header h1 {
    margin: 0;

    color: #171717;

    font-size: 36px;
    font-weight: 700;

    letter-spacing: -1px;
}


.settings-header p {
    max-width: 550px;

    margin: 10px 0 0;

    color: #777;

    font-size: 13px;

    line-height: 1.6;
}


/* =========================
   CARD
========================= */

.settings-card {
    margin-bottom: 18px;

    padding: 26px;

    border: 1px solid #e5e5e5;

    background: #fff;
}


/* =========================
   SECTION HEADING
========================= */

.section-heading {
    margin-bottom: 25px;
}


.section-number {
    display: block;

    margin-bottom: 7px;

    color: #aaa;

    font-size: 9px;
    font-weight: 700;

    letter-spacing: 1px;
}


.section-heading h2 {
    margin: 0 0 5px;

    font-size: 17px;
}


.section-heading p {
    margin: 0;

    color: #888;

    font-size: 11px;
}


/* =========================
   SETTINGS LIST
========================= */

.settings-list {
    width: 100%;
}


.setting-item,
.account-item {
    display: flex;

    align-items: center;

    gap: 14px;

    min-height: 58px;
}


.setting-icon,
.account-icon {
    display: flex;

    align-items: center;
    justify-content: center;

    width: 40px;
    height: 40px;

    flex-shrink: 0;

    background: #f3f3f3;

    color: #444;

    font-size: 15px;
}


.setting-content,
.account-content {
    min-width: 0;

    flex: 1;
}


.setting-content strong,
.account-content strong {
    display: block;

    margin-bottom: 4px;

    color: #222;

    font-size: 12px;
}


.setting-content p,
.account-content p {
    max-width: 600px;

    margin: 0;

    color: #888;

    font-size: 10px;

    line-height: 1.5;
}


.setting-divider {
    height: 1px;

    margin: 18px 0;

    background: #eee;
}


/* =========================
   TOGGLE
========================= */

.toggle {
    position: relative;

    width: 42px;
    height: 23px;

    flex-shrink: 0;

    padding: 0;

    border: none;

    border-radius: 20px;

    background: #d7d7d7;

    cursor: pointer;

    transition:
        background .2s ease;
}


.toggle span {
    position: absolute;

    top: 3px;
    left: 3px;

    width: 17px;
    height: 17px;

    border-radius: 50%;

    background: #fff;

    transition:
        transform .2s ease;
}


.toggle.active {
    background: #111;
}


.toggle.active span {
    transform: translateX(19px);
}


/* =========================
   PRIVACY
========================= */

.privacy-notice {
    display: flex;

    align-items: flex-start;

    gap: 10px;

    margin-top: 22px;

    padding: 15px;

    border: 1px solid #e7e7e7;

    background: #fafafa;
}


.privacy-notice>i {
    margin-top: 1px;

    color: #555;

    font-size: 15px;
}


.privacy-notice strong {
    display: block;

    margin-bottom: 4px;

    font-size: 11px;
}


.privacy-notice p {
    margin: 0;

    color: #888;

    font-size: 10px;

    line-height: 1.5;
}


/* =========================
   PROFILE BUTTON
========================= */

.outline-button {
    display: inline-flex;

    align-items: center;

    justify-content: center;

    gap: 7px;

    flex-shrink: 0;

    height: 38px;

    padding: 0 13px;

    border: 1px solid #ddd;

    background: #fff;

    color: #333;

    font-size: 10px;

    font-weight: 600;

    cursor: pointer;

    transition:
        border-color .2s ease,
        background .2s ease;
}


.outline-button:hover {
    border-color: #999;

    background: #fafafa;
}


/* =========================
   ACCOUNT STATUS
========================= */

.active-status {
    display: inline-flex;

    align-items: center;

    gap: 7px;

    flex-shrink: 0;

    color: #397449;

    font-size: 10px;

    font-weight: 600;
}


.status-dot {
    width: 7px;
    height: 7px;

    border-radius: 50%;

    background: #397449;
}


/* =========================
   SIGN OUT
========================= */

.signout-icon {
    color: #a33b3b;
}


.danger-button {
    flex-shrink: 0;

    height: 38px;

    padding: 0 13px;

    border: 1px solid #eadada;

    background: #fff8f8;

    color: #a33b3b;

    font-size: 10px;

    font-weight: 600;

    cursor: pointer;

    transition:
        border-color .2s ease,
        background .2s ease;
}


.danger-button:hover:not(:disabled) {
    border-color: #d7baba;

    background: #fff3f3;
}


.danger-button:disabled {
    opacity: .6;

    cursor: not-allowed;
}


/* =========================
   SAVED MESSAGE
========================= */

.saved-message {
    position: fixed;

    right: 25px;
    bottom: 25px;

    display: flex;

    align-items: center;

    gap: 8px;

    padding: 12px 16px;

    border: 1px solid #d8e6dc;

    background: #fff;

    color: #397449;

    font-size: 11px;

    z-index: 100;
}


.fade-enter-active,
.fade-leave-active {
    transition:
        opacity .2s ease,
        transform .2s ease;
}


.fade-enter-from,
.fade-leave-to {
    opacity: 0;

    transform:
        translateY(8px);
}


/* =========================
   RESPONSIVE
========================= */

@media (max-width: 700px) {

    .settings-container {
        padding: 30px 18px 50px;
    }


    .setting-item,
    .account-item {
        align-items: flex-start;

        flex-wrap: wrap;
    }


    .setting-content,
    .account-content {
        flex-basis:
            calc(100% - 54px);
    }


    .toggle {
        margin-left: 54px;
    }


    .outline-button,
    .danger-button,
    .active-status {
        margin-left: 54px;
    }

}


@media (max-width: 500px) {

    .settings-header h1 {
        font-size: 30px;
    }


    .settings-card {
        padding: 20px;
    }


    .saved-message {
        right: 15px;
        bottom: 15px;
        left: 15px;

        justify-content: center;
    }

}
</style>