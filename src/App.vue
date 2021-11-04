<template>
    <div id="app">
        <AppHeader/>
        <b-aspect :aspect="10" class="position-relative mb-4 mb-md-5">
            <b-img-lazy src="https://www.cabotsolutions.com/public/coordination-of-E-commerce-and-Logistics-1800-x-600.jpg"
                        alt="cover" fluid-grow :height="200" :width="1800"
                        class="position-absolute w-100 h-100 cover"/>
        </b-aspect>
        <Cart/>
        <router-view/>
    </div>
</template>

<script>

import AppHeader from '@/components/app/Header'
import Cart from "@/components/app/Cart";

export default {
    name: 'App',
    components: {
        AppHeader,
        Cart
    }
}
</script>
