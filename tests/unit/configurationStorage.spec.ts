import { Configuration, ConfigurationStorage, Storage } from '@/domain/configurationsStorage'

describe('configurationStorage', () => {
   const scheme: Storage = {
      'c-1': {
         name: 'config-1',
         scheme: {
            '1': true,
            '2': 'text value',
         },
      },
      'c-2': {
         name: 'config-2',
         scheme: {
            '1': false,
            '2': 'text value 2',
         },
      },
   }

   it('should add config on create', () => {
      const storage = new ConfigurationStorage(scheme)
      expect(Object.keys(storage.storage)).toHaveLength(2)
   })

   it('should add additional configuration', () => {
      const newConfiguration: Configuration = {
         name: 'new configuration',
         scheme: {},
      }
      const storage = new ConfigurationStorage(scheme)
      storage.addConfiguration(newConfiguration)

      expect(Object.keys(storage.storage)).toHaveLength(3)
   })

   it('should update configuration', () => {
      const storage = new ConfigurationStorage(scheme)
      storage.updateConfiguration('c-1', {
         name: 'config-1-updated',
         scheme: {
            '1': false,
            '2': 'text value updated',
         },
      })

      expect(storage.storage).toEqual({
         'c-1': {
            name: 'config-1-updated',
            scheme: {
               '1': false,
               '2': 'text value updated',
            },
         },
         'c-2': {
            name: 'config-2',
            scheme: {
               '1': false,
               '2': 'text value 2',
            },
         },
      })
   })

   it('should propagate new field to whole storage', () => {
      const storage = new ConfigurationStorage(scheme)
      storage.propagateNewOption('new field', 'new value')

      expect(storage.storage).toEqual({
         'c-1': {
            name: 'config-1',
            scheme: {
               '1': true,
               '2': 'text value',
               'new field': 'new value',
            },
         },
         'c-2': {
            name: 'config-2',
            scheme: {
               '1': false,
               '2': 'text value 2',
               'new field': 'new value',
            },
         },
      })
   })
})
