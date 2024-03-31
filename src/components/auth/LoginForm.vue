<template>
    <Form @submit="submitLogin" :validation-schema="loginFormSchema" class="login-form">
        <div class="form-group">
            <label for="email">Email</label>
            <Field name="email" type="email" class="form-control" v-model="loginData.email" />
            <ErrorMessage name="email" class="error-feedback text-danger" />
        </div>
        <div class="form-group">
            <label for="password">Mật khẩu</label>
            <Field name="password" type="password" class="form-control" v-model="loginData.password" />
            <ErrorMessage name="password" class="error-feedback text-danger" />
        </div>
        <div class="text-center">
            <p>Bạn chưa có tài khoản? <router-link to="/register">Đăng ký</router-link></p>
        </div>
        <div class="form-group d-flex justify-content-center">
            <button class="btn btn-primary" type="submit">Đăng nhập
            </button>
        </div>
    </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        return {
            loginData: {
                email: "",
                password: "",
            },
            loginFormSchema: yup.object().shape({
                email: yup.string().email("Email không hợp lệ.").required("Vui lòng nhập Email."),
                password: yup.string().required("Vui lòng nhập mật khẩu."),
            }),
        };
    },
    methods: {
        submitLogin() {
            this.$emit("submit:login", this.loginData);
        }
    },
};
</script>

<style scoped>
.login-form .form-group {
    margin-bottom: 20px;
}
</style>
