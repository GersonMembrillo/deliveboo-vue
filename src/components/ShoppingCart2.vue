<template>
  <div>
    <div v-if="totalQuantity > 0" :class="[{ 'changed-items': even() }, { 'changed-items': !even() }]" class="d-flex justify-content-between">
      <span class="fs-4">{{ totalQuantity }}</span>

      <span @click="goToRestaurant()" class="text-primary text-decoration-underline cursor-pointer">{{restaurantName}}</span>
    </div>

    <div v-if="items.length > 0" class="table-responsive">
      <hr>
      <table class="table table-light">
        <tbody>
          <tr v-for="item in items" :key="item" class="align-middle">
            <td>
              <span class="d-flex align-items-center gap-1"><span class="small-x">x</span> {{ item.quantity }}</span>
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
    </div>

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

export default {
  name: "ShoppingCart",

  data() {
    return {
      items: [],
      restaurantName: ""
    }
  },

  methods: {
    addToCart(newItem) {
      sessionStorage.clear();
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
      sessionStorage.clear();
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

    even() {
      return this.totalQuantity % 2 === 0;
    },

    goToCheckout() {
      sessionStorage.setItem("checkoutQuantity", this.totalQuantity);
      sessionStorage.setItem("checkoutPrice", this.totalPrice);

      window.location.href = "/checkout";
    },

    goToRestaurant() {
            window.location.href = "/restaurants/" + localStorage.getItem("cartRestaurantSlug");
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

      this.restaurantName = localStorage.getItem("cartRestaurantName");

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
.img-food {
  width: 150px;
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

.small-x {
    font-size: 0.8rem;
    opacity: 0.5;
}

td {
  word-wrap: break-word;
}
</style>