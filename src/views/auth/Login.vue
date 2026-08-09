<template>
    <AuthLayout>
        <div class="auth-page">

            <!-- Homepage Button -->

            <RouterLink to="/" class="homepage-btn">

                <i class="bi bi-arrow-left"></i>

                <span>
                    Back to Homepage
                </span>

            </RouterLink>




        </div>

        <div class="login-card">

            <!-- Brand -->

            <router-link to="/" class="brand-mark">

                <div class="brand-icon">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <span>CupidSubs</span>

            </router-link>


            <!-- Header -->

            <div class="login-header">

                <h1>Welcome back 👋</h1>

                <p>
                    Continue with your Google account or sign in with your email.
                </p>

            </div>


            <!-- Form Error -->

            <div v-if="formError" class="form-error">

                <i class="bi bi-exclamation-circle"></i>

                <span>
                    {{ formError }}
                </span>

            </div>


            <!-- Google Login -->

            <button class="google-btn" type="button" @click="signInWithGoogle" :disabled="loading">

                <img src="../../assets/google.svg" alt="Google">

                <span>
                    {{ googleLoading ? "Connecting..." : "Continue with Google" }}
                </span>

            </button>


            <!-- Divider -->

            <div class="divider">

                <span></span>

                <p>OR</p>

                <span></span>

            </div>


            <!-- Login Form -->

            <form @submit.prevent="signIn" novalidate>

                <!-- Email -->

                <div class="form-group">

                    <label for="login-email">
                        Email Address
                    </label>

                    <div class="input-group" :class="{ 'input-error': fieldErrors.email }">

                        <i class="bi bi-envelope"></i>

                        <input id="login-email" v-model.trim="form.email" type="email" placeholder="Enter your email"
                            autocomplete="email" @input="fieldErrors.email = ''">

                    </div>

                    <p v-if="fieldErrors.email" class="error-text">
                        {{ fieldErrors.email }}
                    </p>

                </div>


                <!-- Password -->

                <div class="form-group">

                    <label for="login-password">
                        Password
                    </label>

                    <div class="input-group" :class="{ 'input-error': fieldErrors.password }">

                        <i class="bi bi-lock"></i>

                        <input id="login-password" v-model="form.password" :type="showPassword ? 'text' : 'password'"
                            placeholder="Enter your password" autocomplete="current-password"
                            @input="fieldErrors.password = ''">

                        <button type="button" class="password-toggle" :aria-label="showPassword
                            ? 'Hide password'
                            : 'Show password'
                            " @click="showPassword = !showPassword">

                            <i :class="showPassword
                                ? 'bi bi-eye-slash'
                                : 'bi bi-eye'
                                "></i>

                        </button>

                    </div>

                    <p v-if="fieldErrors.password" class="error-text">
                        {{ fieldErrors.password }}
                    </p>

                </div>


                <!-- Forgot Password -->

                <!-- <div class="form-options">

                    <span></span>

                    <RouterLink to="/forgot-password" class="forgot-link">
                        Forgot Password?
                    </RouterLink>

                </div> -->


                <!-- Login Button -->

                <button class="login-btn" type="submit" :disabled="loading">

                    <i v-if="emailLoading" class="bi bi-arrow-repeat spin"></i>

                    <span>
                        {{ emailLoading ? "Signing In..." : "Sign In" }}
                    </span>

                </button>

            </form>


            <!-- Register -->

            <div class="bottom-text">

                Don't have an account?

                <RouterLink to="/register">
                    Create Account
                </RouterLink>

            </div>

        </div>

    </AuthLayout>
</template>


<script setup>

import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "../../lib/supabase.js";

const router = useRouter();


/* ==========================================
   STATE
========================================== */

const emailLoading = ref(false);

const googleLoading = ref(false);

const showPassword = ref(false);

const formError = ref("");


/* ==========================================
   FORM
========================================== */

const form = reactive({

    email: "",

    password: ""

});


/* ==========================================
   FIELD ERRORS
========================================== */

const fieldErrors = reactive({

    email: "",

    password: ""

});


/* ==========================================
   COMPUTED LOADING
========================================== */

const loading = ref(false);


/* ==========================================
   VALIDATE
========================================== */

const validate = () => {

    fieldErrors.email = "";
    fieldErrors.password = "";

    let valid = true;


    if (!form.email) {

        fieldErrors.email = "Email is required.";

        valid = false;

    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {

        fieldErrors.email = "Please enter a valid email address.";

        valid = false;

    }


    if (!form.password) {

        fieldErrors.password = "Password is required.";

        valid = false;

    }


    return valid;

};


/* ==========================================
   SIGN IN
========================================== */

const signIn = async () => {

    formError.value = "";

    if (!validate()) return;


    try {

        emailLoading.value = true;
        loading.value = true;


        const { data, error } =
            await supabase.auth.signInWithPassword({

                email: form.email,

                password: form.password

            });


        if (error) {

            if (
                error.message
                    .toLowerCase()
                    .includes("invalid login credentials")
            ) {

                formError.value =
                    "Incorrect email or password.";

            } else {

                formError.value =
                    error.message;

            }

            return;

        }


        if (!data?.session) {

            formError.value =
                "Login was successful, but no active session was returned.";

            return;

        }


        /* ------------------------------------------
           LOGIN SUCCESS
        ------------------------------------------ */

        router.push("/app");


    } catch (error) {

        console.error("Login failed:", error);

        formError.value =
            "Something went wrong while signing in. Please try again.";

    } finally {

        emailLoading.value = false;

        loading.value = false;

    }

};


/* ==========================================
   GOOGLE LOGIN
========================================== */

const signInWithGoogle = async () => {

    formError.value = "";


    try {

        googleLoading.value = true;
        loading.value = true;


        const { error } =
            await supabase.auth.signInWithOAuth({

                provider: "google",

                options: {

                    redirectTo:
                        `${window.location.origin}/auth/callback`

                }

            });


        if (error) {

            throw error;

        }


    } catch (error) {

        console.error(
            "Google login failed:",
            error
        );

        formError.value =
            error.message ||
            "Unable to continue with Google.";

        googleLoading.value = false;

        loading.value = false;

    }

};

</script>


<style scoped>
/* ==========================================
   AUTH PAGE
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

.login-card {

    width: 100%;
    max-width: 520px;

    margin: auto;

    background: #ffffff;

    border-radius: 18px;

    padding: 45px;

    border: 1px solid #e5e7eb;

    box-shadow:
        0 20px 50px rgba(17, 24, 39, .05);

    animation: card-in .4s ease both;

}


/* ==========================================
   CARD ANIMATION
========================================== */

@keyframes card-in {

    from {

        opacity: 0;

        transform:
            translateY(10px);

    }

    to {

        opacity: 1;

        transform:
            translateY(0);

    }

}


/* ==========================================
   BRAND
========================================== */

.brand-mark {

    display: flex;

    align-items: center;
    justify-content: center;

    gap: 10px;

    text-decoration: none;

    margin-bottom: 28px;

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


.brand-mark>span:last-child {

    color: #111827;

    font-size: 1.05rem;

    font-weight: 700;

}


/* ==========================================
   HEADER
========================================== */

.login-header {

    margin-bottom: 35px;

    text-align: center;

}


.login-header h1 {

    margin-bottom: 10px;

    color: #111827;

    font-size: 2rem;

    font-weight: 700;

    letter-spacing: -.5px;

}


.login-header p {

    margin: 0;

    color: #6b7280;

    line-height: 1.7;

}


/* ==========================================
   FORM ERROR
========================================== */

.form-error {

    display: flex;

    align-items: flex-start;

    gap: 10px;

    margin-bottom: 24px;

    padding: 14px 16px;

    border: 1px solid #eadada;

    border-radius: 10px;

    background: #fff8f8;

    color: #a33b3b;

    font-size: 13px;

    line-height: 1.5;

}


.form-error i {

    flex-shrink: 0;

    margin-top: 1px;

    font-size: 16px;

}


/* ==========================================
   GOOGLE BUTTON
========================================== */

.google-btn {

    display: flex;

    align-items: center;
    justify-content: center;

    gap: 14px;

    width: 100%;
    height: 54px;

    margin-bottom: 30px;

    border: 1px solid #dcdfe4;

    border-radius: 12px;

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


.google-btn:hover:not(:disabled) {

    background: #f8fafc;

    border-color: #b8bcc4;

}


.google-btn:active:not(:disabled) {

    transform: scale(.985);

}


.google-btn img {

    width: 20px;
    height: 20px;

}


/* ==========================================
   DIVIDER
========================================== */

.divider {

    display: flex;

    align-items: center;

    gap: 15px;

    margin: 30px 0;

}


.divider span {

    flex: 1;

    height: 1px;

    background: #e5e7eb;

}


.divider p {

    margin: 0;

    color: #9ca3af;

    font-size: 11px;

    font-weight: 700;

    letter-spacing: .08em;

}


/* ==========================================
   FORM
========================================== */

.form-group {

    margin-bottom: 22px;

}


.form-group label {

    display: block;

    margin-bottom: 9px;

    color: #374151;

    font-size: 12px;

    font-weight: 600;

}


.input-group {

    display: flex;

    align-items: center;

    padding: 0 15px;

    border: 1px solid #d7dbe0;

    border-radius: 11px;

    background: #ffffff;

    transition:
        border-color .2s ease,
        background .2s ease;

}


.input-group:focus-within {

    border-color: #111827;

    background: #ffffff;

}


.input-group:hover {

    border-color: #aeb4bc;

}


.input-group>i {

    flex-shrink: 0;

    color: #9ca3af;

    font-size: 16px;

}


.input-group input {

    flex: 1;

    height: 54px;

    padding: 0 14px;

    border: none;

    outline: none;

    background: transparent;

    color: #111827;

    font-family: inherit;

    font-size: 14px;

}


.input-group input::placeholder {

    color: #9ca3af;

}


/* ==========================================
   ERROR STATE
========================================== */

.input-error {

    border-color: #c96b6b !important;

}


.input-error:focus-within {

    border-color: #b64d4d !important;

}


.error-text {

    margin-top: 7px;
    margin-bottom: 0;

    color: #a33b3b;

    font-size: 11px;

}


/* ==========================================
   PASSWORD TOGGLE
========================================== */

.password-toggle {

    display: flex;

    align-items: center;
    justify-content: center;

    padding: 4px;

    border: none;

    background: transparent;

    color: #8b929c;

    cursor: pointer;

}


.password-toggle:hover {

    color: #111827;

}


.password-toggle i {

    font-size: 16px;

}


/* ==========================================
   LOGIN BUTTON
========================================== */

.login-btn {

    display: flex;

    align-items: center;
    justify-content: center;

    gap: 9px;

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


.login-btn:hover:not(:disabled) {

    background: #252b35;

    border-color: #252b35;

}


.login-btn:active:not(:disabled) {

    transform: scale(.985);

}


.login-btn:disabled,
.google-btn:disabled {

    opacity: .6;

    cursor: not-allowed;

}


/* ==========================================
   LOADING
========================================== */

.spin {

    display: inline-block;

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
   BOTTOM
========================================== */

.bottom-text {

    margin-top: 30px;

    color: #6b7280;

    font-size: 13px;

    text-align: center;

}


.bottom-text a {

    margin-left: 5px;

    color: #111827;

    font-weight: 600;

    text-decoration: none;

    transition:
        color .2s ease;

}


.bottom-text a:hover {

    color: #555b65;

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
   TABLET
========================================== */

@media (max-width: 992px) {

    .login-card {

        max-width: 100%;

        padding: 40px 35px;

    }


    .login-header h1 {

        font-size: 1.8rem;

    }

}


/* ==========================================
   MOBILE
========================================== */

@media (max-width: 768px) {

    .login-card {

        padding: 30px 22px;

        border-radius: 16px;

    }


    .login-header {

        margin-bottom: 28px;

    }


    .login-header h1 {

        font-size: 1.6rem;

    }


    .login-header p {

        font-size: 13px;

    }


    .google-btn {

        height: 52px;

        font-size: 13px;

    }


    .google-btn img {

        width: 19px;
        height: 19px;

    }


    .input-group input {

        height: 52px;

        font-size: 13px;

    }


    .login-btn {

        height: 52px;

        font-size: 14px;

    }


    .bottom-text {

        margin-top: 25px;

        font-size: 13px;

    }

}


/* ==========================================
   SMALL PHONES
========================================== */

@media (max-width: 480px) {

    .login-card {

        padding: 24px 18px;

    }


    .login-header h1 {

        font-size: 1.45rem;

    }


    .google-btn {

        gap: 10px;

    }


    .divider {

        margin: 24px 0;

    }


    .form-group {

        margin-bottom: 18px;

    }


    .login-btn {

        height: 50px;

    }


    .form-error {

        padding: 12px 14px;

        font-size: 12px;

    }

}


/* ==========================================
   LARGE DESKTOP
========================================== */

@media (min-width: 1200px) {

    .login-card {

        max-width: 540px;

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


    .login-card {

        opacity: 1;

        transform: none;

    }

}
</style>