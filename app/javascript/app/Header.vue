<template>
  <header class="bg-gray-900 text-gray-200 border-b border-gray-800">
    <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 " aria-label="Global">
      <div class="flex lg:flex-1">
        <router-link to="/" class="-m-1.5 p-1.5" key="home" :title="$t('home')">
          <img src="/images/letrismo-logo.svg" alt='Letrismo Logotype' width="160" class='h-8 w-auto'>
        </router-link>
      </div>
      <div class="flex lg:hidden">
        <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5" @click="mobileMenuOpen = true" aria-label="{{ $t('open_menu') }}">
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div class="hidden lg:flex lg:gap-x-12">
        <router-link v-for="item in navigation" :key="$t(item.name)" :to="item.href" class="font-semibold leading-6 opacity-50" :title="$t(item.name)">
          {{ $t(item.name) }}
        </router-link>
      </div>
      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <a href="/<%= @lang %>/sign_in" class="font-semibold leading-6">Log in <span aria-hidden="true">&rarr;</span></a>
      </div>
    </nav>
    <Dialog as="div" class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
      <div class="fixed inset-0 z-10" />
      <DialogPanel class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
        <div class="flex items-center justify-between">
          <router-link to="/" key="home" class="-m-1.5 p-1.5" :title="$t('home')" @click="mobileMenuOpen = false">
            <img src="/images/letrismo-logo.svg" alt='Letrismo Logotype' width="160" class='h-8 w-auto'>
          </router-link>
          <button type="button" class="-m-2.5 rounded-md p-2.5" @click="mobileMenuOpen = false" aria-label="{{ $t('close_menu') }}">
            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/25">
            <div class="space-y-2 py-6">
              <router-link v-for="item in navigation" :key="$t(item.name)" :to="item.href" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-800" :title="$t(item.name)" @click="mobileMenuOpen = false">
                {{ $t(item.name) }}
              </router-link>
            </div>
            <div class="py-6">
              <a href="/<%= @lang %>/sign_in" class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-gray-800">{{ $t('log_in') }}</a>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

const mobileMenuOpen = ref(false)
const lang = I18n.prefix.replace("/", "")

const navigation = [
  { name: "home", href: '/' },
  { name: "gallery", href: lang == 'es' ? '/galeria' : '/gallery' },
  { name: "manifest", href: lang == 'es' ? '/manifiesto' : '/manifest' },
]
</script>