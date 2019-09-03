<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-white">
      <q-toolbar align="center">
        <q-toolbar-title class="text-black">
          Obyte <span class="text-blue">Discord</span> <span class="text-green text-caption"> Tipping</span>
        </q-toolbar-title>

      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
