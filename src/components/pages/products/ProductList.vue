<template>
    <b-row class="justify-content-center">

        <template v-if="filteredProducts.length > 0">
            <b-col cols="12" sm="6" md="3" v-for="(item, i) in filteredProducts" :key="`product-${i}`" class="mb-4">
                <ProductItem :data="item"/>
            </b-col>
        </template>


        <b-col cols="6" v-else-if="$loading()">
            <b-img fluid-grow src="https://miro.medium.com/max/1400/1*CsJ05WEGfunYMLGfsT2sXA.gif" class="mx-auto"/>
        </b-col>

        <b-col cols="6" v-else>
            <b-img fluid-grow src="https://webmarketingschool.com/wp-content/uploads/2018/03/nojobsfound.png" class="mx-auto"/>
        </b-col>

    </b-row>
</template>

<script>

import ProductItem from "@/components/pages/products/ProductItem";

export default {
    name: "ProductList",
    components: {ProductItem},
    props:{
        products: {
            type: Array,
        }
    },
    computed:{
        filteredProducts(){

            const searchValue = this.$store.getters['getSearchValue']

            if(searchValue){
                return this.products.filter(product => {
                    return product.title.toLowerCase().includes(searchValue)
                })
            }else{
                return this.products
            }
        }
    }
}
</script>
