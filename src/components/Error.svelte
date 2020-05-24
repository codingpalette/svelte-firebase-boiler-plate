<script>
  import { onDestroy } from "svelte";
  import { errorState } from "../store/SiteStore";
  export let backcolor;
  let timeOut = true;

  const errorsubscribe = errorState.subscribe(value => {
    // console.log(value);
    if (value.open && timeOut) {
      timeOut = false;
      setTimeout(function() {
        errorState.update(v => {
          const x = { ...v };
          x.open = false;
          x.errorMessage = "";
          return x;
        });
        timeOut = true;
      }, 3000);
    }
  });

  onDestroy(errorsubscribe);
</script>

<style>
  .error_content {
    right: 5%;
    top: calc(64px + 5%);
    color: #fff;
    min-width: 200px;
    box-sizing: border-box;
  }
  .error_content.red {
    background-color: #f56565;
  }
  .error_content .close_btn {
    position: absolute;
    right: 10px;
    top: 5px;
  }
  .error_content .bar {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 5px;
    background-color: rgba(255, 255, 255, 0.5);
    animation-duration: 3s;
    animation-name: barslidein;
    animation-timing-function: linear;
  }

  @keyframes barslidein {
    from {
      width: 0%;
    }

    to {
      width: 100%;
    }
  }
</style>

{#if $errorState.open}
  <div
    class="error_content fixed z-50 py-4 px-4 text-sm rounded"
    class:red={backcolor === 'red'}
    class:grren={backcolor === 'grren'}>
    <button class="close_btn">
      <i class="fas fa-times" />
    </button>
    {$errorState.errorMessage}
    <span class="bar" />
  </div>
{/if}
