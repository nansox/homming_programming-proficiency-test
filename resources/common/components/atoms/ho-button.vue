<template>
  <button
    @click="$emit('click')"
    class="bg-gray-200 hover:bg-gray-500 text-white font-bold rounded"
  >
    <slot />
  </button>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class HoButton extends Vue {}
</script>