<template>
  <div class="translation">
    <TranslationComponent :fileId="fileId" />
    <DownloadComponent :fileId="fileId" />
  </div>
</template>

<script>
import TranslationComponent from '../components/TranslationComponent.vue';
import DownloadComponent from '../components/DownloadComponent.vue';

export default {
  name: 'TranslationPage',
  components: {
    TranslationComponent,
    DownloadComponent
  },
  props: {
    fileId: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.translation {
  padding: 10px;
}
</style>
