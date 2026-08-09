<template>
    <div class="profile-page">

        <div class="profile-container">

            <!-- Header -->
            <section class="profile-header">

                <div>
                    <span class="eyebrow">
                        Account
                    </span>

                    <h1>
                        Your profile
                    </h1>

                    <p>
                        Manage your personal information and account settings.
                    </p>
                </div>

            </section>


            <!-- Loading -->
            <div v-if="loading" class="loading-state">

                <div class="spinner"></div>

                <p>
                    Loading profile...
                </p>

            </div>


            <!-- Error -->
            <div v-else-if="error" class="error-box">

                <i class="bi bi-exclamation-circle"></i>

                <span>
                    {{ error }}
                </span>

            </div>


            <!-- Profile -->
            <template v-else>

                <!-- Account Overview -->
                <section class="profile-card overview-card">

                    <div class="profile-identity">

                        <div class="avatar">
                            {{ initials }}
                        </div>

                        <div>

                            <h2>
                                {{ form.full_name || 'Customer' }}
                            </h2>

                            <p>
                                {{ user?.email }}
                            </p>

                        </div>

                    </div>


                    <div class="account-status">

                        <span class="status-dot"></span>

                        Active account

                    </div>

                </section>


                <!-- Personal Information -->
                <section class="profile-card">

                    <div class="section-heading">

                        <div>
                            <span class="section-number">
                                01
                            </span>

                            <h2>
                                Personal information
                            </h2>

                            <p>
                                Keep your contact information up to date.
                            </p>
                        </div>

                    </div>


                    <form @submit.prevent="saveProfile">

                        <div class="form-grid">

                            <!-- Full Name -->
                            <div class="form-group">

                                <label>
                                    Full name
                                </label>

                                <input v-model="form.full_name" type="text" placeholder="Enter your full name"
                                    :disabled="saving" />

                            </div>


                            <!-- Email -->
                            <div class="form-group">

                                <label>
                                    Email address
                                </label>

                                <input :value="user?.email || ''" type="email" disabled />

                                <small>
                                    Your email is managed by your account authentication.
                                </small>

                            </div>


                            <!-- Phone -->
                            <div class="form-group">

                                <label>
                                    Phone number
                                </label>

                                <input v-model="form.phone" type="tel" inputmode="tel" placeholder="08012345678"
                                    :disabled="saving" />

                            </div>

                        </div>


                        <div class="form-footer">

                            <span v-if="saveMessage" class="save-message">
                                <i class="bi bi-check-circle"></i>
                                {{ saveMessage }}
                            </span>

                            <button type="submit" class="save-button" :disabled="saving">

                                <span v-if="saving">

                                    <i class="bi bi-arrow-repeat spin"></i>

                                    Saving...

                                </span>

                                <span v-else>

                                    Save changes

                                    <i class="bi bi-arrow-right"></i>

                                </span>

                            </button>

                        </div>

                    </form>

                </section>




                <!-- Account Information -->
                <section class="profile-card account-details">

                    <div class="section-heading">

                        <div>
                            <span class="section-number">
                                03
                            </span>

                            <h2>
                                Account information
                            </h2>

                            <p>
                                Basic information about your account.
                            </p>
                        </div>

                    </div>


                    <div class="details-grid">

                        <div class="detail">

                            <span>
                                Account ID
                            </span>

                            <strong>
                                {{ user?.id }}
                            </strong>

                        </div>


                        <div class="detail">

                            <span>
                                Email
                            </span>

                            <strong>
                                {{ user?.email }}
                            </strong>

                        </div>


                        <div class="detail">

                            <span>
                                Account created
                            </span>

                            <strong>
                                {{ formatDate(user?.created_at) }}
                            </strong>

                        </div>

                    </div>

                </section>

            </template>

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


/* =========================
   STATE
========================= */

const loading = ref(true)

const saving = ref(false)

const passwordLoading = ref(false)

const signingOut = ref(false)

const error = ref('')

const saveMessage = ref('')

const user = ref(null)

const customer = ref(null)


/* =========================
   FORM
========================= */

const form = ref({

    full_name: '',

    phone: ''

})


/* =========================
   INITIALS
========================= */

const initials = computed(() => {

    const name =
        form.value.full_name?.trim()

    if (!name) {
        return 'CU'
    }

    const parts =
        name.split(/\s+/)

    if (parts.length === 1) {

        return parts[0]
            .substring(0, 2)
            .toUpperCase()

    }

    return (
        parts[0][0] +
        parts[parts.length - 1][0]
    ).toUpperCase()

})


/* =========================
   LOAD PROFILE
========================= */

const loadProfile = async () => {

    loading.value = true

    error.value = ''

    try {

        const {
            data: {
                user: authUser
            },
            error: authError
        } = await supabase.auth.getUser()


        if (authError) {
            throw authError
        }


        if (!authUser) {

            router.push({
                name: 'Login'
            })

            return

        }


        user.value = authUser


        /* =========================
           CUSTOMER RECORD
        ========================= */

        const {
            data: customerData,
            error: customerError
        } = await supabase
            .from('customers')
            .select('*')
            .eq('id', authUser.id)
            .maybeSingle()


        if (customerError) {
            throw customerError
        }


        customer.value = customerData


        form.value.full_name =
            customerData?.full_name ||
            authUser.user_metadata?.full_name ||
            ''

        form.value.phone =
            customerData?.phone ||
            ''


    } catch (err) {

        console.error(
            'Profile error:',
            err
        )

        error.value =
            err.message ||
            'Unable to load your profile.'

    } finally {

        loading.value = false

    }

}


/* =========================
   SAVE PROFILE
========================= */

const saveProfile = async () => {

    saveMessage.value = ''

    error.value = ''


    if (!form.value.full_name.trim()) {

        error.value =
            'Please enter your full name.'

        return

    }


    if (!form.value.phone.trim()) {

        error.value =
            'Please enter your phone number.'

        return

    }


    saving.value = true


    try {

        const {
            data: {
                user: authUser
            }
        } = await supabase.auth.getUser()


        if (!authUser) {

            throw new Error(
                'Your session has expired. Please log in again.'
            )

        }


        /* =========================
           UPDATE CUSTOMER
        ========================= */

        const {
            error: customerError
        } = await supabase
            .from('customers')
            .update({

                full_name:
                    form.value.full_name.trim(),

                phone:
                    form.value.phone.trim()

            })
            .eq('id', authUser.id)


        if (customerError) {
            throw customerError
        }


        /* =========================
           UPDATE AUTH METADATA
        ========================= */

        const {
            error: authError
        } = await supabase.auth.updateUser({

            data: {

                full_name:
                    form.value.full_name.trim()

            }

        })


        if (authError) {
            throw authError
        }


        /* Update local state */

        user.value = {
            ...authUser,

            user_metadata: {
                ...authUser.user_metadata,

                full_name:
                    form.value.full_name.trim()

            }

        }


        saveMessage.value =
            'Profile updated successfully.'


        setTimeout(() => {

            saveMessage.value = ''

        }, 3000)


    } catch (err) {

        console.error(
            'Save profile error:',
            err
        )

        error.value =
            err.message ||
            'Unable to save your profile.'

    } finally {

        saving.value = false

    }

}


/* =========================
   CHANGE PASSWORD
========================= */

const changePassword = async () => {

    if (!user.value?.email) {
        return
    }


    passwordLoading.value = true

    error.value = ''


    try {

        const {
            error: resetError
        } = await supabase.auth.resetPasswordForEmail(
            user.value.email,
            {
                redirectTo:
                    `${window.location.origin}/reset-password`
            }
        )


        if (resetError) {
            throw resetError
        }


        alert(
            'A password reset link has been sent to your email address.'
        )


    } catch (err) {

        console.error(
            'Password reset error:',
            err
        )

        error.value =
            err.message ||
            'Unable to send password reset email.'

    } finally {

        passwordLoading.value = false

    }

}


/* =========================
   SIGN OUT
========================= */

const signOut = async () => {

    signingOut.value = true

    try {

        const {
            error: signOutError
        } = await supabase.auth.signOut()


        if (signOutError) {
            throw signOutError
        }


        router.push({
            name: 'Login'
        })


    } catch (err) {

        console.error(
            'Sign out error:',
            err
        )

        error.value =
            err.message ||
            'Unable to sign out.'

    } finally {

        signingOut.value = false

    }

}


/* =========================
   DATE
========================= */

const formatDate = (date) => {

    if (!date) {
        return '—'
    }


    return new Intl.DateTimeFormat(
        'en-NG',
        {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }
    ).format(
        new Date(date)
    )

}


/* =========================
   INIT
========================= */

onMounted(() => {

    loadProfile()

})

</script>


<style scoped>
/* =========================
   PAGE
========================= */

.profile-page {
    min-height: 100vh;

    background: #f7f7f7;

    color: #171717;
}


.profile-container {
    width: 100%;
    max-width: 1050px;

    margin: 0 auto;

    padding: 42px 35px 70px;
}


/* =========================
   HEADER
========================= */

.profile-header {
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


.profile-header h1 {
    margin: 0;

    color: #171717;

    font-size: 36px;
    font-weight: 700;

    letter-spacing: -1px;
}


.profile-header p {
    max-width: 550px;

    margin: 10px 0 0;

    color: #777;

    font-size: 13px;
    line-height: 1.6;
}


/* =========================
   CARDS
========================= */

.profile-card {
    margin-bottom: 18px;

    padding: 26px;

    border: 1px solid #e5e5e5;

    background: #fff;
}


/* =========================
   OVERVIEW
========================= */

.overview-card {
    display: flex;

    align-items: center;
    justify-content: space-between;

    gap: 20px;
}


.profile-identity {
    display: flex;

    align-items: center;

    gap: 15px;
}


.avatar {
    display: flex;

    align-items: center;
    justify-content: center;

    width: 58px;
    height: 58px;

    flex-shrink: 0;

    background: #111;

    color: #fff;

    font-size: 16px;
    font-weight: 700;
}


.profile-identity h2 {
    margin: 0 0 5px;

    color: #171717;

    font-size: 18px;
}


.profile-identity p {
    margin: 0;

    color: #888;

    font-size: 12px;
}


.account-status {
    display: flex;

    align-items: center;

    gap: 7px;

    color: #397449;

    font-size: 11px;
    font-weight: 600;
}


.status-dot {
    width: 7px;
    height: 7px;

    border-radius: 50%;

    background: #397449;
}


/* =========================
   SECTION HEADING
========================= */

.section-heading {
    display: flex;

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
   FORM
========================= */

.form-grid {
    display: grid;

    grid-template-columns: 1fr 1fr;

    gap: 20px;
}


.form-group {
    display: flex;

    flex-direction: column;
}


.form-group label {
    margin-bottom: 8px;

    color: #333;

    font-size: 12px;
    font-weight: 600;
}


.form-group input {
    width: 100%;
    height: 46px;

    padding: 0 13px;

    border: 1px solid #ddd;

    outline: none;

    background: #fff;

    color: #222;

    font-family: inherit;

    font-size: 12px;

    transition:
        border-color .2s ease;
}


.form-group input:focus {
    border-color: #111;
}


.form-group input:disabled {
    background: #f5f5f5;

    color: #999;

    cursor: not-allowed;
}


.form-group small {
    margin-top: 6px;

    color: #999;

    font-size: 9px;

    line-height: 1.5;
}


/* =========================
   FORM FOOTER
========================= */

.form-footer {
    display: flex;

    align-items: center;
    justify-content: flex-end;

    gap: 15px;

    margin-top: 24px;
}


.save-message {
    display: flex;

    align-items: center;

    gap: 6px;

    color: #397449;

    font-size: 11px;
}


.save-button {
    display: inline-flex;

    align-items: center;
    justify-content: center;

    gap: 8px;

    min-width: 130px;
    height: 42px;

    padding: 0 15px;

    border: 1px solid #111;

    background: #111;

    color: #fff;

    font-size: 11px;
    font-weight: 600;

    cursor: pointer;

    transition:
        background .2s ease;
}


.save-button:hover:not(:disabled) {
    background: #292929;
}


.save-button:disabled {
    opacity: .6;

    cursor: not-allowed;
}


/* =========================
   SECURITY
========================= */

.security-item {
    display: flex;

    align-items: center;

    gap: 14px;
}


.security-icon {
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


.security-content {
    min-width: 0;

    flex: 1;
}


.security-content strong {
    display: block;

    margin-bottom: 4px;

    color: #222;

    font-size: 12px;
}


.security-content p {
    max-width: 500px;

    margin: 0;

    color: #888;

    font-size: 10px;

    line-height: 1.5;
}


.security-divider {
    height: 1px;

    margin: 20px 0;

    background: #eee;
}


.outline-button,
.danger-button {
    flex-shrink: 0;

    height: 38px;

    padding: 0 13px;

    font-size: 10px;
    font-weight: 600;

    cursor: pointer;
}


.outline-button {
    border: 1px solid #ddd;

    background: #fff;

    color: #333;
}


.outline-button:hover {
    border-color: #999;
}


.danger-button {
    border: 1px solid #eadada;

    background: #fff8f8;

    color: #a33b3b;
}


.danger-button:hover {
    border-color: #d7baba;
}


.outline-button:disabled,
.danger-button:disabled {
    opacity: .6;

    cursor: not-allowed;
}


/* =========================
   ACCOUNT DETAILS
========================= */

.details-grid {
    display: grid;

    grid-template-columns:
        repeat(3, minmax(0, 1fr));

    gap: 20px;
}


.detail {
    min-width: 0;
}


.detail span {
    display: block;

    margin-bottom: 7px;

    color: #999;

    font-size: 9px;
    font-weight: 600;

    text-transform: uppercase;

    letter-spacing: .6px;
}


.detail strong {
    display: block;

    overflow: hidden;

    color: #444;

    font-size: 11px;
    font-weight: 600;

    text-overflow: ellipsis;
    white-space: nowrap;
}


/* =========================
   STATES
========================= */

.loading-state {
    min-height: 300px;

    display: flex;

    align-items: center;
    justify-content: center;

    flex-direction: column;

    color: #888;
}


.loading-state p {
    margin-top: 12px;

    font-size: 11px;
}


.spinner {
    width: 27px;
    height: 27px;

    border: 2px solid #ddd;

    border-top-color: #111;

    border-radius: 50%;

    animation: spin .7s linear infinite;
}


.error-box {
    display: flex;

    align-items: center;

    gap: 9px;

    padding: 15px;

    border: 1px solid #eadada;

    background: #fff8f8;

    color: #a33b3b;

    font-size: 11px;
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


/* =========================
   RESPONSIVE
========================= */

@media (max-width: 750px) {

    .profile-container {
        padding: 30px 18px 50px;
    }


    .overview-card {
        align-items: flex-start;

        flex-direction: column;
    }


    .form-grid {
        grid-template-columns: 1fr;
    }


    .details-grid {
        grid-template-columns: 1fr;
    }


    .security-item {
        align-items: flex-start;

        flex-wrap: wrap;
    }


    .security-content {
        flex-basis: calc(100% - 55px);
    }


    .outline-button,
    .danger-button {
        width: 100%;

        margin-left: 54px;
    }

}


@media (max-width: 500px) {

    .profile-header h1 {
        font-size: 30px;
    }


    .profile-card {
        padding: 20px;
    }


    .form-footer {
        align-items: stretch;

        flex-direction: column;
    }


    .save-message {
        justify-content: center;
    }


    .save-button {
        width: 100%;
    }

}
</style>