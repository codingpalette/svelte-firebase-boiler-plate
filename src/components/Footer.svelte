<script>
  import { location } from "svelte-spa-router";
</script>

<style>
  footer {
    border-top: 1px solid #edf2f7;
  }
</style>

{#if $location !== '/login'}
  <footer class="p-4">
    <div class="footer_content flex items-center justify-between">
      <div class="text_box text-gray-500 text-sm ml-auto">
        © 2020 · coding-palette
      </div>
    </div>
  </footer>
{/if}
