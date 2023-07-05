<template>
  <header v-if="showHeader">
    <HeaderNav />
  </header>
  <header v-else>
    <HomeNav />
  </header>
  <main>
    <router-view :showHeader="showHeader" @update:showHeader="updateShowHeader" />
  </main>
  <FooterVue />
</template>

<script>
import HeaderNav from './components/HeaderNav.vue';
import FooterVue from './components/FooterVue.vue';
import HomeNav from './components/HomeNav.vue';

export default {
  name: 'App',
  components: {
    HeaderNav,
    FooterVue,
    HomeNav
  },
  data() {
    return {
      showHeader: true
    };
  },
  methods: {
    updateShowHeader(value) {
      this.showHeader = value;
    }
  }
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
