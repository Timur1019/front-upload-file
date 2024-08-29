<template>
  <div class="file-upload">
    <h2>Загрузить файл</h2>
    <div class="upload-area" @click="triggerFileInput">
      <input type="file" @change="handleFileUpload" ref="fileInput" style="display: none;" />
      <div class="upload-icon">
        ⬇
      </div>
      <p v-if="selectedFile">{{ selectedFile.name }}</p>
    </div>
    <button @click="submitFile" :disabled="!selectedFile || loading" class="upload-button">Загрузить</button>

    <!-- Progress and status -->
    <div v-if="loading" class="progress-container">
      <div class="progress-bar" :style="{ width: `${uploadProgress}%` }"></div>
    </div>
    <div v-if="loading" class="loading-text">Загрузка...  {{ uploadProgress }}%</div>
    <p v-if="error" class="error-text">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedFile: null,
      loading: false,
      error: '',
      uploadProgress: 0,
    };
  },
  methods: {
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
      this.error = ''; // Сбрасываем ошибку при новом выборе файла
      this.uploadProgress = 0; // Сбрасываем прогресс загрузки
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    async submitFile() {
      if (!this.selectedFile) {
        this.error = 'Please select a file to upload.';
        return;
      }

      const formData = new FormData();
      formData.append('file', this.selectedFile);

      try {
        this.loading = true;
        this.error = '';
        console.log('Uploading file:', this.selectedFile);

        const response = await axios.post('/api/files/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: progressEvent => {
            this.uploadProgress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            console.log('Upload Progress:', this.uploadProgress);
          }
        });

        console.log('File uploaded successfully:', response.data);
        alert('File uploaded successfully');
      } catch (error) {
        if (error.response) {
          // Отображаем только код ошибки и сообщение "Ошибка"
          this.error = `Ошибка ${error.response.status}`;
        } else {
          // Общая ошибка
          this.error = 'Ошибка';
        }
        console.error('Upload error:', this.error);
      } finally {
        this.loading = false;
        this.uploadProgress = 0; // Сбросить прогресс после завершения загрузки
      }
    }
  }
};
</script>

<style scoped>
.file-upload {
  max-width: 60%;
  height: 500px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fff;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h2 {
  margin-bottom: 20px;
  color: #212121;
}

.upload-area {
  width: 100%;
  height: 80%;
  border: 2px dashed #FFEB3B;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 20px;
  position: relative;
}

.upload-icon {
  font-size: 48px;
  color: #FBC02D;
}

.upload-button {
  padding: 10px 20px;
  background-color: #FFEB3B;
  color: #212121;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  width: 150px;
  margin-top: 10px;
}

.upload-button:disabled {
  background-color: #e0e0e0;
  cursor: not-allowed;
}

.upload-button:hover:not(:disabled) {
  background-color: #FBC02D;
}

.progress-container {
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 4px;
  margin-top: 10px;
  height: 10px;
}

.progress-bar {
  height: 100%;
  background-color: #FFEB3B;
  border-radius: 4px;
  transition: width 0.4s ease;
}

.loading-text {
  margin-top: 15px;
  color: #FF9800;
  font-weight: bold;
}

.error-text {
  margin-top: 15px;
  color: #f44336;
}
</style>
