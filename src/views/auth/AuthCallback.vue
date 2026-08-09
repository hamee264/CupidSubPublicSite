<template>

    <AuthLayout>

        <div class="callback-page">

            <div class="callback-icon">

                <i class="bi bi-shield-check"></i>

            </div>

            <h1>
                Signing you in
            </h1>

            <p>
                Please wait while we finish setting up your account.
            </p>

            <div class="spinner"></div>

        </div>

    </AuthLayout>

</template>


<script setup>

import {
    onMounted,
} from "vue";

import {
    useRouter,
} from "vue-router";

import {
    supabase,
} from "../../lib/supabase.js";

import {
    useAuthStore,
} from "../../stores/authStore";


const router = useRouter();

const auth = useAuthStore();


onMounted(async () => {

    try {

        /*
         * Get the session created by Supabase OAuth.
         */

        const {
            data,
            error,
        } =
            await supabase.auth.getSession();


        if (error) {

            throw error;

        }


        const session =
            data?.session;


        if (!session?.user) {

            throw new Error(
                "Unable to retrieve your account session."
            );

        }


        /*
         * Update Pinia.
         */

        auth.session =
            session;

        auth.user =
            session.user;


        /*
         * Redirect to customer dashboard.
         */

        await router.replace("/app");


    } catch (error) {

        console.error(
            "Authentication callback failed:",
            error
        );

        await router.replace({
            path: "/login",

            query: {
                error:
                    "google-auth-failed",
            },
        });

    }

});

</script>


<style scoped>
.callback-page {

    min-height: 400px;

    display: flex;

    flex-direction: column;

    align-items: center;

    justify-content: center;

    text-align: center;

}


.callback-icon {

    width: 54px;

    height: 54px;

    display: flex;

    align-items: center;

    justify-content: center;

    margin-bottom: 20px;

    border-radius: 50%;

    background: #f3f4f6;

    color: #111827;

    font-size: 22px;

}


.callback-page h1 {

    margin: 0 0 8px;

    color: #111827;

    font-size: 22px;

    font-weight: 700;

}


.callback-page p {

    margin: 0 0 22px;

    color: #6b7280;

    font-size: 13px;

}


.spinner {

    width: 22px;

    height: 22px;

    border: 2px solid #e5e7eb;

    border-top-color: #111827;

    border-radius: 50%;

    animation: spin .7s linear infinite;

}


@keyframes spin {

    to {

        transform: rotate(360deg);

    }

}
</style>