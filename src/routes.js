// src/routes.js

import Home from './routes/Home.svelte';
import About from './routes/About.svelte';
import Login from './routes/Login.svelte';

const routes = {
  '/': Home,
  '/about': About,
  '/login': Login,
};

export default routes;
