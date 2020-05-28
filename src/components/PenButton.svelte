<script>
  import { userState } from "../store/UserStore";
  export let clickEvent;
  export let position;
</script>

<style>
  .position {
    position: absolute;
    right: 10px;
    top: 10px;
  }
</style>

{#if $userState.level === 0}
  <button
    class="bg-white hover:bg-gray-300 text-black h-10 w-10 flex items-center
    justify-center rounded-full ml-2 z-10"
    class:position
    on:click={clickEvent}>
    <i class="fas fa-pen" />
  </button>
{/if}
