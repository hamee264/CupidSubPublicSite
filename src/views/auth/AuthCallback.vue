<template>

    <div class="callback-container">

        <div class="callback-card">

            <div class="loader"></div>

            <h2>
                Signing you in...
            </h2>

            <p>
                Please wait while we prepare your account.
            </p>

        </div>

    </div>

</template>


<script setup>

import { onMounted } from "vue";
import { useRouter } from "vue-router";

import { supabase } from "../../lib/supabase.js";
import { useAuthStore } from "../../stores/authStore";


const router = useRouter();
const auth = useAuthStore();


async function handleCallback() {

    try {

        /*
         * Get the authenticated Supabase user
         */

        const {
            data: { user },
            error: userError,
        } = await supabase.auth.getUser();


        if (userError) {

            throw userError;

        }


        /*
         * No authenticated user
         */

        if (!user) {

            router.replace("/login");

            return;

        }


        /*
         * Store authenticated user
         * in Pinia
         */

        auth.user = user;


        /*
         * Check whether the customer
         * already exists.
         */

        const {
            data: customer,
            error: customerError,
        } = await supabase

            .from("customers")

            .select("id")

            .eq("id", user.id)

            .maybeSingle();


        if (customerError) {

            throw customerError;

        }


        /*
         * Create customer profile
         * on first login.
         *
         * customer_code is NOT supplied here.
         *
         * PostgreSQL generates it through:
         *
         * customer_code_trigger
         */

        if (!customer) {

            const {
                error: insertError,
            } = await supabase

                .from("customers")

                .insert({

                    id: user.id,

                    full_name:
                        user.user_metadata?.full_name ||
                        user.user_metadata?.name ||
                        "",

                    email:
                        user.email || "",

                    phone: "",

                    total_orders: 0,

                    total_spent: 0,

                });


            if (insertError) {

                throw insertError;

            }

        }


        /*
         * Customer authentication is complete.
         *
         * Dashboard route is /app
         */

        router.replace("/app");

    }

    catch (error) {

        console.error(
            "Authentication callback failed:",
            error
        );

        router.replace("/login");

    }

}


onMounted(() => {

    handleCallback();

});

</script>


<style scoped>
.callback-container {

    min-height: 100vh;

    display: flex;

    align-items: center;

    justify-content: center;

    background: #f8fafc;

    padding: 24px;

}


.callback-card {

    width: 100%;

    max-width: 420px;

    text-align: center;

}


.loader {

    width: 52px;

    height: 52px;

    margin: 0 auto 24px;

    border: 4px solid #e5e7eb;

    border-top-color: #2563eb;

    border-radius: 50%;

    animation: spin 0.8s linear infinite;

}


h2 {

    margin: 0 0 10px;

    color: #111827;

    font-size: 24px;

    font-weight: 700;

}


p {

    margin: 0;

    color: #6b7280;

    font-size: 15px;

}


@keyframes spin {

    to {

        transform: rotate(360deg);

    }

}
</style>