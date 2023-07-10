<template>
  <footer class="position-relative bg-dark py-5 d-none d-sm-block">
    <img class="moto position-absolute" src="/img/moto_dude.svg" alt="">
    <div class="container">
      <div class="row">


        <div class="col-4">
          <div class="navbar-logo">
            <a href="http://localhost:5174/">
              <img src="/img/deliveboo3.png" alt="Logo" />
            </a>
          </div>
        </div>

        <div class="col-4">
          <h4 class="text-white text">Uniamo le forze</h4>
          <ul class="list-unstyled">
            <li>
              <a href="" class="text-decoration-none text-white">
                Lavora con noi
              </a>
            </li>
            <li>
              <a href="" class="text-decoration-none text-white">
                Diventa un rider
              </a>
            </li>
            <li>
              <a href="http://localhost:8000/register" class="text-decoration-none text-white">Registra la tua attività
              </a>
            </li>
          </ul>
        </div>

        <div class="col-4">
          <h4 class="text-white text">Social</h4>
          <ul class="list-unstyled">
            <li>
              <a href="" class="text-decoration-none text-white">
                Facebook
              </a>
            </li>
            <li>
              <a href="" class="text-decoration-none text-white">
                Twitter
              </a>
            </li>
            <li>
              <a href="" class="text-decoration-none text-white">
                Instragram
              </a>
            </li>
            <li>
              <a href="" class="text-decoration-none text-white">
                About Us
              </a>
            </li>
          </ul>
        </div>

      </div>
    </div>

  </footer>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
footer {
  width: 100%;
}

.navbar-logo img {
  height: 30px;
  width: auto;
  filter: brightness(0) saturate(100%) invert(98%) sepia(4%) saturate(4%) hue-rotate(356deg) brightness(105%) contrast(100%);
}

.moto {
  top: 0;
  left: 0;
  transform: translateY(-64px) rotate(0deg);
  animation: motorbike 7s infinite;
  animation-timing-function: linear;
  display: block;
  width: 95px;
  height: 85px;
}

@keyframes motorbike {
  0% {
    transform: translateY(-70px) rotate(0deg);
  }

  10% {
    transform: translateY(-70px) translateX(10vw) rotate(-5deg);
  }

  20% {
    transform: translateY(-70px) translateX(20vw) rotate(-3deg);
  }

  30% {
    transform: translateY(-70px) translateX(30vw) rotate(-1deg);
  }

  40% {
    transform: translateY(-70px) translateX(40vw) rotate(0deg);
  }

  50% {
    transform: translateY(-70px) translateX(50vw) rotate(0deg);
  }

  60% {
    transform: translateY(-70px) translateX(60vw) rotate(-5deg);
  }

  70% {
    transform: translateY(-70px) translateX(70vw) rotate(-9deg);
  }

  80% {
    transform: translateY(-70px) translateX(80vw) rotate(-14deg);
  }

  90% {
    transform: translateY(-70px) translateX(90vw) rotate(-20deg);
  }

  100% {
    transform: translateY(-70px) translateX(100vw) rotate(-10deg);
  }
}
</style>