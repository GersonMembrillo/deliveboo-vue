<template>
  <div class="container">
    <div class="row mt-5 mb-5">
      <div class="col-12">
        <div class="row">
          <div class="col-8">
            <div class="card">
              <div id="carouselExample" class="carousel slide">
                <div class="carousel-inner">
                  <div class="carousel-item" v-for="(image, index) in restaurant.images"
                    :class="{ 'active': index === activeIndex }" :key="image.id">
                    <img :src="'http://localhost:8000/storage/' + image.image" class="d-block w-100" alt="...">
                  </div>
                </div>
                <button class="carousel-control-prev" type="button" @click="prev">
                  <span class="carousel-control-prev-icon"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" @click="next">
                  <span class="carousel-control-next-icon"></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
              <div class="card-body">
                <p>{{ restaurant.address }}</p>
              </div>
            </div>
          </div>
          <div class="col-4">
            <div class="card">
              <div class="card-body">
                <p v-for="category in restaurant.categories" :key="category.id">{{ category.name }}</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-3" v-for="dish in restaurant.dishes" :key="dish.id">
        <div class="card">
          <img :src="'http://localhost:8000/storage/' + dish.image" :alt="dish.name">
          <div class="card-body">
            <h5>{{ dish.name }}</h5>
            <h5>{{ dish.category }}</h5>
            <p>{{ dish.price }} euro</p>
            <p>{{ dish.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ShowRestaurant',

  data() {
    return {
      restaurant: [],
      activeIndex: 0

    }

  },
  methods: {
    getData() {
      axios.get(`http://localhost:8000/api/restaurants/${this.$route.params.slug}`).then((res) => {
        //console.log(res.data.results.restaurant)
        this.restaurant = res.data.results.restaurant
        console.log(this.restaurant)
      })

    },

    next() {
      this.activeIndex++
      if (this.activeIndex > this.restaurant.images.length - 1) {
        this.activeIndex = 0
      }
      console.log(this.activeIndex)
    },
    prev() {
      this.activeIndex--
      if (this.activeIndex < 0) {
        this.activeIndex = this.restaurant.images.length - 1
      }
      console.log(this.activeIndex)
    },
  },

  mounted() {
    this.getData();
  }
}
</script>

<style lang="scss" scoped></style>