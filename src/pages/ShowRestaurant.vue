<template>
  <ShoppingCart :key="cartKey" />

  <LoaderComponent v-if="loading" />
  <div>
  </div>
  <div class="container" v-if="!loading">
    <div class="row mt-4 mb-4">
      <div class="col-12 col-lg-8 mb-2 mb-lg-0">
        <div class="card">
          <div class="card-body">
            <div class="card-title">
              <h1 class="fw-bold">{{ restaurant.name }}</h1>
              <div class="mx-2">
                <span><i class="fa-solid fa-location-dot mx-2"></i></span>
                {{ restaurant.address }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-4">
        <div class="card">
          <div class="card-body">
            <div class="card-title">
              <h3 class="fw-bold">Categories</h3>
            </div>
            <div class="card-text d-flex d-lg-block">
              <div v-for="category in restaurant.categories" :key="category.id">
                <h5><span class="badge rounded-pill text-white me-2 mb-0">{{ category.name }}</span></h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-12">
        <div class="card">
          <div id="carouselExample" class="carousel slide custom-carousel">
            <div class="carousel-inner">
              <div class="carousel-item" v-for="(image, index) in restaurant.images"
                :class="{ 'active': index === activeIndex }" :key="image.id">
                <div class="carousel-image-container">
                  <img :src="'http://localhost:8000/storage/' + image.image" class="object-fit-cover w-100 h-100"
                    alt="...">
                </div>
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
    <div class="row mb-5">
      <h2 class="fw-bold text-uppercase text-white menù-title">menù</h2>
      <div class="col-12">
        <div class="row">
          <div class="col-12 col-md-6 col-lg-4" v-for="dish in restaurant.dishes" :key="dish.id">
            <div class="card text-center p-3 mb-4" style="height: 30rem;">
              <div class="text-center pb-2">
                <div class="pb-3 fs-3"><i @click="addToCart(dish)" class="fa-solid fa-circle-plus plus-button"></i></div>
                <h5 class="fw-bold">{{ dish.name }}</h5>
                <h6><span class="text-secondary">Category:</span> {{ dish.category }}</h6>
              </div>
              <div class="card-image menù-image">
                <img class="object-fit-cover" :src="'http://localhost:8000/storage/' + dish.image" :alt="dish.name"
                  style="width: 90%; height: 12rem;">
              </div>
              <div class="card-body">
                <div class="card-text">
                  <div class="pb-2">{{ dish.price }} &euro;</div>
                  <div class="overflow-y-scroll">{{ dish.description }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import LoaderComponent from '../components/LoaderComponent.vue';
import ShoppingCart from '../components/ShoppingCart.vue';

export default {
  name: 'ShowRestaurant',

  components: {
    LoaderComponent,
    ShoppingCart
  },

  data() {
    return {
      restaurant: [],
      activeIndex: 0,
      loading: true,
      cartKey: 0
    }
  },
  methods: {
    getData() {
      axios.get(`http://localhost:8000/api/restaurants/${this.$route.params.slug}`).then((res) => {
        // console.log(res.data.results.restaurant)
        this.restaurant = res.data.results.restaurant;
        // console.log(this.restaurant)
        this.loading = false;
      });
    },

    next() {
      this.activeIndex++;
      if (this.activeIndex > this.restaurant.images.length - 1) {
        this.activeIndex = 0
      };
      // console.log(this.activeIndex)
    },
    prev() {
      this.activeIndex--;
      if (this.activeIndex < 0) {
        this.activeIndex = this.restaurant.images.length - 1
      };
      // console.log(this.activeIndex)
    },

    addToCart(newItem) {
      let items = localStorage.getItem("cartItems");
      items = JSON.parse(items);
      let quantity = 1;
      let index = -1;

      for (let i = 0; i < items.length && index < 0; i++)
        if (items[i].id == newItem.id) {
          quantity = items[i].quantity + 1;
          index = i;
        }

      if (index >= 0)
        items.splice(index, 1, {
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          quantity: quantity
        });
      else
        items.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          quantity: quantity
        });

      localStorage.setItem("cartItems", JSON.stringify(items));
      this.cartKey++;
    }
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

.carousel-image-container {
  width: 100%;
  height: 350px;
  /* altezza predefinita per dimensioni diverse da md */
}

/* Media query per dimensioni medie (md) */
@media (min-width: 768px) {
  .carousel-image-container {
    height: 550px;
    /* altezza desiderata per md */
  }
}

.rotate {
  transform: rotate(180deg);
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

.plus-button:hover {
  font-size: 30px;
  color: #ff9933;
}

.fa-circle-plus:hover {
  color: #ff9933;
}

.fa-circle-minus:hover {
  color: #ff9933;
}
</style>