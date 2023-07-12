<template>
  <nav class="navbar pt-3 pb-2">
    <div class="container">
      <div class="navbar-logo">
        <a href="http://localhost:5174/">
          <img src="/img/deliveboo3.png" alt="deliveboo_logo" />
        </a>
      </div>
      <div class="navbar-buttons">
        <a href="http://localhost:8000">
          <button type="button" class="btn btn-outline-warning text-uppercase fs-5">
            <i class="fa-solid fa-house-user px-1"></i>
            accedi
          </button>
        </a>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #ff9933;
}

.navbar-logo img {
  height: 60px;
  width: auto;
  filter: brightness(0) saturate(100%) invert(98%) sepia(4%) saturate(4%) hue-rotate(356deg) brightness(105%) contrast(100%);
}

.navbar-buttons button {
  padding: 13px 28px;
  background-color: white;
}
</style>
