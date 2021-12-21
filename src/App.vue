<template>
  <div>
    <div id="nav"></div>

    <router-view :key="$route.fullPath" />
  </div>
</template>
<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
export default {};
</script>

<style>
</style>
