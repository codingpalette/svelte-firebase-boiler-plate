<script>
    export let Title = undefined;
    export let subTitle = undefined;
</script>

<style>


</style>

<section class="px-4 box-border ">
    <div class="max-w-screen-lg py-12 md:py-18 mr-auto ml-auto">
        <h2 class=" text-center text-3xl font-bold">{Title}</h2>
        <div class="pt-4 pb-10 header_text_box">
            <p class="text-sm text-center text-gray-600 leading-normal">
                {subTitle}
            </p>
        </div>
        <slot></slot>
    </div>
</section>