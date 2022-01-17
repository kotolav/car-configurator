<template>
   <div class="configuration-list">
      <ConfigurationCard
         v-for="(configuration, key) in configurations"
         :key="key"
         :id="key"
         :configuration="configuration"
         :expanded="cardsExpandState[key] ?? false"
         @toggleShow="collapseOther"
      />
   </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import ConfigurationCard from '@/components/ConfigurationCard.vue'

export default defineComponent({
   name: 'ConfigurationList',
   components: { ConfigurationCard },
   props: {
      configurations: {
         type: Object as PropType<Storage>,
         required: true,
      },
   },

   setup() {
      const cardsExpandState = ref<Record<string, boolean>>({})

      function collapseOther(event: { id: string; expanded: boolean }) {
         cardsExpandState.value[event.id] = true

         for (let key in cardsExpandState.value) {
            cardsExpandState.value[key] = key === event.id
         }
      }

      return {
         collapseOther,
         cardsExpandState,
      }
   },
})
</script>

<style lang="scss" scoped>
.configuration-list {
   max-width: 400px;
   margin: 0 auto;
   padding: 10px 20px;
}
</style>
