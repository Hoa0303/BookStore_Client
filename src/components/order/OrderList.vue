<template>
    <div>
        <div v-for="(order) in orders" :key="order._id" class="card mt-5">
            <div class="card-header">
                <div class="d-flex justify-content-between">
                    <h5 class="mb-0">{{ order.name }}</h5>
                    <span :class="{
                        'text-warning': order.status === 'Đang đợi duyệt',
                        'text-info': order.status === 'Đang mượn',
                        'text-primary': order.status === 'Đã trả',
                        'text-danger': order.status === 'Đã hủy' || order.status === 'Quá hạn trả' || order.status === 'Yêu cầu hủy đơn'
                    }">{{ order.status }}</span>
                </div>
                <p class="mb-0">Ngày mượn: {{ order.ngayMuon }} | Ngày trả: {{ order.ngayTra }}</p>
            </div>
            <div class="card-body">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item" v-for="(book, bookIndex) in order.books" :key="book.bookId">
                        <div class="d-flex justify-content-between align-items-center">
                            <span><strong>{{ 'Sách ' + (bookIndex + 1) }}:</strong> {{ book.title }}</span>
                            <span class="badge bg-info">{{ book.quantity }}</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="card-footer">
                <div class="d-flex justify-content-end">
                    <router-link v-if="order.status === 'Đang đợi duyệt'" to="#" class="btn btn-sm btn-danger"
                        @click="submit(order._id)">
                        <i class="fas fa-edit me-1"></i> Yêu cầu hủy đăng ký mượn sách
                    </router-link>
                    <template v-else>
                        <button class="btn btn-sm btn-danger" disabled>
                            <i class="fas fa-edit me-1"></i> Yêu cầu hủy đăng ký mượn sách
                        </button>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>



<script>
import OrderService from "@/services/order.service";
export default {
    props: {
        orders: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        },
        async submit(id) {
            if (confirm("Bạn có chắc chắn muốn hủy đơn hàng này không?")) {
                const submitData = {
                    status: "Yêu cầu hủy đơn",
                    req: 1
                };
                const check = await OrderService.update(id, submitData);
                if (check) {
                    alert("Đã yêu cầu thành công!");
                    window.location.reload();
                }
            }
        }
    },
};
</script>
