<template>
    <div>
      <div v-if="totalQuantity > 0" :class="[{ 'changed-items': even() }, { 'changed-items': !even() }]">
        {{ totalQuantity }}
      </div>
  
      <table v-if="items.length > 0" class="table table-light">
        <tbody>
          <tr v-for="item in items" :key="item" class="align-middle">
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
  
      <div v-else class="text-center">
        <img class="img-food" src="/img/Food.png" alt="cart_image">
      </div>
      <div v-if="items.length > 0" class="modal-footer">
        <button @click="goToCheckout()" type="button" class="btn btn-outline-warning text-uppercase fs-6">
          Order {{ totalQuantity }} items for {{ totalPrice }} &euro;
        </button>
      </div>
      <div v-else class="text-center mt-4">This is your cart. Add some items!</div>
    </div>
  </template>
  
  <script>
  import { store } from "../store.js";
  
  export default {
    name: "ShoppingCart",
  
    data() {
      return {
        items: [],
      }
    },
  
    methods: {
      addToCart(newItem) {
        let items = localStorage.getItem("cartItems");
        items = JSON.parse(items);
        let quantity = 1;
        let index = -1;
  
        for (let i = 0; i < items.length && index < 0; i++) {
          if (items[i].id == newItem.id) {
            quantity = items[i].quantity + 1;
            index = i;
          }
        }
  
        if (index >= 0) {
          items.splice(index, 1, {
            id: newItem.id,
            name: newItem.name,
            price: newItem.price,
            quantity: quantity
          });
        } else {
          items.push({
            id: newItem.id,
            name: newItem.name,
            price: newItem.price,
            quantity: quantity
          });
        }
  
        this.items = items;
        localStorage.setItem("cartItems", JSON.stringify(items));
      },
  
      removeFromCart(oldItem) {
        let items = localStorage.getItem("cartItems");
        items = JSON.parse(items);
        let index = -1;
        let quantity = 1;
  
        for (let i = 0; i < items.length && index < 0; i++) {
          if (oldItem.id == items[i].id) {
            index = i;
            quantity = items[i].quantity - 1;
          }
        }
  
        if (quantity > 0) {
          items.splice(index, 1, {
            id: oldItem.id,
            name: oldItem.name,
            price: oldItem.price,
            quantity: quantity
          });
        } else {
          items.splice(index, 1);
        }
  
        this.items = items;
        localStorage.setItem("cartItems", JSON.stringify(items));
      },
  
      goToCheckout() {
        store.checkoutQuantity = this.totalQuantity;
        store.checkoutPrice = this.totalPrice;
  
        this.$router.push({
          name: 'checkout'
        });
      },
  
      even() {
        return this.totalQuantity % 2 === 0;
      }
    },
  
    computed: {
      totalPrice() {
        let totalPrice = 0;
  
        this.items.forEach((item) => {
          totalPrice += item.price * item.quantity;
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
    },
  }
  </script>
  <style lang="scss" scoped>
  .img-food{
    width: 150px;
  }
  </style>