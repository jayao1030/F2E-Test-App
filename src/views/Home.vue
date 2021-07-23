<template>
  <div class="home">
    <OrderList />
  </div>
</template>

<script>
import OrderList from "../components/OrderList.vue";
export default {
  name: "Home",
  components: {
    OrderList,
  },
};
</script>

<style>
</style>