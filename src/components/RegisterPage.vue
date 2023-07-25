<template>
  <form @submit.prevent="handleSubmit">
      <h3>{{$t('title.SignUp')}}</h3>

      <div class="form-group">
        <label>{{$t('placeholders.FirstName')}}</label>
        <input type="text" class="form-control" v-model="first_name" placeholder="First Name">
      </div>

      <div class="form-group">
        <label>{{$t('placeholders.LastName')}}</label>
        <input type="text" class="form-control" v-model="last_name" placeholder="Last Name">
      </div>

      <div class="form-group">
        <label>{{$t('placeholders.Email')}}</label>
        <input type="email" class="form-control" v-model="email" placeholder="Email">
      </div>

      <div class="form-group">
        <label>{{$t('placeholders.Password')}}</label>
        <input type="password" class="form-control" v-model="password" placeholder="Password">
      </div>

      <div class="form-group">
        <label>{{$t('placeholders.ConfirmPassword')}}</label>
        <input type="password" class="form-control" v-model="password_confirm" placeholder="Confirm Password">
      </div>

      <button class="btn btn-primary btn-block">{{$t('buttons.SignUp')}}</button>
  </form>
</template>


<script>
export default {
  name: 'RegisterPage',
  data() {
    return {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirm: '',
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const user = {
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          password: this.password,
          password_confirm: this.password_confirm,
        };

        await this.$store.dispatch('authenticationModule/register', user);
        this.$router.push('/login'); // Redirect to the login page after successful registration
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>






<style>

</style>