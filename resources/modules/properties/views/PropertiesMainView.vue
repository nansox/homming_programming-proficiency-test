<template>
  <div>
    <div v-if="dataReady" class="h-full">
      <ho-table :items="Properties" :fields="tableFields" />
    </div>
    <ho-spinner v-else />
  </div>
</template>

<script lang="ts">
import HoSpinner from "@/common/components/molecules/ho-spinner.vue";
import HoTable, {
  HoTableField,
} from "@/common/components/molecules/ho-table.vue";
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { PROPERTIES_HANDLER_STATE } from "../store/properties-handler";

const PropertiesHandler = namespace("PropertiesHandler");

@Component({ components: { HoSpinner, HoTable } })
export default class PropertiesMainView extends Vue {
  @PropertiesHandler.Getter
  public PropertiesHandlerState!: PROPERTIES_HANDLER_STATE;
  @PropertiesHandler.Getter
  public Properties;
  @PropertiesHandler.Action
  public fetchProperties!: () => void;

  public tableFields: HoTableField[] = [
    { key: "id", label: "ID" },
    { key: "userId", label: "userId" },
    { key: "typeId", label: "typeId" },
    { key: "name", label: "name" },
    { key: "rentedFrom", label: "rentedFrom" },
    { key: "rentedTo", label: "rentedTo" },
  ];

  get dataReady() {
    return this.PropertiesHandlerState === PROPERTIES_HANDLER_STATE.DONE;
  }

  created() {
    this.fetchProperties();
  }
}
</script>