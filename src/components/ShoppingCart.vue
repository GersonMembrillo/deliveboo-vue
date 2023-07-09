<template>
    <div class="cart" :class="{ 'cart-resized': store.cartResized }">
        <div @click="store.cartResized = !store.cartResized" class="line">
            <div class="resizer">
                <i class="fa-solid" :class="[{ 'fa-chevron-left': store.cartResized }, { 'fa-chevron-right': !store.cartResized }]"></i>
            </div>
        </div>
        <div class="wrapper">
            <h3 class="pb-3">Your DeliveBoo!</h3>

            <table v-if="items.length > 0" class="table table-light">
                <tbody>
                    <tr v-for="item in items" class="align-middle">
                        <td>
                            {{ item.quantity }}x
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

                    <tr>
                        <td colspan="4">
                            <button type="button" class="btn btn-outline-warning text-uppercase fs-6">
                                order {{ totalQuantity }} items for {{ totalPrice }} &euro;
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-else class="img-container">
                <img src="/img/Food.png" alt="cart_image">
                <small>Add some products to your cart!</small>
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
            store: store
        }
    },

    methods: {
        addToCart(newItem) {
            let items = localStorage.getItem("cart");
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

            localStorage.setItem("cart", JSON.stringify(items));
            this.$emit("cartChanged");
        },

        removeFromCart(oldItem) {
            let items = localStorage.getItem("cart");
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

            localStorage.setItem("cart", JSON.stringify(items));
            this.$emit("cartChanged");
        },
    },

    computed: {
        totalPrice(){
            let totalPrice = 0;

            this.items.forEach((item) => {
                totalPrice += (item.price * item.quantity);
            });

            return totalPrice;
        },

        totalQuantity(){
            let totalQuantity = 0;

            this.items.forEach((item) => {
                totalQuantity += item.quantity;
            });

            return totalQuantity;
        }
    },

    mounted() {
        let items = localStorage.getItem("cart");
        items = JSON.parse(items);
        this.items = items;
    },
}
</script>

<style lang="scss" scoped>
.cart {
    position: fixed;
    top: 100px;
    right: 0;
    padding: 0 0.5rem 0 3rem;
    width: 350px;
    height: 400px;
    border: 1px solid black;
    border-radius: 30% 0 0 30%;
    background-color: whitesmoke;
    z-index: 10000;
    overflow: hidden;
    color: black;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    ;
    transition: all 300ms;
}

.cart-resized {
    width: 2.5rem;
    padding: 0;
    color: transparent;
    overflow: hidden;
}

.resizer {
    position: absolute;
    top: 50%;
    left: 0;
    width: 40px;
    height: 40px;
    transform: translateY(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 1.3rem;
    color: white;
}

.wrapper {
    overflow-y: auto;
    overflow-x: hidden;
    text-align: center;
    width: 100%;
    height: 100%;
    padding: 1rem 0;
}

.line {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 2.5rem;
    height: 100%;
    background-color: #ff9933;
    cursor: pointer;
    transition: background-color 300ms;

    &:hover {
        background-color: #ffae5e;
    }
}

td {
    word-wrap: break-word;
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
    margin-top: 2.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2.5rem;
    padding: 0 0.5rem;
    white-space: nowrap;

    img {
        width: 140px;
    }
}

h3 {
    white-space: nowrap;
}
</style>