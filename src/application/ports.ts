import { ConfigurationTemplate } from '@/domain/template'
import { Configuration, ConfigurationId, StorageManager } from '@/domain/configurationsStorage'
import { ComputedRef, Ref } from 'vue'

export interface TemplateStorageService {
   template: ConfigurationTemplate
   saveTemplate(template: ConfigurationTemplate): void
}

export interface ConfigurationStorageService {
   storage: StorageManager
   saveStorage(storage: StorageManager): void
}

export interface ReactiveStorageService {
   template: ComputedRef<ConfigurationTemplate['options']>
   storage: ComputedRef<StorageManager['storage']>
}

export type HTMLFieldType = 'checkbox' | 'text' | 'option'
export type HTMLFieldValue = string | boolean

interface HTMLField {
   id: string
   label: string
   type: HTMLFieldType
}

export type TextField = HTMLField
export type CheckboxField = HTMLField
export interface OptionField extends HTMLField {
   selects: string[]
}

export type HTMLFields = Record<string, TextField | CheckboxField | OptionField>

export interface HTMLForm {
   id: string | null
   name: string
   fields: HTMLFields
}

export interface HTMLFormFilled {
   name: string
   fields: Record<string, HTMLFieldValue>
}

export interface HTMLFormValues extends Configuration {
   id: string | null
}

export interface ComponentFieldBuilderService {
   HTMLForm: ComputedRef<HTMLForm>
   HTMLFormValues: Ref<HTMLFormFilled>
   getEditedConfiguration(): HTMLFormValues
   setConfig(id: ConfigurationId): void
   clearFields(): void
}
