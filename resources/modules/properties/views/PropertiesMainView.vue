<template>
  <section
    v-if="dataReady"
    class="properties-main-view flex flex-col flex-grow items-center"
  >
    <h3 class="text-xl mt-8 font-medium italic">Properties</h3>
    <ho-table
      class="properties-main-view_ho-table w-fit m-5 mt-8"
      :items="mappedProperties"
      :fields="tableFields"
    >
      <template v-slot:cell="{ item, field }">
        <template v-if="field === 'isRented'">
          <ho-rented-tag :rented="item[field]" />
        </template>
        <template v-else>
          {{ item[field] }}
        </template>
      </template>
    </ho-table>
  </section>
  <ho-spinner v-else />
</template>

<script lang="ts">
import HoSpinner from "@/common/components/molecules/ho-spinner.vue";
import HoTable, {
  HoTableField,
} from "@/common/components/molecules/ho-table.vue";
import { Property } from "@/mocks/api-types";
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import HoRentedTag from "../components/ho-rented-tag.vue";
import { PROPERTIES_HANDLER_STATE } from "../store/properties-handler";

const PropertiesHandler = namespace("PropertiesHandler");

@Component({ components: { HoSpinner, HoTable, HoRentedTag } })
export default class PropertiesMainView extends Vue {
  @PropertiesHandler.Getter
  public PropertiesHandlerState!: PROPERTIES_HANDLER_STATE;
  @PropertiesHandler.Getter
  public Properties: Property[] | null;
  @PropertiesHandler.Action
  public fetchProperties!: () => void;

  public tableFields: HoTableField[] = [
    { key: "id", label: this.$t("table.fields.propertyId") as string },
    { key: "userId", label: this.$t("table.fields.userId") as string },
    { key: "typeId", label: this.$t("table.fields.typeId") as string },
    { key: "name", label: this.$t("table.fields.name") as string },
    { key: "rentedFrom", label: this.$t("table.fields.rentedFrom") as string },
    { key: "rentedTo", label: this.$t("table.fields.rentedTo") as string },
    { key: "isRented", label: "" },
  ];

  get dataReady() {
    return this.PropertiesHandlerState === PROPERTIES_HANDLER_STATE.DONE;
  }

  get mappedProperties() {
    return this.Properties.map((el) => ({
      ...el,
      rentedFrom: this.stringFromDate(el.rentedFrom),
      rentedTo: this.stringFromDate(el.rentedTo),
      isRented: this.isPropertyRentedActually(el.rentedFrom, el.rentedTo),
    }));
  }
  isPropertyRentedActually(rentedFrom: Date | null, rentedTo: Date | null) {
    if (rentedFrom === null) return false;
    if (rentedFrom > new Date()) return false;
    if (rentedTo === null) return true;
    if (rentedTo > new Date()) return true;
    return false;
  }
  stringFromDate(date: Date) {
    if (date == null) return "";
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }
  created() {
    this.fetchProperties();
  }
}
</script>
<style scoped>
.properties-main-view > .properties-main-view_ho-table {
}
</style>