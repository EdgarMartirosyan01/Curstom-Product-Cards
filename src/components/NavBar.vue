<template>
  <nav class="navbar navbar-expand navbar-light fixed-top">
    <div class="container">
      <router-link to="/" class="navbar-brand">Home</router-link>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link to="/login" class="nav-link">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/register" class="nav-link">Sign Up</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>



<script>
export default {
  name: "NavBar",
  methods: {

  }
}
</script>



<style >
.navbar-light {
  background-color: #ffffff;
  box-shadow: 0 14px 80px rgba(34, 35, 58, 0.2);
}
</style>



