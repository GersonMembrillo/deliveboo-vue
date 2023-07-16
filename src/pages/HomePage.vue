<template>
  <ShoppingCart />
  <div class="" style="background-color: #ff9933;">
    <div class="container top">

      <div class="d-lg-flex align-items-center justify-content-center text-center" style="margin: 0 auto;">

        <video data-v-f4daae2a="" data-test-id="animation-video" autoplay="autoplay" loop="loop" muted="muted" width="450"
          height="450" class="animation__element">
          <source data-v-f4daae2a=""
            src="https://res.cloudinary.com/glovoapp/video/upload/website_assets/images/landing/address-container-animation.webm"
            preload="auto" type="video/webm">
        </video>

        <div class="px-5 text-center">
          <div class="">
            <h1 class="text-uppercase fw-bolder">Arriva DeliveBoo!</h1>
            <h3 class="fw-normal text-white fs-4">L'App n°1 di consegna di cibo a domicilio e molto altro...</h3>
            <router-link @click="store.categorySelected = '';" :to="{ name: 'all-restaurants' }"
              class="col-12 category-all text-black text-decoration-none d-flex justify-content-center align-items-center mt-4">
              <div>
                <h3 class="text-uppercase mb-0">Tutti i ristoranti</h3>
              </div>
            </router-link>
          </div>
        </div>

      </div>
    </div>
  </div>
  <div class="curve">
    <img class="bg-white" src="img/curve.jpg" alt="curve.png">
  </div>

  <div class="bg-white center py-5">
    <div class="container center">

      <h2 class="text-center text-uppercase fw-bold mb-5">I migliori ristoranti e molto altro</h2>
      <div class="mb-3 mx-4 mx-xl-5">
        <div class="row text-center row-center">
          <div class="mb-4 col-6 col-md-4 col-lg-3 category text-center " v-for="(category, index) in categories"
            :key="category.id">
            <div class="position-relative">
              <a class="cursor-pointer" @click="navigateToCategory(category.name)">
                <img class="position-absolute"
                  src="https://just-eat-prod-eu-res.cloudinary.com/image/upload/c_fill,f_auto,h_480,q_auto,w_640/v1/experiments/projecticing/it/cuisine-icons/pizza"
                  alt="">
                <img class="position-absolute" :src="'http://localhost:8000/storage/' + category.image"
                  :alt="category.name">
              </a>
            </div>

            <p class="mb-0">{{ category.name }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="container">


      <div class="service">
        <h2 class="text-center text-uppercase fw-bold pb-4">consegniamo tutto ciò che vuoi!</h2>
        <div class="row text-center">
          <div class="col-12 col-md-6">
            <div class="left text-center m-5 mt-0">
              <h5 class="pb-3">I migliori ristoranti della tua città</h5>
              <img src="img/Food.png" alt="food">
              <p class="m-5">
                Approfitta di un'ampia varietà di ristoranti per ordinare i tuoi piatti preferiti oppure trovane di nuovi
                nei dintorni!
              </p>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="righ text-center m-5 mt-0">
              <h5 class="pb-3">Consegna veloce? velocissima!</h5>
              <img src="img/Delivery.png" alt="delivery">
              <p class="m-5">
                La rapidità è un nostro punto d'orgoglio. Ordina o invia qualsiasi cosa nella tua città: lo ritireremo e
                te
                lo consegneremo nel giro di qualche minuto.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="pb-5">
        <h2 class="text-center text-uppercase fw-bold pb-4">novità</h2>
        <div class="container">
          <div class="row gx-5">
            <div class="col-12 col-lg-6 text-center">
              <h3 class="text-uppercase text-warning text-center   pt-3 pb-5">deliveboo gold</h3>
              <iframe width="450" height="315" src="https://www.youtube.com/embed/QAnLqf2PTrg"
                title="YouTube video player" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen>
              </iframe>
            </div>
            <div class="col-12 col-md-10 col-lg-6 text-center" style="margin: 0 auto;">
              <div class="col-10 col-sm-11 col-md-12 col-xl-10" style="margin: 0 auto;">
                <h3 class="text-uppercase   pt-3 pb-5">Hai già la nostra App?</h3>
                <div class="card d-flex flex-column app-logo">
                  <img src="/img/app_logo.png" alt="deliveboo_app_logo" class="card-img-top deliveboo-app">
                  <div class="card-body">
                    <div class="card-title">
                      <h5 class="text-secondary px-xl-5">Scaricala ora! Disponibile su Apple Store e Google Play!</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 class="text-center text-uppercase fw-bold mb-5">domande frequenti</h2>
        <div class="accordion m-5" id="accordionExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
              <button class="accordion-button fs-4" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
                aria-expanded="false" aria-controls="collapseOne">
                Cos'è Deliveboo?
              </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne"
              data-bs-parent="#accordionExample">
              <div class="accordion-body">
                <p>
                  La missione di Deliveboo è quella di trasformare il mondo del cibo a domicilio. Collaboriamo con i
                  migliori
                  ristoranti della città - dalle gemme locali alle grandi catene nazionali - per portarti dove vuoi i tuoi
                  piatti
                  preferiti. Con centinaia di ristoranti e rider esperti, ti consegniamo il tuo ordine il più velocemente
                  possibile.
                </p>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
              <button class="accordion-button collapsed fs-4" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                Qual È La Storia Della Fondazione Di Deliveboo?
              </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample">
              <div class="accordion-body">
                <p>
                  Deliveboo è un'azienda inglese digitale con una storia di successo. Dopo essersi trasferito da New York
                  a
                  Londra, il nostro fondatore rimase stupito dal non trovare servizi di food delivery di qualità. Quindi
                  decise
                  che la sua missione sarebbe stata quella di portare i piatti dei migliori ristoranti direttamente casa
                  dei loro
                  clienti. Il nostro servizio oggi è attivo in più di 100 città in tutto il mondo, offrendo lavoro a più
                  di 600
                  ingegneri e impiegati nel quartier generale di Londra, collaborando con più di 8000 ristoranti e 15000
                  riders.
                </p>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
              <button class="accordion-button collapsed fs-4" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                Come Funziona?
              </button>
            </h2>
            <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree"
              data-bs-parent="#accordionExample">
              <div class="accordion-body">
                <p>
                  Puoi ordinare sia dal sito sia dalla nostra app, disponibile per iOS e Android. Aggiungi il tuo
                  indirizzo di
                  consegna per vedere quali ristoranti consegnano da te, scegli i tuoi piatti preferiti ed effettua
                  l'ordine.
                  Quando il tuo ordine viene accettato, il ristorante inizia a prepararlo e a confezionarlo. Una volta
                  pronto, un
                  nostro rider lo ritira e lo porta da te. Se vuoi essere super organizzato, puoi ordinare fino a 24 ore
                  in
                  anticipo con un ordine programmato.
                </p>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingFour">
              <button class="accordion-button collapsed fs-4" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                Che Tipo Di Ristoranti Trovo Su Deliveboo?
              </button>
            </h2>
            <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour"
              data-bs-parent="#accordionExample">
              <div class="accordion-body">
                <p>
                  Ci prendiamo cura personalmente di proporti un'ampia selezione di ristoranti di alta qualità nella tua
                  area.
                  Questo significa che puoi trovare dal miglior ristorante giapponese, all'hamburgheria più gustosa, alla
                  pizzeria italiana tradizionale con forno a legna. L'unica cosa che non troverai su Deliveboo sono
                  ristoranti di
                  scarsa qualità.
                </p>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingFive">
              <button class="accordion-button collapsed fs-4" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                Come Viene Consegnato Il Cibo?
              </button>
            </h2>
            <div id="collapseFive" class="accordion-collapse collapse" aria-labelledby="headingFive"
              data-bs-parent="#accordionExample">
              <div class="accordion-body">
                <p>
                  Una volta che hai effettuato l'ordine, il ristorante lo riceve, lo prepara e lo impacchetta. Quando è
                  pronto,
                  un rider lo ritira e si reca all'indirizzo di consegna.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>

  <div class="curved">
    <img class="bg-white" src="img/curve.jpg" alt="curve.png">
  </div>
  <div class="" style="background-color: #ff9933;">
    <div class="container bottom pb-1">
      <div class="row d-flex justify-content-between mb-5">
        <div class="col-12 col-md-4">
          <div class="text-center">
            <a href="/rider">
              <img src="img/rider.png" alt="rider">
            </a>
            <p class="fw-bold fs-4 pt-3">Diventa un Rider!</p>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="text-center">
            <a href="">
              <img src="img/collab.png" alt="partner">
            </a>
            <p class="fw-bold fs-4 pt-3">Diventa un Partner!</p>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="text-center">
            <a href="http://localhost:8000/register">
              <img src="img/restaurant.png" alt="activity">
            </a>
            <p class="fw-bold fs-4 pt-3">Registra la tua attività!</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import HomeNav from '../components/HomeNav.vue';
import ShoppingCart from '../components/ShoppingCart.vue';
import { store } from "../store.js"
export default {
  components: {
    ShoppingCart
  },
  data() {
    return {
      showHeader: false,
      cartKey: 0,
      categories: [],
      videoUrl: "https://www.youtube.com/embed/QAnLqf2PTrg",
      store: store
    };
  },
  methods: {
    getData() {
      axios.get(`http://localhost:8000/api/mixed`).then((res) => {
        this.categories = res.data.results.categories;
        console.log(this.categories);
      }).catch((errors) => {
        console.log(errors);
      })
    },
    navigateToCategory(categoryName) {
      this.store.categorySelected = categoryName;
      this.$router.push(`/restaurants`);
    }

  },
  mounted() {
    this.$emit('update:showHeader', false);
    this.getData();
    console.log(this.categories)
  },
};
</script>

<style lang="scss" scoped>
.row-center {
  max-width: 1000px;
  margin: 0 auto;
}

.category-all {
  height: 100px;
  border-radius: 20px;
  background-color: #FFC001;
  transition: transform 0.5s, background-color 0.5s, box-shadow 0.5s;
  box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;

  &:hover {
    background-color: #ffffff;
    transform: scale(1.1);
    box-shadow: none;
  }
}

.category {
  a {
    width: 200px;
  }

  .position-relative {
    width: 150px;
    height: 150px;
    margin: 0 auto;
    border-radius: 20px;
    background-color: #FFC001;
    transition: background-color 0.5s;

    &:hover {
      background-color: #FF9934;
    }

    img.position-absolute {
      width: 200px;
      height: auto;
      left: -25px;
      transition: transform 0.5s;
    }

    &:hover img {
      transform: scale(1.1);
    }
  }
}

.deliveboo-app {
  width: 150px;
  height: auto;
  margin: 40px auto;
}

.main-image {
  width: 420px;
  height: 500px;
  background-image: url(https://www.buttalapasta.it/wp-content/uploads/2016/01/hamburger-di-carne-americano.jpg);
  background-size: cover;
  background-position: center;
  border-radius: 20px;
}

.curve img {
  width: 100%;
  max-height: 80px;
}

.curved img {
  width: 100%;
  transform: rotate(180deg);
  max-height: 80px;
}

.service img,
.bottom img {
  width: 200px;
  height: auto;
}

#all-restaurants:hover {
  background-color: white;
  color: #FFC001;
}

.accordion-button:not(.collapsed) {
  background-color: #FFC001;
  color: white;
}

.accordion {
  --bs-accordion-border-color: rgb(197, 197, 197);
}

.accordion-button:focus {
  box-shadow: none;
}

.cursor-pointer {
  cursor: pointer;
}
</style>