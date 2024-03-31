import { createWebHistory, createRouter } from "vue-router";
// Auth
import Register from "@/views/auth/RegisterPage.vue";
import LoginPage from "@/views/auth/LoginPage.vue";

// User
import Home from "@/views/home/HomePage.vue";
import ContactPage from "@/views/contact/ContactPage.vue";
import SearchPage from "@/views/search/SearchPage.vue";
import FrofilePage from "@/views/profile/ProfilePage.vue";
import ProductPage from "@/views/product/ProductPage.vue";
import FavoritePage from "@/views/favorite/FavoritePage.vue";
import CartPage from "@/views/cart/CartPage.vue";
import OrderPage from "@/views/order/OrderPage.vue";
const routes = [
    //Auth
    {
        path: "/register",
        name: "register",
        component: Register,
    },
    {
        path: "/login",
        name: "login",
        component: LoginPage,
    },

    //User
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/contact",
        name: "contact",
        component: ContactPage,
    },
    {
        path: "/search/:query",
        name: "search",
        component: SearchPage,
    },
    {
        path: "/profile/:id",
        name: "profile",
        component: FrofilePage,
        props: true
    },
    {
        path: "/product/:id",
        name: "prodcut",
        component: ProductPage,
        props: true
    },
    {
        path: "/favorite/:id",
        name: "favorite",
        component: FavoritePage,
        props: true
    },
    {
        path: "/cartpage/:id",
        name: "cartpage",
        component: CartPage,
        props: true
    },
    {
        path: "/orderpage/:id",
        name: "orderpage",
        component: OrderPage,
        props: true
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;