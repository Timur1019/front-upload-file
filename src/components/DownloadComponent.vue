<template>
  <div class="download">
    <h2>Загрузить переведенный файл</h2>
    <button class="download-button" @click="downloadFile" :disabled="!fileId">Загрузить</button>
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ['fileId'],
  data() {
    return {
      error: ''
    };
  },
  methods: {
    async downloadFile() {
      try {
        const response = await axios({
          url: `/api/files/download/${this.fileId}`,
          method: 'GET',
          responseType: 'blob'
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'translated-file.docx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        this.error = `Error ${error.response ? error.response.status : ''} downloading file`;
        console.error(error);
      }
    }
  }
};
</script>

<style scoped>
.download {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  background-color: #f7f7f7;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  max-width: 60%;
  height: 300px;
  margin: 50px auto;
  font-family: 'Arial', sans-serif;
  text-align: center;
}

h2 {
  color: #333;
  margin-bottom: 30px;
  font-size: 24px;
}

.download-button {
  padding: 12px 25px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 150px;
}

.download-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.download-button:hover:not(:disabled) {
  background-color: #0056b3;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.error-message {
  margin-top: 20px;
  color: #ff0000;
  font-size: 16px;
  font-weight: bold;
  animation: fadeIn 0.5s ease-in-out;
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
