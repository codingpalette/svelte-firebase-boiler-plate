<script>
    import { onMount } from "svelte";

    let scrollY;
    let innerWidth;
    let innerHeight;

    onMount(() => {
        scrollY = 0
    })
</script>

<svelte:window bind:scrollY bind:innerWidth bind:innerHeight/>