<template>
    <b-container>
        <b-card no-body class="p-3 mb-5">
            <b-row>

                <b-col cols="12" md="5">
                    <b-aspect :aspect="4/3" class="position-relative border">
                        <b-img-lazy
                            :src="data.image || 'https://www.wddonline.com/content/uploads/2020/08/placeholder-image.png'"
                            :alt="data.title"
                            fluid-grow center :height="300" :width="300"
                            class="position-absolute w-100 h-100 contain p-1"/>
                    </b-aspect>
                </b-col>

                <b-col cols="12" md="7">
                    <b-form @submit.stop.prevent="sendData">
                        <b-row>

                            <b-col cols="12" class="mb-3">
                                <label for="product-name">Name</label>
                                <b-form-input v-model="data.title" :state="$v('title')" id="product-name"/>

                            </b-col>

                            <b-col cols="6" md="3" class="mb-3">
                                <label for="product-category">Category</label>
                                <b-form-select v-model="data.category" :options="categories"
                                               :state="$v('category')" id="product-category"/>
                            </b-col>

                            <b-col cols="6" md="3" class="mb-3">
                                <label for="product-price">Price</label>
                                <b-form-input v-model="data.price" :state="$v('price')" id="product-price"/>
                            </b-col>

                            <b-col cols="12" md="6" class="mb-3">
                                <label for="product-image">Image</label>
                                <b-form-input v-model="data.image" :state="$v('image')" id="product-image"/>
                            </b-col>

                            <b-col cols="12" class="mb-3">
                                <label for="product-description">Description</label>
                                <b-form-textarea v-model="data.description"
                                                 :state="$v('description')"
                                                 id="product-description"/>
                            </b-col>

                        </b-row>

                        <div class="d-flex justify-content-between">
                            <b-btn variant="light" type="button" @click="$router.go(-1)">
                                <b-icon icon="arrow-left" class="mr-2"/>
                                Go back
                            </b-btn>

                            <b-btn variant="success" type="submit" :disabled="invalid">
                                Save Product
                            </b-btn>
                        </div>

                    </b-form>

                </b-col>

            </b-row>
        </b-card>
    </b-container>
</template>

<script>

import axios from 'axios'

export default {
    name: "ProductEdit",
    data(){
        return {
            data: {
                title: '',
                price: null,
                description: '',
                image: '',
                category: ''
            },

            initialValidation: false,
        }
    },
    async created() {
        await this.getPageData()
    },
    computed: {
        categories() {
            return this.$store.state.categories
        },

        validates(){
            return {
                title: this.$required(this.data.title),
                price: this.$required(this.data.price) && this.$minValue(this.data.price, 1) && this.$number(this.data.price),
                description: this.$required(this.data.description),
                image: this.$required(this.data.image),
                category: this.$required(this.data.category),
            }
        },

        invalid(){
            return Object.entries(this.validates).some(([, val]) => {
                return val === false
            })
        },

    },

    methods: {
        async getPageData() {
            if (this.$route.params.id) {
                try {
                    const {data} = await axios.get(`products/${this.$route.params.id}`)
                    this.data = data

                } catch (error) {
                    console.log(error)
                }
            }

            await this.$store.dispatch('GET_DATA', {
                api: 'products/categories',
                key: 'categories'
            })
        },

        async sendData() {
            if(!this.invalid){
                const id = this.$route.params.id
                const res = await axios[id ? 'put' : 'post']('products', this.data)
                this.$globalAlert(res.status)
            }
        },

        $v(field) {
            return this.validates[field]
        },
    }
}
</script>
