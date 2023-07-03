<template>
  <nav class="navbar">
    <div class="navbar-logo">
      <a href="http://localhost:5174/">
      <img src="../../public/img/deliveboo3.png" alt="Logo" />
      </a>
    </div>
    <div class="navbar-buttons">
      <button @click="redirectToBackend">Accedi</button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'HomeNav',
  methods: {
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
