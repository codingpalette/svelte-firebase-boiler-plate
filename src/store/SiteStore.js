import {writable} from 'svelte/store';


export const siteOk = writable(false);
export const errorState = writable({
    open: false,
    errorMessage: '',
});



