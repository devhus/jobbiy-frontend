<template>
  <div class="notfound-page h-100 d-flex justify-content-center align-items-center">
    <div class="text-center">
      <h1 class="title fw-bold">404</h1>
      <h3 class="mb-3">Page was not found!</h3>
      <h5 class="mb-4">This URL is either incorrect or the page is no longer exists.</h5>
      <router-link class="btn btn-lg btn-primary" to="/">Go home</router-link>
    </div>
  </div>
</template>
<style lang="scss" scoped>
 .notfound-page{
   .title{
     font-size: 4rem;
   }
 }
</style>