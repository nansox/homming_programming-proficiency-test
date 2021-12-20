<template>
  <table id="ho-table" class="bg-green-100">
    <thead>
      <tr>
        <th
          v-for="(itemField, index) in fields"
          :key="`ho-table_header_${index}`"
        >
          {{ itemField.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, itemIndex) in items"
        :key="`ho-table_item_${itemIndex}`"
      >
        <td
          v-for="(itemField, itemHeaderIndex) in fields"
          :key="`ho-table_item_${itemIndex}_header_${itemHeaderIndex}`"
        >
          <slot
            name="cell"
            v-if="hasCellSlot"
            :item="item"
            :field="itemField.key"
            :index="itemIndex"
          ></slot>
          <template v-else>
            {{ item[itemField.key] }}
          </template>
        </td>
      </tr>
    </tbody>
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

  get hasCellSlot() {
    return !!this.$slots["cell"] || !!this.$scopedSlots["cell"];
  }
}
</script>

<style scoped>
table {
  border-spacing: 0 8px;
  padding: 0 24px;
  padding-bottom: 16px;
  border-radius: 8px;
  border-collapse: separate;
  height: fit-content;
}

tr {
  padding: 0 8px;
}
th {
  padding: 8px 16px;
}
td {
  background-color: white;
  padding: 16px;
}

th:first-child,
td:first-child {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

th:last-child,
td:last-child {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}
</style>