<template>
  <div class="flex flex-col">
    <label :for="`ho-form-field_${_uid}`" class="text-sm mb-3 font-medium">{{
      text
    }}</label>
    <div :id="`ho-form-field_${_uid}`"><slot /></div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({ components: {} })
export default class HoFormField extends Vue {
  @Prop() readonly text: string;
}
</script>