<template>
   <div class="content">
      <EditorFields />

      <br />
      <button
         v-if="!creatorPanelShowing"
         @click="creatorPanelShowing = true"
         class="button button--tall button--fullwidth"
      >
         Добавить новую опцию
      </button>
      <template v-else>
         <hr />
         <FieldCreator @close="creatorPanelShowing = false" />
      </template>
   </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import EditorFields from '@/components/EditorFields.vue'
import FieldCreator from '@/components/FieldCreator.vue'

export default defineComponent({
   name: 'Editor',
   components: { FieldCreator, EditorFields },

   setup() {
      const creatorPanelShowing = ref(false)
      return { creatorPanelShowing }
   },
})
</script>

<style scoped lang="scss">
.content {
   max-width: 500px;
   margin: 0 auto;
}
</style>
