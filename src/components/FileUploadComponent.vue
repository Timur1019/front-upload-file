<template>
  <div class="file-upload">
    <h2>Загрузить файл для перевода</h2>
    <input id="file" class="input-upload" type="file" @change="onFileChange" />
    <label for="file" class="file-label">Выберите файл</label>
    <button class="upload-button" @click="uploadFile" :disabled="!selectedFile">Загрузить</button>
    <p v-if="uploadStatus" :class="{'status-message': true, 'error': uploadStatus.includes('Error')}">{{ uploadStatus }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedFile: null,
      uploadStatus: ''
    };
  },
  methods: {
    onFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    async uploadFile() {
      if (!this.selectedFile) return;

      const formData = new FormData();
      formData.append('file', this.selectedFile);

      try {
        const response = await axios.post('/api/files/upload', formData);
        this.uploadStatus = 'File uploaded successfully';
        this.$emit('file-uploaded', response.data);
      } catch (error) {
        this.uploadStatus = `Error uploading file: ${error.response ? error.response.status : ''}`;
        console.error(error);
      }
    }
  }
};
</script>

<style scoped>
.file-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  background-color: #f7f7f7;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  max-width: 50%;
  margin: 50px auto;
  font-family: 'Arial', sans-serif;
  text-align: center;
}

h2 {
  color: #333;
  margin-bottom: 25px;
  font-size: 22px;
}

.input-upload {
  display: none;
}

.file-label {
  display: inline-block;
  padding: 12px 25px;
  background-color: #007bff;
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  margin-bottom: 20px;
}

.file-label:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.upload-button {
  padding: 12px 25px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  margin-top: 10px;
  min-width: 150px;
}

.upload-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.upload-button:hover:not(:disabled) {
  background-color: #218838;
  transform: scale(1.05);
}

.status-message {
  margin-top: 20px;
  font-size: 16px;
  color: #333;
  font-weight: bold;
  animation: fadeIn 0.5s ease-in-out;
}

.status-message.error {
  color: #ff0000;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
