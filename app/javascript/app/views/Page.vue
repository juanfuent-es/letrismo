<template>
  <article class="px-6 py-24 sm:py-32 lg:px-8">
    <div class="mx-auto max-w-2xl text-center">
      <h1 class="text-center">{{ static_page.page.title }}</h1>
      <div v-html="static_page.page.content" class="py-6"></div>
    </div>
  </article>
</template>
<script>
import { StaticController } from '@/controllers/static_controller'
export default {
  setup() {
    const static_page = StaticController()
    return { static_page }
  },
  created() {
    const lang = I18n.prefix
    const slug = this.$route.params.slug
    this.static_page.find(`${lang}${slug}`)
  }
}
</script>