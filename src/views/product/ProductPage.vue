<template>
    <div class="container">
        <div class="mt-5">
            <ProductForm :product="product" />
        </div>
    </div>
</template>


<script>
import ProductForm from "@/components/product/ProductForm.vue";
import BookService from "@/services/book.service";
export default {
    components: {
        ProductForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            product: null,
        };
    },
    methods: {
        async getProduct(id) {
            try {
                this.product = await BookService.get(id);
            } catch (error) {
                console.log(error);
                // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        }
    },
    created() {
        this.getProduct(this.id);
    },
};
</script>