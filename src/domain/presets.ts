import { ConfigOption } from '@/domain/template'
import { Storage } from '@/domain/configurationsStorage'

export const baseTemplate: ConfigOption[] = [
   {
      id: 'engine',
      name: 'Мотор',
      belonging: 'base',
      type: 'list',
      options: ['1.6L', '1.8L', '2.4L'],
      defaultValue: '',
   },
   {
      id: 'color',
      name: 'Цвет',
      belonging: 'exterior',
      type: 'list',
      options: ['белый', 'черный', 'красный', 'синий'],
      defaultValue: '',
   },
   {
      id: 'colorType',
      name: 'Тип краски',
      belonging: 'exterior',
      type: 'list',
      options: ['глянец', 'матовый'],
      defaultValue: '',
   },
   {
      id: 'suspension',
      belonging: 'base',
      name: 'Пневмоподвеска',
      type: 'switch',
      defaultValue: false,
   },
   {
      id: 'hoodLabel',
      belonging: 'interior',
      name: 'Надпись на капоте',
      type: 'text',
      defaultValue: '',
   },
   {
      id: 'salon',
      belonging: 'interior',
      name: 'Салон',
      type: 'list',
      options: ['кожа', 'тряпичный'],
      defaultValue: '',
   },
]

export const basePresets: Storage = {
   'c-1': {
      name: 'Sport',
      scheme: {
         engine: '2.4L',
         color: 'красный',
         suspension: true,
         colorType: 'матовый',
         salon: 'кожа',
         hoodLabel: 'Fast and furious',
      },
   },
   'c-2': {
      name: 'Prestige',
      scheme: {
         engine: '1.8L',
         color: 'синий',
         suspension: true,
         colorType: 'глянец',
         salon: 'кожа',
         hoodLabel: '',
      },
   },
   'c-3': {
      name: 'Standard',
      scheme: {
         engine: '1.6L',
         color: 'белый',
         suspension: false,
         colorType: 'глянец',
         salon: 'тряпичный',
         hoodLabel: '',
      },
   },
   'c-4': {
      name: 'Comfort',
      scheme: {
         engine: '1.8L',
         color: 'черный',
         suspension: false,
         colorType: 'глянец',
         salon: 'тряпичный',
         hoodLabel: '',
      },
   },
}
