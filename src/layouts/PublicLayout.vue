<template>
    <div class="public-layout">
        <Navbar />

        <main>
            <router-view />
        </main>

        <Footer />
    </div>
</template>

<script setup>
import Navbar from "../components/public/Navbar.vue";
import Footer from "../components/public/Footer.vue";
</script>

<style scoped>
.public-layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

main {
    flex: 1;
}
</style>