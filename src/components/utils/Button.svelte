<script>
    import {link, push} from "svelte-spa-router";

    export let mode = 'btn';
    export let width = undefined;
    export let clickEvent = undefined;
    export let href = '/'
    export let type = 'button'
</script>

<style>
    button,
    a {
        min-width: 80px;
        display: inline-block;
        text-align: center;
    }

    button + button {
        margin-left: 10px;
    }

    button + a {
        margin-left: 10px;
    }

    a + a {
        margin-left: 10px;
    }

    a + button {
        margin-left: 10px;
    }

    .full {
        width: 100%;
    }

</style>

{#if mode === 'link'}
    <a
            href={href}
            use:link
            class="bg-transparent leading-normal hover:bg-black text-xs text-black text-opacity-75 hover:text-white px-4 py-2 border border-gray-500 hover:border-transparent focus:shadow-none focus:outline-none rounded-sm"
    >
        <slot></slot>
    </a>
{:else}
    <button type={type}
            class="bg-transparent leading-normal hover:bg-black text-xs text-black text-opacity-75 hover:text-white px-4 py-2 border border-gray-500 hover:border-transparent focus:shadow-none focus:outline-none rounded-sm"
            class:full={width === 'full'}
            on:click={clickEvent}>
        <slot></slot>
    </button>
{/if}

