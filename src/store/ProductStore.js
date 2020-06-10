import { writable } from 'svelte/store';

export const homeList = writable([]);
export const productList = writable([]);
export const productLast = writable('');
export const shopList = writable([]);
export const shopLast = writable('');