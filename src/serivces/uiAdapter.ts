import { useConfigurationStorage, useTemplateStorage } from '@/serivces/storageAdapter'
import {
   ComponentFieldBuilderService,
   HTMLFields,
   HTMLFieldType,
   HTMLForm,
   HTMLFormFilled,
   HTMLFormValues,
   ReactiveStorageService,
} from '@/application/ports'
import { computed, ref } from 'vue'
import { ConfigurationId, Scheme } from '@/domain/configurationsStorage'
import { ConfigOption, ConfigOptionType } from '@/domain/template'

const { storage } = useConfigurationStorage()
const { template } = useTemplateStorage()

export function useStorage(): ReactiveStorageService {
   const computedStorage = computed(() => storage.storage)
   const computedTemplate = computed(() => template.options)

   return {
      template: computedTemplate,
      storage: computedStorage,
   }
}

const configId = ref<string | null>(null)
const HTMLFormValues = ref<HTMLFormFilled>({ name: '', fields: {} })

export function useHTMLFields(): ComponentFieldBuilderService {
   const { template, storage } = useStorage()
   const typeTransfer: Record<ConfigOptionType, HTMLFieldType> = {
      list: 'option',
      text: 'text',
      switch: 'checkbox',
   }

   function resetHtmlFieldsValue() {
      HTMLFormValues.value.name = ''
      HTMLFormValues.value.fields = {}

      for (const option of template.value) {
         HTMLFormValues.value.fields[option.id] = option.defaultValue
      }
   }

   function buildFields(template: ConfigOption[]): HTMLFields {
      const result: HTMLFields = {}

      HTMLFormValues.value.name = ''
      if (configId.value !== null) {
         HTMLFormValues.value.name = storage.value?.[configId.value]?.name ?? ''
      }
      for (const option of template) {
         let value = option.defaultValue
         if (configId.value !== null) {
            value = storage.value?.[configId.value]?.scheme?.[option.id] ?? value
         }

         HTMLFormValues.value.fields[option.id] = value
         if (option.type === 'list') {
            result[option.id] = {
               id: option.id,
               label: option.name,
               type: typeTransfer[option.type],
               selects: option.options,
            }
         } else {
            result[option.id] = {
               id: option.id,
               label: option.name,
               type: typeTransfer[option.type],
               selects: [],
            }
         }
      }

      return result
   }

   const HTMLForm = computed<HTMLForm>(() => {
      const name =
         configId.value !== null && configId.value in storage.value
            ? storage.value[configId.value].name
            : ''
      return {
         id: configId.value ?? null,
         name: name,
         fields: buildFields(template.value),
      }
   })

   function getEditedConfiguration(): HTMLFormValues {
      const fields: Scheme = {}
      for (const option of template.value) {
         fields[option.id] = HTMLFormValues.value.fields[option.id] ?? option.defaultValue
      }

      return {
         id: configId.value,
         name: HTMLFormValues.value.name ?? '',
         scheme: fields,
      }
   }

   function setConfig(id: ConfigurationId): void {
      configId.value = id
      resetHtmlFieldsValue()
   }

   function clearFields() {
      configId.value = null
      resetHtmlFieldsValue()
   }

   return {
      HTMLForm,
      HTMLFormValues,
      getEditedConfiguration,
      clearFields,
      setConfig,
   }
}
