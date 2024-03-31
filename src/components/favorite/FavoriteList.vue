<template>
    <div class="container">
        <div class="row row-cols-1 row-cols-md-2 g-4">
            <div v-for="(product, index) in favorites" :key="product._id" :class="{ active: index === activeIndex }"
                @click="updateActiveIndex(index)" class="col">
                <div class="card h-100">
                    <div class="row g-0">
                        <div class="col-md-4 col-sm-4">
                            <div class="d-flex justify-content-center align-items-center h-100">
                                <img :src="product.imageUrl" alt="Hình ảnh" class="img-fluid rounded-start"
                                    style="max-height: 150px;" />
                            </div>
                        </div>
                        <div class="col-md-8 col-sm-8">
                            <div class="card-body d-flex flex-column justify-content-between h-100">
                                <div class="d-none d-sm-block">
                                    <h6 class="card-title mb-1">{{ product.title }}</h6>
                                    <p class="card-text mb-1 text-muted">{{ product.author }}</p>
                                    <p class="card-text mb-1 text-muted">{{ product.genre }}</p>
                                </div>
                                <router-link :to="'/product/' + product._id" class="btn btn-primary">
                                    Xem chi tiết
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<script>
export default {
    props: {
        favorites: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        }
    }
};
</script>
