<template>
  <nav class="navbar">
    <div class="navbar-logo">
      <a href="http://localhost:5174/">
        <img src="img/deliveboo3.png" alt="Logo" />
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
      searchQuery: ''
    };
  },
  methods: {
    search() {
      console.log('Ricerca:', this.searchQuery);
    },
    redirectToBackend() {
      // Codice per reindirizzare alla parte backend
    }
  }
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f1f1f1;
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
</style>
