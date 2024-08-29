<template>
  <div class="upload">
    <FileUploadComponent @file-uploaded="handleFileUploaded" />
  </div>
</template>

<script>
import FileUploadComponent from '../components/FileUploadComponent.vue';

export default {
  name: 'UploadPage',
  components: {
    FileUploadComponent
  },
  methods: {
    handleFileUploaded(fileId) {
      this.$router.push({ name: 'Translation', params: { fileId } });
    }
  }
};
</script>

<style scoped>
.upload {
  padding: 10px;
}
</style>
