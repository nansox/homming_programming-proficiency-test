<template>
  <select v-model="selected">
    <option
      v-for="(item, index) in items"
      :key="`ho-drop-down-list_${_uid}_${index}`"
    >
      {{ item.label }}
    </option>
  </select>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class HoDropDownList extends Vue {
  @Prop() readonly items: { key: string; label: string }[];
  @Prop() readonly value: { key: string; label: string };

  get selected() {
    return this.value?.label;
  }
  set selected(newVal: string) {
    this.$emit(
      "input",
      this.items.find((el) => el.label === newVal)
    );
  }
}
</script>
<style scoped>
select {
  width: 150px;
}
</style>