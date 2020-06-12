// src/routes.js

import Home from './routes/Home.svelte';
import About from './routes/About.svelte';
import Login from './routes/Login.svelte';
import Setting from './routes/Setting.svelte';
import Shop from './routes/Shop.svelte';
import ProductDetail from './routes/ProductDetail.svelte';
import KeepProducts from './routes/KeepProducts.svelte';
import UplaodProduct from './routes/UplaodProduct.svelte';
import UplaodProductList from './routes/UploadProductList.svelte';
import MemberList from './routes/MemberList.svelte';

const routes = {
  '/': Home,
  '/about': About,
  '/login': Login,
  '/setting': Setting,
  '/shop': Shop,
  '/product/:id': ProductDetail,
  '/upload-product': UplaodProduct,
  '/upload-product-list': UplaodProductList,
  '/keep-products': KeepProducts,
  '/member-list': MemberList
};

export default routes;
