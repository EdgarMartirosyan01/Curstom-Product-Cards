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
            <button class="logoutButton" @click="handleLogout">{{$t('title.Logout')}}</button>
          </li>
        </ul>
      </div>
      <div class="language-switcher">
        <select v-model="currentLocale" @input="switchLang" class="languageSwitcher">
            <option v-for="locale in availableLocales" :key="locale" :value="locale">
              {{ locale }}
            </option>
        </select>
      </div>
    </div>
  </nav>
</template>




<script>
export default {
  name: 'NavBar',
  inject: ['i18n'],
  data() {
    return {
      currentLocale: this.i18n.locale,
    };
  },
  computed: {
    authenticated() {
      return this.$store.state.authenticationModule.authenticated;
    },
    availableLocales() {
      return Object.keys(this.$i18n.messages);
    },
  },
  methods: {
    async handleLogout() {
      try {
        await this.$store.dispatch('authenticationModule/logout');
        this.$router.push('/login');
      } catch (error) {
        console.error('Logout error:', error);
      }
    },
    switchLang() {
      const currentIndex = this.availableLocales.indexOf(this.currentLocale);
      this.currentLocale = this.availableLocales[(currentIndex + 1) % this.availableLocales.length];
      this.$i18n.locale = this.currentLocale; // Update the actual language
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
  width: 4vw;
  height: 2vw;
  border-radius: 0.4vw;
  cursor: pointer;
  display: flex;
  text-align: center;
  align-items: center;
  background-color: #e8e8e8;
  justify-content: center;
  font-size: 1vw;
  border: none;
}.languageSwitcher:hover{
  transition: 0.3s;
  background-color: #dcdcdc;
 }

 .logoutButton{
   height: 2.7vw;
   width: 5vw;
   border-radius: 0.7vw;
   border: none;
   cursor: pointer;
 }.logoutButton:hover{
    transition: 0.3s;
    background-color: #d5d5d5;
   }
</style>



