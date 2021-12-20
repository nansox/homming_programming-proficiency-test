<template>
  <div id="app" class="h-full">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { users, propertyTypes, properties } from "@/mocks/api";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {
  users: any = users;
  propertyTypes: any = propertyTypes;
  properties: any = properties;
}
</script>
