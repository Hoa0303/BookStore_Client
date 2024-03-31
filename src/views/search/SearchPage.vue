<template>
    <div class="container mt-5">
        <div class="row">
            <!-- Danh sách sách phẩm -->
            <div class="mt-3 col-lg-9 col-md-8">
                <ProductList v-if="filteredProductsCount > 0" :products="filteredProducts"
                    v-model:activeIndex="activeIndex" />
            </div>
        </div>
    </div>
</template>

<script>
import ProductList from "@/components/search/SearchList.vue";
import ProductService from "@/services/book.service";

export default {
    components: {
        ProductList,
    },
    data() {
        return {
            products: [],
            activeIndex: -1,
            selectedGenres: [],
            genres: [],
            query: '',
        };
    },
    computed: {
        filteredProducts() {
            if (!this.selectedGenres.length) return this.products;
            return this.products.filter(product => this.selectedGenres.includes(product.genre));
        },
        filteredProductsCount() {
            return this.filteredProducts.length;
        },
    },
    methods: {
        async retrieveProducts() {
            try {
                this.products = await ProductService.getAll();
                if (this.query) {
                    const lowerCaseQuery = this.query.toLowerCase();
                    this.products = this.products.filter(product => product.title.toLowerCase().startsWith(lowerCaseQuery));
                }
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveProducts();
            this.activeIndex = -1;
        },
    },
    mounted() {
        this.query = this.$route.params.query || '';
        this.refreshList();
    },
    watch: {
        '$route.params.query'(newQuery) {
            this.query = newQuery || '';
            this.refreshList();
        },
    },
};
</script>

<style>
.category-title {
    font-size: 1.2rem;
    margin-bottom: 1rem;
}

.category-item {
    cursor: pointer;
    padding: 0.5rem 1rem;
    transition: background-color 0.3s;
}

.category-item:hover {
    background-color: #f0f0f0;
}
</style>
