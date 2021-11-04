import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export const store = new Vuex.Store({

    state: {
        latestProducts: [],
        similarProducts: [],
        categories: [],
        cart: [],
        searchValue: null,
        loading: false
    },

    mutations: {
        SET_DATA(state, payload){
            state[payload.key] = payload.data
        },

        SET_CART(state, cart){
            state.cart = cart
        },

        SET_SEARCH_VALUE(state, value){
            state.searchValue = value
        },

        SET_LOADING(state, status){
            state.loading = status
        }
    },

    actions: {
        async GET_DATA({commit}, payload){
            try {

                commit('SET_LOADING', true)

                const { data } = await axios.get(`${payload.api}${payload.params || ''}`,{ headers: {
                        'content-type' : 'application/json',
                        'accept':'application/json'
                    }})

                const newPayload = {...payload, data}

                commit('SET_DATA', newPayload)
                commit('SET_LOADING', false)

            }catch (error) {
                console.log(error)
                commit('SET_LOADING', false)
            }
        }
    },
    getters: {
        getSearchValue(state){
            return state.searchValue?.toLowerCase()
        },
        getLoading(state){
            return state.loading
        },
    }
})
