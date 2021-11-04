<template>
    <b-container>
        <b-card no-body class="p-3 p-md-5">
            <b-row>

                <b-col cols="12" lg="5">
                    <div class="d-flex justify-content-center">
                        <vue-c-card :number="cc.number"
                                    :holder="cc.holder"
                                    :exp="cc.exp"
                                    :cvc="cc.cvc"
                                    :is-typing-cvc="isTypingCvc"/>
                    </div>
                </b-col>

                <b-col cols="12" lg="7">
                    <b-row>

                        <b-col cols="12" md="6" class="mb-3">
                            <label for="number">Number</label>
                            <b-form-input type="text" v-model="cc.number"
                                          :state="$v('number')"
                                          id="number" v-mask="'#### #### #### ####'"
                                          @input="nextInputFocus(cc.number, 19, 'exp')"/>
                        </b-col>

                        <b-col cols="12" md="6" class="mb-3">
                            <label for="exp">Expiration Date</label>
                            <b-form-input type="text" v-model="cc.exp"
                                          :state="$v('exp')" id="exp" v-mask="'##/##'"
                                          @input="nextInputFocus(cc.exp, 5, 'holder')"/>
                        </b-col>

                        <b-col cols="12" md="6" class="mb-3">
                            <label for="holder">holder</label>
                            <b-form-input type="text" v-model="cc.holder"
                                          :state="$v('holder')" id="holder"/>
                        </b-col>

                        <b-col cols="12" md="6" class="mb-3">
                            <label for="cvc">CVC</label>
                            <b-form-input type="text" v-model="cc.cvc"
                                          :state="$v('cvc')"
                                          @focus="isTypingCvc = true"
                                          @blur="isTypingCvc = false" id="cvc" v-mask="'###'"/>
                        </b-col>

                        <b-col cols="12" class="pt-2">
                            <b-btn block size="lg" variant="success" :disabled="invalid">
                                Pay
                                <b-icon icon="arrow-right" class="ml-3"/>
                            </b-btn>
                        </b-col>

                    </b-row>

                </b-col>

            </b-row>
        </b-card>
    </b-container>
</template>

<script>
import VueCCard from 'vue-ccard';

export default {
    name: "index",
    components: {
        VueCCard,
    },
    data() {
        return {
            isTypingCvc: false,
            cc: {
                number: '',
                holder: '',
                exp: '',
                cvc: '',
            },
        };
    },

    computed:{
        validates(){
            return {
                number:  this.$required(this.cc.number) && this.$minLength(this.cc.number, 19),
                holder: this.$required(this.cc.holder) && this.$minLength(this.cc.holder, 5),
                exp: this.$required(this.cc.exp),
                cvc: this.$required(this.cc.cvc) && this.$minLength(this.cc.cvc, 3),
            }
        },

        invalid(){
            return Object.entries(this.validates).some(([, val]) => {
                return val === false
            })
        }
    },

    methods:{
        nextInputFocus(field, limit, target){
            const input = document.getElementById(target)
            if(field && field.length === limit + 1){
                input.focus()
            }
        },

        $v(field) {
            return this.validates[field]
        },
    }
}
</script>


<style>
.vue-c-card .credit-card[data-v-ecb5095a] {
    background: radial-gradient(#74ba21, #3d942c) !important;
}

.vue-c-card .credit-card[data-v-ecb5095a], .vue-c-card .front[data-v-ecb5095a], .vue-c-card .back[data-v-ecb5095a] {
    height: 220px !important;
}

.vue-c-card .credit-card .card-number[data-v-ecb5095a] {
    height: 35px !important;
}

.card-number {
    margin-top: 20px !important;
}

.card-holder {
    margin-top: 35px !important;
}

.card-exp {
    margin-top: 35px !important;
}

.vue-c-card .credit-card .card-cvc[data-v-ecb5095a] {
    width: 55px !important;
}

.front img[alt~="Brand"] {
    display: none;
}

</style>
