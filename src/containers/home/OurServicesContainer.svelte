<script>
  import ServicesList from "../../components/ServicesList.svelte";

  let Lists = [
    {
      id: 1,
      icons: "fab fa-codepen",
      title: "Why do we use it?",
      text:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque cupiditate tenetur sequi dolor recusandae unde quas."
    },
    {
      id: 2,
      icons: "fas fa-cogs",
      title: "Why do we use it?",
      text:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque cupiditate tenetur sequi dolor recusandae unde quas."
    },
    {
      id: 3,
      icons: "fas fa-dharmachakra",
      title: "Why do we use it?",
      text:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque cupiditate tenetur sequi dolor recusandae unde quas."
    },
    {
      id: 4,
      icons: "fas fa-box-open",
      title: "Why do we use it?",
      text:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque cupiditate tenetur sequi dolor recusandae unde quas."
    },
    {
      id: 5,
      icons: "fas fa-star-of-david",
      title: "Why do we use it?",
      text:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque cupiditate tenetur sequi dolor recusandae unde quas."
    },
    {
      id: 6,
      icons: "fab fa-github",
      title: "Why do we use it?",
      text:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque cupiditate tenetur sequi dolor recusandae unde quas."
    }
  ];
</script>

<style>

</style>

<div class="our_services_container max-w-screen-lg mt-24 mr-auto ml-auto p-4">
  <h2 class="text-center text-3xl font-bold">OUR SERVICES</h2>
  <div class="pt-4">
    <p class="text-sm text-center text-gray-600 leading-normal">WELCOME</p>
  </div>
  <ul class="flex items-center justify-center flex-wrap mt-12">
    {#each Lists as list}
      <ServicesList {list} />
    {/each}
  </ul>
</div>
