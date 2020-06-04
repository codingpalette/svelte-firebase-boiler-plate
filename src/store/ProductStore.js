import { writable } from 'svelte/store';

export const productState = writable({
    mode : ''
});