<script>

</script>

<style>
  .modal_container .back {
    background-color: rgba(0, 0, 0, 0.5);
  }
  .modal_container .content {
    margin: auto;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  .modal_container .content::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
</style>

<div
  class="modal_container fixed w-full h-full inset-0 flex items-center
  justify-center p-4 box-border z-30">
  <div
    class="content relative max-w-screen-md max-h-full bg-white rounded
    overflow-auto shadow-lg p-4 box-border z-20">
    <div>
      <slot />
    </div>
  </div>
  <div class="back absolute w-full h-full inset-0 z-10" />
</div>
