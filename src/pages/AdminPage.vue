<template>
  <div class="admin-panel">
    <h2>Админ-панель</h2>
    <table class="user-table">
      <thead>
      <tr>
        <th>Имя пользователя</th>
        <th>Роль</th>
        <th>Действия</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.username }}</td>
        <td>{{ user.roles.map(role => role.name).join(', ') }}</td>
        <td>
          <button @click="promoteToAdmin(user.id)" class="promote-button">Сделать админом</button>
          <button @click="promoteToSuperAdmin(user.id)" class="promote-button" v-if="isSuperAdmin">Сделать супер-админом</button>
          <button @click="deleteUser(user.id)" class="delete-button">Удалить</button>
        </td>
      </tr>
      </tbody>
    </table>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: [],
      errorMessage: '',
      successMessage: '',
    };
  },
  computed: {
    isSuperAdmin() {
      // Проверка роли супер-администратора (это нужно реализовать, например, через токен или API)
      const token = localStorage.getItem('token');
      // Простая проверка, нужно заменить на реальную логику
      return token && JSON.parse(atob(token.split('.')[1])).roles.includes('ROLE_SUPER_ADMIN');
    }
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('/api/admin/users');
        this.users = response.data;
      } catch (error) {
        this.errorMessage = 'Ошибка при получении списка пользователей.';
      }
    },
    async promoteToAdmin(userId) {
      try {
        await axios.post(`/api/admin/promote/${userId}`);
        this.successMessage = 'Пользователь успешно повышен до администратора.';
        this.fetchUsers(); // Обновить список пользователей после повышения
      } catch (error) {
        this.errorMessage = 'Ошибка при повышении пользователя.';
      }
    },
    async promoteToSuperAdmin(userId) {
      try {
        await axios.post(`/api/superadmin/promote/${userId}`);
        this.successMessage = 'Пользователь успешно повышен до супер-администратора.';
        this.fetchUsers(); // Обновить список пользователей после повышения
      } catch (error) {
        this.errorMessage = 'Ошибка при повышении пользователя до супер-администратора.';
      }
    },
    async deleteUser(userId) {
      try {
        await axios.delete(`/api/admin/delete/${userId}`);
        this.successMessage = 'Пользователь успешно удален.';
        this.fetchUsers(); // Обновить список пользователей после удаления
      } catch (error) {
        this.errorMessage = 'Ошибка при удалении пользователя.';
      }
    }
  },
  mounted() {
    this.fetchUsers();
  }
};
</script>

<style scoped>
.admin-panel {
  max-width: 800px;
  margin: 50px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif;
}

h2 {
  margin-bottom: 20px;
  color: #333;
  font-size: 28px;
  font-weight: bold;
  text-align: center;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.user-table th,
.user-table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
  font-size: 16px;
}

.promote-button,
.delete-button {
  padding: 8px 12px;
  margin: 5px;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.promote-button {
  background-color: #007bff;
}

.promote-button:hover {
  background-color: #0056b3;
}

.delete-button {
  background-color: #e57373;
}

.delete-button:hover {
  background-color: #d32f2f;
}

.error-message {
  color: #f44336;
  margin-top: 15px;
  font-weight: bold;
  text-align: center;
}

.success-message {
  color: #28a745;
  margin-top: 15px;
  font-weight: bold;
  text-align: center;
}
</style>
