<template>
    <b-container v-if="data">

        <b-row class="justify-content-center" v-if="$loading()">
            <b-col cols="6">
                <b-img fluid-grow src="https://miro.medium.com/max/1400/1*CsJ05WEGfunYMLGfsT2sXA.gif" class="mx-auto"/>
            </b-col>
        </b-row>

        <template v-else>

            <b-card no-body class="p-3 mb-5">
                <b-row>

                    <b-col cols="12" md="5">
                        <b-aspect :aspect="4/3" class="position-relative">
                            <b-img-lazy :src="data.image" :alt="data.title"
                                        fluid-grow center :height="300" :width="300"
                                        class="position-absolute w-100 h-100 contain p-1"/>
                        </b-aspect>
                    </b-col>

                    <b-col cols="12" md="7">
                        <h1 class="h3 mb-3" v-text="data.title"/>

                        <div class="mb-3 d-flex justify-content-between align-items-center">

                            <b-button variant="light" size="sm" class="px-3" pill exact>
                                {{ data.category }}
                            </b-button>

                            <div class="d-flex">
                                <span class="pr-1">{{ data.rating.count }}</span>
                                /
                                <span class="pl-1" v-for="rate in 5" :key="rate"
                                      :class="rate < data.rating.rate ? 'text-warning' : 'text-muted'">
                                ★
                            </span>
                            </div>

                        </div>

                        <hr/>

                        <p v-html="data.description"/>


                        <hr/>

                        <div class="d-flex justify-content-between align-items-center">
                        <span class="font-weight-bold text-danger h5">
                            {{ data.price }} AZN
                        </span>
                            <b-button variant="success" size="lg" class="px-5 font-weight-bold"
                                      v-b-toggle.cart pill @click="$addToCart(data)">
                                Add To Cart
                            </b-button>
                        </div>

                    </b-col>

                </b-row>
            </b-card>

            <h1 class="h3 font-weight-bold mb-4" v-text="'Similar Products'"/>

            <b-row>

                <b-col cols="12" sm="6" md="3" v-for="(item, i) in similarProducts" :key="`product-${i}`" class="mb-4">
                    <ProductItem :data="item"/>
                </b-col>

            </b-row>

        </template>

    </b-container>
</template>

<script>

import axios from 'axios'
import ProductItem from "@/components/pages/products/ProductItem";

export default {
    name: "ProductDetail",
    components: {ProductItem},
    data: () => ({
        data: null
    }),
    async created() {
        await this.getPageData()

    },
    computed: {
        similarProducts() {
            return this.$store.state.latestProducts
        }
    },
    watch:{
        '$route.params.id'(){
            this.getPageData()
        }
    },
    methods: {
        async getPageData() {
            try {

                this.$store.commit('SET_LOADING', true)

                const {data} = await axios.get(`products/${this.$route.params.id}`)
                this.data = data

                await this.$store.dispatch('GET_DATA', {
                    api: 'products',
                    key: 'latestProducts',
                    params: '?limit=4'
                })

                this.$store.commit('SET_LOADING', false)

            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>
