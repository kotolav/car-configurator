<template>
   <label :for="data.id" class="label">{{ data.label }}</label>
   <select
      :id="data.id"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="input"
   >
      <option value="" disabled>Выбрать</option>
      <option v-for="item in data.selects" :key="item" :value="item">{{ item }}</option>
   </select>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { OptionField } from '@/application/ports.js'

export default defineComponent({
   name: 'List',
   components: {},
   props: {
      data: {
         type: Object as PropType<OptionField>,
         required: true,
      },
      modelValue: String,
   },
})
</script>

<style scoped></style>
