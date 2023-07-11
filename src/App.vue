<template>
  <div class="app">
    <header>
      <HomeNav />
    </header>
    <main :class="{ 'bg-white': isRestaurantsView }">
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
    HomeNav,
  },
  data() {
    return {
      isRestaurantsView: false,
    };
  },
  methods: {
 cart-check-restaurant
    // updateShowHeader(value) {
    //   this.showHeader = value;
    // }

      setCart(){
        let cartItems = localStorage.getItem("cartItems");
        let cartRestaurantSlug = localStorage.getItem("cartRestaurantSlug");
        let cartRestaurantName = localStorage.getItem("cartRestaurantName");
        
        if(!cartItems || !cartRestaurantSlug || !cartRestaurantName){
          localStorage.setItem("cartItems", JSON.stringify([]));
          localStorage.setItem("cartRestaurantSlug", "");
          localStorage.setItem("cartRestaurantName", "");
        }

    setCart() {
      let cartItems = localStorage.getItem("cartItems");

      if (!cartItems) {
        let items = [];
        localStorage.setItem("cartItems", JSON.stringify(items));
 main
      }
    }
  },
  watch: {
    $route(to) {
      this.isRestaurantsView = to.name === 'Restaurants';
    },
  },
  mounted() {
    this.setCart();
    this.isRestaurantsView = this.$route.name === 'Restaurants';
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
  flex: 1;
  background-color: #ff9933;
  overflow-y: auto;
}

.bg-white {
  background-color: white;
}
</style>
