<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { users, propertyTypes, properties } from "@/mocks/api";
import Vue from "vue";

export default class App extends Vue {
  users: any = users;
  propertyTypes: any = propertyTypes;
  properties: any = properties;
}
</script>
