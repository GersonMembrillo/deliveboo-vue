<template>
    <div class="ext-bg">
        <div v-if="quantity && quantity > 0 && amount && amount > 0">
            <div v-if="!checkoutCompleted" class="container d-flex justify-content-center py-5 my-3">
                <div class="col-10 col-md-8 col-lg-8 col-xl-6">
                    <div class="card bg-light box-shadow">
                        <div class="card-header">Payment Information</div>
                        <div class="card-body">
                            <div class="alert alert-success" v-if="nonce">
                                The payment has been successful. Thanks for choosing us!
                            </div>
                            <div class="alert alert-danger" v-if="error">
                                {{ error }}
                            </div>
                            <form>
                                <div class="d-flex flex-column gap-4">
                                    <div class="d-flex flex-column gap-1">
                                        <label for="customer_name">Name</label>
                                        <input type="text" name="customer_name" id="customer_name" placeholder="Name..." v-model="customerName" class="form-control">

                                        <span id="errName" class="invalid-feedback" role="alert">
                                            <strong></strong>
                                        </span>
                                    </div>

                                    <div class="d-flex flex-column gap-1">
                                        <label for="customer_address">Address</label>
                                        <input type="text" name="customer_address" id="customer_address" placeholder="Address..." v-model="customerAddress" class="form-control">

                                        <span id="errAddress" class="invalid-feedback" role="alert">
                                            <strong></strong>
                                        </span>
                                    </div>
                                </div>

                                <hr />
                                <div class="form-group">
                                    <label>Credit Card Number</label>
                                    <div id="creditCardNumber" class="form-control"></div>
                                </div>
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-6">
                                            <label>Expire Date</label>
                                            <div id="expireDate" class="form-control"></div>
                                        </div>
                                        <div class="col-6">
                                            <label>CVV</label>
                                            <div id="cvv" class="form-control"></div>
                                        </div>
                                    </div>
                                </div>

                                <hr>

                                <div class="d-flex flex-wrap gap-5">
                                    <div class="d-flex align-items-center gap-2">
                                        Items: <span class="badge bg-secondary fs-5">{{ quantity }}</span>
                                    </div>

                                    <div class="d-flex align-items-center gap-2">
                                        Price: <span class="badge bg-secondary fs-5">{{ amount }} &euro;</span>
                                    </div>
                                </div>

                                <hr>

                                <button class="btn btn-primary btn-block" @click.prevent="payWithCreditCard">Pay with Credit Card</button>
                                <hr />
                                <div id="paypalButton"></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="container py-5 my-3 wrapper">
                <div class="farewell">
                    <h5>The order has been processed successfully.</h5>
                    <h1>Thanks for choosing us!</h1>
                    <h3>Enjoy your meal.</h3>
                    <div @click="this.$router.back()" class="btn btn-primary cursor-pointer mt-1">Continue Browsing</div>

                    <div class="confetti">
                        <div class="confetti-piece"></div>
                        <div class="confetti-piece"></div>
                        <div class="confetti-piece"></div>
                        <div class="confetti-piece"></div>
                        <div class="confetti-piece"></div>
                        <div class="confetti-piece"></div>
                        <div class="confetti-piece"></div>
                        <div class="confetti-piece"></div>
                        <div class="confetti-piece"></div>
                        <div class="confetti-piece"></div>
                        <div class="confetti-piece"></div>
                        <div class="confetti-piece"></div>
                        <div class="confetti-piece"></div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="container">
            <div class="row wrapper py-5">
                <div class="col-12 col-sm-6 d-flex flex-column align-items-start align-items-sm-end justify-content-end justify-content-sm-center">
                    <span class="display-1">419</span>
                    <hr class="w-100 d-sm-none my-2">
                </div>
                <div class="col-12 col-sm-6 d-flex justify-content-start align-items-sm-start align-items-sm-center">
                    <div class="custom-border ps-sm-3">
                        <h1>Page Expired</h1>
                        <h3>The page you are trying to access is no longer available.</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import braintree from 'braintree-web';
import paypal from 'paypal-checkout';
import axios from "axios";
import { store } from "../store.js";

export default {
    data() {
        return {
            hostedFieldInstance: false,
            nonce: "",
            error: "",
            customerName: "",
            customerAddress: "",
            checkoutCompleted: false,
            store: store,
            amount: null,
            quantity: null
        }
    },

    methods: {
        payWithCreditCard() {
            let customerNameElement = document.getElementById("customer_name");
            let customerAddressElement = document.getElementById("customer_address");
            let errNameStrong = document.getElementById("errName").querySelector("strong");
            let errAddressStrong = document.getElementById("errAddress").querySelector("strong");

            document.documentElement.scrollTop = 0;

            customerNameElement.classList.remove("is-invalid");
            customerAddressElement.classList.remove("is-invalid");
            this.error = "";

            if (this.customerName == "" && this.customerAddress == "") {
                customerNameElement.classList.add("is-invalid");
                customerAddressElement.classList.add("is-invalid");
                customerNameElement.value = "";
                customerAddressElement.value = "";
                errNameStrong.textContent = "Enter your name.";
                errAddressStrong.textContent = "Enter your address.";

                return;
            }
            else if (this.customerName == "") {
                customerNameElement.classList.add("is-invalid");
                customerNameElement.value = "";
                errNameStrong.textContent = "Enter your name.";


                return;
            }
            else if (this.customerAddress == "") {
                customerAddressElement.classList.add("is-invalid");
                customerAddressElement.value = "";
                errAddressStrong.textContent = "Enter your address.";

                return;
            }

            if (this.hostedFieldInstance) {
                this.error = "";
                this.nonce = "";
                this.hostedFieldInstance.tokenize().then(payload => {
                    // console.log(payload);
                    this.nonce = payload.nonce;

                    let items = localStorage.getItem("cartItems");
                    items = JSON.parse(items);

                    axios.post(`http://localhost:8000/api/orders`, { price: this.amount, items: items, customer_name: this.customerName, customer_address: this.customerAddress }).then((res) => {
                        this.checkoutCompleted = true;
                    }).finally(() => {
                        localStorage.setItem("cartItems", JSON.stringify([]));
                        localStorage.setItem("cartRestaurantSlug", "");
                        localStorage.setItem("cartRestaurantName", "");
                        this.store.checkoutQuantity = null;
                        this.store.checkoutPrice = null;
                    });
                })
                    .catch(err => {
                        // console.error(err);
                        this.error = err.message;
                    })
            }
        }
    },
    mounted() {
        this.quantity = this.store.checkoutQuantity;
        this.amount = this.store.checkoutPrice;

        document.documentElement.scrollTop = 0;

        braintree.client.create({
            authorization: "sandbox_93smtrz3_bbgx4xf7h8bx24xg"
        })
            .then(clientInstance => {
                let options = {
                    client: clientInstance,
                    styles: {
                        input: {
                            'font-size': '14px',
                            'font-family': 'Open Sans'
                        }
                    },
                    fields: {
                        number: {
                            selector: '#creditCardNumber',
                            placeholder: 'Enter Credit Card'
                        },
                        cvv: {
                            selector: '#cvv',
                            placeholder: 'Enter CVV'
                        },
                        expirationDate: {
                            selector: '#expireDate',
                            placeholder: '00 / 0000'
                        }
                    }
                }
                return Promise.all([
                    braintree.hostedFields.create(options),
                    braintree.paypalCheckout.create({ client: clientInstance })
                ])
            })
            .then(instances => {
                const hostedFieldInstance = instances[0];
                const paypalCheckoutInstance = instances[1];
                // Use hostedFieldInstance to send data to Braintree
                this.hostedFieldInstance = hostedFieldInstance;
                // Setup PayPal Button
                return paypal.Button.render({
                    env: 'sandbox',
                    style: {
                        label: 'paypal',
                        size: 'responsive',
                        shape: 'rect'
                    },
                    payment: () => {
                        return paypalCheckoutInstance.createPayment({
                            flow: 'checkout',
                            intent: 'sale',
                            amount: parseFloat(this.amount) > 0 ? this.amount : 10,
                            displayName: 'Braintree Testing',
                            currency: 'USD'
                        })
                    },
                    onAuthorize: (data, options) => {
                        return paypalCheckoutInstance.tokenizePayment(data).then(payload => {
                            // console.log(payload);
                            this.error = "";
                            this.nonce = payload.nonce;
                        })
                    },
                    onCancel: (data) => {
                        // console.log(data);
                        // console.log("Payment Cancelled");
                    },
                    onError: (err) => {
                        // console.error(err);
                        this.error = "An error occurred while processing the paypal payment.";
                    }
                }, '#paypalButton')
            })
            .catch(err => {
            });
    }
}
</script>
<style lang="scss" scoped>
.ext-bg {
    flex-grow: 1;
    background-color: #f8f9fa;
    color: black;
    overflow: hidden;
}

.wrapper {
    width: 100%;
    height: 80vh;
    max-height: 600px;
    min-height: 200px;
    overflow: hidden;
}

.farewell {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    background-color: transparent;
    position: relative;
}

.cursor-pointer {
    cursor: pointer;
}

.box-shadow {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.custom-border {
    border-left: 0;

    @media screen and (min-width: 576px) {
        border-left: 1px solid black;
    }
}

.confetti {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 1000;
    pointer-events: none;
}

.confetti-piece {
    position: absolute;
    width: 10px;
    height: 30px;
    background: #ffd300;
    top: 0;
    opacity: 0;
}

.confetti-piece:nth-child(1) {
    left: 7%;
    transform: rotate(-40deg);
    animation: makeItRain 1000ms infinite ease-out;
    animation-delay: 182ms;
    animation-duration: 1116ms;
}

.confetti-piece:nth-child(2) {
    left: 14%;
    transform: rotate(4deg);
    animation: makeItRain 1000ms infinite ease-out;
    animation-delay: 161ms;
    animation-duration: 1076ms;
}

.confetti-piece:nth-child(3) {
    left: 21%;
    transform: rotate(-51deg);
    animation: makeItRain 1000ms infinite ease-out;
    animation-delay: 481ms;
    animation-duration: 1103ms;
}

.confetti-piece:nth-child(4) {
    left: 28%;
    transform: rotate(61deg);
    animation: makeItRain 1000ms infinite ease-out;
    animation-delay: 334ms;
    animation-duration: 708ms;
}

.confetti-piece:nth-child(5) {
    left: 35%;
    transform: rotate(-52deg);
    animation: makeItRain 1000ms infinite ease-out;
    animation-delay: 302ms;
    animation-duration: 776ms;
}

.confetti-piece:nth-child(6) {
    left: 42%;
    transform: rotate(38deg);
    animation: makeItRain 1000ms infinite ease-out;
    animation-delay: 180ms;
    animation-duration: 1168ms;
}

.confetti-piece:nth-child(7) {
    left: 49%;
    transform: rotate(11deg);
    animation: makeItRain 1000ms infinite ease-out;
    animation-delay: 395ms;
    animation-duration: 1200ms;
}

.confetti-piece:nth-child(8) {
    left: 56%;
    transform: rotate(49deg);
    animation: makeItRain 1000ms infinite ease-out;
    animation-delay: 14ms;
    animation-duration: 887ms;
}

.confetti-piece:nth-child(9) {
    left: 63%;
    transform: rotate(-72deg);
    animation: makeItRain 1000ms infinite ease-out;
    animation-delay: 149ms;
    animation-duration: 805ms;
}

.confetti-piece:nth-child(10) {
    left: 70%;
    transform: rotate(10deg);
    animation: makeItRain 1000ms infinite ease-out;
    animation-delay: 351ms;
    animation-duration: 1059ms;
}

.confetti-piece:nth-child(11) {
    left: 77%;
    transform: rotate(4deg);
    animation: makeItRain 1000ms infinite ease-out;
    animation-delay: 307ms;
    animation-duration: 1132ms;
}

.confetti-piece:nth-child(12) {
    left: 84%;
    transform: rotate(42deg);
    animation: makeItRain 1000ms infinite ease-out;
    animation-delay: 464ms;
    animation-duration: 776ms;
}

.confetti-piece:nth-child(13) {
    left: 91%;
    transform: rotate(-72deg);
    animation: makeItRain 1000ms infinite ease-out;
    animation-delay: 429ms;
    animation-duration: 818ms;
}

.confetti-piece:nth-child(odd) {
    background: #7431e8;
}

.confetti-piece:nth-child(even) {
    z-index: 1;
}

.confetti-piece:nth-child(4n) {
    width: 5px;
    height: 12px;
    animation-duration: 2000ms;
}

.confetti-piece:nth-child(3n) {
    width: 3px;
    height: 10px;
    animation-duration: 2500ms;
    animation-delay: 1000ms;
}

.confetti-piece:nth-child(4n-7) {
    background: red;
}

@keyframes makeItRain {
    from {
        opacity: 0;
    }

    50% {
        opacity: 1;
    }

    to {
        transform: translateY(350px);
    }
}
</style>