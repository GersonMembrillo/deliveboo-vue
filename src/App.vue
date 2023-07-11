<template>
  <!-- <header v-if="showHeader">
    <HeaderNav />
  </header> -->
  <!-- <header v-else> -->
  <header>
    <HomeNav />
  </header>
  <main>
    <!-- <router-view :showHeader="showHeader" @update:showHeader="updateShowHeader" /> -->
    <router-view></router-view>
  </main>
  <footer>
    <FooterVue />
  </footer>
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
main {
  background-color: #ff9933;
  width: 100%;
  // background-attachment: fixed;
  overflow-y: auto;
}
</style>
