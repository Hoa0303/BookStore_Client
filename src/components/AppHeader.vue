<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary border-bottom">
        <div class="container-fluid">
            <a class="navbar-brand ms-5" href="/">Book Store</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link :to="{ name: 'home' }" class="nav-link">
                            Home
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'contact' }" class="nav-link">
                            Contact
                        </router-link>
                    </li>
                </ul>
                <!-- <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success">Search</button>
                </form> -->

                <form class="d-flex" role="search" @submit.prevent="search">
                    <input v-model="searchQuery" class="form-control me-2" type="search" placeholder="Search"
                        aria-label="Search">
                    <button class="btn btn-outline-success">Search</button>
                </form>

                <ul class="navbar-nav">
                    <!-- Have account in Cookies -->
                    <li class="nav-item dropdown" v-if="userName">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            {{ userName }}
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li>
                                <router-link :to="{ name: 'profile', params: { id: userId }, }" class="dropdown-item">
                                    <i class="fas fa-user"></i>
                                    <span> Hồ sơ</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'orderpage', params: { id: userId }, }" class="dropdown-item">
                                    <i class="fa-brands fa-shopify"></i>
                                    <span> Đơn hàng</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'favorite', params: { id: userId }, }" class="dropdown-item">
                                    <i class="fas fa-heart"></i>
                                    <span> Yêu thích</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="#" class="dropdown-item" @click="confirmLogout">
                                    <i class="fas fa-sign-out-alt"></i>
                                    <span> Đăng xuất</span>
                                </router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item ms-3 me-5" v-if="userName">
                        <router-link :to="{ name: 'cartpage', params: { id: userId }, }" class="nav-link">
                            <i class="fas fa-shopping-cart"></i>
                        </router-link>
                    </li>

                    <!-- No account in Cookies -->
                    <li class="nav-item ms-3" v-if="!userName">
                        <router-link :to="{ name: 'login' }" class="nav-link">
                            <i class="fas fa-user"></i>
                        </router-link>
                    </li>
                    <li class="nav-item ms-3 me-5" v-if="!userName">
                        <router-link :to="{ name: 'login' }" class="nav-link">
                            <i class="fas fa-shopping-cart"></i>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import Cookies from 'js-cookie';
export default {
    data() {
        return {
            userName: '',
            userId: '',
            searchQuery: '',
        };
    },
    mounted() {
        this.getUserNameFromCookie();
    },
    methods: {
        getUserNameFromCookie() {
            const name = Cookies.get("userName");
            const id = Cookies.get('userId');
            if (name) {
                this.userId = id;
                this.userName = name;
            }
        },
        confirmLogout() {
            if (confirm("Bạn có chắc muốn đăng xuất không?")) {
                this.logout();
            }
        },
        logout() {
            Cookies.remove('userName');
            Cookies.remove('userId');
            this.userName = '';
            this.$router.push({ name: 'login' });
        },
        search() {
            if (this.searchQuery.trim() !== '') {
                this.$router.push({ name: 'search', params: { query: this.searchQuery } });
            }
        }
    }
};
</script>
