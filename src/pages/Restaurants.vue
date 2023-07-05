<template>
  <div class="container-fluid d-none d-sm-block">
    <img src="" alt="">
  </div>
  <div class="bg-white py-3">
    <div class="container">
      <div class="row">

        <div class="card c-card col-4 col-md-3 col-xl-2">
          <a href=""></a>
        </div>

      </div>
    </div>
  </div>
  <div class="container">
    <p>Trovati i seguenti ristoranti:</p>
    <div class="">
      <RestaurantCard />
    </div>
  </div>
</template>

<script>
import RestaurantCard from '../components/RestaurantCard.vue';
export default {
  name: 'Restaurants',
  components: {
    RestaurantCard
  }
}
</script>

<style lang="scss" scoped>
.container-fluid {
  background-color: lightgray;
  height: 400px;
  width: auto;
}

.c-card {
  height: 100px;
}
</style>