<template>
   <div class="input-group">
      <TextField
         :data="{ id: 'project-name', type: 'text', label: 'Имя конфигурации' }"
         v-model="HTMLFormValues.name"
      />
      <p class="field-error" v-if="errors.projectName">{{ errors.projectName }}</p>
   </div>

   <div v-for="(field, id) in HTMLForm.fields" :key="id" class="input-group">
      <component
         :is="getComponentName(field.type)"
         :data="field"
         v-model="HTMLFormValues.fields[id]"
      />
   </div>

   <button class="button button--tall button--fullwidth" @click="saveFields">
      {{ saveButtonCaption }}
   </button>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import ListField from '@/components/Fields/ListField.vue'
import SwitchField from '@/components/Fields/SwitchField.vue'
import TextField from '@/components/Fields/TextField.vue'
import { useHTMLFields } from '@/serivces/uiAdapter'
import { HTMLFieldType } from '@/application/ports'
import { updateConfiguration } from '@/application/updateConfiguration'
import { addConfiguration } from '@/application/addConfiguration'

export default defineComponent({
   name: 'EditorFields',
   components: { TextField, SwitchField, ListField },

   setup() {
      const { HTMLForm, HTMLFormValues, clearFields, getEditedConfiguration } = useHTMLFields()

      const errors = ref<Record<string, string>>({})

      const componentForType: Record<HTMLFieldType, string> = {
         checkbox: 'SwitchField',
         text: 'TextField',
         option: 'ListField',
      }

      const getComponentName = (type: HTMLFieldType): string => {
         return componentForType[type]
      }

      const saveButtonCaption = computed(() => {
         return HTMLForm.value.id ? 'Сохранить' : 'Создать'
      })

      function saveFields() {
         errors.value = {}
         const editedConfiguration = getEditedConfiguration()

         if (editedConfiguration.name.trim() === '') {
            errors.value['projectName'] = 'Поле обязательно для заполнения'
            return
         }

         if (editedConfiguration.id) {
            updateConfiguration(editedConfiguration.id, {
               name: editedConfiguration.name,
               scheme: editedConfiguration.scheme,
            })
         } else {
            addConfiguration({
               name: editedConfiguration.name,
               scheme: editedConfiguration.scheme,
            })
            clearFields()
         }
      }

      return { getComponentName, HTMLForm, HTMLFormValues, errors, saveFields, saveButtonCaption }
   },
})
</script>

<style scoped lang="scss"></style>
