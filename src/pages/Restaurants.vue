<template>
  <div class="container-fluid d-none d-sm-block">
    <img src="" alt="">
  </div>
  <div class="bg-white py-3">
    <div class="container">
      <div class="row">

        <div class="col-4 col-md-3 col-xl-2" v-for="category in categories" :key="category.id">
          <div class="card">
            <img :src="'http://127.0.0.1:8000/storage/' + category.image" :alt="category.name">
            <div class="card-body">
              <p>{{ category.name }}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
  <div class="container">
    <p>Trovati i seguenti ristoranti:</p>
    <div class="row">
      <div class="col-3" v-for="restaurant in restaurants" :key="restaurant.id">
        <div class="card">
          <img :src="'http://127.0.0.1:8000/storage/' + restaurant.image" :alt="restaurant.name">
          <div class="card-body">
            <h3>{{ restaurant.name }}</h3>
            <router-link :to="{ name: 'restaurant-show', params: { slug: restaurant.slug } }"
                            class="btn btn-primary">View
            </router-link>
          </div>
        </div>
      </div>
      <nav aria-label="Page navigation example my-3">
        <ul class="pagination">
            <li class="page-item"><button class="page-link" :class="{  'disabled': currentPage === 1 }" @click="getData(currentPage - 1)">Previous</button></li>
            <li class="page-item" v-for="n in lastPage" :key="n">
              <button class="page-link" :class="{ 'active': currentPage === n }" @click="getData(n)">{{ n }}</button>
            </li>
            <li class="page-item"><button class="page-link" :class="{ 'disabled': currentPage === lastPage }" @click="getData(currentPage + 1)">Next</button></li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import RestaurantCard from '../components/RestaurantCard.vue';
export default {
  name: 'Restaurants',
  components: {
    RestaurantCard
  },
  data(){
    return{
      categories: [],
      restaurants: [],
      currentPage: 1,
      lastPage: null,

    }
    
  },
  methods: {
    getData(page) {
      let params = {
        'page' : page
      };
      axios.get(`http://127.0.0.1:8000/api/mixed`,{params}).then((res) =>{
        //console.log(res.data.results.categories)
        //console.log(res.data.results.restaurants)
        this.categories = res.data.results.categories;
        this.restaurants = res.data.results.restaurants.data;
        this.currentPage = res.data.results.restaurants.current_page
        this.lastPage = res.data.results.restaurants.last_page
        //console.log(this.restaurants)

;

      })
        
      },
    },

    mounted() {
        this.getData();
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