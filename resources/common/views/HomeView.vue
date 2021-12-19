<template>
  <main class="home h-full flex flex-col">
    <header class="bg-orange-200 h-20 flex items-center justify-center">
      <homming-logo class="h-8" />
    </header>
    <router-view></router-view>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HommingLogo from "@/common/components/icons/homming-logo.vue";

@Component({
  components: { HommingLogo },
})
export default class HomeView extends Vue {}
</script>
<style>
.home > header {
  background-color: #fff3ee;
}
</style>
