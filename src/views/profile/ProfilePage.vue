<template>
    <div class="container">
        <h4 class="text-center">Hồ sơ của tôi</h4>
        <div class="mx-auto">
            <ContactForm :contact="contact" @submit:contact="updateContact" />
            <p class="text-center">{{ message }}</p>
        </div>
    </div>
</template>


<script>
import ContactForm from "@/components/profile/ProfileFrom.vue";
import AuthService from "@/services/auth.service";
export default {
    components: {
        ContactForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            contact: null,
            message: "",
        };
    },
    methods: {
        async getContact(id) {
            try {
                this.contact = await AuthService.get(id);
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
        },
        async updateContact(data) {
            try {
                await AuthService.update(this.contact._id, data);
                window.alert("Thông tin đã được thay đổi")
                this.$router.push({ name: "profile" });
            } catch (error) {
                console.log(error);
            }
        },
    },
    created() {
        this.getContact(this.id);
        this.message = "";
    },
};
</script>