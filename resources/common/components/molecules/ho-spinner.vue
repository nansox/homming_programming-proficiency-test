<template>
  <spinner-picture class="ho-spinner" />
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SpinnerPicture from "@/common/components/icons/spinner-picture.vue";

@Component({ components: { SpinnerPicture } })
export default class HoSpinner extends Vue {}
</script>
<style>
.ho-spinner {
  animation: rotate 2s linear infinite;
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -25px 0 0 -25px;
  width: 50px;
  height: 50px;
}
.ho-spinner .path {
  stroke: #009066;
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}
</style>
