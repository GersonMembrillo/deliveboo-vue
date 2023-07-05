<template>
  <nav :class="['navbar', { 'navbar-hidden': isNavbarHidden }]">
    <div class="navbar-logo">
 footer
      <a href="http://localhost:5173/"></a>
      <img src="../../public/img/deliveboo3.png" alt="Logo" />

      <a href="http://localhost:5174/">
        <img src="img/deliveboo3.png" alt="Logo" />
 main
      </a>
    </div>
    <div class="navbar-buttons">
      <button @click="redirectToBackend">Accedi</button>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      isNavbarHidden: false,
      lastScrollPosition: 0,
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

      if (currentScrollPosition > this.lastScrollPosition && currentScrollPosition > 0) {
        // Scorri verso il basso, nascondi la navbar solo in formato mobile
        if (window.innerWidth <= 768) {
          this.isNavbarHidden = true;
        }
      } else {
        // Scorri verso l'alto, mostra la navbar
        this.isNavbarHidden = false;
      }

      this.lastScrollPosition = currentScrollPosition;
    },
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #ff9933;
}

.navbar-logo img {
  height: 30px;
  width: auto;
  filter: brightness(0) saturate(100%) invert(98%) sepia(4%) saturate(4%) hue-rotate(356deg) brightness(105%) contrast(100%);
}

.navbar-buttons button {
  padding: 10px 20px;
  background-color: white;
  border: none;
  color: black;
  cursor: pointer;
}
</style>
