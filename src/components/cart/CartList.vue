<template>
    <section class="h-100 h-custom" style="background-color: #eee;">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col">
                    <div class="card">
                        <div class="card-body p-4">
                            <div class="row">
                                <!-- Danh sách sản phẩm -->
                                <div class="col-lg-7">
                                    <h5 class="mb-3">
                                        <a href="/" class="text-success">
                                            <i class="fas fa-long-arrow-alt-left me-2"></i>
                                            Quay về trang chủ
                                        </a>
                                    </h5>
                                    <hr>
                                    <!-- Kiểm tra nếu không có sản phẩm trong giỏ hàng -->
                                    <div v-if="products.length === 0" class="text-center my-5">
                                        <h4>Giỏ hàng trống</h4>
                                    </div>
                                    <!-- Nếu có sản phẩm trong giỏ hàng -->
                                    <div v-else>
                                        <div v-for="(product, index) in products" :key="product._id"
                                            :class="{ active: index === activeIndex }" class="card mb-3">
                                            <div class="card-body">
                                                <div class="d-flex justify-content-between">
                                                    <div class="d-flex flex-row align-items-center">
                                                        <div>
                                                            <img :src="product.imageUrl"
                                                                class="img-fluid rounded-3 d-none d-sm-block"
                                                                alt="Shopping item" style="width: 65px;" />
                                                        </div>
                                                        <div class="ms-3">
                                                            <h5><router-link :to="'/product/' + product._id"
                                                                    class="text-black link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">
                                                                    {{ product.title }}
                                                                </router-link>
                                                            </h5>
                                                            <p class="small mb-0">{{ product.author }}</p>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="d-flex flex-row align-items-center justify-content-between">
                                                        <!-- Hiển thị "Số lượng" và số lượng sản phẩm -->
                                                        <h6 class="fw-normal mb-0 me-3">Số lượng:</h6>
                                                        <div>
                                                            <button class="btn btn-sm me-1"
                                                                @click="updateProductQuantity(product._id, product.quantity - 1)"
                                                                :disabled="product.quantity <= 1">
                                                                <i class="fas fa-minus"></i>
                                                            </button>
                                                            <button class="btn btn-lg disabled">
                                                                {{ product.quantity }}
                                                            </button>
                                                            <button class="btn btn-sm ms-1"
                                                                @click="updateProductQuantity(product._id, product.quantity + 1)">
                                                                <i class="fas fa-plus"></i>
                                                            </button>
                                                        </div>
                                                        <!-- Nút xóa sản phẩm -->
                                                        <button class="ms-2 btn ml-3 btn-danger"
                                                            @click="deleteProduct(product._id)">
                                                            <i class="fas fa-trash-alt"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Thông tin giỏ hàng -->
                                <div class="col-lg-5">
                                    <div class="card bg-primary text-white rounded-3">
                                        <div class="card-body">
                                            <div class="d-flex justify-content-between align-items-center mb-4">
                                                <h5 class="mb-0">Chi tiết giỏ hàng</h5>
                                            </div>
                                            <form class="mt-4" @submit.prevent="submitForm">
                                                <!-- Nếu có sản phẩm trong giỏ hàng -->
                                                <div v-if="products.length > 0">
                                                    <div class="form-group mb-4 d-none ">
                                                        <label for="userId" class="form-label">User ID</label>
                                                        <input type="text" id="userId"
                                                            class="form-control form-control-lg" v-model="userId">
                                                    </div>
                                                    <div class="form-group mb-4">
                                                        <label for="name" class="form-label">Tên người mượn</label>
                                                        <input type="text" id="name"
                                                            class="form-control form-control-lg" v-model="name">
                                                    </div>
                                                    <div class="form-group mb-4">
                                                        <label for="ngayMuon" class="form-label">Ngày mượn</label>
                                                        <input type="date" id="ngayMuon"
                                                            class="form-control form-control-lg" v-model="ngayMuon"
                                                            required>
                                                    </div>
                                                    <div class="form-group mb-4">
                                                        <label for="ngayTra" class="form-label">Ngày trả</label>
                                                        <input type="date" id="ngayTra"
                                                            class="form-control form-control-lg" v-model="ngayTra"
                                                            required>
                                                    </div>
                                                    <!-- Nút submit -->
                                                    <button type="submit" class="btn btn-info btn-block btn-lg">
                                                        Đăng ký mượn <i class="fas fa-long-arrow-alt-right ms-2"></i>
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>


<script>
import CartService from "@/services/cart.service";
import OrderService from "@/services/order.service";
import BookService from "@/services/book.service";
import Cookies from 'js-cookie';
export default {
    props: {
        products: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    data() {
        const today = new Date();
        const borrowDate = today.toISOString().split('T')[0];
        const returnDate = new Date(today);
        returnDate.setDate(returnDate.getDate() + 7);
        const formattedReturnDate = returnDate.toISOString().split('T')[0];
        return {
            userId: Cookies.get("userId"),
            name: Cookies.get("userName"),
            ngayMuon: borrowDate,
            ngayTra: formattedReturnDate,
            bookTitle: '',
            bookId: '',
            bookQuantity: 0,
            books: []
        };
    },
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        },
        async deleteProduct(productId) {
            const userId = Cookies.get("userId");
            const bookId = productId;
            await CartService.delete(userId, bookId);
            alert("Xóa sản phẩm khỏi giỏ hàng thành công!");
            window.location.reload();
        },
        async updateProductQuantity(id, index) {
            const userId = Cookies.get("userId");
            const bookId = id;
            const quantity = index;
            await CartService.update(userId, bookId, quantity);
            window.location.reload();
        },
        addBookToLoan() {
            this.products.forEach(product => {
                this.books.push({
                    title: product.title,
                    bookId: product._id,
                    quantity: product.quantity
                });
            });
        },
        async submitForm() {
            const confirmation = confirm("Bạn có chắc chắn muốn mượn các sách này?");
            if (!confirmation) {
                return;
            }
            this.addBookToLoan();
            const loanInfo = {
                userId: this.userId,
                name: this.name,
                ngayMuon: this.ngayMuon,
                ngayTra: this.ngayTra,
                books: this.books
            };
            try {
                await OrderService.add(loanInfo);
                await CartService.deleteCart(this.userId);
                for (let i = 0; i < loanInfo.books.length; i++) {
                    const bookId = loanInfo.books[i].bookId;
                    const bookInfo = await BookService.get(bookId);
                    const data = {
                        quantity: bookInfo.quantity - loanInfo.books[i].quantity,
                    };
                    await BookService.update(bookId, data);
                }
                alert("Bạn đã đăng ký mượn thành công, vui lòng chờ duyệt đơn!");
                window.location.reload();
            } catch (error) {
                console.error("Lỗi khi thêm vào giỏ hàng:", error);
                alert("Đã xảy ra lỗi khi thêm vào giỏ hàng. Vui lòng thử lại sau!");
            }
        }
    }
};
</script>


<style scoped>
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
