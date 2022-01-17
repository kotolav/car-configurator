import { UniqueId } from '@/shared-kernel'

export type ConfigOptionType = 'list' | 'switch' | 'text'
export type ConfigOptionBelonging = 'base' | 'interior' | 'exterior'
export type ConfigOptionValue = string | boolean
export type ConfigName = string

export interface TypedConfigOption<T1 extends ConfigOptionType, T2 extends ConfigOptionValue> {
   id: UniqueId
   name: ConfigName
   belonging: ConfigOptionBelonging
   type: T1
   defaultValue: T2
}

export interface ListConfigOption extends TypedConfigOption<'list', string> {
   options: string[]
}

export type TextConfigOption = TypedConfigOption<'text', string>
export type SwitchConfigOption = TypedConfigOption<'switch', boolean>

export type ConfigOption = ListConfigOption | TextConfigOption | SwitchConfigOption

export interface ConfigurationTemplate {
   options: ConfigOption[]
   addOption(option: ConfigOption): void
}

export class Template implements ConfigurationTemplate {
   constructor(public readonly options: ConfigOption[]) {}

   addOption(option: ConfigOption): void {
      this.options.push({ ...option })
   }
}
