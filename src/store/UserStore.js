import { writable } from 'svelte/store';

export const userState = writable(null);
export const userLevel = writable(null);
export const userLoding = writable(false);
