<template>
    <b-sidebar id="cart" :title="`Cart (${cartData.length})`" tag="aside" right
               header-class="bg-white py-3 shadow-sm relative z-index-1"
               body-class="bg-white d-flex flex-column" shadow="lg" backdrop>

        <div class="cart-body d-flex h-100 position-relative">
            <div class="cart-wrap position-absolute w-100 h-100 overflow-auto">

                <b-list-group flush>
                    <b-list-group-item v-for="(item, i) in reversedCartData" :key="`product-${i}`" class="p-2">
                        <b-row no-gutters>
                            <b-col cols="3" class="pr-3">
                                <b-aspect :aspect="1" class="position-relative border">
                                    <b-img-lazy :src="item.image" :alt="item.title" fluid-grow center :height="70" :width="70"
                                                class="position-absolute w-100 h-100 contain p-1"/>
                                </b-aspect>
                            </b-col>
                            <b-col cols="7" class="d-flex flex-column">
                                <span class="d-block font-weight-bold mb-2 small line-clamp line-2 h-100" v-text="item.title"/>
                                <div class="d-flex">
                                    <input type="number" v-model="item.count" style="width: 50px"
                                           class="form-control-sm form-control" @change="setCart">
                                    <b-btn variant="light" size="sm" class="text-danger ml-1" @click="deleteFromCart(i)">
                                        <b-icon icon="trash"/>
                                    </b-btn>
                                </div>
                            </b-col>
                            <b-col cols="2" class="text-right">
                                <span class="d-block font-weight-bold text-danger small" v-text="item.price"/>
                                <small class="d-block">AZN</small>
                            </b-col>
                        </b-row>
                    </b-list-group-item>
                </b-list-group>

            </div>
        </div>

        <div class="cart-footer d-flex p-3 shadow-lg relative z-index-1">
            <b-btn variant="light" pill @click="clearCart" class="mr-1 text-nowrap">
                Clear cart
            </b-btn>
            <b-btn variant="success" pill block class="ml-1" :to="'/payment'">
                <span class="font-weight-bold mr-2" v-if="chartTotalPrice">
                    {{chartTotalPrice}}
                    AZN
                </span>
                Get to payment
                <b-icon icon="arrow-right"/>
            </b-btn>
        </div>

    </b-sidebar>
</template>

<script>
export default {
    name: "Cart",
    data: () => ({
        cartData: []
    }),
    created() {
        this.getCart()
    },
    watch: {
        '$store.state.cart': {
            deep: true,
            handler(val) {
                if (val) {
                    this.cartData = val
                }
            }
        }
    },
    computed:{
        reversedCartData(){
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            return this.cartData.length > 0 ? this.cartData.reverse() : []
        },

        // eslint-disable-next-line vue/return-in-computed-property
        chartTotalPrice(){
            return this.cartData.reduce((a, b) => {
                return a + (parseInt(b.count) * parseInt(b.price))
            }, 0)
        }
    },
    methods: {
        setCart(){
            this.$setStorageChart(this.cartData)
            this.$setStateChart(this.cartData)
        },

        getCart() {
            const cart = localStorage.getItem('cart')
            if(cart){
                this.$setStateChart(JSON.parse(cart))
            }
        },

        deleteFromCart(i){
            if(confirm('Remove the detail from cart?')){
                this.cartData.splice(i, 1)
                this.$setStateChart(this.cartData)
                this.$setStorageChart(this.cartData)
            }
        },

        clearCart(){
            this.cartData = []
            this.$setStateChart(this.cartData)
            this.$setStorageChart(this.cartData)
        }
    },
}
</script>
