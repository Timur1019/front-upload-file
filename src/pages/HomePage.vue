<template>
  <div class="home">
    <h1>Добро пожаловать в приложение для перевода</h1>
    <p>Используйте навигацию выше для загрузки файлов или просмотра переводов.</p>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
};
</script>

<style scoped>
.home {
  text-align: center;
  padding: 20px;
  background-color: #f0f8ff;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 60%;
  margin: 50px auto;
  font-family: 'Arial', sans-serif;
}

h1 {
  font-size: 32px;
  color: #333;
  margin-bottom: 20px;
  animation: fadeInDown 1s ease-out;
}

p {
  font-size: 18px;
  color: #555;
  line-height: 1.6;
  animation: fadeInUp 1s ease-out;
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
