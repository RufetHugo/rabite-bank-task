import Vue from 'vue'

Vue.prototype.$setStateChart = function (cartData) {
    this.$store.commit('SET_CART', cartData)
}

Vue.prototype.$setStorageChart = function (cartData) {
    localStorage.setItem('cart', JSON.stringify(cartData))
}
Vue.prototype.$addToCart = function (item) {
    const storageCart = localStorage.getItem('cart')
    let cart = []

    if (storageCart) {
        cart = JSON.parse(storageCart)
    }
    const hasInCart = cart.find(product => product.id === item.id)

    if (hasInCart) {
        hasInCart.count++
    } else {
        cart.push({...item, count: 1})
    }

    this.$setStateChart(cart)
    this.$setStorageChart(cart)
}

Vue.prototype.$globalAlert = function (status){
    if(status === 200){
        alert('Success')
    }else{
        alert(`Error! code: [${status}]`)
    }
}

Vue.prototype.$loading = function (){
    return this.$store.getters['getLoading']
}

Vue.prototype.$required = function (field) {
    return !!field
}

Vue.prototype.$minValue = function (field, value) {
    return field && field >= value;
}

Vue.prototype.$minLength = function (field, value) {
    return field && field.length >= value
}

Vue.prototype.$number = function (field) {
    const reg = new RegExp('^[0-9]*\\.?[0-9]+$')
    return reg.test(field)
}

Vue.prototype.$letter = function (field) {
    const reg = new RegExp('^[a-zA-Z0-9_ ]*$')
    return reg.test(field)
}
