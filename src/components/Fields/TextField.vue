<template>
   <label :for="data.id" class="label">{{ data.label }}</label>
   <input
      :id="data.id"
      type="text"
      :value="modelValue"
      class="input"
      @input="$emit('update:modelValue', $event.target.value)"
   />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { TextField } from '@/application/ports'

export default defineComponent({
   name: 'TextField',
   components: {},
   props: {
      data: {
         type: Object as PropType<TextField>,
         required: true,
      },
      modelValue: String,
   },
})
</script>

<style scoped lang="scss"></style>
