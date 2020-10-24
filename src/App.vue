<template>
  <div class="container m-auto">
    <h1 class="text-6xl">Räkna ut min lön</h1>
    <BaseSelect
      label="Utbildning"
      :options="EDUCATION_OPTIONS"
      v-model="education"
    />
    <pre>{{salaryData}}</pre>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import civilingenjorData from './data/sverige/2019/civilingenjor'
import civilingenjorItData from './data/sverige/2019/civilingenjor-it'

import SalaryData from './data/types'



const salaryData = {
  'Civilingenjör': civilingenjorData,
  'Civilingenjör i datateknik eller IT': civilingenjorItData,
}


export default defineComponent({
  name: 'App',
  components: {
  },
  data() {
    return {
      education: 'Civilingenjör' as 'Civilingenjör' | 'Civilingenjör i datateknik eller IT',
      EDUCATION_OPTIONS: Object.keys(salaryData),
    }
  },
  computed: {
    salaryData(): SalaryData {
      return salaryData[this.education]
    }
  }
});
</script>

<style lang="scss">
#app {
  font-family: 'Nunito', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $text;
  margin-top: 60px;
}
</style>
