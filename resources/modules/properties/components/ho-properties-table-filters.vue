<template>
  <section class="p-5 bg-green-100 rounded-md flex flex-wrap items-end">
    <ho-form-field :text="$t('properties.filters.type')" class="mr-10">
      <ho-drop-down-list :items="types" v-model="selectedTypeFilter" />
    </ho-form-field>
    <ho-form-field :text="$t('properties.filters.user')" class="mr-10">
      <ho-input v-model="userInput" />
    </ho-form-field>
    <ho-form-field :text="$t('properties.filters.rentedFrom')" class="mr-10">
      <input type="date" v-model="dateFrom" />
    </ho-form-field>
    <ho-form-field :text="$t('properties.filters.rentedTo')" class="mr-10">
      <input type="date" v-model="dateTo" />
    </ho-form-field>
    <ho-button class="p-0 h-8" @click="cleanFilters"
      ><trash class="w-10"
    /></ho-button>
  </section>
</template>
<script lang="ts">
import HoButton from "@/common/components/atoms/ho-button.vue";
import HoDropDownList from "@/common/components/molecules/ho-drop-down-list.vue";
import { propertyTypes } from "@/mocks/api";
import { Component, Vue, Watch } from "vue-property-decorator";
import HoFormField from "../../../common/components/atoms/ho-form-field.vue";
import HoInput from "../../../common/components/atoms/ho-input.vue";
import { PropertiesTableFilters } from "../views/PropertiesMainView.vue";

import Trash from "@/common/components/icons/trash.vue";

@Component({
  components: { HoDropDownList, HoFormField, HoInput, HoButton, Trash },
})
export default class HoPropertiesTableFilters extends Vue {
  public selectedTypeFilter: { key: string; label: string } | null = null;
  public userInput: string = "";
  public dateFrom: string = null;
  public dateTo: string = null;

  get types() {
    return propertyTypes.map((el) => ({ key: `${el.id}`, label: el.name }));
  }

  @Watch("selectedTypeFilter")
  @Watch("dateFrom")
  @Watch("dateTo")
  @Watch("userInput")
  notifyFiltersChange() {
    const data: PropertiesTableFilters = {
      type: this.selectedTypeFilter?.key,
      user: this.userInput,
      dateFrom: this.stringToDate(this.dateFrom),
      dateTo: this.stringToDate(this.dateTo),
    };
    this.$emit("change", data);
  }

  @Watch("userInput")
  notifyUserFilterChange() {
    this.$emit("changeUser", this.userInput);
  }

  stringToDate(dateString: string | null) {
    if (dateString == null) return undefined;
    const splitedDate = dateString.split("-");

    return new Date(
      parseInt(splitedDate[0]),
      parseInt(splitedDate[1]),
      parseInt(splitedDate[2])
    );
  }

  cleanFilters() {
    this.selectedTypeFilter = null;
    this.userInput = "";
    this.dateFrom = null;
    this.dateTo = null;
  }

  @Watch("$route", { immediate: true, deep: true })
  routeWatcher() {
    const user = this.$route.params.user;
    if (user != null && user !== this.userInput) {
      this.userInput = user;
    }
  }
}
</script>