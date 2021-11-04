<template>
    <b-container class="mb-4 mb-md-5">

        <h1 class="h3 font-weight-bold mb-4" v-text="pageTitle"/>

        <ProductList :products="allProducts"/>

        <b-btn block size="lg" variant="success" :to="{path: '/products'}" v-if="!$loading()" class="mt-3 mt-md-4">
            See all products
            <b-icon icon="arrow-right" class="ml-3"/>
        </b-btn>

    </b-container>
</template>

<script>
import ProductList from "@/components/pages/products/ProductList";
export default {
    name: "Home",
    components: {ProductList},
    data: () => ({
        pageTitle: 'Latest products'
    }),
    async created() {
        await this.getLatestProducts()
    },
    computed: {
        allProducts() {
            return this.$store.state.latestProducts
        }
    },
    methods: {
        async getLatestProducts() {
            await this.$store.dispatch('GET_DATA', {
                api: 'products',
                key: 'latestProducts',
                params: '?limit=12'
            })
        }
    }
}
</script>
