<template>
  <div class="background-image">
    <div>
      <div class="card card-container">
        <div class="logo">
          <img class="img" src="@/assets/logo.png" alt="logo" />
        </div>
        <Form @submit="handleLogin" :validation-schema="schema">
          <div>
            <h1 class="text-center">Login</h1>
          </div>

          <div class="form-group">
            <label for="username">Username</label>
            <Field name="username" type="text" class="form-control" />
            <ErrorMessage name="username" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <Field name="password" type="password" class="form-control" />
            <ErrorMessage name="password" class="error-feedback" />
          </div>

          <div class="form-group">
            <button class="btn btn-success" :disabled="loading" id="button">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              <span>Login</span>
            </button>
          </div>

          <div class="form-group">
            <div v-if="message" class="alert alert-danger" role="alert">
              {{ message }}
            </div>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required("Username is required!"),
      password: yup.string().required("Password is required!"),
    });
    return {
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/login");
    }
  },
  methods: {
    handleLogin(user) {
      this.loading = true;
      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$router.push("/immovables");
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 500px !important;
  padding: 40px;
  margin-bottom: auto;
  margin-top: auto;
}

.img {
  width: 30vh;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0px auto 0px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 50px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.error-feedback {
  color: red;
}
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-control {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
  width: 80%;
  height: 60px;
  border-radius: 25px;
}

#button {
  margin-left: 90px;
  margin-top: 60px;
  width: 60%;
  height: 70px;
  border-radius: 350px;
}

.background-image {
  background: url("@/assets/LoginScreen.png") no-repeat center center fixed;
  -moz-background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  min-height: 100vh;
  padding-top: 8vh;
}
</style>
