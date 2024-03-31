<template>
    <div class="container mt-5">
        <div class="row">
            <!-- Danh mục -->
            <div class="mt-3 col-lg-2 col-md-3 me-3" style="border: grey solid 1px; height: 100%;">
                <div class="category-list mt-3" style="display: flex; flex-wrap: wrap;">
                    <h5 class="category-title" style="flex-basis: 100%; margin-bottom: 1rem;">Thể Loại</h5>
                    <div v-for="(genre, index) in genres" :key="index">
                        <button type="button" class="btn btn-light text-start mb-1" data-bs-toggle="button"
                            @click="toggleGenre(genre)">
                            {{ genre }}
                        </button>
                    </div>
                </div>
            </div>
            <!-- Danh sách sách phẩm -->
            <div class="mt-3 col-lg-9 col-md-8">
                <ProductList v-if="filteredProductsCount > 0" :products="filteredProducts"
                    v-model:activeIndex="activeIndex" />
            </div>
        </div>
    </div>
</template>

<script>
import ProductList from "@/components/home/ProductList.vue";
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
        };
    },
    computed: {
        filteredProducts() {
            if (!this.selectedGenres.length) return this.products;
            return this.products.filter(contact => this.selectedGenres.includes(contact.genre));
        },
        filteredProductsCount() {
            return this.filteredProducts.length;
        },
    },
    methods: {
        async retrieveProducts() {
            try {
                this.products = await ProductService.getAll();
                this.genres = this.extractGenres(this.products);
            } catch (error) {
                console.log(error);
            }
        },
        extractGenres(products) {
            const genresSet = new Set();
            products.forEach(contact => {
                genresSet.add(contact.genre);
            });
            return Array.from(genresSet);
        },
        refreshList() {
            this.retrieveProducts();
            this.activeIndex = -1;
        },
        toggleGenre(genre) {
            if (this.selectedGenres.includes(genre)) {
                this.selectedGenres = this.selectedGenres.filter(item => item !== genre);
            } else {
                this.selectedGenres.push(genre);
            }
        }
    },
    mounted() {
        this.refreshList();
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
