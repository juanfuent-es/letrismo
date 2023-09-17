<style>
.slide-enter-active,
.slide-leave-active {
    transition: opacity .35s;
    transition-delay: 120ms;
}
.slide-leave-to,
.slide-enter-from {
    opacity: 0;
}
</style>
<template>
  <vue-preloader
    background-color="#111827"
    transition-type="fade-down"
    :loading-speed="15"
    :transition-speed="650">
    <img src="/images/letrismo-logo.svg" alt="{{ $t('loading') }}" width="100" height="100" class='w-24 h-auto'>
  </vue-preloader>
  <main>
    <Header />
    <router-view v-slot="{ Component }">
      <transition name="slide" mode="out-in">
        <component :is="Component" :key="$route.path" />
      </transition>
    </router-view>
  </main>
  <Footer />
</template>
<script>
import { VuePreloader } from 'vue-preloader';
import '../../../node_modules/vue-preloader/dist/style.css'

import Header from "./Header.vue";
import Footer from "./Footer.vue";

export default {
    components: {
        VuePreloader,
        Header,
        Footer
    },
    data() {
        return {
            showAnimation: true
        }
    }
}
</script>