<template>
  <div id="app">
    <NavBar />
    <div class="auth-wrapper">
        <div class="auth-inner">
          <router-view />
      </div>
    </div>
  </div>
</template>



<script>
import NavBar from "@/components/NavBar.vue";
export default {
  name: "App",
  components: {
    NavBar
  }
};
</script>



<style>
  *{
    box-sizing: border-box;
  }

  body {
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
    min-height: 100vh;
    display: flex;
    font-weight: 400;
    font-family: 'Fira Sans', sans-serif;
  }
  @keyframes gradient {
    0% {
      background-position: 0 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0 50%;
    }
  }

  h1, h2, h3, h4, h5, h6, label, span {
    font-weight: 500;
    font-family: 'Fira Sans', sans-serif;
  }

  body, html, #app, #root, .auth-wrapper {
    width: 100%;
    height: 100%;
  }

  #app {
    text-align: center;
  }

  .auth-wrapper {
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: left;
    align-items: center;
    width: 100%;
    height: auto;
    margin-top: 7vw;
  }

  .auth-inner {
    width: 40vw;
    height: auto;
    background: #ffffff;
    box-shadow: 0 14px 80px rgba(34, 35, 58, 0.2);
    padding: 30px 45px 35px 45px;
    border-radius: 15px;
    transition: all .3s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .auth-wrapper .form-control:focus {
    border-color: #167bff;
    box-shadow: none;

  }

  .auth-wrapper h3 {
    text-align: center;
    margin: 0;
    line-height: 1;
    padding-bottom: 20px;
  }

  .custom-control-label {
    font-weight: 400;
  }

  .forget-password,
  .forget-password a {
    text-align: right;
    font-size: 13px;
    padding-top: 10px;
    color: #7f7d7d;
    margin: 0;
  }

  .forgot-password a {
    color: #167bff;
  }
</style>
