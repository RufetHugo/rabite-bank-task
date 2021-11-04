import VueRouter from "vue-router"
import Home from "@/pages/Home";

export const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/products',
        name: 'Products',
        component: () => import(/* webpackChunkName: "products" */ '@/pages/products/index')
    },
    {
        path: '/products/:id',
        name: 'ProductDetail',
        component: () => import(/* webpackChunkName: "product-detail" */ '@/pages/products/detail/index')
    },
    {
        path: '/products/:id/edit',
        name: 'ProductEdit',
        component: () => import(/* webpackChunkName: "product-edit" */ '@/pages/products/form/index')
    },
    {
        path: '/add-product',
        name: 'ProductAdd',
        component: () => import(/* webpackChunkName: "product-add" */ '@/pages/products/form/index')
    },
    {
        path: '/payment',
        name: 'Payment',
        component: () => import(/* webpackChunkName: "payment" */ '@/pages/payment/index')
    }
]

export const router = new VueRouter({
    mode: "history",
    routes
})
