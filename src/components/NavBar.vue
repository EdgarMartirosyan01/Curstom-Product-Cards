<template>
  <nav class="navbar navbar-expand navbar-light fixed-top">
    <div class="container">
      <router-link to="/" class="navbar-brand">{{$t('title.Home')}}</router-link>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item" v-if="!authenticated">
            <router-link to="/login" class="nav-link">{{$t('title.Login')}}</router-link>
          </li>
          <li class="nav-item" v-if="!authenticated">
            <router-link to="/register" class="nav-link">{{$t('title.SignUp')}}</router-link>
          </li>
          <li class="nav-item" v-if="authenticated">
            <button class="nav-link" @click="logout">{{$t('title.Logout')}}</button>
          </li>
        </ul>
      </div>
      <span
          class="languageSwitcher"
          @click="switchLang"
      >{{$t('languageSwitcher')}}</span>
    </div>
  </nav>
</template>




<script>
export default {
  name: 'NavBar',
  computed: {
    authenticated() {
      return this.$store.state.authenticated;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    },
    switchLang() {
      const currentLocale = this.$i18n.locale;
      const newLocale = currentLocale === 'en' ? 'ru' : 'en';
      this.$i18n.locale = newLocale;
    },
  },
};
</script>




<style >
.navbar-light {
  background-color: #ffffff;
  box-shadow: 0 1px 1px rgba(0,0,0,0.12),
  0 2px 2px rgba(0,0,0,0.12),
  0 4px 4px rgba(0,0,0,0.12),
  0 8px 8px rgba(0,0,0,0.12),
  0 16px 16px rgba(0,0,0,0.12);
}
.languageSwitcher{
  width: 2vw;
  height: 2vw;
  border: 0.1vw solid #313131;
  border-radius: 0.4vw;
  cursor: pointer;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-size: 1vw;
  box-shadow: 0 1px 1px rgba(0,0,0,0.12),
  0 1px 1px rgba(0,0,0,0.12),
  0 2px 2px rgba(0,0,0,0.12),
  0 6px 6px rgba(0,0,0,0.12),
  0 14px 14px rgba(0,0,0,0.12);
}.languageSwitcher:hover{
  background-color: #eaeaea;
 }
</style>



