<template>
  <div class="container">
    <div class="row mt-5 mb-5">
      <div class="col-8">
        <div class="card">
          <div class="card-body">
            <div class="card-title">
              <h1 class="fw-bold">{{ restaurant.name }}</h1>
              <div class="mx-2">
                <span><i class="fa-solid fa-location-dot mx-2"></i></span>
                {{ restaurant.address }}
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
            </div>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="card">
          <div class="card-body">
            <div class="card-title">
              <h2 class="fw-bold">Categories</h2>
            </div>
            <div class="card-text">
              <div v-for="category in restaurant.categories" :key="category.id">
                <h4><span class="badge rounded-pill text-white">{{ category.name }}</span></h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-5 mb-5">
        <div class="col-12">
          <div class="card">
            <div id="carouselExample" class="carousel slide custom-carousel">
              <div class="carousel-inner">
                <div class="carousel-item" v-for="(image, index) in restaurant.images"
                  :class="{ 'active': index === activeIndex }" :key="image.id">
                  <img :src="'http://127.0.0.1:8000/storage/' + image.image" class="d-block w-100" alt="...">
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
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-5">
      <h2 class="fw-bold text-uppercase text-white menù-title">menù</h2>
      <div class="col-8">
        <div class="row">
          <div class="col-12 col-sm-6 col-md-6 col-lg-6" v-for="dish in restaurant.dishes" :key="dish.id">
            <div class="card text-center p-3 mb-5" style="height: 30rem;">
              <div class="text-center pb-2">
                <div class="pb-3 fs-3"><i class="fa-solid fa-circle-plus"></i></div>
                <h5 class="fw-bold">{{ dish.name }}</h5>
                <h6><span class="text-secondary">Category:</span> {{ dish.category }}</h6>
              </div>
              <div class="card-image menù-image">
                <img :src="'http://127.0.0.1:8000/storage/' + dish.image" :alt="dish.name"
                  style="width: 90%; height: 12rem;">
              </div>
              <div class="card-body">
                <div class="card-text">
                  <div class="pb-2">{{ dish.price }} &euro;</div>
                  <div>{{ dish.description }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="row">
          <div class="card rounded-5" style="height: 30rem;">
            <div class="card-body text-center">
              <div class="card-title pt-5 pb-5">
                <h2 class="fw-bold pb-5">Il tuo DeliveBoo</h2>
              </div>
              <div class="card-text">
                <p class="pt-2">Non hai ancora aggiunto alcun prodotto. Quando lo farai, compariranno qui!</p>
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

<style lang="scss" scoped>
h1 {
  font-size: 5rem;
}

.badge {
  background-color: #ff9933;
}

.custom-carousel .carousel-inner {
  max-height: 550px;
}

.card {
  cursor: pointer;
}

h2.menù-title {
  font-size: 4rem;
}

.menù-image {
  transition: transform .15s ease-in-out;
  transition-property: transform;
  transition-duration: 0.15s;
  transition-timing-function: ease-in-out;
  transition-delay: 0s;

  &:hover {
    transform: scale(1.1);
  }
}

.fa-circle-plus:hover {
  font-size: 30px;
}
</style>