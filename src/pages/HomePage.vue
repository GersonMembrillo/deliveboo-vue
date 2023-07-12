<template>
  <ShoppingCart />
  <div class="container top">
    <div class="d-lg-flex align-items-center">
      <div class="main-image my-4 ms-4 ms-md-5"></div>
      <div class="px-5">
        <h1 class="text-uppercase fw-bolder fs-1">Arriva DeliveBoo!</h1>
        <h3 class="fw-normal text-white fs-4">L'App n°1 di consegna di cibo a domicilio e molto altro...</h3>
      </div>
    </div>
  </div>
  <div class="curve pt-4">
    <img class="bg-white" src="img/curve.jpg" alt="curve.png">
  </div>

  <div class="bg-white center">
    <div class="container center">
      <div class="p-5">

        <div class="mt-5 mb-5">
          <div class="d-grid">
            <a id="all-restaurants" href="http://localhost:5174/restaurants" class="btn btn-warning text-uppercase fs-1"
              type="button">
              tutti i ristoranti
            </a>
          </div>
        </div>

        <h2 class="text-center text-uppercase fw-bold fs-1 pt-4 pb-5">categorie</h2>
        <div class="row grid">

          <div class="col-6 col-md-4 col-lg-3 category">
            <a class="text-decoration-none" href="#">
              <div class="position-relative">
                <img class="position-absolute"
                  src="https://just-eat-prod-eu-res.cloudinary.com/image/upload/c_fill,f_auto,h_480,q_auto,w_640/v1/experiments/projecticing/it/cuisine-icons/italiano"
                  alt="">
              </div>
            </a>
            <p class="fs-4 pt-2">Italiano</p>
          </div>

          <div class="col-6 col-md-4 col-lg-3 category">
            <a class="text-decoration-none text-white" href="#">
              <div class="position-relative">
                <img class="position-absolute"
                  src="https://just-eat-prod-eu-res.cloudinary.com/image/upload/c_fill,f_auto,h_480,q_auto,w_640/v1/experiments/projecticing/it/cuisine-icons/pizza"
                  alt="">
              </div>
            </a>
            <p class="fs-4 pt-2">Pizza</p>
          </div>

          <div class="col-6 col-md-4 col-lg-3 category">
            <a class="text-decoration-none text-white" href="#">
              <div class="position-relative">
                <img class="position-absolute"
                  src="https://just-eat-prod-eu-res.cloudinary.com/image/upload/c_fill,f_auto,h_480,q_auto,w_640/v1/experiments/projecticing/it/cuisine-icons/cinese"
                  alt="">
              </div>
            </a>
            <p class="fs-4 pt-2">Cinese</p>
          </div>

          <div class="col-6 col-md-4 col-lg-3 category">
            <a class="text-decoration-none text-white" href="#">
              <div class="position-relative">
                <img class="position-absolute"
                  src="https://just-eat-prod-eu-res.cloudinary.com/image/upload/c_fill,f_auto,h_480,q_auto,w_640/v1/experiments/projecticing/it/cuisine-icons/hamburger"
                  alt="">
              </div>
            </a>
            <p class="fs-4 pt-2">Hamburger</p>
          </div>
        </div>

      </div>
    </div>

    <div class="container">
      <div class="pb-4 pt-0 service">
        <h2 class="text-center text-uppercase fw-bold fs-1 pt-4 pb-4">consegniamo tutto ciò che vuoi!</h2>
        <div class="d-md-flex px-sm-4 pt-4 justify-content-between">
          <div class="left text-center m-5 mt-0">
            <h5 class="pb-3">I migliori ristoranti della tua città</h5>
            <img src="img/Food.png" alt="food">
            <p class="pt-3">
              Approfitta di un'ampia varietà di ristoranti per ordinare i tuoi piatti preferiti oppure trovane di nuovi
              nei dintorni!
            </p>
          </div>
          <div class="righ text-center m-5 mt-0">
            <h5 class="pb-3">Consegna veloce? velocissima!</h5>
            <img src="img/Delivery.png" alt="delivery">
            <p class="pt-2">
              La rapidità è un nostro punto d'orgoglio. Ordina o invia qualsiasi cosa nella tua città: lo ritireremo e te
              lo consegneremo nel giro di qualche minuto.
            </p>
          </div>
        </div>
      </div>

      <div class="pb-5">
        <h2 class="text-center text-uppercase fw-bold fs-1 pt-3 pb-4">novità</h2>
        <div class="container">
          <div class="row gx-5">
            <div class="col-12 col-sm-12 col-md-6 col-lg-6">
              <h3 class="text-uppercase text-warning text-center fw-bold fs-2 pt-3 pb-5">deliveboo gold</h3>
              <iframe width="560" height="315" src="https://www.youtube.com/embed/QAnLqf2PTrg"
                title="YouTube video player" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen>
              </iframe>
            </div>
            <div class="col-12 col-sm-12 col-md-6 col-lg-6 text-center">
              <h3 class="text-uppercase fw-bold fs-2 pt-3 pb-5">Hai già la nostra App?</h3>
              <div class="card">
                <img src="/img/app_logo.png" alt="deliveboo_app_logo" class="card-img-top">
                <div class="card-body">
                  <div class="card-title">
                    <h5 class="text-secondary">Scaricala ora! Disponibile su Apple Store e Google Play!</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 class="text-center text-uppercase fw-bold title fs-1 pt-5 pb-5">domande frequenti</h2>
        <div class="accordion pb-5" id="accordionExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
              <button class="accordion-button fs-2" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
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
              <button class="accordion-button collapsed fs-2" type="button" data-bs-toggle="collapse"
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
              <button class="accordion-button collapsed fs-2" type="button" data-bs-toggle="collapse"
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
              <button class="accordion-button collapsed fs-2" type="button" data-bs-toggle="collapse"
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
              <button class="accordion-button collapsed fs-2" type="button" data-bs-toggle="collapse"
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

  <div class="curved pb-4">
    <img class="bg-white" src="img/curve.jpg" alt="curve.png">
  </div>

  <div class="container bottom">
    <div class="row grid d-flex justify-content-between mb-5">
      <div class="col-12 col-md-4">
        <div class="text-center">
          <a href="">
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
</template>

<script>
import ShoppingCart from '../components/ShoppingCart.vue';
export default {
  components: {
    ShoppingCart
  },
  data() {
    return {
      showHeader: false,
      videoUrl: "https://www.youtube.com/embed/QAnLqf2PTrg"
    };
  },
  mounted() {
    this.$emit('update:showHeader', false);
  },
};
</script>

<style lang="scss" scoped>
/* Imposta il gap tra le colonne in base alla grandezza dello schermo */
.center .grid {
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

    .center .grid,
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

  .grid {
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
</style>