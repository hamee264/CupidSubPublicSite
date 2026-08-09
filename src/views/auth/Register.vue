<template>
    <div class="container">

        <div class="auth-page">

            <!-- Homepage Button -->
            <RouterLink to="/" class="homepage-btn">

                <i class="bi bi-arrow-left"></i>

                <span>
                    Back to Homepage
                </span>

            </RouterLink>

        </div>


        <div class="register-page">

            <div class="register-container">

                <!-- Brand -->
                <div class="brand">

                    <div class="brand-icon">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>

                    <span>CupidSubs</span>

                </div>


                <!-- Header -->
                <div class="register-header">

                    <h1>
                        Create your account
                    </h1>

                    <p>
                        Create an account to start purchasing your favorite
                        digital subscriptions.
                    </p>

                </div>


                <!-- Google -->
                <button type="button" class="google-button" @click="continueWithGoogle" :disabled="loading">

                    <img src="/src/assets/google.svg" alt="Google" class="google-image">

                    <span>
                        Continue with Google
                    </span>

                </button>


                <!-- Divider -->
                <div class="divider">

                    <span></span>

                    <strong>
                        OR
                    </strong>

                    <span></span>

                </div>


                <!-- Error -->
                <div v-if="errorMessage" class="alert-box">

                    <i class="bi bi-exclamation-circle"></i>

                    <span>
                        {{ errorMessage }}
                    </span>

                </div>


                <!-- Success -->
                <div v-if="successMessage" class="success-box">

                    <i class="bi bi-check-circle"></i>

                    <span>
                        {{ successMessage }}
                    </span>

                </div>


                <!-- Form -->
                <form @submit.prevent="handleRegister" class="register-form">

                    <!-- Full Name -->
                    <div class="form-group">

                        <label>
                            Full Name
                        </label>

                        <div class="input-wrapper">

                            <i class="bi bi-person"></i>

                            <input v-model="form.fullName" type="text" placeholder="Enter your full name"
                                autocomplete="name" required>

                        </div>

                    </div>


                    <!-- Email -->
                    <div class="form-group">

                        <label>
                            Email Address
                        </label>

                        <div class="input-wrapper">

                            <i class="bi bi-envelope"></i>

                            <input v-model="form.email" type="email" placeholder="Enter your email address"
                                autocomplete="email" required>

                        </div>

                    </div>


                    <!-- Phone -->
                    <div class="form-group">

                        <label>
                            Phone Number
                        </label>

                        <div class="input-wrapper">

                            <i class="bi bi-telephone"></i>

                            <input v-model="form.phone" type="tel" placeholder="Enter your phone number"
                                autocomplete="tel" required>

                        </div>

                    </div>


                    <!-- Password -->
                    <div class="form-group">

                        <label>
                            Password
                        </label>

                        <div class="input-wrapper">

                            <i class="bi bi-lock"></i>

                            <input v-model="form.password" :type="showPassword
                                    ? 'text'
                                    : 'password'
                                " placeholder="Create a password" autocomplete="new-password" required minlength="6">

                            <button type="button" class="password-toggle" @click="
                                showPassword =
                                !showPassword
                                " aria-label="Toggle password visibility">

                                <i :class="showPassword
                                        ? 'bi bi-eye-slash'
                                        : 'bi bi-eye'
                                    "></i>

                            </button>

                        </div>

                    </div>


                    <!-- Confirm Password -->
                    <div class="form-group">

                        <label>
                            Confirm Password
                        </label>

                        <div class="input-wrapper">

                            <i class="bi bi-shield-lock"></i>

                            <input v-model="form.confirmPassword" :type="showConfirmPassword
                                    ? 'text'
                                    : 'password'
                                " placeholder="Confirm your password" autocomplete="new-password" required
                                minlength="6">

                            <button type="button" class="password-toggle" @click="
                                showConfirmPassword =
                                !showConfirmPassword
                                " aria-label="Toggle confirm password visibility">

                                <i :class="showConfirmPassword
                                        ? 'bi bi-eye-slash'
                                        : 'bi bi-eye'
                                    "></i>

                            </button>

                        </div>

                    </div>


                    <!-- Terms -->
                    <div class="terms">

                        <label class="checkbox-wrapper">

                            <input v-model="form.acceptTerms" type="checkbox">

                            <span class="checkmark"></span>

                        </label>

                        <p>

                            I agree to the

                            <a href="#">
                                Terms of Service
                            </a>

                            and

                            <a href="#">
                                Privacy Policy
                            </a>

                        </p>

                    </div>


                    <!-- Submit -->
                    <button type="submit" class="register-button" :disabled="loading">

                        <span v-if="!loading">
                            Create Account
                        </span>

                        <span v-else class="loading-content">

                            <span class="spinner"></span>

                            Creating Account...

                        </span>

                    </button>

                </form>


                <!-- Login -->
                <div class="login-section">

                    <span>
                        Already have an account?
                    </span>

                    <router-link to="/login">
                        Sign in
                    </router-link>

                </div>

            </div>

        </div>

    </div>
</template>


<script setup>

import {
    reactive,
    ref
} from "vue";

import {
    useRouter
} from "vue-router";

import {
    supabase
} from "../../lib/supabase.js";

import {
    useAuthStore
} from "../../stores/authStore";


const router = useRouter();

const auth = useAuthStore();


/* =========================================================
   STATE
========================================================= */

const loading = ref(false);

const errorMessage = ref("");

const successMessage = ref("");

const showPassword = ref(false);

const showConfirmPassword = ref(false);


/* =========================================================
   FORM
========================================================= */

const form = reactive({

    fullName: "",

    email: "",

    phone: "",

    password: "",

    confirmPassword: "",

    acceptTerms: false,

});


/* =========================================================
   GENERATE CUSTOMER CODE
========================================================= */

function generateCustomerCode() {

    const randomPart = Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();


    return `CUS-${randomPart}`;

}


/* =========================================================
   CREATE CUSTOMER
========================================================= */

async function createCustomer(user) {

    /*
     * Check whether this user already
     * has a customer record.
     */

    const {
        data: existingCustomer,
        error: customerCheckError,
    } = await supabase

        .from("customers")

        .select("id")

        .eq("id", user.id)

        .maybeSingle();


    if (customerCheckError) {

        throw customerCheckError;

    }


    /*
     * Customer already exists.
     */

    if (existingCustomer) {

        return;

    }


    /*
     * Normalize email before storing.
     */

    const normalizedEmail = (
        user.email ||
        form.email
    )
        .trim()
        .toLowerCase();


    /*
     * Create customer.
     */

    const {
        error: insertError,
    } = await supabase

        .from("customers")

        .insert({

            id:
                user.id,

            full_name:
                form.fullName.trim(),

            email:
                normalizedEmail,

            phone:
                form.phone.trim(),

            customer_code:
                generateCustomerCode(),

            total_orders:
                0,

            total_spent:
                0,

        });


    if (insertError) {

        throw insertError;

    }

}


/* =========================================================
   CHECK EXISTING CUSTOMER EMAIL
========================================================= */

async function checkExistingEmail(email) {

    const normalizedEmail =
        email
            .trim()
            .toLowerCase();


    const {
        data,
        error,
    } = await supabase

        .from("customers")

        .select("id")

        .eq("email", normalizedEmail)

        .maybeSingle();


    if (error) {

        throw error;

    }


    return !!data;

}


/* =========================================================
   REGISTER
========================================================= */

async function handleRegister() {

    errorMessage.value = "";

    successMessage.value = "";


    /* =====================================================
       NORMALIZE EMAIL
    ===================================================== */

    const normalizedEmail =
        form.email
            .trim()
            .toLowerCase();


    /* =====================================================
       BASIC VALIDATION
    ===================================================== */

    if (!form.fullName.trim()) {

        errorMessage.value =
            "Please enter your full name.";

        return;

    }


    if (!normalizedEmail) {

        errorMessage.value =
            "Please enter your email address.";

        return;

    }


    if (!form.phone.trim()) {

        errorMessage.value =
            "Please enter your phone number.";

        return;

    }


    /* =====================================================
       PASSWORD
    ===================================================== */

    if (form.password.length < 6) {

        errorMessage.value =
            "Password must be at least 6 characters.";

        return;

    }


    if (
        form.password !==
        form.confirmPassword
    ) {

        errorMessage.value =
            "Passwords do not match.";

        return;

    }


    /* =====================================================
       TERMS
    ===================================================== */

    if (!form.acceptTerms) {

        errorMessage.value =
            "Please accept the Terms of Service and Privacy Policy.";

        return;

    }


    loading.value = true;


    try {

        /* =================================================
           CHECK CUSTOMER EMAIL
        ================================================= */

        const emailExists =
            await checkExistingEmail(
                normalizedEmail
            );


        if (emailExists) {

            errorMessage.value =
                "An account with this email already exists. Please sign in instead.";

            return;

        }


        /* =================================================
           CREATE SUPABASE AUTH ACCOUNT
        ================================================= */

        const {
            data,
            error,
        } = await supabase.auth.signUp({

            email:
                normalizedEmail,

            password:
                form.password,

            options: {

                data: {

                    full_name:
                        form.fullName.trim(),

                    phone:
                        form.phone.trim(),

                },

            },

        });


        /* =================================================
           SUPABASE ERROR
        ================================================= */

        if (error) {

            /*
             * Handle duplicate email gracefully.
             */

            const message =
                error.message?.toLowerCase() || "";


            if (
                message.includes("already registered") ||
                message.includes("already exists") ||
                message.includes("user already")
            ) {

                errorMessage.value =
                    "An account with this email already exists. Please sign in instead.";

                return;

            }


            throw error;

        }


        /* =================================================
           CHECK USER
        ================================================= */

        if (!data?.user) {

            throw new Error(
                "Unable to create your account. Please try again."
            );

        }


        /* =================================================
           EMAIL CONFIRMATION CHECK
        ================================================= */

        /*
         * Your current setup expects email
         * confirmation to be disabled.
         */

        if (!data.session) {

            throw new Error(
                "Account was created, but no active session was returned. Please disable email confirmation in Supabase Authentication settings."
            );

        }


        /* =================================================
           SAVE USER TO PINIA
        ================================================= */

        auth.user =
            data.user;


        /* =================================================
           CREATE CUSTOMER RECORD
        ================================================= */

        await createCustomer(
            data.user
        );


        /* =================================================
           SUCCESS
        ================================================= */

        successMessage.value =
            "Account created successfully.";


        /* =================================================
           REDIRECT
        ================================================= */

        setTimeout(() => {

            router.replace("/app");

        }, 500);


    } catch (error) {

        console.error(
            "Registration failed:",
            error
        );


        const message =
            error?.message?.toLowerCase() || "";


        /* =================================================
           DUPLICATE EMAIL FALLBACK
        ================================================= */

        if (
            message.includes("already registered") ||
            message.includes("already exists") ||
            message.includes("user already") ||
            message.includes("duplicate") ||
            message.includes("unique")
        ) {

            errorMessage.value =
                "An account with this email already exists. Please sign in instead.";

        } else {

            errorMessage.value =
                error?.message ||
                "Unable to create your account.";

        }

    } finally {

        loading.value = false;

    }

}


/* =========================================================
   GOOGLE AUTHENTICATION
========================================================= */

async function continueWithGoogle() {

    errorMessage.value = "";

    successMessage.value = "";

    loading.value = true;


    try {

        const {
            error,
        } = await supabase.auth.signInWithOAuth({

            provider:
                "google",

            options: {

                redirectTo:
                    `${window.location.origin}/auth/callback`,

            },

        });


        if (error) {

            throw error;

        }


    } catch (error) {

        console.error(
            "Google authentication failed:",
            error
        );


        errorMessage.value =
            error?.message ||
            "Unable to continue with Google.";


        loading.value = false;

    }

}

</script>


<style scoped>
/* ==========================================
   PAGE
========================================== */

.auth-page {

    width: 100%;

    display: flex;

    flex-direction: column;

    align-items: center;

    gap: 18px;

}


/* ==========================================
   HOMEPAGE BUTTON
========================================== */

.homepage-btn {

    align-self: flex-start;

    display: inline-flex;

    align-items: center;

    gap: 8px;

    padding: 9px 13px;

    border: 1px solid #e5e7eb;

    border-radius: 9px;

    background: #ffffff;

    color: #64748b;

    text-decoration: none;

    font-size: 12px;

    font-weight: 600;

    transition:
        color .2s ease,
        border-color .2s ease,
        background .2s ease,
        transform .2s ease;

}


.homepage-btn i {

    font-size: 13px;

}


.homepage-btn:hover {

    color: #111827;

    border-color: #cbd5e1;

    background: #f8fafc;

}


.homepage-btn:active {

    transform: scale(.97);

}


/* ==========================================
   CONTAINER
========================================== */

.container {

    background: #f8fafc;

    padding: 55px 20px;

    margin: 0;

    width: 100%;

}


.register-page {

    min-height: 100vh;

    display: flex;

    justify-content: center;

    color: #111827;

}


/* ==========================================
   REGISTER CONTAINER
========================================== */

.register-container {

    width: 100%;

    max-width: 545px;

}


/* ==========================================
   BRAND
========================================== */

.brand {

    display: flex;

    align-items: center;

    justify-content: center;

    gap: 10px;

    margin-bottom: 35px;

    color: #111827;

    font-size: 18px;

    font-weight: 700;

}


.brand-icon {

    display: grid;

    grid-template-columns:
        repeat(2, 8px);

    gap: 3px;

}


.brand-icon span {

    width: 8px;

    height: 8px;

    border-radius: 3px;

    background: #111827;

}


.brand-icon span:nth-child(2) {

    opacity: .75;

}


.brand-icon span:nth-child(3) {

    opacity: .45;

}


.brand-icon span:nth-child(4) {

    opacity: .2;

}


/* ==========================================
   HEADER
========================================== */

.register-header {

    margin-bottom: 34px;

    text-align: center;

}


.register-header h1 {

    margin: 0 0 10px;

    color: #111827;

    font-size: 32px;

    font-weight: 700;

    line-height: 1.2;

    letter-spacing: -.7px;

}


.register-header p {

    max-width: 480px;

    margin: 0 auto;

    color: #6b7280;

    font-size: 13px;

    line-height: 1.7;

}


/* ==========================================
   GOOGLE
========================================== */

.google-button {

    display: flex;

    align-items: center;

    justify-content: center;

    gap: 12px;

    width: 100%;

    height: 54px;

    border: 1px solid #d7dbe0;

    border-radius: 11px;

    background: #ffffff;

    color: #111827;

    font-size: 14px;

    font-weight: 600;

    cursor: pointer;

    transition:
        background .2s ease,
        border-color .2s ease,
        transform .2s ease;

}


.google-button:hover:not(:disabled) {

    background: #f8fafc;

    border-color: #aeb4bc;

}


.google-button:active:not(:disabled) {

    transform: scale(.985);

}


.google-button:disabled {

    opacity: .6;

    cursor: not-allowed;

}


.google-image {

    width: 20px;

    height: 20px;

    object-fit: contain;

}


/* ==========================================
   DIVIDER
========================================== */

.divider {

    display: flex;

    align-items: center;

    gap: 16px;

    margin: 30px 0;

}


.divider span {

    flex: 1;

    height: 1px;

    background: #e5e7eb;

}


.divider strong {

    color: #9ca3af;

    font-size: 10px;

    font-weight: 700;

    letter-spacing: .08em;

}


/* ==========================================
   ALERTS
========================================== */

.alert-box,
.success-box {

    display: flex;

    align-items: flex-start;

    gap: 10px;

    padding: 14px 15px;

    margin-bottom: 23px;

    border-radius: 10px;

    font-size: 12px;

    line-height: 1.5;

}


.alert-box {

    border: 1px solid #eadada;

    background: #fff8f8;

    color: #a33b3b;

}


.success-box {

    border: 1px solid #d4e7da;

    background: #f7fbf8;

    color: #397449;

}


.alert-box i,
.success-box i {

    flex-shrink: 0;

    margin-top: 1px;

    font-size: 15px;

}


/* ==========================================
   FORM
========================================== */

.register-form {

    width: 100%;

}


.form-group {

    margin-bottom: 20px;

}


.form-group label {

    display: block;

    margin-bottom: 8px;

    color: #374151;

    font-size: 12px;

    font-weight: 600;

}


/* ==========================================
   INPUT
========================================== */

.input-wrapper {

    display: flex;

    align-items: center;

    width: 100%;

    height: 54px;

    overflow: hidden;

    border: 1px solid #d7dbe0;

    border-radius: 11px;

    background: #ffffff;

    transition:
        border-color .2s ease,
        background .2s ease;

}


.input-wrapper:hover {

    border-color: #aeb4bc;

}


.input-wrapper:focus-within {

    border-color: #111827;

    background: #ffffff;

}


.input-wrapper>i {

    display: flex;

    align-items: center;

    justify-content: center;

    width: 48px;

    flex-shrink: 0;

    color: #9ca3af;

    font-size: 16px;

}


.input-wrapper input {

    width: 100%;

    height: 100%;

    padding: 0 12px 0 0;

    border: none;

    outline: none;

    background: transparent;

    color: #111827;

    font-family: inherit;

    font-size: 13px;

}


.input-wrapper input::placeholder {

    color: #9ca3af;

}


/* ==========================================
   PASSWORD TOGGLE
========================================== */

.password-toggle {

    display: flex;

    align-items: center;

    justify-content: center;

    width: 46px;

    height: 100%;

    flex-shrink: 0;

    padding: 0;

    border: none;

    background: transparent;

    color: #9ca3af;

    cursor: pointer;

    font-size: 16px;

}


.password-toggle:hover {

    color: #111827;

}


/* ==========================================
   TERMS
========================================== */

.terms {

    display: flex;

    align-items: flex-start;

    gap: 10px;

    margin: 5px 0 24px;

}


.checkbox-wrapper {

    position: relative;

    width: 17px;

    height: 17px;

    flex-shrink: 0;

    margin-top: 2px;

}


.checkbox-wrapper input {

    position: absolute;

    width: 1px;

    height: 1px;

    opacity: 0;

}


.checkmark {

    display: block;

    position: relative;

    width: 17px;

    height: 17px;

    border: 1px solid #cbd0d7;

    border-radius: 4px;

    background: #ffffff;

    cursor: pointer;

    transition:
        background .2s ease,
        border-color .2s ease;

}


.checkbox-wrapper input:checked+.checkmark {

    border-color: #111827;

    background: #111827;

}


.checkbox-wrapper input:checked+.checkmark::after {

    content: "";

    position: absolute;

    top: 2px;

    left: 5px;

    width: 4px;

    height: 8px;

    border: solid #ffffff;

    border-width: 0 2px 2px 0;

    transform: rotate(45deg);

}


.terms p {

    margin: 0;

    color: #6b7280;

    font-size: 11px;

    line-height: 1.6;

}


.terms a {

    color: #111827;

    font-weight: 600;

    text-decoration: none;

}


.terms a:hover {

    text-decoration: underline;

}


/* ==========================================
   REGISTER BUTTON
========================================== */

.register-button {

    display: flex;

    align-items: center;

    justify-content: center;

    width: 100%;

    height: 54px;

    border: 1px solid #111827;

    border-radius: 11px;

    background: #111827;

    color: #ffffff;

    font-size: 14px;

    font-weight: 600;

    cursor: pointer;

    transition:
        background .2s ease,
        border-color .2s ease,
        transform .2s ease;

}


.register-button:hover:not(:disabled) {

    border-color: #252b35;

    background: #252b35;

}


.register-button:active:not(:disabled) {

    transform: scale(.985);

}


.register-button:disabled {

    opacity: .6;

    cursor: not-allowed;

}


/* ==========================================
   LOADING
========================================== */

.loading-content {

    display: flex;

    align-items: center;

    justify-content: center;

    gap: 9px;

}


.spinner {

    width: 17px;

    height: 17px;

    border: 2px solid rgba(255, 255, 255, .35);

    border-top-color: #ffffff;

    border-radius: 50%;

    animation:
        spin .7s linear infinite;

}


@keyframes spin {

    to {

        transform: rotate(360deg);

    }

}


/* ==========================================
   LOGIN
========================================== */

.login-section {

    margin-top: 26px;

    color: #6b7280;

    font-size: 12px;

    text-align: center;

}


.login-section a {

    margin-left: 5px;

    color: #111827;

    font-weight: 600;

    text-decoration: none;

}


.login-section a:hover {

    color: #4b5563;

    text-decoration: underline;

}


/* ==========================================
   AUTOFILL
========================================== */

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {

    -webkit-box-shadow:
        0 0 0 1000px #ffffff inset;

    -webkit-text-fill-color:
        #111827;

}


/* ==========================================
   MOBILE
========================================== */

@media (max-width: 576px) {

    .register-page {

        padding: 35px 16px;

    }


    .brand {

        margin-bottom: 30px;

    }


    .register-header {

        margin-bottom: 28px;

    }


    .register-header h1 {

        font-size: 27px;

    }


    .register-header p {

        font-size: 12px;

    }


    .google-button {

        height: 52px;

        font-size: 13px;

    }


    .input-wrapper {

        height: 52px;

    }


    .register-button {

        height: 52px;

    }

}


/* ==========================================
   SMALL PHONES
========================================== */

@media (max-width: 400px) {

    .register-page {

        padding: 28px 14px;

    }


    .register-header h1 {

        font-size: 24px;

    }


    .form-group {

        margin-bottom: 17px;

    }


    .terms p {

        font-size: 10px;

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