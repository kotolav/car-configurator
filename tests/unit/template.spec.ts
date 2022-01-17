import { ConfigOption, Template } from '@/domain/template'

describe('template', () => {
   it('should add new field', () => {
      const fields: ConfigOption[] = [
         {
            id: '1',
            type: 'switch',
            belonging: 'base',
            name: 'Name 1',
            defaultValue: false,
         },
         {
            id: '2',
            type: 'text',
            belonging: 'base',
            name: 'Name 2',
            defaultValue: '',
         },
      ]
      const template = new Template(fields)
      expect(template.options).toHaveLength(2)

      template.addOption({
         id: '3',
         type: 'list',
         belonging: 'base',
         defaultValue: '',
         name: 'Name 3',
         options: [],
      })
      expect(template.options).toHaveLength(3)
   })
})
