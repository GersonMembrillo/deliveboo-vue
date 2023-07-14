<template>
  <ShoppingCart :key="cartKey" />

  <LoaderComponent v-if="loading" />
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
              <div v-if="loading"
                class="position-abs w-100 h-100 d-flex align-items-center justify-content-center bg-light">
                <LoaderComponent />
              </div>
              <section v-if="!loading">
                <div v-if="popUpDish" class="position-abs d-flex align-items-center justify-content-center">
                  <div class="container">
                    <div class="row">
                      <div class="m-auto col-sm-12 col-md-9 col-lg-8 col-xl-6">
                        <div class="card p-3 border border-0 shadow bg-body-tertiary rounded-4">
                          <p @click="popUpDish = false"><i class="fa-solid fa-xmark fs-3"></i></p>
                          <img class="w-50 m-auto rounded-3" :src="'http://localhost:8000/storage/' + dataDish.image"
                            :alt="dataDish.name">
                          <div class="pe-5 ps-5 mt-4">
                            <p class="m-0 fs-4">{{ dataDish.name }}</p>
                            <p class="fs-6">{{ dataDish.description }}</p>
                            <p class="fs-6">{{ dataDish.price }} euro</p>
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
                              <img :src="'http://localhost:8000/storage/' + image.image"
                                class="object-fit-cover w-100 h-100" alt="...">
                            </div>
                          </div>
                          <section class="w-100 bg-light position-relative">
                            <div v-if="!loading" id="carouselExample" class="carousel slide custom-carousel">
                              <div class="carousel-inner">
                                <div class="carousel-item" v-for="(image, index) in restaurant.images"
                                  :class="{ 'active': index === activeIndex }" :key="image.id">
                                  <div class="carousel-image-container">
                                    <img :src="'http://localhost:8000/storage/' + image.image"
                                      class="object-fit-cover w-100 img-effetto" alt="...">
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
                          </section>
                        </div>
                        <div class="row mb-5">
                          <h2 class="fw-bold text-uppercase text-white menù-title">menù</h2>
                          <div class="col-12">
                            <div class="row">
                              <div class="col-12 col-md-6 col-lg-4" v-for="dish in restaurant.dishes" :key="dish.id">
                                <div class="card text-center p-3 mb-4" style="height: 30rem;">
                                  <div class="text-center pb-2">
                                    <div class="pb-3 fs-3"><i @click="addToCart(dish)"
                                        class="fa-solid fa-circle-plus plus-button"></i></div>
                                    <h5 class="fw-bold">{{ dish.name }}</h5>
                                    <h6><span class="text-secondary">Category:</span> {{ dish.category }}</h6>
                                  </div>
                                  <div class="card-image menù-image">
                                    <img class="object-fit-cover" :src="'http://localhost:8000/storage/' + dish.image"
                                      :alt="dish.name" style="width: 90%; height: 12rem;">
                                    <div class="container-sm-fluid container-xl ps-sm-5 pe-sm-5 ps-xl-0 pe-xl-0">
                                      <div class="row pb-5 mb-4">
                                        <div class="col-12">
                                          <div class="row m-position">
                                            <div class="col-md-12 col-lg-9">
                                              <div
                                                class="card p-3 pt-4 pb-4  border border-0 shadow bg-body-tertiary rounded-4">
                                                <h1>{{ restaurant.name }}</h1>
                                                <div class="d-flex align-items-center">
                                                  <span v-for="category in restaurant.categories" :key="category"
                                                    class="me-2 badge rounded-pill text-body-tertiary shadow-sm bg-body-tertiary rounded">{{
                                                      category.name }}</span>
                                                </div>
                                              </div>
                                              <div class="row pt-3">
                                                <div class="col-sm-12 col-md-3 pb-3 d-none d-md-block">
                                                  <div class="card border border-0 shadow bg-body-tertiary rounded-4">
                                                    <p class="m-0 pt-3 ps-3 fw-bold fs-5"><i
                                                        class="fa-solid fa-square-poll-horizontal"></i> Sezioni</p>
                                                    <p class="m-0 pt-3 ps-3 p-selected"
                                                      :class="{ 'selected': selectedAll }" @click="resetFilter()">Tutti i
                                                      piatti</p>
                                                    <!-- <p class="m-0 pt-3 ps-3">I più venduti</p> -->
                                                    <p>
                                                      <button class="button-style pt-2 ps-3 pb-0" type="button"
                                                        data-bs-toggle="collapse" data-bs-target="#collapseWidthExample"
                                                        aria-expanded="false"
                                                        aria-controls="collapseWidthExample">Categorie</button>
                                                    </p>
                                                    <div>
                                                      <div class="bg-light pt-0 pb-2 rounded-4" id="collapseWidthExample">
                                                        <div v-for="(category, index) in dishCategory" :key="category">
                                                          <p class="text-center"
                                                            :class="{ 'selected': selectedCategory === index }"
                                                            @click="filterCategory(category, index)">{{ category }}</p>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="col-sm-12 col-md-3 pb-3 d-sm-block d-md-none">
                                                  <div class="card border border-0 shadow bg-body-tertiary rounded-4">
                                                    <p class="m-0 pt-3 ps-3 fw-bold fs-5 text-center"><i
                                                        class="fa-solid fa-square-poll-horizontal"></i> Sezioni</p>
                                                    <p class="m-0 pt-3 ps-3 p-selected"
                                                      :class="{ 'selected': selectedAll }" @click="resetFilter()">Tutti i
                                                      piatti</p>
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
                                                  <div
                                                    class="card p-3 border border-0 shadow bg-body-tertiary rounded-4 min-h">
                                                    <div class="input-group mb-4">
                                                      <input type="text"
                                                        class="input form-control border border-0 shadow-sm rounded-4 rounded-4"
                                                        v-model="nomePiatto" @keyup="filterSearchDish"
                                                        aria-label="Sizing example input"
                                                        aria-describedby="inputGroup-sizing-default"
                                                        placeholder="Cerca piatto">
                                                    </div>
                                                    <h3 v-if="showAllDishes && !filteredCategory">Tutti i piatti</h3>
                                                    <h3 v-if="!showAllDishes && !notFound || filteredCategory">La tua
                                                      ricerca</h3>
                                                    <div class="row max-h mt-2">
                                                      <div v-if="showAllDishes && !filteredCategory" class="row">
                                                        <div class="col-12 col-xxl-6 pt-2 pb-2"
                                                          v-for="dish in restaurant.dishes" :key="dish.id">
                                                          <div
                                                            class="card p-3 border border-0 shadow-sm rounded-3 h-100 d-flex flex-column">
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
                                                              <div
                                                                class="d-flex justify-content-between align-items-center">
                                                                <p class="m-0">{{ dish.price }} euro</p>
                                                                <p class="m-0" @click="addToCart(dish)"><i
                                                                    class="fa-solid fa-circle-plus fs-3"></i></p>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <div v-if="!showAllDishes && !notFound && !filteredCategory">
                                                        <div class="col-12 pt-2 pb-2" v-for="dish in filteredDish"
                                                          :key="dish.id">
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
                                                              <div
                                                                class="d-flex justify-content-between align-items-center">
                                                                <p class="m-0">{{ dish.price }} euro</p>
                                                                <p class="m-0" @click="addToCart(dish)"><i
                                                                    class="fa-solid fa-circle-plus fs-3"></i></p>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <div v-if="filteredCategory">
                                                        <div class="col-12 pt-2 pb-2" v-for="dish in filteredDish"
                                                          :key="dish.id">
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
                                                              <div
                                                                class="d-flex justify-content-between align-items-center">
                                                                <p class="m-0">{{ dish.price }} euro</p>
                                                                <p class="m-0" @click="addToCart(dish)"><i
                                                                    class="fa-solid fa-circle-plus fs-3"></i></p>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <div v-if="notFound"
                                                        class="min-h d-flex align-items-center justify-content-center">
                                                        <div>
                                                          <h3 class="text-center mt-5">La tua ricerca non ha prodotto
                                                            risultati</h3>
                                                          <div class="col-12 pt-2 pb-2">
                                                            <p class="text-center">Nessun piatto corrisponde alla ricerca
                                                            </p>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div class="col-md-4 col-lg-3 d-none d-lg-block">
                                              <div class="card p-3 border border-0 shadow bg-body-tertiary rounded-4">
                                                <h4>questo potrebbe essere un carrello</h4>
                                                <p>sparisce a dimensione 800 circa</p>
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
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="d-block d-lg-none">
    <ShoppingCart :key="cartKey" />
  </div>
  <div v-if="loading" class="position-abs w-100 h-100 d-flex align-items-center justify-content-center bg-light">
    <LoaderComponent />
  </div>
  <section v-if="!loading">
    <div v-if="popUpDish" class="position-abs d-flex align-items-center justify-content-center">
      <div class="container">
        <div class="row">
          <div class="m-auto col-sm-12 col-md-9 col-lg-8 col-xl-6">
            <div class="card p-3 border border-0 shadow bg-body-tertiary rounded-4">
              <p @click="popUpDish = false"><i class="fa-solid fa-xmark fs-3"></i></p>
              <img class="w-50 m-auto rounded-3" :src="'http://localhost:8000/storage/' + dataDish.image"
                :alt="dataDish.name">
              <div class="pe-5 ps-5 mt-4">
                <p class="m-0 fs-4">{{ dataDish.name }}</p>
                <p class="fs-6">{{ dataDish.description }}</p>
                <p class="fs-6">{{ dataDish.price }} euro</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section class="w-100 bg-light position-relative">
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
                <div class="card p-3 pt-4 pb-4  border border-0 shadow bg-body-tertiary rounded-4">
                  <h1>{{ restaurant.name }}</h1>
                  <div class="d-flex align-items-center">
                    <span v-for="category in restaurant.categories" :key="category"
                      class="me-2 badge rounded-pill text-body-tertiary shadow-sm bg-body-tertiary rounded">{{
                        category.name }}</span>
                  </div>
                </div>
                <div class="row pt-3">
                  <div class="col-sm-12 col-md-3 pb-3 d-none d-md-block">
                    <div class="card border border-0 shadow bg-body-tertiary rounded-4">
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
                    <div class="card p-3 border border-0 shadow bg-body-tertiary rounded-4 min-h">
                      <div class="input-group mb-4">
                        <input type="text" class="input form-control border border-0 shadow-sm rounded-4 rounded-4"
                          v-model="nomePiatto" @keyup="filterSearchDish" aria-label="Sizing example input"
                          aria-describedby="inputGroup-sizing-default" placeholder="Cerca piatto">
                      </div>
                      <h3 v-if="showAllDishes && !filteredCategory">Tutti i piatti</h3>
                      <h3 v-if="!showAllDishes && !notFound || filteredCategory">La tua ricerca</h3>
                      <div class="row max-h mt-2">
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
                <div class="card p-3 border border-0 shadow bg-body-tertiary rounded-4 shopping-cart-wrapper">
                  <ShoppingCart2 :key="cartKey" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>

  >>>>>>> 44795dff2cb686a7d5c21d51c5a43dbef57471fb
</template>

<script>
import axios from 'axios';
import LoaderComponent from '../components/LoaderComponent.vue';
import ShoppingCart from '../components/ShoppingCart.vue';
import ShoppingCart2 from '../components/ShoppingCart2.vue';

export default {
  name: 'ShowRestaurant',

  components: {
    LoaderComponent,
    ShoppingCart,
    ShoppingCart2
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
      cartKey: 0
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
        this.showAllDishes = true;
      }


      if (this.nomePiatto !== "" && this.filteredDish.length == 0) {
        this.notFound = true
        console.log('non trovati', this.notFound)
      } else {
        this.notFound = false
        console.log('trovati', this.notFound)
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

      if (category !== '') {
        this.dishesCategories.forEach((dish) => {
          if (dish.category.includes(category)) {
            this.filteredDish.push(dish);
          }
        });
        this.filteredCategory = true;
      } else {
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
      let cartRestaurantSlug = localStorage.getItem("cartRestaurantSlug");
      let cartRestaurantName = localStorage.getItem("cartRestaurantName");
      //console.log(localStorage)
      //console.log(cartRestaurantName)

      if (cartRestaurantSlug != "" && cartRestaurantSlug != this.restaurant.slug)
        if (window.confirm("Warning! You are adding an item from " + this.restaurant.name + ". If you proceed with this action you will lose all the items from " + cartRestaurantName + ". \n\nAre you sure to proceed?"))
          localStorage.setItem("cartItems", JSON.stringify([]));
        else
          return;

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
    }
  },
  mounted() {
    this.getData();

  }
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

.max-h {
  max-height: 800px;
  overflow: auto;
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
  position: absolute;
  top: 0;
  z-index: 10000;
}

.shopping-cart-wrapper {
  position: fixed;
  top: 30%;
  z-index: 10000;
}




// h1 {
//   font-size: 5rem;
// }

// .badge {
//   background-color: #ff9933;
// }

// .carousel-image-container {
//   width: 100%;
//   height: 350px;
//   /* altezza predefinita per dimensioni diverse da md */
// }

// /* Media query per dimensioni medie (md) */
// @media (min-width: 768px) {
//   .carousel-image-container {
//     height: 550px;
//     /* altezza desiderata per md */
//   }
// }

// .rotate {
//   transform: rotate(180deg);
// }

// .card {
//   cursor: pointer;
// }

// h2.menù-title {
//   font-size: 4rem;
// }

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
}</style>