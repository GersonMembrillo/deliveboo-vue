<template>
    <!-- Button trigger modal -->
    <div class="cart-icon" :class="{ 'custom-p': totalQuantity > 0 }" data-bs-toggle="modal" data-bs-target="#cartModal">
        <i class="fa-solid fa-cart-shopping"></i>
        <div v-if="totalQuantity > 0" :class="[{ 'changed-items': even() }, { 'changed-items': !even() }]">
            {{ totalQuantity }}
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="cartModal" tabindex="-1" aria-labelledby="cartModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <!-- <h5 class="modal-title" id="cartModalLabel">Your DeliveBoo!</h5> -->
                    <div class="d-flex flex-column gap-2">
                        <h4>Your DeliveBoo!</h4>
                        <h6 v-if="restaurantName != ''" data-bs-dismiss="modal" @click="goToRestaurant()"
                            class="text-primary text-decoration-underline cursor-pointer">{{ restaurantName }}</h6>
                    </div>
                    <button type="button" class="btn-close align-self-start" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <table v-if="items.length > 0" class="table table-light">
                        <tbody>
                            <tr v-for="item in items" class="align-middle">
                                <td>
                                    <span class="small-x">x</span> {{ item.quantity }}
                                </td>

                                <td>
                                    {{ item.name }}
                                </td>

                                <td>
                                    {{ item.price }}
                                </td>

                                <td>
                                    <span class="d-flex gap-2 fs-4">
                                        <i @click="addToCart(item)" class="fa-solid fa-circle-plus green"></i>
                                        <i @click="removeFromCart(item)" class="fa-solid fa-circle-minus red"></i>
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div v-else class="img-container">
                        <img src="/img/Food.png" alt="cart_image">
                    </div>
                </div>
                <div class="modal-footer">
                    <button v-if="items.length > 0" @click="goToCheckout()" type="button"
                        class="btn btn-outline-warning text-uppercase fs-6" data-bs-dismiss="modal">
                        order {{ totalQuantity }} items for {{ totalPrice }} &euro;
                    </button>
                    <span v-else class="w-100 text-center">This is your cart. Add some items!</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { store } from "../store.js";

export default {
    name: "ShoppingCart",

    data() {
        return {
            items: [],
            restaurantName: "",
            store: store
        }
    },

    methods: {
        addToCart(newItem) {
            let items = localStorage.getItem("cartItems");
            items = JSON.parse(items);
            let quantity = 1;
            let index = -1;

            for (let i = 0; i < items.length && index < 0; i++)
                if (items[i].id == newItem.id) {
                    quantity = items[i].quantity + 1;
                    index = i;
                }

            if (index >= 0)
                items.splice(index, 1, {
                    id: newItem.id,
                    name: newItem.name,
                    price: newItem.price,
                    quantity: quantity
                });
            else
                items.push({
                    id: newItem.id,
                    name: newItem.name,
                    price: newItem.price,
                    quantity: quantity
                });

            this.items = items;
            localStorage.setItem("cartItems", JSON.stringify(items));
        },

        removeFromCart(oldItem) {
            let items = localStorage.getItem("cartItems");
            items = JSON.parse(items);
            let index = -1;
            let quantity = 1;

            for (let i = 0; i < items.length && index < 0; i++)
                if (oldItem.id == items[i].id) {
                    index = i;
                    quantity = items[i].quantity - 1;
                }

            if (quantity > 0)
                items.splice(index, 1, {
                    id: oldItem.id,
                    name: oldItem.name,
                    price: oldItem.price,
                    quantity: quantity
                });
            else
                items.splice(index, 1);

            this.items = items;
            localStorage.setItem("cartItems", JSON.stringify(items));

            if (items.length < 1) {
                localStorage.setItem("cartRestaurantSlug", "");
                localStorage.setItem("cartRestaurantName", "");

                this.restaurantName = "";
            }
        },

        goToCheckout() {
            this.store.checkoutQuantity = this.totalQuantity;
            this.store.checkoutPrice = this.totalPrice;

            this.$router.push({
                name: 'checkout'
            });
        },

        goToRestaurant() {
            this.$router.push({
                name: 'restaurant-show',
                params: { slug: localStorage.getItem("cartRestaurantSlug") }
            });
        },

        even() {
            let result = false;

            if (this.totalQuantity % 2 == 0)
                result = true;

            return result;
        }
    },

    computed: {
        totalPrice() {
            let totalPrice = 0;

            this.items.forEach((item) => {
                totalPrice += (item.price * item.quantity);
            });

            return totalPrice;
        },

        totalQuantity() {
            let totalQuantity = 0;

            this.items.forEach((item) => {
                totalQuantity += item.quantity;
            });

            return totalQuantity;
        }
    },

    mounted() {
        let items = localStorage.getItem("cartItems");
        items = JSON.parse(items);
        this.items = items;

        this.restaurantName = localStorage.getItem("cartRestaurantName");
    },
}
</script>

<style lang="scss" scoped>
.modal-body {
    max-height: 350px;
    overflow-y: auto;
}

.cart-icon {
    position: fixed;
    bottom: 8px;
    left: 8px;
    width: 60px;
    height: 60px;
    border: 1px solid rgb(161, 81, 0);
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2px;
    background-color: #ff9933;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    color: white;
    cursor: pointer;
    z-index: 1000;
    transition: all 300ms;

    &:hover {
        transform: scale(1.08);
    }

    &:active {
        background-color: #fcff60;
    }
}

.custom-p {
    padding-top: 5px;
}

.modal {
    word-wrap: break-word;
    background-color: rgb(155, 155, 155) !important;
    z-index: 13000;
}

.cursor-pointer {
    cursor: pointer;
}

.green {
    color: rgb(141, 255, 47);
    cursor: pointer;
}

.red {
    color: rgb(255, 67, 67);
    cursor: pointer;
}

.img-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2.5rem;
    padding: 0 0.5rem;
    white-space: nowrap;

    img {
        width: 40%;
        padding: 2rem 0;
    }
}

.changed-items {
    animation: change-color linear 300ms;
}

@keyframes change-color {
    from {
        color: white;
    }

    50% {
        color: rgb(255, 56, 56);
    }

    to {
        color: white;
    }
}

.small-x {
    font-size: 0.8rem;
    opacity: 0.5;
}</style>