<template>
  <label v-if="label">{{label}}</label>
  <select
    :value="modelValue"
    class="field"
    v-bind="{
      ...$attrs,
      onChange: $event => { $emit('update:modelValue', $event.target.value) }
    }"
  >
    <option
      v-for="option in options"
      :key="option"
      :value="option"
      :selected="option === modelValue"
    >{{ option }}</option>
  </select>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    label: {
      type: String,
      default: '',
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
    options: {
      type: Array,
      required: true,
    },
  }  
})
</script>

<style lang="scss" scoped>
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: pointer;
}

select::-ms-expand {
  display: none;
}
</style>