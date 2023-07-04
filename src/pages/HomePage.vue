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
    <img class="bg-white" src="../../public/img/curve.jpg" alt="curve.png">
  </div>


  <div class="bg-white center">
    <div class="container center px-4 pb-0">
      <div class="p-5">
        <h2 class="text-center pb-4">I migliori ristoranti e molto altro</h2>
        <div class="row">
          <div class="col-6 col-md-4 col-lg-3 home-cat">
            <a class="text-decoration-none text-white" href="">
              <div class="">AAA</div>
            </a>
          </div>
          <div class="col-6 col-md-4 col-lg-3 home-cat">
            <a class="text-decoration-none text-white" href="">
              <div class="">AAA</div>
            </a>
          </div>
          <div class="col-6 col-md-4 col-lg-3 home-cat">
            <a class="text-decoration-none text-white" href="">
              <div class="">AAA</div>
            </a>
          </div>
          <div class="col-6 col-md-4 col-lg-3 home-cat">
            <a class="text-decoration-none text-white" href="">
              <div class="">AAA</div>
            </a>
          </div>
          <div class="col-6 col-md-4 col-lg-3 home-cat">
            <a class="text-decoration-none text-white" href="">
              <div class="">AAA</div>
            </a>
          </div>
          <div class="col-6 col-md-4 col-lg-3 home-cat">
            <a class="text-decoration-none text-white" href="">
              <div class="">AAA</div>
            </a>
          </div>
          <div class="col-6 col-md-4 col-lg-3 home-cat">
            <a class="text-decoration-none text-white" href="">
              <div class="">AAA</div>
            </a>
          </div>
          <div class="col-6 col-md-4 col-lg-3 home-cat">
            <a class="text-decoration-none text-white" href="">
              <div class="">AAA</div>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="p-5 pt-0 service">
        <h2 class="text-center">Consegniamo tutto ciò che vuoi</h2>
        <div class="d-flex px-4 pt-4 justify-content-between">
          <div class="left text-center">
            <p>I migliori ristoranti della tua città</p>
            <img src="" alt="">
          </div>
          <div class="righ text-center">
            <p>Consegna rapida</p>
            <img src="" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="curved">
    <img class="bg-white" src="../../public/img/curve.jpg" alt="curve.png">
  </div>

  <div class="container bottom">
    <div class="row">
      <div class="col-12 col-md-4">
        <div class="">
          <p>Diventa un Rider</p>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <div class="">
          <p>Diventa un Partner</p>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <div class="">
          <p>Registra la tua attività</p>
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

/* Imposta la larghezza delle colonne in base alla grandezza dello schermo */
.home-cat {
  width: 100%;
  max-width: 150px;
  height: 150px;
  background-color: black;
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
}

.center .row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 30px 60px;
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
</style>