import { Configuration, ConfigurationId } from '@/domain/configurationsStorage'
import { useConfigurationStorage } from '@/serivces/storageAdapter'

export function updateConfiguration(id: ConfigurationId, configuration: Configuration): void {
   const { storage, saveStorage } = useConfigurationStorage()

   storage.updateConfiguration(id, configuration)
   saveStorage(storage)
}
