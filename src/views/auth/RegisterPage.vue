<template>
    <div class="container">
        <h4 class="text-center">Đăng ký</h4>
        <div class="col-md-5 mx-auto">
            <RegisterForm @submit:register="addUser" />
        </div>
    </div>
</template>

<script>
import RegisterForm from "@/components/auth/RegisterForm.vue";
import AuthService from "@/services/auth.service.js";

export default {
    components: {
        RegisterForm,
    },
    data() {
        return {
            newUser: {
                name: '',
                email: '',
                password: '',
                phone: '',
                role: false
            },
        };
    },
    methods: {
        async addUser(data) {
            try {
                await AuthService.create(data);
                window.alert("Đăng ký thành công!")
                this.$router.push({ name: "login" });
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>