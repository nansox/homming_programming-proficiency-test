<template>
  <section class="home">
    <header class="bg-orange-200 h-20 flex items-center justify-center">
      <homming-logo class="h-8" />
    </header>
    home
  </section>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";

import HommingLogo from "@/common/components/icons/homming-logo.vue";

@Component({
  components: {
    HommingLogo,
  },
})
export default class Home extends Vue {}
</script>
<style>
.home > header {
  background-color: #fff3ee;
}
</style>
