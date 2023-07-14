<template>
  <div class="app">
    <header>
      <HomeNav />
    </header>

    <main>
      <router-view></router-view>
    </main>
    <footer>
      <FooterVue />
    </footer>
  </div>
</template>

<script>
import FooterVue from './components/FooterVue.vue';
import HomeNav from './components/HomeNav.vue';


export default {
  name: 'App',
  components: {
    FooterVue,
    HomeNav
  },

  methods: {

    setCart() {
      let cartItems = localStorage.getItem("cartItems");
      let cartRestaurantSlug = localStorage.getItem("cartRestaurantSlug");
      let cartRestaurantName = localStorage.getItem("cartRestaurantName");

      if (!cartItems || !cartRestaurantSlug || !cartRestaurantName) {
        localStorage.setItem("cartItems", JSON.stringify([]));
        localStorage.setItem("cartRestaurantSlug", "");
        localStorage.setItem("cartRestaurantName", "");
      }
    }
  },

  mounted() {
    this.setCart();
  },
};
</script>

<style lang="scss" scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  //flex: 1;
  //display: flex;
  //flex-direction: column;
  background-color: #ff9933;
  //overflow-y: auto;
}
</style>
