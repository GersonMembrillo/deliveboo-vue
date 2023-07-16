<template>
  <div class="d-block d-lg-none">
    <ShoppingCart :key="cartKey" />
  </div>
  <WarningModal @cartCleared="cartKey++" />
  <div v-if="loading" class="position-abs w-100 h-100 d-flex align-items-center justify-content-center bg-light">
    <LoaderComponent />
  </div>
  <section v-if="!loading" class="position-relative">
    <div v-if="popUpDish" class="position-abs d-flex align-items-center justify-content-center">
      <div class="container">
        <div class="row">
          <div class="m-auto col-sm-12 col-md-9 col-lg-8 col-xl-6">
            <div class="card p-3 border border-0 shadow bg-body-tertiary rounded-4">
              <p @click="popUpDish = false"><i class="fa-solid fa-xmark fs-3"></i></p>
              <div>
                <div class="position-relative text-center">
                  <img class="w-50 rounded-3" :src="'http://localhost:8000/storage/' + dataDish.image" :alt="dataDish.name">
                  <p v-if="totalQuantity(dataDish) != 0" class="circle rounded-circle">{{ totalQuantity(dataDish) }}</p>
                </div>
              </div>
              <div class="pe-5 ps-5 mt-4">
                <p class="m-0 fs-4">{{ dataDish.name }}</p>
                <p class="fs-6">{{ dataDish.description }}</p>
                <p class="fs-6">{{ dataDish.price }} euro</p>
                <p class="m-0" @click="addToCart(dataDish)"><i class="fa-solid fa-circle-plus fs-3"></i></p>
                <p class="m-0" @click="removeFromCart(dataDish)"><i class="fa-solid fa-circle-minus fs-3"></i></p>
                <p>{{totalPrice(dataDish)}} euro</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <DishShow/> -->
    <section class="w-100 bg-light">
      <div v-if="!loading" id="carouselExample" class="carousel slide custom-carousel">
        <div class="carousel-inner">
          <div class="carousel-item" v-for="(image, index) in restaurant.images"
            :class="{ 'active': index === activeIndex }" :key="image.id">
            <div class="carousel-image-container">
              <img :src="'http://localhost:8000/storage/' + image.image" class="object-fit-cover w-100 img-effetto"
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
      <div class="container-sm-fluid container-xl ps-sm-5 pe-sm-5 ps-xl-0 pe-xl-0">
        <div class="row pb-5 mb-4">
          <div class="col-12">
            <div class="row m-position">
              <div class="col-md-12 col-lg-9">
                <div class="card p-3 pt-4 pb-4 border border-0 shadow bg-body-tertiary rounded-4 sticky">
                  <h1>{{ restaurant.name }}</h1>
                  <div class="d-flex align-items-center">
                    <span v-for="category in restaurant.categories" :key="category"
                      class="me-2 badge rounded-pill text-body-tertiary shadow-sm bg-body-tertiary rounded">{{
                        category.name }}</span>
                  </div>
                </div>
                <div class="row pt-3">
                  <div class="col-sm-12 col-md-3 pb-3 d-none d-md-block">
                    <div class="card border border-0 shadow bg-body-tertiary rounded-4 sticky-2">
                      <p class="m-0 pt-3 ps-3 fw-bold fs-5"><i class="fa-solid fa-square-poll-horizontal"></i> Sezioni</p>
                      <p class="m-0 pt-3 ps-3 p-selected" :class="{ 'selected': selectedAll }" @click="resetFilter()">
                        Tutti
                        i piatti</p>
                      <!-- <p class="m-0 pt-3 ps-3">I più venduti</p> -->
                      <p>
                        <button class="button-style pt-2 ps-3 pb-0" type="button" data-bs-toggle="collapse"
                          data-bs-target="#collapseWidthExample" aria-expanded="false"
                          aria-controls="collapseWidthExample">Categorie</button>
                      </p>
                      <div>
                        <div class="bg-light pt-0 pb-2 rounded-4" id="collapseWidthExample">
                          <div v-for="(category, index) in dishCategory" :key="category">
                            <p class="text-center" :class="{ 'selected': selectedCategory === index }"
                              @click="filterCategory(category, index)">{{ category }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-3 pb-3 d-sm-block d-md-none">
                    <div class="card border border-0 shadow bg-body-tertiary rounded-4">
                      <p class="m-0 pt-3 ps-3 fw-bold fs-5 text-center"><i class="fa-solid fa-square-poll-horizontal"></i>
                        Sezioni</p>
                      <p class="m-0 pt-3 ps-3 p-selected" :class="{ 'selected': selectedAll }" @click="resetFilter()">
                        Tutti
                        i piatti</p>
                      <!-- <p class="m-0 pt-3 ps-3">I più venduti</p> -->
                      <div class="p-3">
                        <div class="d-flex align-items-center">
                          <p class="mb-1 me-2">Categorie:</p>
                          <span v-for="(category, index) in dishCategory" :key="category"
                            class="me-2 mb-1 badge rounded-pill text-body-tertiary shadow-sm bg-body-tertiary rounded"
                            :class="{ 'selected-bg': selectedCategory === index }"
                            @click="filterCategory(category, index)">{{ category }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-9">
                    <div class="card border border-0 shadow bg-body-tertiary rounded-4 min-h">
                      <div class="bg-light shadow rounded-4 sticky-2 mb-3">
                        <div class="input-group pt-4 pb-4 p-3">
                          <input type="text" class="input form-control border border-0 shadow-sm rounded-4 rounded-4"
                            v-model="nomePiatto" @keyup="filterSearchDish" aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default" placeholder="Cerca piatto">
                        </div>
                      </div>
                      <h3 v-if="showAllDishes && !filteredCategory" class="ps-3 pt-3">Tutti i piatti</h3>
                      <h3 v-if="!showAllDishes && !notFound && filteredCategory" class="ps-3 pt-3">La tua ricerca</h3>
                      <div class="row max-h mt-2 p-3">
                        <div v-if="showAllDishes && !filteredCategory" class="row">
                          <div class="col-12 col-xxl-6 pt-2 pb-2" v-for="dish in restaurant.dishes" :key="dish.id">
                            <div class="card p-3 border border-0 shadow-sm rounded-3 h-100 d-flex flex-column">
                              <div class="row align-items-start" @click="showDish(dish)">
                                <div class="col-3 col-xxl-4">
                                  <img :src="'http://localhost:8000/storage/' + dish.image"
                                    class="immagine-uguale w-100 h-100 rounded-3">
                                </div>
                                <div class="col-9 col-xxl-8">
                                  <div class="d-flex">
                                    <p class="m-0 me-2 fs-6 fw-bold">{{ dish.name }}</p>
                                    <div class="">
                                      <span
                                        class="me-2 mb-1 badge rounded-pill text-body-tertiary shadow-sm bg-body-tertiary rounded">{{
                                          dish.category }}</span>
                                    </div>
                                  </div>
                                  <p class="">{{ dish.description }}</p>
                                </div>
                              </div>
                              <div class="row mt-3 align-items-end h-100">
                                <div class="d-flex justify-content-between align-items-center">
                                  <p class="m-0">{{ dish.price }} euro</p>
                                  <p class="m-0" @click="addToCart(dish)"><i class="fa-solid fa-circle-plus fs-3"></i></p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div v-if="!showAllDishes && !notFound && !filteredCategory">
                          <div class="col-12 pt-2 pb-2" v-for="dish in filteredDish" :key="dish.id">
                            <div class="card p-3 border border-0 shadow-sm rounded-3">
                              <div class="row" @click="showDish(dish)">
                                <div class="col-3">
                                  <img :src="'http://localhost:8000/storage/' + dish.image"
                                    class="immagine-uguale w-100 h-100 rounded-3">
                                </div>
                                <div class="col-9">
                                  <div class="d-flex">
                                    <p class="m-0 me-2 fs-6 fw-bold">{{ dish.name }}</p>
                                    <div class="">
                                      <span
                                        class="me-2 mb-1 badge rounded-pill text-body-tertiary shadow-sm bg-body-tertiary rounded">{{
                                          dish.category }}</span>
                                    </div>
                                  </div>
                                  <p class="">{{ dish.description }}</p>
                                </div>
                              </div>
                              <div class="row mt-3">
                                <div class="d-flex justify-content-between align-items-center">
                                  <p class="m-0">{{ dish.price }} euro</p>
                                  <p class="m-0" @click="addToCart(dish)"><i class="fa-solid fa-circle-plus fs-3"></i></p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div v-if="filteredCategory">
                          <div class="col-12 pt-2 pb-2" v-for="dish in filteredDish" :key="dish.id">
                            <div class="card p-3 border border-0 shadow-sm rounded-3">
                              <div class="row" @click="showDish(dish)">
                                <div class="col-3">
                                  <img :src="'http://localhost:8000/storage/' + dish.image"
                                    class="immagine-uguale w-100 h-100 rounded-3">
                                </div>
                                <div class="col-9">
                                  <div class="d-flex">
                                    <p class="m-0 me-2 fs-6 fw-bold">{{ dish.name }}</p>
                                    <div class="">
                                      <span
                                        class="me-2 mb-1 badge rounded-pill text-body-tertiary shadow-sm bg-body-tertiary rounded">{{
                                          dish.category }}</span>
                                    </div>
                                  </div>
                                  <p class="">{{ dish.description }}</p>
                                </div>
                              </div>
                              <div class="row mt-3">
                                <div class="d-flex justify-content-between align-items-center">
                                  <p class="m-0">{{ dish.price }} euro</p>
                                  <p class="m-0" @click="addToCart(dish)"><i class="fa-solid fa-circle-plus fs-3"></i></p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div v-if="notFound" class="min-h d-flex align-items-center justify-content-center">
                          <div>
                            <h3 class="text-center mt-5">La tua ricerca non ha prodotto risultati</h3>
                            <div class="col-12 pt-2 pb-2">
                              <p class="text-center">Nessun piatto corrisponde alla ricerca</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-4 col-lg-3 d-none d-lg-block">
                <div class="card p-3 border border-0 shadow bg-body-tertiary rounded-4 sticky">
                  <ShoppingCart2 :key="cartKey" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import axios from 'axios';
import LoaderComponent from '../components/LoaderComponent.vue';
import ShoppingCart from '../components/ShoppingCart.vue';
import ShoppingCart2 from '../components/ShoppingCart2.vue';
import DishShow from '../components/DishShow.vue';
import WarningModal from '../components/WarningModal.vue';

export default {
  name: 'ShowRestaurant',

  components: {
    LoaderComponent,
    ShoppingCart,
    ShoppingCart2,
    DishShow,
    WarningModal
  },

  data() {
    return {
      restaurant: [],
      dishesCategories: [],
      dishCategory: [],
      filteredDish: [],
      dataDish: [],
      selectedCategory: null,
      selectedAll: false,
      nomePiatto: '',
      activeIndex: 0,
      loading: true,
      showAllDishes: true,
      notFound: false,
      popUpDish: false,
      filteredCategory: false,
      closeButton: true,
      cartKey: 0,
      restaurantName: "",
      numDishCart: 0,
    }
  },
  methods: {
    getData() {
      axios.get(`http://localhost:8000/api/restaurants/${this.$route.params.slug}`).then((res) => {
        this.restaurant = res.data.results.restaurant;
        this.dishesCategories = res.data.results.restaurant.dishes
        this.getDishCategory(this.dishesCategories)
      }).catch((error) => {
        console.log(error);
      }).finally(() => {
        this.loading = false;
        this.selectedAll = true
      })
    },

    filterSearchDish() {

      this.nomePiatto = this.nomePiatto.toLowerCase();
      this.filteredDish = [];

      if (this.nomePiatto !== "") {

        this.dishesCategories.forEach((dish) => {
          let dishName = dish.name.toLowerCase();
          if (dishName.includes(this.nomePiatto)) {
            this.filteredDish.push(dish);
          }
        });
        this.selectedCategory = null
        this.selectedAll = false
        this.showAllDishes = false;
      } else {
        this.selectedCategory = null
        this.selectedAll = true
        this.filteredCategory = false
        this.showAllDishes = true;
      }


      if (this.nomePiatto !== "" && this.filteredDish.length == 0) {
        this.notFound = true
      } else {
        this.notFound = false
      }



    },
    filterCategory(category, index) {
      this.nomePiatto = ''
      if (this.selectedCategory === index) {
        this.resetFilter();
        return;
      } else {
        this.selectedAll = false
      }

      this.filteredDish = [];
      this.selectedCategory = index;

      if (category || this.selectedCategory == index) {
        console.log('category !== ""')
        this.dishesCategories.forEach((dish) => {
          if (dish.category.includes(category)) {
            this.filteredDish.push(dish);
          }
        });
        this.filteredCategory = true;
      } else {
        console.log('category == ""')
        this.filteredCategory = false;
      }
    },



    getDishCategory(dishesCategories) {
      dishesCategories.forEach((dish) => {
        if (!this.dishCategory.includes(dish.category)) {
          this.dishCategory.push(dish.category);
        }
      });
    },

    showDish(dish) {
      this.popUpDish = true
      this.dataDish = dish
      console.log(this.dataDish)

    },

    resetFilter() {
      this.nomePiatto = ''
      this.selectedAll = !this.selectedAll
      this.selectedCategory = null;
      this.showAllDishes = true;
      this.filteredCategory = false;

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

      this.numDishCart++

      sessionStorage.clear();

      let cartRestaurantSlug = localStorage.getItem("cartRestaurantSlug");
      let cartRestaurantName = localStorage.getItem("cartRestaurantName");
      
      if (cartRestaurantSlug != "" && cartRestaurantSlug != this.restaurant.slug)  {
        new bootstrap.Modal(document.querySelector("#warningModal")).show();
        return;
      }

      cartRestaurantSlug = this.restaurant.slug;
      cartRestaurantName = this.restaurant.name;

      localStorage.setItem("cartRestaurantSlug", cartRestaurantSlug);
      localStorage.setItem("cartRestaurantName", cartRestaurantName);

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
    },
    removeFromCart(newItem) {
      this.numDishCart--
      let items = localStorage.getItem("cartItems");
      items = JSON.parse(items);

      let index = -1;
      for (let i = 0; i < items.length; i++) {
        if (items[i].id === newItem.id) {
          index = i;
          break;
        }
      }

      if (index >= 0) {
        if (items[index].quantity > 1) {
          items[index].quantity--;
        } else {
          items.splice(index, 1);
        }

        localStorage.setItem("cartItems", JSON.stringify(items));
        this.cartKey--;
      }
    },
    totalPrice(data) {
    let items = localStorage.getItem("cartItems");
    items = JSON.parse(items);

    let totalPrice = 0;
    for (let i = 0; i < items.length; i++) {
      if (items[i].id === data.id) {
        totalPrice += items[i].price * items[i].quantity;
      }
    }

    return totalPrice;
  },
  totalQuantity(data) {
    let items = localStorage.getItem("cartItems");
    items = JSON.parse(items);

    let totalQuantity = 0;
    for (let i = 0; i < items.length; i++) {
      if (items[i].id === data.id) {
        totalQuantity += items[i].quantity;
      }
    }

    return totalQuantity;
  }


  },
  
  mounted() {
    this.getData();
  },

}
</script>

<style lang="scss" scoped>
.selected {
  color: rgb(255, 204, 0);
}

.selected-bg {
  background-color: rgb(255, 204, 0) !important;
  color: rgb(255, 255, 255) !important;
}

.m-position {
  margin-top: -50px;
}

.button-style {
  border: none;
  padding: 0;
  background-color: transparent;
  cursor: pointer;
}


.immagine-uguale {
  object-fit: cover;
}

.img-effetto {
  filter: brightness(50%);
  max-height: 400px;
}



.min-h {
  min-height: 300px;
}


::-webkit-scrollbar {
  width: 7px;
}


::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: rgb(161, 161, 161);
  border-radius: 10px;
}


::-webkit-scrollbar-thumb:hover {
  background: #6b6b6b;
}


@media (min-width: 1400px) {
  .immagine-uguale {
    width: 80px !important;
    height: 80px !important;
  }
}

.position-abs {
  position: fixed;
  top: 0;
  z-index: 10000;
  width: 100vw;
  height: 100%;
  background-color: rgba(69, 69, 69, 0.552);
}

.position-abs {
  position: fixed;
  top: 0;
  z-index: 11000;
}





div.sticky {
  position: sticky;
  top: 20px;
  z-index: 1000;
}

div.sticky-2 {
  position: sticky;
  top: 160px;
  z-index: 1000;
}

.position-relative {
  position: relative;
 
}

.circle {
  width: 40px;
  height: 40px;
  background-color: red;
  position: absolute;
  top: -20px;
  right: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
}
</style>