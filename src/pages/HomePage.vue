<template>
  <div class="container top">
    <div class="d-lg-flex align-items-center">
      <div class="main-image my-4 ms-4 ms-md-5"></div>
      <div class="px-5">
        <h1 class="text-uppercase fw-bolder">Arriva DeliveBoo!</h1>
        <h3 class="fw-normal">L'App n°1 di consegna di cibo a domicilio e molto altro</h3>
      </div>
    </div>
  </div>
  <div class="curve">
    <img class="bg-white" src="img/curve.jpg" alt="curve.png">
  </div>


  <div class="bg-white center">
    <div class="container center">
      <div class="p-5">
        <h2 class="text-center pb-4">I migliori ristoranti e molto altro</h2>
        <div class="row">

          <div class="col-6 col-md-4 col-lg-3 category">
            <a class="text-decoration-none" href="">
              <div class="position-relative">
                <img class="position-absolute"
                  src="https://just-eat-prod-eu-res.cloudinary.com/image/upload/c_fill,f_auto,h_480,q_auto,w_640/v1/experiments/projecticing/it/cuisine-icons/italiano"
                  alt="">
              </div>
            </a>
            <p class="text-center">Italiano</p>
          </div>

          <div class="col-6 col-md-4 col-lg-3 category">
            <a class="text-decoration-none text-white" href="">
              <div class="position-relative">
                <img class="position-absolute"
                  src="https://just-eat-prod-eu-res.cloudinary.com/image/upload/c_fill,f_auto,h_480,q_auto,w_640/v1/experiments/projecticing/it/cuisine-icons/pizza"
                  alt="">
              </div>
            </a>
            <p class="text-center">Pizza</p>
          </div>

          <div class="col-6 col-md-4 col-lg-3 category">
            <a class="text-decoration-none text-white" href="">
              <div class="position-relative">
                <img class="position-absolute"
                  src="https://just-eat-prod-eu-res.cloudinary.com/image/upload/c_fill,f_auto,h_480,q_auto,w_640/v1/experiments/projecticing/it/cuisine-icons/cinese"
                  alt="">
              </div>
            </a>
            <p class="text-center">Cinese</p>
          </div>

          <div class="col-6 col-md-4 col-lg-3 category">
            <a class="text-decoration-none text-white" href="">
              <div class="position-relative">
                <img class="position-absolute"
                  src="https://just-eat-prod-eu-res.cloudinary.com/image/upload/c_fill,f_auto,h_480,q_auto,w_640/v1/experiments/projecticing/it/cuisine-icons/hamburger"
                  alt="">
              </div>
            </a>
            <p class="text-center">Hamburger</p>
          </div>
        </div>

        <div class="div cat-all mt-2">
          <a class="text-black text-decoration-none" href="http://localhost:5174/restaurants">
            <div class="row category-all">
              <div class="d-flex justify-content-center align-items-center">
                <h3 class="text-uppercase">Tutti i ristoranti</h3>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>


    <div class="container">
      <div class="pb-5 pt-0 service">
        <h2 class="text-center">Consegniamo tutto ciò che vuoi</h2>
        <div class="d-md-flex px-sm-4 pt-4 justify-content-between">
          <div class="left text-center m-5 mt-0">
            <h5>I migliori ristoranti della tua città</h5>
            <img src="img/Food.png" alt="food.png">
            <p>Approfitta di un'ampia varietà di ristoranti per ordinare i tuoi piatti preferiti oppure trovane di nuovi
              nei dintorni!</p>
          </div>
          <div class="righ text-center m-5 mt-0">
            <h5>Consegna veloce? velocissima!</h5>
            <img src="img/Delivery.png" alt="delivery.png">
            <p>La rapidità è un nostro punto d'orgoglio. Ordina o invia qualsiasi cosa nella tua città: lo ritireremo e te
              lo consegneremo nel giro di qualche minuto.</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- <div class="curved">
        <img class="bg-white" src="../../public/img/curve.jpg" alt="curve.png">
    </div> -->

  <div class="curved">
    <img class="bg-white" src="img/curve.jpg" alt="curve.png">
  </div>


  <div class="container bottom">
    <div class="row d-flex justify-content-between mb-4">
      <div class="col-12 col-md-4">
        <div class="text-center">
          <a href="">
            <img src="img/rider.png" alt="rider">
          </a>
          <p class="fw-bold">Diventa un Rider</p>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <div class="text-center">
          <a href="">
            <img src="img/collab.png" alt="collab">
          </a>
          <p class="fw-bold">Diventa un Partner</p>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <div class="text-center">
          <a href="">
            <img src="img/restaurant.png" alt="restaurant">
          </a>
          <p class="fw-bold">Registra la tua attività</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeNav from '../components/HomeNav.vue';
export default {
  data() {
    return {
      showHeader: false
    };
  },
  mounted() {
    this.$emit('update:showHeader', false);
  },
};
</script>

<style lang="scss" scoped>
/* Imposta il gap tra le colonne in base alla grandezza dello schermo */
.center .row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: calc((100% - (150px * var(--num-columns))) / (var(--num-columns) - 1));
}

/* Imposta il numero di colonne in base alla grandezza dello schermo */
@media (max-width: 576px) {
  :root {
    --num-columns: 2;
  }
}

@media (min-width: 576px) and (max-width: 768px) {
  :root {
    --num-columns: 3;
  }

  .service {
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }
}

@media (min-width: 768px) {
  :root {
    --num-columns: 4;

    .center .row,
    .service {
      max-width: 800px;
      margin-left: auto;
      margin-right: auto;
    }
  }

  .left {
    width: 950px;
  }
}

.center {
  width: 100%;

  .row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 0px 33px;
  }
}

.category {
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

.cat-all {
  max-width: 600px;
  margin: 0 auto;
}

.category-all {
  height: 150px;
  background-color: #FFC001;
  border-radius: 20px;
  transition: background-color 0.5s;

  &:hover {
    background-color: #FF9934;

  }
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
}

.curved img {
  width: 100%;
  transform: rotate(180deg);
}

.service img,
.bottom img {
  width: 200px;
  height: auto;
}
</style>