<template>
  <div class="app">
    <!-- <header v-if="showHeader">
    <HeaderNav />
  </header> -->
    <!-- <header v-else> -->
    <header>
      <HomeNav />
    </header>
    <!-- <router-view :showHeader="showHeader" @update:showHeader="updateShowHeader" /> -->
    <main>
      <router-view></router-view>
    </main>
    <footer>
      <FooterVue />
    </footer>
  </div>
</template>

<script>
// import HeaderNav from './components/HeaderNav.vue';
import FooterVue from './components/FooterVue.vue';
import HomeNav from './components/HomeNav.vue';


export default {
  name: 'App',
  components: {
    // HeaderNav,
    FooterVue,
    HomeNav,

  },
  // data() {
  //   return {
  //     showHeader: true
  //   };
  // },
  methods: {
    // updateShowHeader(value) {
    //   this.showHeader = value;
    // }

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
  flex: 1;
  background-color: #ff9933;
  overflow-y: auto;
}
</style>
