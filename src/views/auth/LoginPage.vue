<template>
    <div class="container" style="margin-bottom: 275px;">
        <h4 class="text-center">Đăng nhập</h4>
        <div class="col-md-5 mx-auto">
            <LoginForm @submit:login="loginUser" />
            <p class="text-center text-danger ">{{ message }}</p>
        </div>
    </div>
</template>


<script>
import LoginForm from "@/components/auth/LoginForm.vue";
import AuthService from "@/services/auth.service.js";
import Cookies from 'js-cookie';

export default {
    components: {
        LoginForm,
    },
    data() {
        return {
            newUser: {
                email: '',
                password: ''
            },
            message: "",
        };
    },
    methods: {
        async loginUser(data) {
            try {
                const res = await AuthService.login(data.email, data.password);
                if (res.role == false) {
                    Cookies.set('userId', res._id);
                    Cookies.set('userName', res.name);
                    this.$router.push({ name: 'home' });
                }
                else {
                    this.message = 'Tài khoản hoặc mật khẩu không chính xác!'
                }
            } catch (error) {
                this.message = 'Tài khoản hoặc mật khẩu không chính xác!'
            }
        },
    },
};
</script>
