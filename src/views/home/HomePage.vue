<template>
    <div class="container mt-5">
        <div class="row">
            <!-- Danh mục -->
            <div class="mt-3 col-lg-2 col-md-3 me-3" style="border: grey solid 1px; height: 100%;">
                <!-- Thể loại -->
                <div class="category-list mt-3" style="display: flex; flex-wrap: wrap;">
                    <h5 class="category-title" style="flex-basis: 100%; margin-bottom: 1rem;">Thể Loại</h5>
                    <div v-for="(genre, index) in genres" :key="index">
                        <button type="button" class="btn btn-light text-start mb-1" data-bs-toggle="button"
                            @click="toggleGenre(genre)">
                            {{ genre }}
                        </button>
                    </div>
                </div>

                <!-- Nhà xuất bản -->
                <div class="category-list mt-3" style="display: flex; flex-wrap: wrap;">
                    <h5 class="category-title" style="flex-basis: 100%; margin-bottom: 1rem;">Nhà xuất bản</h5>
                    <div v-for="(publisher, index) in publishers" :key="index">
                        <button type="button" class="btn btn-light text-start mb-1" data-bs-toggle="button"
                            @click="togglePublisher(publisher)">
                            {{ publisher }}
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
            selectedPublishers: [],
            genres: [],
            publishers: [],
        };
    },
    computed: {
        filteredProducts() {
            let filtered = this.products;

            // Lọc theo thể loại
            if (this.selectedGenres.length > 0) {
                filtered = filtered.filter(product => this.selectedGenres.includes(product.genre));
            }

            // Lọc theo nhà xuất bản
            if (this.selectedPublishers.length > 0) {
                filtered = filtered.filter(product => this.selectedPublishers.includes(product.publisher));
            }

            return filtered;
        },
        filteredProductsCount() {
            return this.filteredProducts.length;
        }
    },
    methods: {
        async retrieveProducts() {
            try {
                this.products = await ProductService.getAll();
                this.genres = this.extractGenres(this.products);
                this.publishers = this.extractPublisher(this.products);
            } catch (error) {
                console.log(error);
            }
        },
        extractPublisher(products) {
            const publishers = new Set();
            products.forEach(product => {
                publishers.add(product.publisher);
            });
            return Array.from(publishers);
        },
        extractGenres(products) {
            const genres = new Set();
            products.forEach(product => {
                genres.add(product.genre);
            });
            return Array.from(genres);
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
        },
        togglePublisher(publisher) {
            if (this.selectedPublishers.includes(publisher)) {
                this.selectedPublishers = this.selectedPublishers.filter(item => item !== publisher);
            } else {
                this.selectedPublishers.push(publisher);
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
