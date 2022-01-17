import { Configuration } from '@/domain/configurationsStorage'
import { useConfigurationStorage } from '@/serivces/storageAdapter'

export function addConfiguration(configuration: Configuration): void {
   const { storage, saveStorage } = useConfigurationStorage()

   storage.addConfiguration(configuration)
   saveStorage(storage)
}
