<template>
  <div class="register-container">
    <h2>Регистрация</h2>
    <form @submit.prevent="registerUser">
      <div class="form-group">
        <label for="username">Имя пользователя:</label>
        <input type="text" v-model="username" id="username" required />
      </div>
      <div class="form-group">
        <label for="password">Пароль:</label>
        <input type="password" v-model="password" id="password" required />
      </div>
      <div class="form-group">
        <label for="confirmPassword">Подтвердите пароль:</label>
        <input type="password" v-model="confirmPassword" id="confirmPassword" required />
      </div>
      <button type="submit" class="register-button">Зарегистрироваться</button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
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
      confirmPassword: '',
      errorMessage: '',
      successMessage: '',
    };
  },
  methods: {
    async registerUser() {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Пароли не совпадают.';
        return;
      }

      try {
        const response = await axios.post('/api/auth/register', {
          username: this.username,
          password: this.password,
        });
        this.successMessage = 'Пользователь успешно зарегистрирован!';
        this.errorMessage = '';
        this.$router.push('/login');  // Перенаправление на страницу входа после успешной регистрации
      } catch (error) {
        this.errorMessage = 'Ошибка при регистрации пользователя: ' + (error.response?.data || error.message);
        this.successMessage = '';
      }
    },
  },
};
</script>

<style scoped>
.register-container {
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
  border: 1px solid #ddd; /* Легкий выделенный край */
  border-radius: 8px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05); /* Мягкая внутренняя тень */
  font-size: 16px;
  outline: none;
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
}

input[type="text"]:focus,
input[type="password"]:focus {
  border-color: #007bff; /* Легкое выделение края при фокусе */
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1), 0 0 5px rgba(81, 203, 238, 0.5); /* Тень и цвет при фокусе */
}

.register-button {
  padding: 12px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.register-button:hover {
  background-color: #0056b3;
  transform: translateY(-2px); /* Легкий подъем при наведении */
}

.error-message {
  color: #f44336; /* Красный цвет для ошибок */
  margin-top: 15px;
  font-weight: bold;
  font-size: 14px;
}

.success-message {
  color: #28a745; /* Зеленый цвет для успеха */
  margin-top: 15px;
  font-weight: bold;
  font-size: 14px;
}
</style>
