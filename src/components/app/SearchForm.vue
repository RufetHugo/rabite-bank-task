<template>
    <div class="d-flex bg-white rounded-pill p-1 mr-3">
        <b-form-input v-model="search" class="rounded-pill border-0" placeholder="Search"/>
        <b-button type="button" class="rounded-pill" variant="success" @click="searchProducts">
            Search
        </b-button>
    </div>
</template>

<script>
export default {
    name: "Form",
    data: () => ({
        search: null
    }),
    methods:{
        searchProducts(){
            this.$store.commit('SET_SEARCH_VALUE', this.search)
            this.$router.push({ path: '/products' })
        }
    }
}
</script>
