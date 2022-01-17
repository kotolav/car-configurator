import { ConfigOptionValue } from '@/domain/template'

type SchemeKey = string
export type ConfigurationId = string
export type Scheme = Record<SchemeKey, ConfigOptionValue>

export interface Configuration {
   name: string
   scheme: Scheme
}

export type Storage = Record<ConfigurationId, Configuration>

export interface StorageManager {
   storage: Storage
   addConfiguration(config: Configuration): void
   updateConfiguration(configId: ConfigurationId, config: Configuration): void
   propagateNewOption(key: SchemeKey, value: ConfigOptionValue): void
}

export class ConfigurationStorage implements StorageManager {
   private autoIncrementIndex: number
   public readonly storage: Storage

   constructor(storage: Storage) {
      this.storage = {}
      for (const [id, config] of Object.entries(storage)) {
         this.updateConfiguration(id, config)
      }
      this.autoIncrementIndex = Object.keys(this.storage).length
   }

   addConfiguration(config: Configuration): void {
      const configId = `config-${this.autoIncrementIndex}`
      this.autoIncrementIndex++
      this.updateConfiguration(configId, config)
   }

   updateConfiguration(configId: ConfigurationId, config: Configuration): void {
      this.storage[configId] = { ...config, scheme: { ...config.scheme } }
   }

   propagateNewOption(key: SchemeKey, value: ConfigOptionValue): void {
      for (const storageKey in this.storage) {
         this.storage[storageKey].scheme[key] = value
      }
   }
}
