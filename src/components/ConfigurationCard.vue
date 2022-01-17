<template>
   <div class="card">
      <div class="card__title" @click="titleClick">{{ configuration.name }}</div>
      <div class="card__body" v-if="expanded">
         <div class="card__content">
            <div v-if="description.base" class="card__section">
               <ul class="list">
                  <li v-for="(data, id) in description.base" :key="id" class="list__item">
                     {{ data.name }}: {{ data.value }}
                  </li>
               </ul>
            </div>

            <div v-if="description.interior" class="card__section">
               <p>Интерьер:</p>
               <ul class="list">
                  <li v-for="(data, id) in description.interior" :key="id" class="list__item">
                     {{ data.name }}: {{ data.value }}
                  </li>
               </ul>
            </div>

            <div v-if="description.exterior" class="card__section">
               <p>Экстерьер:</p>
               <ul class="list">
                  <li v-for="(data, id) in description.exterior" :key="id" class="list__item">
                     {{ data.name }}: {{ data.value }}
                  </li>
               </ul>
            </div>
         </div>
      </div>
   </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { useHTMLFields, useStorage } from '@/serivces/uiAdapter'
import { Configuration, ConfigurationId } from '@/domain/configurationsStorage'
import { hydrateConfiguration } from '@/domain/configurationHydrator'
import { ConfigOptionBelonging, ConfigOptionValue } from '@/domain/template'

export default defineComponent({
   name: 'ConfigurationCard',
   props: {
      id: {
         type: String as PropType<ConfigurationId>,
         required: true,
      },
      configuration: {
         type: Object as PropType<Configuration>,
         required: true,
      },
      expanded: {
         type: Boolean,
         required: true,
      },
   },

   setup(props, context) {
      const { template } = useStorage()
      const { setConfig } = useHTMLFields()

      const description = computed(() => {
         let result = {} as Record<
            ConfigOptionBelonging,
            Record<string, { name: string; value: ConfigOptionValue }>
         >
         const config = hydrateConfiguration(props.configuration, template.value)
         for (const [id, values] of Object.entries(config)) {
            if (!result[values.belonging]) result[values.belonging] = {}
            let value =
               typeof values.value === 'boolean' ? (values.value ? 'есть' : 'нет') : values.value
            result[values.belonging][id] = { name: values.name, value }
         }

         return result
      })

      function titleClick() {
         setConfig(props.id)
         context.emit('toggleShow', { id: props.id, expanded: !props.expanded })
      }

      return { titleClick, description }
   },
})
</script>

<style lang="scss" scoped>
p {
   margin: 0;
   padding: 0;
}
.card {
   &:not(:last-child) {
      margin-bottom: 30px;
   }

   &__title {
      border: 2px solid #999;
      text-align: center;
      padding: 5px;
      background-color: #ccc;
      cursor: pointer;
      font-weight: bold;
   }

   &__body {
      text-align: left;
      border-left: 2px dashed #999;
      border-right: 2px dashed #999;
      border-bottom: 2px dashed #999;
      padding: 15px 10px;
   }

   &__content {
      max-width: 300px;
      margin: 0 auto;
   }

   &__section {
      &:not(:last-child) {
         margin-bottom: 8px;
      }
   }

   p {
      font-weight: bold;
   }
}

.list {
   padding: 0;
   margin: 0;

   &__item {
      list-style: none;
      margin: 0;
      padding: 0;
   }
}
</style>
