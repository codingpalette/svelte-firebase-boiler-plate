import { writable } from 'svelte/store';

export const mainData = writable({
  mainTitle: '',
  subTitle: '',
  image: [],
});

export const modalData = writable({
  mainTitle: '',
  subTitle: '',
  image: [],
});
