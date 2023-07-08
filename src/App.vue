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
import LoaderComponent from './components/LoaderComponent.vue';

export default {
  name: 'App',
  components: {
    // HeaderNav,
    FooterVue,
    HomeNav,
    LoaderComponent
  },
  // data() {
  //   return {
  //     showHeader: true
  //   };
  // },
  // methods: {
  //   updateShowHeader(value) {
  //     this.showHeader = value;
  //   }
  // }
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
