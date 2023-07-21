<template>
  <form @submit.prevent="handleSubmit">
    <h3>{{ $t('title.Login') }}</h3>

    <div class="form-group">
      <label>{{ $t('placeholders.Email') }}</label>
      <input type="email" class="form-control" v-model="email" :placeholder="$t('placeholders.Email')">
    </div>

    <div class="form-group">
      <label>{{ $t('placeholders.Password') }}</label>
      <input type="password" class="form-control" v-model="password" :placeholder="$t('placeholders.Password')">
    </div>

    <button class="btn btn-primary btn-block" @click="handleSubmit">{{ $t('buttons.login') }}</button>

    <p v-if="error" class="error-message">{{ error }}</p>
  </form>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      error: '',
    };
  },
  methods: {
    handleSubmit() {
      const credentials = {
        email: this.email,
        password: this.password,
      };
      this.$store
          .dispatch('authenticationModule/login', credentials)
          .then(() => {
            this.$router.push('/');
          })
          .catch(() => {
            this.error = 'Something went wrong. Please check your email and password.';
            console.log('really error');
          });
    },
  },
}

</script>





<style>
.error-message {
  color: red;
  margin-top: 10px;
}
</style>
