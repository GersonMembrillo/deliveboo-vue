<template>
  <section class="w-100 bg-light">
 persistent-cart
    <ShoppingCart :key="cartKey" @cartChanged="cartKey++"/>
    <div id="restaurants-category" class="container">

    <div id="restaurants-category" class="container container-sm-fluid container-md-fluid container-lg-fluid">
 main oppa
      <div class="row pt-5">
        <div class="col-12">
          <div class="row">
            <div class="col-md-4 col-lg-3 col-xl-2 pe-3 pt-2">
              <div class="card d-none d-md-block">
                <div class="card-body">
                  <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" :checked="isAllChecked" :value="all" @click="resetCeckBox()">
                    <label class="form-check-label">all</label>
                  </div>
                  <div class="mb-3 form-check" v-for="category in categories" :key="category.id">
                    <input type="checkbox" class="form-check-input"  :id="category.id" :value="category.name" @click="clickCheckBox(category.name)">
                    <label class="form-check-label" :for="category.id">{{ category.name }}</label>
                  </div>
                </div>
              </div>
              <div class="d-md-none mt-2 mb-5">
                <p>
                  <a class="btn btn-dark" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                    Cerca il tuo Ristorante
                  </a>
                </p>
                <div class="collapse" id="collapseExample">
                  <div class="card">
                    <div class="card-body">
                      <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" :checked="isAllChecked" :value="all" @click="resetCeckBox()">
                        <label class="form-check-label">all</label>
                      </div>
                      <div class="mb-3 form-check" v-for="category in categories" :key="category.id">
                        <input type="checkbox" class="form-check-input"  :id="category.id" :value="category.name" @click="clickCheckBox(category.name)">
                        <label class="form-check-label" :for="category.id">{{ category.name }}</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-8 col-lg-9 col-xl-10 position-relative" v-if="filteredRestaurants.length === 0">
              <div v-if="loading" class="position-abs">
                <LoaderComponent class=""/>
              </div>
              <div>
                <div class="row ps-2 pe-2 mb-3">
                  <div class="col-12">
                    <h3>Ristoranti a domicilio nella tua zona</h3>
                    <span v-if="filteredRestaurants.length == 0" class="me-2 badge rounded-pill shadow-sm text-bg-dark rounded">Tutti</span>
                  </div>
                </div>
                <div :class="{'opacity-0' : loading}">
                  <div class="row ps-2 pe-2 mb-5">
                    <p class="fs-4 mb-3">I più richiesti</p>
                      <div class="col-sm-6 col-md-6 col-lg-3 pb-4" v-for="restaurant in restaurantsRanked" :key="restaurant.id">
                        <router-link class="link-offset-2 link-underline link-underline-opacity-0" :to="{ name: 'restaurant-show', params: { slug: restaurant.slug } }">
                          <div class="card bg-light border border-0">
                            <img class="w-100 rounded-4 img-restaurant shadow rounded" :src="'http://127.0.0.1:8000/storage/' + restaurant.image" :alt="restaurant.name">
                            <div class="pt-2">
                              <p class="m-0 ps-2">{{ restaurant.name }}</p>
                              <div class="pt-1">
                                <span v-for="category in restaurant.categories" :key="category" class="me-2 badge rounded-pill text-body-tertiary shadow-sm bg-body-tertiary rounded">{{ category }}</span>
                              </div>
                            </div>
                          </div>
                        </router-link>
                      </div>
                  </div>
                  <div class="row ps-2 pe-2" v-if="!loading">
                    <p class="fs-4 mb-3">Tutti i ristoranti</p>
                    <div class="col-sm-6 col-md-6 col-lg-3 pb-4" v-for="restaurant in restaurants" :key="restaurant.id">
                        <router-link class="link-offset-2 link-underline link-underline-opacity-0" :to="{ name: 'restaurant-show', params: { slug: restaurant.slug } }">
                          <div class="card bg-light border border-0">
                            <img class="w-100 rounded-4 img-restaurant shadow rounded" :src="'http://127.0.0.1:8000/storage/' + restaurant.image" :alt="restaurant.name">
                            <div class="pt-2">
                              <p class="m-0 ps-2">{{ restaurant.name }}</p>
                              <div class="pt-1">
                                <span v-for="category in restaurant.categories" :key="category" class="me-2 badge rounded-pill text-body-tertiary shadow-sm bg-body-tertiary rounded">{{ category }}</span>
                              </div>
                            </div>
                          </div>
                        </router-link>
                      </div>
                    <div class="d-flex justify-content-center mt-5 mb-5">
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
                </div>
              </div>
            </div>
            <div class="col-md-8 col-lg-9 col-xl-10 position-relative" v-else>
              <div v-if="loading" class="position-abs">
                <LoaderComponent class=""/>
              </div>
              <div class="row ps-2 pe-2 mb-3">
                <div class="col-12">
                  <h3 class="">Ristoranti filtrati</h3>
                  <span v-for="category in checkedCategories" :key="category" class="me-2 badge rounded-pill shadow-sm text-bg-dark rounded">{{ category }}</span>
                </div>
              </div>
              <div class="row ps-2 pe-2 mb-5 min-h" :class="{'opacity-0' : loading}">
                 <p class="fs-4 mb-3">Le tue scelte</p>
                  <div class="col-sm-6 col-md-6 col-lg-3 pb-4" v-for="restaurant in filteredRestaurants" :key="restaurant.id">
                    <router-link class="link-offset-2 link-underline link-underline-opacity-0" :to="{ name: 'restaurant-show', params: { slug: restaurant.slug } }">
                      <div class="card bg-light border border-0">
                        <img class="w-100 rounded-4 img-restaurant shadow rounded" :src="'http://127.0.0.1:8000/storage/' + restaurant.image" :alt="restaurant.name">
                        <div class="pt-2">
                          <p class="m-0 ps-2">{{ restaurant.name }}</p>
                          <div class="pt-1">
                            <span v-for="category in restaurant.categories" :key="category" class="me-2 badge rounded-pill text-body-tertiary shadow-sm bg-body-tertiary rounded">{{ category }}</span>
                          </div>
                        </div>
                      </div>
                    </router-link>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import LoaderComponent from '../components/LoaderComponent.vue';
import axios from 'axios';
import RestaurantCard from '../components/RestaurantCard.vue';
import ShoppingCart from '../components/ShoppingCart.vue';
export default {
  name: 'Restaurants',
  components: {
    RestaurantCard,
 persistent-cart
    ShoppingCart

    LoaderComponent
 main oppa
  },
  data() {
    return {
      categories: [],
      restaurants: [],
      filteredRestaurants: [],
      checkedCategories: [],
      restaurantsRanked: [],
      all: 'all',
      isAllChecked: true,
      categoryChecked: false,
      currentPage: 1,
      lastPage: null,
 persistent-cart
      cartKey: 0

      loading:true,

 main oppa
    }

  },
  methods: {
    getData(page) {
      let params = {
        'page': page
      };
      axios.get(`http://127.0.0.1:8000/api/mixed`, { params }).then((res) => {
        this.currentPage = res.data.results.restaurants.current_page
        this.lastPage = res.data.results.restaurants.last_page

        //dati che verranno stampati
        this.categories = res.data.results.categories;
        this.restaurants = res.data.results.restaurants.data;
        this.getRestaurantsRanked(this.restaurants)
      }).catch((error) => {
        console.log(error);
      }).finally(() => {
        this.loading = false;
      })

    },

    resetCeckBox() {
      this.isAllChecked = true;
      this.checkedCategories = [];
      this.filteredRestaurants = [];
      let checkboxprova = document.querySelectorAll('input[type="checkbox"]')
      //console.log(checkboxprova)
      checkboxprova.forEach((item, index) => {

        if (index == 0) {
          item.checked = true;
          this.isAllChecked = true
          //console.log(this.isAllChecked)
          console.log(item.checked)
          this.filteredRestaurants = []
        } else {
          item.checked = false;
          this.isAllChecked = false
          //console.log(this.isAllChecked)
          console.log(item.checked)
        }
      })
    },

    clickCheckBox(value) {
      
      if (this.checkedCategories.includes(value)) {
        const index = this.checkedCategories.indexOf(value);
        this.checkedCategories.splice(index, 1);
      } else {
        this.checkedCategories.push(value);
      }

      if (this.checkedCategories.length > 0) {
        let checkboxprova = document.querySelectorAll('input[type="checkbox"]')
        checkboxprova[0].checked = false
        this.isAllChecked = false;
        console.log(this.isAllChecked)
      } else {
        this.isAllChecked = true;
        this.filteredRestaurants = [];
      }
      this.filteredRestaurant();
    },

    filteredRestaurant() {
      if (this.checkedCategories.length > 0) {
        this.filteredRestaurants = this.restaurants.filter(restaurante =>
          this.checkedCategories.every(category => restaurante.categories.includes(category))
        );
      } else if (this.isAllChecked) {
        this.filteredRestaurants = [];
      }


    },

    getRestaurantsRanked(data) {
      data.sort((a, b) => b.total_orders - a.total_orders);
      this.restaurantsRanked = data.slice(0, 7);


    },

    prova(data){
      console.log("cao");
    }
  },

  mounted() {
    this.getData();

  }
}
</script>

<style lang="scss" scoped>
#restaurants-category {
  .img-restaurant {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
}

.min-h{
  min-height: 600px;
}
.position-abs{
  position: absolute;
  left: calc(50% - 60px);
  top: 300px;
  z-index: 10000;

}

</style>
