// src/routes.js

import Home from './routes/Home.svelte';
import About from './routes/About.svelte';
import Login from './routes/Login.svelte';
import KeepProducts from './routes/KeepProducts.svelte';
import UplaodProduct from './routes/UplaodProduct.svelte';

const routes = {
  '/': Home,
  '/about': About,
  '/login': Login,
  '/upload-product': UplaodProduct,
  '/keep-products': KeepProducts,
};

export default routes;
