<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <!--<HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>-->

  <BaseSelect
    label="Region"
    :options="['Stockholm', 'Hela Sverige']"
    v-model="region"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
  },
  data() {
    return {
      region: null,
    }
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.field {
  border: 1px solid #222;
  font-size: 1.2rem;
}
</style>
