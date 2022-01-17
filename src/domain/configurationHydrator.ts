import { Configuration } from '@/domain/configurationsStorage'
import { ConfigOption, ConfigOptionBelonging, ConfigOptionValue } from '@/domain/template'

export type HydratedConfiguration = Record<
   string,
   {
      name: string
      value: ConfigOptionValue
      belonging: ConfigOptionBelonging
   }
>

export function hydrateConfiguration(
   config: Configuration,
   template: ConfigOption[]
): HydratedConfiguration {
   const result: HydratedConfiguration = {}

   for (const option of template) {
      result[option.id] = {
         name: option.name,
         value: config.scheme[option.id] ?? option.defaultValue,
         belonging: option.belonging,
      }
   }

   return result
}
