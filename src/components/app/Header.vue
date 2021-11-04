<template>
    <b-navbar toggleable="lg" type="dark" variant="primary">

        <b-navbar-brand to="/" v-text="appName" class="font-weight-bold"/>

        <b-navbar-toggle target="nav-collapse"/>

        <div class="mx-auto ml-md-auto mr-md-0 d-flex py-2 py-md-0 mt-2 mt-md-0 order-md-1">

            <div class="rounded-pill bg-white p-1 mr-3">
                <b-button class="rounded-pill h-100" variant="success" :to="{path: '/add-product'}">
                    <b-icon icon="plus" class="mr-sm-2"/>
                    <span class="d-none d-sm-inline-block">
                        Add product
                    </span>
                </b-button>
            </div>

            <SearchForm/>

            <div>
                <b-badge v-text="chartProduct.count"
                         variant="warning" class="rounded-circle text-white position-absolute ml-n2"/>
                <b-button type="submit" class="rounded-circle h-100" variant="light" v-b-toggle.cart>
                    <b-icon icon="cart-fill"/>
                </b-button>
            </div>
        </div>

        <b-collapse id="nav-collapse" is-nav>

            <b-navbar-nav>
                <b-nav-item v-for="(menu, i) in  navs" :key="`menu-${i}`" :to="menu.href">
                    {{menu.name}}
                </b-nav-item>
            </b-navbar-nav>

        </b-collapse>

    </b-navbar>
</template>

<script>

import SearchForm from "@/components/app/SearchForm";

export default {
    name: "Header",
    components:{
        SearchForm
    },
    data: () => ({
        appName: 'MyCommerce',
        navs: [
            {
                name: 'Products',
                href: 'products'
            },
            {
                name: 'Payment',
                href: 'payment'
            }
        ]
    }),
    computed:{
        // eslint-disable-next-line vue/return-in-computed-property
        chartProduct(){
            if(this.$store.state.cart.length > 0){
                return this.$store.state.cart.reduce((a, b) => ({count: parseInt(a.count) + parseInt(b.count)}))
            }else{
                return 0
            }
        }
    }
}
</script>
