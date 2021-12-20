<template>
  <section
    v-if="dataReady"
    class="properties-main-view flex flex-col flex-grow items-center"
  >
    <h3 class="text-xl mt-8 mb-3 font-medium italic">Properties</h3>
    <ho-properties-table-filters
      @change="(data) => updateLocalFilters(data)"
      @changeUser="updateUser"
    />
    <ho-table
      class="properties-main-view_ho-table w-fit m-5 mt-8"
      :items="mappedFilterProperties"
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
import HoSpinner from "@/common/components/atoms/ho-spinner.vue";
import HoTable, {
  HoTableField,
} from "@/common/components/molecules/ho-table.vue";
import { Property } from "@/mocks/api-types";
import { Component, Vue, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import HoPropertiesTableFilters from "../components/ho-properties-table-filters.vue";
import HoRentedTag from "../components/ho-rented-tag.vue";
import { PROPERTIES_HANDLER_STATE } from "../store/properties-handler";

export interface PropertiesTableFilters {
  type?: null | string;
  user?: null | string;
  dateFrom?: null | Date;
  dateTo?: null | Date;
}

const PropertiesHandler = namespace("PropertiesHandler");

@Component({
  components: { HoSpinner, HoTable, HoRentedTag, HoPropertiesTableFilters },
})
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

  public localFilters: PropertiesTableFilters = {
    type: null,
    user: null,
    dateFrom: null,
    dateTo: null,
  };

  get dataReady() {
    return this.PropertiesHandlerState === PROPERTIES_HANDLER_STATE.DONE;
  }

  get filterProperties() {
    let returnedProperties = this.Properties;

    if (this.localFilters.type != null && this.localFilters.type !== "") {
      returnedProperties = returnedProperties.filter((el) => {
        return `${el.typeId}` === `${this.localFilters.type}`;
      });
    }
    if (this.localFilters.user != null && this.localFilters.user !== "") {
      returnedProperties = returnedProperties.filter((el) => {
        return `${this.localFilters.user}`.includes(`${el.userId}`);
      });
    }
    if (this.localFilters.dateFrom != null) {
      returnedProperties = returnedProperties.filter((el) => {
        return (
          el.rentedFrom !== null && el.rentedFrom >= this.localFilters.dateFrom
        );
      });
    }
    if (this.localFilters.dateTo != null) {
      returnedProperties = returnedProperties.filter((el) => {
        return el.rentedTo !== null && el.rentedTo <= this.localFilters.dateTo;
      });
    }

    return returnedProperties;
  }

  get mappedFilterProperties() {
    return this.filterProperties.map((el) => ({
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

  updateUser(user: string | number) {
    if (this.$route.path !== `/home/properties/${user}`) {
      this.$router.push(`/home/properties/${user}`);
    }
  }

  updateLocalFilters(data: PropertiesTableFilters) {
    this.localFilters = data;
  }

  created() {
    this.fetchProperties();
  }
}
</script>