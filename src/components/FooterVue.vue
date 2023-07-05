<template>
  <footer>
    <div class="curve">
        <img class="bg-white" src="../../public/img/footer-wave-desktop.svg">
    </div>
    <div class="content py-2 d-none d-sm-block">
      <div class="container">
        <div class="h2 text-white">
          <img class="moto" src="../../public/img/moto_dude.svg" alt="">
          <div class="d-flex justify-content-between">
            <div class="col-footer">
              <img class="curved" src="../../public/img/deliveboo3.png" alt="">
            </div>
            <div class="col-footer">
              <ul>
                <li><h5>Link of interest</h5></li>
                <li>About us</li>
                <li>Contact us</li>
                <li>FAQ</li>
                <li>Blog</li>
              </ul>
            </div>
            <div class="col-footer">
              <h5>Follow us</h5>
              <div>
                <i class="fa-brands fa-twitter"></i>
                <i class="fa-brands fa-facebook-f"></i>
                <i class="fa-brands fa-instagram"></i>
              </div>
            </div>
            <div class="col-footer">
              <ul class="text-uppercase">
                <li>Terms & condition</li>
                <li>Privacy policy</li>
                <li>Cookies policy</li>
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            <h3 class="pt-3">Top categories</h3>
            <ul class="d-flex m-0">
              <li>aaaa</li>
              <li>aaaa</li>
              <li>aaaa</li>
              <li>aaaa</li>
            </ul>
            <h3>Top restaurants</h3>
            <ul class="d-flex m-0">
              <li>aaaa</li>
              <li>aaaa</li>
              <li>aaaa</li>
              <li>aaaa</li>
            </ul>
          </div>
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
footer{
  position: relative;
  .col-footer{
    width: calc(100% / 4) -10px;
    text-align: center;
    ul{
      li{
        padding: 10px 0px;
      }
      list-style: none;
      font-size: 16px;
      color: #dbdbdb;
    }
  }
  .footer-bottom{
    color: #dbdbdb;
    h3{
      font-size: 24px;
    }
    ul{
      list-style: none;
      font-size: 16px;
      padding: 6px 0px 30px 0px;
      li{
        padding-right: 10px;
      }
    }
  }
}
.curve{
  transform: translate(250px, -13px);
}
img.bg-white{
  transform: scale(1.5);
}
.content {
  background-color: #1d1d1d;
  width: 100%;
  .curved {
    height: 40px;
    width: auto;
    filter: brightness(0) saturate(100%) invert(98%) sepia(4%) saturate(4%) hue-rotate(356deg) brightness(105%) contrast(100%);
  }
  .moto{
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-64px) rotate(-10deg);
    animation: motorbike 7s 1;
    animation-timing-function: linear;
    animation-iteration-count: 1;
    display: block;
    width: 95px;
    height: 85px;
  }
}

@keyframes motorbike {
    0% {
        transform: translateY(-64px) rotate(-10deg);
    }
    10% {
        transform: translateY(-70px) translateX(10vw) rotate(-5deg);
    }
    20% {
        transform: translateY(-78px) translateX(20vw) rotate(-3deg);
    }
    30% {
        transform: translateY(-85px) translateX(30vw) rotate(-1deg);
    }
    40% {
        transform: translateY(-92px) translateX(40vw) rotate(0deg);
    }
    50% {
        transform: translateY(-100px) translateX(50vw) rotate(0deg);
    }
    60% {
        transform: translateY(-92px) translateX(60vw) rotate(-5deg);
    }
    70% {
        transform: translateY(-85px) translateX(70vw) rotate(-9deg);
    }
    80% {
        transform: translateY(-78px) translateX(80vw) rotate(-14deg);
    }
    90% {
        transform: translateY(-70px) translateX(90vw) rotate(-20deg);
    }
    100% {
        transform: translateY(-64px) translateX(100vw) rotate(-30deg);
    }
}


</style>