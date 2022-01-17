<template>
   <div class="configurator">
      <div class="configurator__list">
         <ConfigurationList :configurations="configurations" />

         <button @click="clearFields" class="button button--tall button--fullwidth">
            + Создать комплектацию
         </button>
      </div>
      <div class="configurator__editor">
         <Editor />
      </div>
   </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useHTMLFields, useStorage } from '@/serivces/uiAdapter'
import ConfigurationList from '@/components/ConfigurationList.vue'
import Editor from '@/components/Editor.vue'

export default defineComponent({
   name: 'App',
   components: { Editor, ConfigurationList },
   setup() {
      const { storage: configurations } = useStorage()
      const { clearFields } = useHTMLFields()

      return { clearFields, configurations }
   },
})
</script>

<style lang="scss">
*,
*:after,
*:before {
   box-sizing: border-box;
}

#app {
   font-family: Avenir, Helvetica, Arial, sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   color: #2c3e50;
}

.label {
   display: block;
   font-weight: bold;
   margin-bottom: 0.15em;
}

.input {
   display: block;
   width: 100%;
   font-size: 16px;
   padding: 0.3em 0.6em;
   border: 1px solid #bbb;
   border-radius: 4px;
   box-shadow: 0 0 2px 1px #bbb;
}

.field-error {
   font-size: 14px;
   color: red;
   padding: 0;
   margin: 0;
}

.input-group {
   &:not(:last-child) {
      margin-bottom: 13px;
   }
}

.button {
   font-weight: bold;
   font-size: 16px;

   &--fullwidth {
      display: block;
      width: 100%;
   }

   &--tall {
      padding: 1em 2em;
   }
}
</style>

<style lang="scss">
.configurator {
   display: grid;
   grid-template-columns: 1fr 1fr;
   grid-template-rows: 1fr;

   &__list {
      border: 2px solid #999;
      padding: 30px;
      border-right-width: 1px;
   }

   &__editor {
      border: 2px solid #999;
      padding: 30px;
      border-left-width: 1px;
   }

   @media screen and (max-width: 700px) {
      grid-template-columns: 1fr;
      grid-template-rows: auto auto;

      &__list {
         border-right-width: 2px;
      }

      &__editor {
         border-left-width: 2px;
      }
   }

   @media screen and (max-width: 500px) {
      &__list {
         padding: 30px 10px;
      }
   }
}
</style>
