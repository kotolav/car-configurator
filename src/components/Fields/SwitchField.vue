<template>
   <input
      :id="data.id"
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
   />
   <label :for="data.id" class="inline-label">{{ data.label }}</label>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { CheckboxField } from '@/application/ports'

export default defineComponent({
   name: 'Switch',
   props: {
      data: {
         type: Object as PropType<CheckboxField>,
         required: true,
      },
      modelValue: Boolean,
   },
})
</script>

<style scoped lang="scss">
.inline-label {
   margin-left: 0.3em;
}
</style>
