<template>
   <h3>Добавление новой опции</h3>
   <div class="input-group">
      <label class="label">Тип опции:</label>
      <select class="input" v-model="fieldType">
         <option value="" selected disabled>Выбрать</option>
         <option value="list">Список</option>
         <option value="text">Текст</option>
         <option value="switch">Переключатель</option>
      </select>
      <p class="field-error" v-if="errors.type">{{ errors.type }}</p>
   </div>

   <div class="input-group">
      <label class="label">Принадлежность опции:</label>
      <select class="input" v-model="fieldBelonging">
         <option value="" selected disabled>Выбрать</option>
         <option value="base">Базовая</option>
         <option value="interior">Интерьер</option>
         <option value="exterior">Экстерьер</option>
      </select>
      <p class="field-error" v-if="errors.belonging">{{ errors.belonging }}</p>
   </div>

   <div class="input-group">
      <label class="label">Имя опции:</label>
      <input type="text" class="input" v-model.trim="fieldName" />
      <p class="field-error" v-if="errors.name">{{ errors.name }}</p>
   </div>

   <div class="input-group" v-if="fieldType === 'list'">
      <label class="label">Значения опции:</label>
      <textarea class="input" v-model.trim="listOptions" />
      <p class="field-error" v-if="errors.variants">{{ errors.variants }}</p>
   </div>

   <button @click="addNewOption" class="button button--tall button--fullwidth">Добавить</button>
   <br />
   <button @click="closeCreator" class="button button--tall button--fullwidth">Закрыть</button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { addConfigurationOption } from '@/application/addConfigurationOption'
import { ConfigOption, ConfigOptionBelonging, ConfigOptionType } from '@/domain/template'

export default defineComponent({
   name: 'FieldCreator',
   emits: ['close'],

   setup(props, context) {
      let errors = ref<Record<string, string>>({})
      const fieldType = ref<ConfigOptionType | ''>('')
      const fieldBelonging = ref('')
      const fieldName = ref('')
      const listOptions = ref('')

      function resetCreatorFields() {
         fieldType.value = ''
         fieldName.value = ''
         fieldBelonging.value = ''
         fieldType.value = ''
         listOptions.value = ''
      }

      function addNewOption() {
         errors.value = {}
         const optionsForListField: string[] = listOptions.value.split('\n').filter(Boolean)

         if (fieldType.value === '') {
            errors.value['type'] = 'Нужно выбрать тип опции'
         }
         if (fieldBelonging.value === '') {
            errors.value['belonging'] = 'Нужно выбрать принадлежность опции'
         }
         if (fieldName.value === '') {
            errors.value['name'] = 'Нужно ввести имя опции'
         }
         if (fieldType.value === 'list' && optionsForListField.length === 0) {
            errors.value['variants'] = 'Нужно заполнить варианты опции'
         }
         if (Object.keys(errors.value).length > 0) {
            return
         }

         addConfigurationOption({
            id: '',
            name: fieldName.value,
            type: fieldType.value,
            belonging: fieldBelonging.value as ConfigOptionBelonging,
            defaultValue: fieldType.value === 'switch' ? false : '',
            options: [...optionsForListField],
         } as ConfigOption)

         resetCreatorFields()
      }

      function closeCreator() {
         resetCreatorFields()
         context.emit('close')
      }

      return {
         errors,
         fieldType,
         fieldName,
         fieldBelonging,
         listOptions,
         addNewOption,
         closeCreator,
      }
   },
})
</script>

<style scoped lang="scss">
.error {
   font-size: 14px;
   color: red;
   padding: 0;
   margin: 0;
}
</style>
