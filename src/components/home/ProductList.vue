<script>
import CartService from "@/services/cart.service";
import Cookies from 'js-cookie';

export default {
    props: {
        products: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        },
        async addToCart(productId, number) {
            // Kiểm tra nếu số lượng là 0 thì không thể thêm vào giỏ hàng
            if (number === 0) {
                alert("Số lượng sách không đủ!");
                return;
            }

            const userId = Cookies.get("userId");
            if (!userId) {
                this.$router.push({ name: 'login' });
                return;
            }

            const quantity = 1;
            const bookId = productId;
            const books = [{ bookId, quantity }];
            const cartData = { userId, books };

            try {
                const check = await CartService.add(cartData);
                if (check) {
                    alert("Thêm vào giỏ hàng thành công!");
                }
            } catch (error) {
                console.error("Lỗi khi thêm vào giỏ hàng:", error);
                alert("Đã xảy ra lỗi khi thêm vào giỏ hàng. Vui lòng thử lại sau!");
            }
        },
    }
};
</script>

<template>
    <div class="row">
        <div class="col-lg-4 col-md-6 col-sm-12 mb-4" v-for="(product, index) in products" :key="product._id">
            <div class="card card_product" style="height: 500px;" @mouseover="updateActiveIndex(index)"
                @mouseleave="updateActiveIndex(-1)">
                <img :src="product.imageUrl" class="card-img-top mt-3 align-self-center d-flex " alt="Hình ảnh"
                    style="height: 200px; width: 200px; object-fit: contain;">
                <div class="card-body">
                    <h5 class="card-title" style="height: 30%;">{{ product.title }}</h5>
                    <p class="card-text">Tác giả: {{ product.author }}</p>
                    <p class="card-text">Nhà xuất bản: {{ product.publisher }}</p>
                    <p class="card-text">Thể loại: {{ product.genre }}</p>
                    <p class="card-text">Số lượng còn lại: {{ product.quantity }}</p>
                </div>
                <div class="position-absolute align-self-center d-flex" style="margin-top: 45%;">
                    <button v-if="activeIndex === index" class="btn btn-light z-3"
                        @click="addToCart(product._id, product.quantity)">
                        <i class="fas fa-plus"></i> Thêm vào giỏ hàng
                    </button>
                </div>
                <div class="position-absolute align-self-center d-flex" style="margin-top: 60%;">
                    <router-link v-if="activeIndex === index" :to="'/product/' + product._id" class="btn btn-light z-3">
                        Xem chi tiết
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.card_product {
    position: relative;
}

.card_product::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: hsla(0, 0%, 98%, 0);
    z-index: 1;
    transition: background-color 0.3s ease-in-out;
}

.card_product:hover::after {
    background-color: hsla(0, 4%, 29%, 0.35);
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
</style>
