<template>
    <b-card tag="article"
            class="h-100 d-flex"
            body-class="p-2 p-md-3 h-100 d-flex flex-column"
            header-class="p-0 bg-white"
            footer-class="d-flex justify-content-between">

            <template #header>
                <b-link :to="{path: `/products/${data.id}`, params: {id: data.id}}">
                    <b-aspect :aspect="4/3" class="position-relative">
                        <b-img-lazy :src="data.image" :alt="data.title" fluid-grow center :height="200" :width="200"
                                    class="position-absolute w-100 h-100 contain p-1"/>
                    </b-aspect>
                </b-link>
            </template>

            <template #default>

                <div class="mb-1">
                    <span v-for="rate in 5" :key="rate" :class="rate < data.rating.rate ? 'text-warning' : 'text-muted'">
                        ★
                    </span>
                </div>

                <b-link :to="{path: `/products/${data.id}`, params: {id: data.id}}" class="h-100 mb-3">
                    <h2 v-text="data.title" class="h6 font-weight-bold text-dark"/>
                </b-link>

                <div class="d-flex justify-content-between align-items-center">

                    <span class="font-weight-bold text-danger">
                        {{ data.price }} <sup>AZN</sup>
                    </span>

                    <b-button variant="success" size="sm" class="px-3" pill v-b-toggle.cart @click="$addToCart(data)">
                        <b-icon icon="cart-plus" class="mr-2"/>
                        Add To Cart
                    </b-button>

                </div>

            </template>

            <template #footer>

                <b-button variant="danger" size="sm" class="px-3" pill @click="deleteProduct(data.id)">
                    <b-icon icon="trash" class="mr-2"/>
                    Delete
                </b-button>

                <b-button variant="info" size="sm" class="px-3" pill v-b-toggle.cart
                          :to="{path: `/products/${data.id}/edit`, params: {id: data.id}}">
                    <b-icon icon="pen" class="mr-2"/>
                    Edit
                </b-button>

            </template>

    </b-card>
</template>

<script>

import axios from 'axios'

export default {
    name: "ProductItem",
    props:{
        data: {
            type: Object
        }
    },
    methods:{
        async deleteProduct(id){
            if(confirm('Remove this product?')){
                try {

                    const res = await axios.delete(`products/${id}`)
                    await this.$globalAlert(res.status)
                    this.$router.go(0)

                }catch (error) {
                    console.log(error)
                }
            }
        }
    }
}
</script>
