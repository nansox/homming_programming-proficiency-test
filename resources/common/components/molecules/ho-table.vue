<template>
  <table class="ho-table">
    <tr>
      <th
        v-for="(itemField, index) in fields"
        :key="`ho-table_header_${index}`"
      >
        {{ itemField.label }}
      </th>
    </tr>
    <tr v-for="(item, itemIndex) in items" :key="`ho-table_item_${itemIndex}`">
      <td
        v-for="(itemField, itemHeaderIndex) in fields"
        :key="`ho-table_item_${itemIndex}_header_${itemHeaderIndex}`"
      >
        {{ item[itemField.key] }}
      </td>
    </tr>
  </table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

export interface HoTableField {
  key: string;
  label: string;
}

@Component
export default class HoTable extends Vue {
  @Prop() readonly fields!: HoTableField[];
  @Prop() readonly items!: unknown[];
}
</script>

<style>
</style>