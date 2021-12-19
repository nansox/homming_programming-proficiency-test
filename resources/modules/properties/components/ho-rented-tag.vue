<template>
  <section
    :class="rented ? 'bg-yellow-500' : 'bg-blue-500'"
    class="rounded text-center font-medium text-sm px-1 text-white"
  >
    {{ rented ? "RENTED" : "NOT RENTED" }}
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class HoRentedTag extends Vue {
  @Prop() readonly rented!: boolean;
}
</script>