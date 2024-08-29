<template>
  <div class="login-container">
    <h2>Вход</h2>
    <form @submit.prevent="loginUser">
      <div class="form-group">
        <label for="username">Имя пользователя:</label>
        <input type="text" v-model="username" id="username" required />
      </div>
      <div class="form-group">
        <label for="password">Пароль:</label>
        <input type="password" v-model="password" id="password" required />
      </div>
      <button type="submit" class="login-button">Войти</button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    async loginUser() {
      try {
        const response = await axios.post('/api/auth/login', {
          username: this.username,
          password: this.password,
        });

        const token = response.data.jwt;
        localStorage.setItem('token', token);
        this.errorMessage = '';
        this.$router.push('/'); // Перенаправление на домашнюю страницу после успешного входа
      } catch (error) {
        this.errorMessage = 'Ошибка при входе: ' + (error.response?.data || error.message);
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 30px;
  background-color: #ffffff; /* Белый фон */
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); /* Тень вокруг формы */
  text-align: center;
  font-family: 'Roboto', sans-serif; /* Современный шрифт */
}

h2 {
  margin-bottom: 20px;
  color: #333;
  font-size: 28px;
  font-weight: bold;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-size: 16px;
  font-weight: 500;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.1); /* Внутренняя тень для глубины */
  font-size: 16px;
  outline: none;
  transition: box-shadow 0.3s ease;
}

input[type="text"]:focus,
input[type="password"]:focus {
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.15), 0 0 5px rgba(81, 203, 238, 1); /* Тень и цвет при фокусе */
}

.login-button {
  padding: 12px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.login-button:hover {
  background-color: #0056b3;
  transform: translateY(-2px); /* Легкий подъем при наведении */
}

.error-message {
  color: #f44336; /* Красный цвет для ошибок */
  margin-top: 15px;
  font-weight: bold;
  font-size: 14px;
}
</style>
