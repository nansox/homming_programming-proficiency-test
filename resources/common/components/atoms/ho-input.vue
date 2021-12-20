<template>
  <input type="text" v-model="text" />
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class HoInput extends Vue {
  @Prop() readonly value: string;

  get text() {
    return this.value;
  }
  set text(newVal: string) {
    this.$emit("input", newVal);
  }
}
</script>