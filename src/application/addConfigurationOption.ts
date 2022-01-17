import { ConfigOption } from '@/domain/template'
import { useConfigurationStorage, useTemplateStorage } from '@/serivces/storageAdapter'

export function addConfigurationOption(option: ConfigOption): void {
   const { template, saveTemplate } = useTemplateStorage()
   const { storage, saveStorage } = useConfigurationStorage()

   option.id = 'custom-' + template.options.length

   template.addOption(option)
   storage.propagateNewOption(option.id, option.defaultValue)

   saveTemplate(template)
   saveStorage(storage)
}
