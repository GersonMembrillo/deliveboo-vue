<template>
  <LoaderComponent v-if="loading" />
  <div v-if="!loading">
    <div class="container-fluid d-none d-sm-block">
      <img src="" alt="">
    </div>
    <div class="bg-white py-3">
      <div class="container text-center">
        <div class="row ps-4 category-cards justify-content-center">

          <div class="col-6 col-md-4 col-lg-3 category" v-for="category in categories" :key="category.id">
            <a class="text-decoration-none" href="">
              <div class="position-relative">
                <img class="position-absolute" :src="'http://localhost:8000/storage/' + category.image"
                  :alt="category.name">
              </div>
            </a>
            <p class="text-center mb-0">{{ category.name }}</p>
          </div>
        </div>

      </div>
    </div>
    <div class="container">
      <p>Trovati i seguenti ristoranti:</p>

      <div class="row restaurant-row px-5 p-md-0">

        <div class="col-lg-4 col-md-6 col-12 mb-4 restaurant-card" v-for="restaurant in restaurants" :key="restaurant.id">

          <a :href="`/restaurants/${restaurant.slug}`" class="custom-link">
            <div class="card">
              <img class="card-img position-relative object-fit-cover"
                :src="'http://localhost:8000/storage/' + restaurant.image" :alt="restaurant.name">
              <div class="card-body bg-black position-absolute" style="--bs-bg-opacity: .5;">
                <h3 class="text-white mb-0">{{ restaurant.name }}</h3>
              </div>
            </div>
          </a>

        </div>
      </div>


      <nav aria-label="Page navigation example my-3">
        <ul class="pagination">
          <li class="page-item"><button class="page-link" :class="{ 'disabled': currentPage === 1 }"
              @click="getData(currentPage - 1)">Previous</button></li>
          <li class="page-item" v-for="n in lastPage" :key="n">
            <button class="page-link" :class="{ 'active': currentPage === n }" @click="getData(n)">{{ n }}</button>
          </li>
          <li class="page-item"><button class="page-link" :class="{ 'disabled': currentPage === lastPage }"
              @click="getData(currentPage + 1)">Next</button></li>
        </ul>
      </nav>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
import RestaurantCard from '../components/RestaurantCard.vue';
import LoaderComponent from '../components/LoaderComponent.vue';
export default {
  name: 'Restaurants',
  components: {
    RestaurantCard
  },
  data() {
    return {
      components: {
        LoaderComponent
      },
      categories: [],
      restaurants: [],
      currentPage: 1,
      lastPage: null
    }
  },
  methods: {
    getData(page) {
      let params = {
        'page': page
      };
      axios.get(`http://localhost:8000/api/mixed`, { params }).then((res) => {
        // console.log(res.data.results.categories)
        // console.log(res.data.results.restaurants)
        this.categories = res.data.results.categories;
        this.restaurants = res.data.results.restaurants.data;
        this.currentPage = res.data.results.restaurants.current_page;
        this.lastPage = res.data.results.restaurants.last_page;
        // console.log(this.restaurants)
        this.loading = false;
      });
    }
  },
  mounted() {
    this.getData();
  },
  components: { LoaderComponent }
}
</script>

<style lang="scss" scoped>
.container-fluid {
  background-color: lightgray;
  height: 400px;
  width: auto;
}

.restaurant-card .card,
.restaurant-card .card-img {
  border-radius: 20px;
  height: 200px;

  .card-body {
    bottom: 0;
    width: 100%;
    text-align: end;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }
}

.category-cards {
  widows: 800px;
  margin: 0 auto;
}

.category {
  width: 200px;

  .position-relative {
    width: 150px;
    height: 150px;
    border-radius: 20px;
    background-color: #FFC001;
    transition: background-color 0.5s;

    &:hover {
      background-color: #FF9934;
    }

    img.position-absolute {
      width: 200px;
      left: -25px;
      transition: transform 0.5s;
    }

    &:hover img {
      transform: scale(1.1);
    }
  }
}
</style>
