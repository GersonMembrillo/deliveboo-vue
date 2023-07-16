<template>
  <div v-if="loading" class="position-abs w-100 h-100 d-flex align-items-center justify-content-center bg-light">
    <LoaderComponent />
  </div>
  <section v-if="!loading" class="w-100 bg-light">
    <ShoppingCart />
    <div id="restaurants-category" class="container-sm-fluid container-md-fluid container-lg-fluid container-xl">
      <div class="row pt-5">
        <div class="col-12">
          <div class="row">
            <div class="row sticky">
              <div class="col-sm-12 col-md-8 col-lg-6 col-xl-4">
                <div class="input-group mb-4">
                  <input type="text" class="input form-control border border-0 shadow-sm rounded-4 rounded-4" v-model="inputText" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Cerca Ristorante...">
                </div>
              </div>
            </div>
            <div class="col-md-4 col-lg-3 col-xl-2 pe-3 pt-2">
              <div class="card d-none d-md-block border border-0 shadow rounded-4 rounded sticky-2">
                <div class="card-body">
                  <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input inputt" :checked="filterCategoryNames.length < 1" @click="resetCheckBox($event)" id="resetCheckbox">
                    <label class="form-check-label">all</label>
                  </div>
                  <div class="mb-3 form-check" v-for="category in categories" :key="category.id">
                    <input type="checkbox" class="form-check-input" :checked="categoryChecked(category.name)" :id="category.id" :value="category.name" @click="clickCheckBox(category.name)">
                    <label class="form-check-label" :for="category.id">{{ category.name }}</label>
                  </div>
                </div>
              </div>
              <div class="d-md-none mt-2 mb-4 ps-2">
                <p>
                  <a class="btn btn-dark" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                    <i class="fa-solid fa-filter"></i>
                  </a>
                </p>
                <div class="collapse" id="collapseExample">
                  <div class="card rounded-4 rounded">
                    <div class="card-body">
                      <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" :checked="isAllChecked" :value="all" @click="resetCeckBox()">
                        <label class="form-check-label">all</label>
                      </div>
                      <div class="mb-3 form-check" v-for="category in categories" :key="category.id">
                        <input type="checkbox" class="form-check-input" :id="category.id" :value="category.name" @click="clickCheckBox(category.name)">
                        <label class="form-check-label" :for="category.id">{{ category.name }}</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-8 col-lg-9 col-xl-10 position-relative" v-if="1 > 0">
              <div class="">
                <div class="row ps-2 pe-2 pt-3 pb-3 mb-3 mt-2 me-2 ms-2 sticky-2 bg-white shadow rounded-4">
                  <div class="col-12">
                    <h3>Ristoranti a domicilio nella tua zona</h3>
                    <span v-for="filterCategoryName in filterCategoryNames" class="me-2 badge rounded-pill shadow-sm text-bg-dark rounded badge-style">
                      {{ filterCategoryName }}
                    </span>
                    <span v-if="filterCategoryNames.length < 1" class="me-2 badge rounded-pill shadow-sm text-bg-dark rounded badge-style">Tutti</span>
                  </div>
                </div>
                <div>
                  <div class="row ps-2 pe-2 mb-5" v-if="1 > 2">
                    <p class="fs-4 mb-3">I più richiesti</p>
                    <div class="col-sm-6 col-lg-4 col-xl-3 pb-4" v-for="restaurant in restaurantsRanked" :key="restaurant.id">
                      <router-link class="link-offset-2 link-underline link-underline-opacity-0" :to="{ name: 'restaurant-show', params: { slug: restaurant.slug } }">
                        <div class="card bg-light border border-0">
                          <img class="w-100 rounded-4 img-restaurant shadow rounded" :src="'http://localhost:8000/storage/' + restaurant.image" :alt="restaurant.name">
                          <div class="pt-2">
                            <p class="m-0 ps-2">{{ restaurant.name }}</p>
                            <div class="pt-1">
                              <span v-for="category in restaurant.categories" :key="category" class="me-2 badge rounded-pill text-body-tertiary shadow-sm bg-body-tertiary rounded">{{
                                category }}</span>
                            </div>
                          </div>
                        </div>
                      </router-link>
                    </div>
                  </div>
                  <div class="row ps-2 pe-2" v-if="!loading">
                    <p v-if="showNotFound()" class="fs-4 mb-3">Nessun risultato corrisponde ai criteri di ricerca.</p>
                    <div v-for="restaurant in restaurants" :key="restaurant.id" v-show="showRestaurant(restaurant.categories) && searchByName(restaurant.name)" class="col-sm-6 col-lg-4 col-xl-3 pb-4">
                      <router-link class="link-offset-2 link-underline link-underline-opacity-0" :to="{ name: 'restaurant-show', params: { slug: restaurant.slug } }">
                        <div class="card bg-light border border-0">
                          <img class="w-100 rounded-4 img-restaurant shadow rounded" :src="'http://localhost:8000/storage/' + restaurant.image" :alt="restaurant.name">
                          <div class="pt-2">
                            <p class="m-0 ps-2">{{ restaurant.name }}</p>
                            <div class="pt-1">
                              <span v-for="category in restaurant.categories" :key="category" class="me-2 badge rounded-pill text-body-tertiary shadow-sm bg-body-tertiary rounded">{{
                                category }}</span>
                            </div>
                          </div>
                        </div>
                      </router-link>
                    </div>
                    <div v-if="!showNotFound()" class="d-flex justify-content-center mt-5 mb-5">
                      <nav aria-label="Page navigation example my-3">
                        <ul class="pagination">
                          <li class="page-item"><button class="page-link" :class="{ 'disabled': currentPage === 1 }" @click="getData(currentPage - 1)">Previous</button></li>
                          <li class="page-item" v-for="n in lastPage" :key="n">
                            <button class="page-link" :class="{ 'active': currentPage === n }" @click="getData(n)">{{ n
                            }}</button>
                          </li>
                          <li class="page-item"><button class="page-link" :class="{ 'disabled': currentPage === lastPage }" @click="getData(currentPage + 1)">Next</button></li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-8 col-lg-9 col-xl-10" v-if="1 > 2">
              <div class="row ps-2 pe-2 mb-3">

                <div class="col-12">
                  <h3 class="">Ristoranti filtrati</h3>
                  <span v-for="category in checkedCategories" :key="category" class="me-2 badge rounded-pill shadow-sm text-bg-dark rounded badge-style">{{ category }}</span>
                </div>
              </div>
              <div class="row ps-2 pe-2 mb-5" :class="{ 'opacity-0': loading }">
                <p class="fs-4 mb-3">Le tue scelte</p>
                <div class="col-sm-6 col-lg-4 col-xl-3 pb-4" v-for="restaurant in filteredRestaurants" :key="restaurant.id">
                  <router-link class="link-offset-2 link-underline link-underline-opacity-0" :to="{ name: 'restaurant-show', params: { slug: restaurant.slug } }">
                    <div class="card bg-light border border-0">
                      <img class="w-100 rounded-4 img-restaurant shadow rounded" :src="'http://localhost:8000/storage/' + restaurant.image" :alt="restaurant.name">
                      <div class="pt-2">
                        <p class="m-0 ps-2">{{ restaurant.name }}</p>
                        <div class="pt-1">
                          <span v-for="category in restaurant.categories" :key="category" class="me-2 badge rounded-pill text-body-tertiary shadow-sm bg-body-tertiary rounded">{{
                            category }}</span>
                        </div>
                      </div>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
            <div class="col-md-8 col-lg-9 col-xl-10" v-if="notFound">
              <div class="row ps-2 pe-2 mb-3">
                <div class="col-12">
                  <h3 class="">Ristoranti filtrati</h3>
                  <span v-for="category in checkedCategories" :key="category" class="me-2 badge rounded-pill shadow-sm text-bg-dark rounded badge-style">{{ category }}</span>
                </div>
              </div>
              <div class="row ps-2 pe-2 mb-5 mt-5 pt-5 pb-5">
                <div class="col-sm-5 col-lg-5 col-xl-3 pb-4 m-auto">
                  <div class="card bg-light border border-0">
                    <div class="pt-2">
                      <p class="m-0 ps-2 text-center">Ci dispiace, non sono stati trovati ristoranti con le categorie
                        selezionate</p>
                      <div class="pt-1 text-center mt-3">
                        <a class="btn btn-primary" href="#" role="button" @click="resetCeckBox()">Inzia da capo</a>
                      </div>
                    </div>
                  </div>
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
import { store } from "../store.js";

export default {
  name: 'Restaurants',

  components: {
    RestaurantCard,
    ShoppingCart,
    LoaderComponent
  },
  data() {
    return {
      categories: [],
      restaurants: [],
      restaurantsAll: [],
      filteredRestaurants: [],
      searchRestaurants: [],
      checkedCategories: [],
      restaurantsRanked: [],
      showPopular: true,
      currentPage: 1,
      lastPage: null,
      loading: true,
      name: '',
      store: store,
      filterCategoryNames: [],
      inputText: "",
      notFound: false
    }

  },
  methods: {
    getData(page) {


      let params = {
        'page': page
      };
      axios.get(`http://localhost:8000/api/mixed`, { params }).then((res) => {
        this.currentPage = res.data.results.restaurants.current_page
        this.lastPage = res.data.results.restaurants.last_page

        //dati che verranno stampati
        this.categories = res.data.results.categories;
        this.restaurants = res.data.results.restaurants.data;
        this.restaurantsAll = res.data.results.restaurantsAll;
        // this.clickCheckBox();
        // this.getRestaurantsRanked(this.restaurantsAll)
        // console.log(this.restaurants);
      }).catch((error) => {
        console.log(error);
      }).finally(() => {
        this.loading = false;
        this.notFound = false
        this.filteredRestaurants = []

        if(this.store.categorySelected) {

      this.filterCategoryNames.push(this.store.categorySelected);
      // let checkboxes = document.querySelectorAll("input[type='checkbox']");
      // console.log(checkboxes + "endiowjiodqwio");
      // for(let i = 0; i < checkboxes.length; i++)
      //     checkboxes[i].checked = true;
    }
      })

      if (page != undefined) {
        this.showPopular = false
        this.isAllChecked = true
      }
      if (page == 1) {
        this.showPopular = true
        this.isAllChecked = true
      }


    },

    // resetCeckBox() {
    //   this.notFound = false
    //   this.isAllChecked = true;
    //   this.checkedCategories = [];
    //   this.filteredRestaurants = [];
    //   let checkboxprova = document.querySelectorAll('input[type="checkbox"]')
    //   checkboxprova.forEach((item, index) => {

    //     if (index == 0) {
    //       item.checked = true;
    //       this.isAllChecked = true
    //       this.filteredRestaurants = []
    //     } else {
    //       item.checked = false;
    //       this.isAllChecked = false
    //     }
    //   })
    // },

    // clickCheckBox(value) {
    //   if (this.index === 0 && this.categoryId) {
    //     if (this.categoryId == 1) {
    //       this.name = 'Italiano'
    //     } else if (this.categoryId == 2) {
    //       this.name = 'Pizza'
    //     } else if (this.categoryId == 3) {
    //       this.name = 'Cinese'
    //     } else if (this.categoryId == 4) {
    //       this.name = 'Hamburger'
    //     } else {
    //       this.name = 'All'
    //       this.index = 2;
    //     }
    //     if (this.name !== 'All') {
    //       this.checkedCategories.push(this.name);
    //     }
    //     this.index++;
    //     this.filteredRestaurant();
    //   } else {
    //     if (this.checkedCategories.includes(value)) {
    //       const index = this.checkedCategories.indexOf(value);
    //       this.checkedCategories.splice(index, 1);
    //     } else {
    //       this.checkedCategories.push(value);
    //     }

    //     if (this.checkedCategories.length > 0) {
    //       let checkboxprova = document.querySelectorAll('input[type="checkbox"]')
    //       checkboxprova[0].checked = false
    //       this.isAllChecked = false;
    //     } else {
    //       this.isAllChecked = true;
    //       let checkboxprova = document.querySelectorAll('input[type="checkbox"]')
    //       checkboxprova[0].checked = true
    //       this.filteredRestaurants = [];
    //     }
    //     this.index++;
    //     this.filteredRestaurant();
    //   }
    // },

    // filteredRestaurant() {
    //   if (this.checkedCategories.length > 0) {
    //     this.filteredRestaurants = this.restaurantsAll.filter(restaurante =>
    //       this.checkedCategories.every(category => restaurante.categories.includes(category))
    //     );
    //     this.notFound = this.filteredRestaurants.length === 0;
    //   } else {
    //     this.filteredRestaurants = [];
    //     this.notFound = false;
    //   }

    // },

    // filterSearch() {
    //   if (this.nameRestaurants != '') {
    //     let checkboxprova = document.querySelectorAll('input[type="checkbox"]')
    //     checkboxprova.forEach(item => {
    //       if (item.checked) {
    //         item.checked = false
    //         this.checkedCategories = []
    //       }
    //     })
    //     this.nameRestaurants = this.nameRestaurants.toLowerCase()
    //     this.filteredRestaurants = []
    //     this.restaurantsAll.forEach(restaurant => {
    //       let name = restaurant.name.toLowerCase()
    //       if (name.includes(this.nameRestaurants)) {
    //         this.filteredRestaurants.push(restaurant)
    //       }
    //     })
    //   } else {
    //     this.isAllChecked = true
    //     this.filteredRestaurants = []
    //     let checkboxprova = document.querySelectorAll('input[type="checkbox"]')
    //     checkboxprova.forEach(item => {
    //       console.log(item.value)
    //       if (item.value == 'all') {
    //         item.checked = true
    //       } else {
    //         item.checked = false
    //       }
    //     })

    //   }
    // },

    // firstFilter() {
    //   this.filteredRestaurants = this.restaurants.filter(restaurant => {
    //     return restaurant.categories.includes(this.name);
    //   });
    // },

    // getRestaurantsRanked(data) {
    //   data.sort((a, b) => b.total_orders - a.total_orders);
    //   this.restaurantsRanked = data.slice(0, 7);
    // },

    resetCheckBox(event) {
      let checkboxes = document.querySelectorAll("input[type='checkbox']");
      for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
      }

      event.currentTarget.checked = true;
      this.filterCategoryNames = [];
    },

    clickCheckBox(categoryName) {

      document.getElementById("resetCheckbox").checked = false;

      if (!this.filterCategoryNames.includes(categoryName))
        this.filterCategoryNames.push(categoryName);
      else
        this.filterCategoryNames = this.filterCategoryNames.filter((name) => name != categoryName);
    },

    showRestaurant(restaurantCategories) {

      let result = true;

      for (let i = 0; i < this.filterCategoryNames.length; i++)
        if (!restaurantCategories.includes(this.filterCategoryNames[i]))
          result = false;

      return result;
    },

    searchByName(name) {
      let result = true;

      let dim = this.inputText.length;
      for (let i = 0; i < dim && result; i++)
        if (name[i].toUpperCase() != this.inputText[i].toUpperCase())
          result = false;

      return result;
    },

    categoryChecked(categoryName) {
      let result = false;

      if(this.filterCategoryNames.includes(categoryName))
        result = true;

      return result;
    },

    showNotFound() {
      let result = true;

      for(let i = 0; i < this.restaurants.length && result; i++)
        if(this.searchByName(this.restaurants[i].name) && this.showRestaurant(this.restaurants[i].categories))
          result = false;

      return result;
    }
  },
  computed: {

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

.min-h {
  min-height: 1200px;
}

.position-abs {
  position: absolute;
  top: 0;
  z-index: 10000;
}

.badge-style {
  background-color: rgb(255, 204, 0) !important;
  color: rgb(255, 255, 255) !important;
}

input[type="checkbox"]:checked {
  background-color: rgb(255, 204, 0) !important;
  border: 0;
}

div.sticky {
  position: sticky;
  top: 20px;
  z-index: 10000;
}

div.sticky-2 {
  position: sticky;
  top: 75px;
  z-index: 10000;
}
</style>