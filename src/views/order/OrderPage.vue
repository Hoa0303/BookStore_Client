<template>
    <div class="container">
        <h4 class="text-center">Hiệu chỉnh Liên hệ</h4>
        <div class="col-md-6 mx-auto">
            <OrderForm :orders="order"/>
        </div>
    </div>
</template>


<script>
import OrderForm from "@/components/order/OrderList.vue";
import OrderService from "@/services/order.service";
export default {
    components: {
        OrderForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            order: [],
        };
    },
    methods: {
        async getOrder(id) {
            const array = [];
            try {
                const user = await OrderService.getAll();
                for (const index of user) {
                    if (id == index.userId) {
                        array.push(index);
                    }
                }
                this.order = array;
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
        this.getOrder(this.id);
    },
};
</script>

<style scoped>
.page {
    text-align: left;
    max-width: 100px;
}
</style>