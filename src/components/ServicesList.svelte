<script>
  export let list;
  console.log(list);
</script>

<style>
  li {
    width: 100%;
    transition: background 0.3s, border 0.3s, border-radius 0.3s,
      box-shadow 0.3s, -webkit-border-radius 0.3s, -webkit-box-shadow 0.3s;
  }
  li:hover {
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
  }
  @media screen and (min-width: 768px) {
    li {
      width: 50%;
    }
  }

  @media screen and (min-width: 1024px) {
    li {
      width: 33.33%;
    }
  }
</style>

<li class="px-4 py-8 text-center">
  <div class="icon_box">
    <i class=" {list.icons} fa-3x" />
  </div>
  <div class="text_box">
    <p class="title py-3 text-lg">{list.title}</p>
    <p class="txt text-sm text-gray-600">{list.text}</p>
  </div>
</li>
