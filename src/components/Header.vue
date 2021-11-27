<template>
  <header id="app-header">
    <div class="container">
      <div class="d-flex justify-space-between align-items-center">
        <div class="header-logo">
          <router-link :to="{ name: 'Home' }">
            <img alt="Jobbiy logo" src="@/assets/img/logo.png" />
          </router-link>
        </div>
        <div class="header-nav ms-4">
          <router-link class="nav-item" :to="{ name: 'Home' }">
            Home
          </router-link>
          <router-link class="nav-item" :to="{ name: 'About' }">
            About
          </router-link>
          <router-link
            class="nav-item"
            :to="{ name: 'Jobs' }"
            active-class="text-primary"
          >
            Jobs
          </router-link>
        </div>
        <div class="header-nav ms-auto" v-if="!loggedIn">
          <router-link class="nav-item" :to="{ name: 'Auth.Login' }">
            Login
          </router-link>
          <div class="splitter"></div>
          <router-link class="nav-item" :to="{ name: 'Auth.Register' }">
            Create account
          </router-link>
        </div>
        <div class="header-nav ms-auto" v-if="loggedIn">
          <router-link
            class="nav-item"
            :to="{ name: 'Account' }"
            exact-active-class="n"
          >
            Hi, {{ user.name }}
          </router-link>
          <button class="btn btn-danger" @click="logoutClick">Logout</button>
        </div>
      </div>
    </div>
  </header>
</template>
<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  methods: {
    logoutClick() {
      this.$store.dispatch("user/logout").then(() => {
        if (this.$route.meta.forAuth === true) {
          this.$router.push({ name: "Home" });
        }
      });
    },
  },
  computed: {
    user() {
      return this.$store.getters["user/user"];
    },
    loggedIn() {
      return this.$store.getters["user/loggedIn"];
    },
  },
});
</script>
<style lang="scss" scoped>
#app-header {
  padding: 30px;
  background: white;

  .header-logo {
    width: 144px;

    img {
      width: 100%;
    }
  }

  .header-nav {
    display: flex;
    justify-content: center;
    align-items: center;

    .nav-item {
      font-weight: bold;
      color: var(--bs-dark);
      text-decoration: none;
      //font-size: 1.2rem;
      text-transform: uppercase;
      margin: 0 8px;

      &.router-link-exact-active {
        color: var(--bs-primary);
      }
    }

    .splitter {
      width: 3px;
      background: var(--bs-primary);
      height: 30px;
      display: inline-block;
      margin: 0 8px;
      transform: rotate(15deg);
    }
  }
}
</style>