import { writable } from 'svelte/store';

export const count = writable(0);
export const siteState = writable({
  title: '',
});

export const errorState = writable({
  open: false,
  errorMessage: '',
});
