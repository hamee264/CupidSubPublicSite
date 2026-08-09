<template>
    <section class="top-bar">
        <div class="container">

            <div class="left">
                ⚡ Instant Delivery • Secure Payments • 24/7 Support
            </div>

            <div class="right">

                <a href="#">
                    Help Center
                </a>

                <a href="#">
                    Contact
                </a>

            </div>

        </div>
    </section>
</template>

<style scoped>
.top-bar {
    background: #0f172a;
    color: #fff;
    font-size: 13px;
}

.container {
    max-width: 1250px;
    margin: auto;

    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 8px 20px;
}

.right {
    display: flex;
    gap: 20px;
}

.right a {
    color: #d1d5db;
    text-decoration: none;
    transition: .3s;
}

.right a:hover {
    color: #fff;
}

@media(max-width:768px) {

    .right {
        display: none;
    }

    .container {
        justify-content: center;
        text-align: center;
    }

}
</style>