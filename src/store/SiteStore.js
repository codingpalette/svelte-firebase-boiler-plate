import { writable } from 'svelte/store';

export const count = writable(0);
export const siteState = writable({
  title: '',
});

export const siteOk = writable(false);

export const errorState = writable({
  open: false,
  errorMessage: '',
});

export const productList = writable([]);

export const productDetailItem = writable(null);
