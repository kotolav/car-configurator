import { ConfigurationStorageService, TemplateStorageService } from '@/application/ports'
import { ConfigurationTemplate, Template } from '@/domain/template'
import { ConfigurationStorage, StorageManager } from '@/domain/configurationsStorage'
import { reactive } from 'vue'
import { basePresets, baseTemplate } from '@/domain/presets'

const storedTemplate = JSON.parse(localStorage.getItem('template') ?? '[]')
const template: ConfigurationTemplate = reactive(new Template([...baseTemplate, ...storedTemplate]))

export function useTemplateStorage(): TemplateStorageService {
   function saveTemplate(template: ConfigurationTemplate) {
      localStorage.setItem('template', JSON.stringify(template.options))
   }

   return {
      template,
      saveTemplate,
   }
}

const storedConfigs = JSON.parse(localStorage.getItem('configurations') ?? '{}')
const storage: StorageManager = reactive(
   new ConfigurationStorage({ ...basePresets, ...storedConfigs })
)

export function useConfigurationStorage(): ConfigurationStorageService {
   function saveStorage(storage: StorageManager) {
      localStorage.setItem('configurations', JSON.stringify(storage.storage))
   }
   return {
      storage,
      saveStorage,
   }
}
