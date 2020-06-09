<script>
  let backImg05 = "images/back_img05.jpg";

  let scrollY;
  let innerWidth;
  let innerHeight;

  let canvas;
  let canvasY = 0;

  const handleScroll = (sY, iW, iH) => {
    // console.log(sY, iW, iH);

    // console.log(canvas.offsetHeight);
    // console.log(canvas.offsetTop - innerHeight);
    // console.log(canvas.offsetTop - sY);
    if (sY >= canvas.offsetTop - innerHeight && canvas.offsetTop - sY >= 0) {
      // console.log(sY - (canvas.offsetTop - innerHeight));
      canvasY = (sY - (canvas.offsetTop - innerHeight)) / 30;
      // console.log(canvasY);
    }
  };
</script>

<style>
  .banner_container {
    height: 500px;
    position: relative;
  }
  .parallax_box {
    position: relative;
    left: 0;
    top: 0;
    height: 100%;
    overflow: hidden;
    z-index: 0;
  }
  .parallax_itme {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .parallax_inner {
    position: absolute;
    width: 100%;
    height: 150%;
    left: 0;
    top: -50%;
    background-size: cover;
    background-position: center center;
    transition: transform 1s;
    transition-timing-function: ease-out;
  }
  .back {
    background-color: rgba(0, 0, 0, 0.5);
  }
</style>

<svelte:window
  bind:scrollY
  bind:innerWidth
  bind:innerHeight
  on:scroll={handleScroll(scrollY, innerWidth, innerHeight)} />

<section class="banner_container mt-12 md:mt-18" bind:this={canvas}>
  <div class="parallax_box">
    <div class="parallax_itme">
      <div
        class="parallax_inner"
        style="background-image: url('{backImg05}'); transform:translate(0%, {canvasY}%)
        matrix(1, 0, 0, 1, 0, 0); " />
    </div>
  </div>
  <div class="back absolute inset-0 z-10" />
  <div
    class="text_box absolute inset-0 z-10 p-4 flex items-center justify-center
    flex-col">
    <div class="icon_box text-white">
      <i class="fas fa-hashtag fa-3x" />
    </div>
    <h2 class="text-center text-3xl font-bold text-white tracking-wider">
      Business
    </h2>
    <div class="pt-4">
      <p class="text-lg text-center text-white leading-normal">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat
        distinctio nemo molestias.
      </p>
      <p class="text-lg text-center text-white leading-normal">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat
        distinctio nemo molestias.
      </p>
      <p class="text-lg text-center text-white leading-normal">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat
        distinctio nemo molestias.
      </p>
    </div>
  </div>
</section>
