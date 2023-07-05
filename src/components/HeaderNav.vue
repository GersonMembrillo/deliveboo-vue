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
    <div class="navbar-search d-none d-sm-block">
      <input type="text" v-model="searchQuery" placeholder="Cerca..." @keyup.enter="search" />
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
    search() {
      console.log('Ricerca:', this.searchQuery);
    },
    redirectToBackend() {
      // Codice per reindirizzare alla parte backend
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
  background-color: #f1f1f1;
  position: sticky;
  top: 0;
  z-index: 999;
}

.navbar-logo img {
  height: 30px;
  width: auto;
}

.navbar-search input {
  padding: 5px;
  margin-right: 10px;
}

.navbar-buttons button {
  padding: 10px 20px;
  background-color: #ccc;
  border: none;
  color: #fff;
  cursor: pointer;
}

.navbar-hidden {
  transform: translateY(-100%);
  transition: transform 0.3s ease-out;
}
</style>
