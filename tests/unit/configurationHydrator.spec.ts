import { ConfigOption } from '@/domain/template'
import { Configuration } from '@/domain/configurationsStorage'
import { hydrateConfiguration } from '@/domain/configurationHydrator'

describe('hydration', () => {
   const templateFields: ConfigOption[] = [
      {
         id: '1',
         type: 'switch',
         belonging: 'base',
         defaultValue: false,
         name: 'Name 1',
      },
      {
         id: '2',
         type: 'text',
         belonging: 'exterior',
         defaultValue: '',
         name: 'Name 2',
      },
   ]
   const config: Configuration = {
      name: 'config-1',
      scheme: {
         '1': true,
         '2': 'text value',
      },
   }

   it('should hydrate', () => {
      const hydratedExpectedResult = {
         '1': { name: 'Name 1', value: true, belonging: 'base' },
         '2': { name: 'Name 2', value: 'text value', belonging: 'exterior' },
      }

      expect(hydrateConfiguration(config, templateFields)).toEqual(hydratedExpectedResult)
   })

   it('should hydrate with defaultValue when not enough configs field', () => {
      const hydratedExpectedResult = {
         '1': { name: 'Name 1', value: false, belonging: 'base' },
         '2': { name: 'Name 2', value: '', belonging: 'exterior' },
      }

      expect(hydrateConfiguration({ name: '', scheme: {} }, templateFields)).toEqual(
         hydratedExpectedResult
      )
   })
})
