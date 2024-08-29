<template>
  <header>
    <div class="wrap-logo">
      <router-link to="/" class="logo">Logo</router-link>
    </div>
    <nav>
      <router-link to="/" class="nav-link" exact-active-class="active">Главный</router-link>
      <router-link to="/upload" class="nav-link" exact-active-class="active">Загрузить файл</router-link>
      <router-link to="/translation" class="nav-link" exact-active-class="active">Перевод</router-link>

      <!-- Ссылки для регистрации и входа, если пользователь не авторизован -->
      <router-link v-if="!isAuthenticated" to="/register" class="nav-link" exact-active-class="active">Регистрация</router-link>
      <router-link v-if="!isAuthenticated" to="/login" class="nav-link" exact-active-class="active">Вход</router-link>

      <!-- Кнопка выхода, если пользователь авторизован -->
      <button v-if="isAuthenticated" @click="logout" class="logout-button">Выход</button>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'HeaderComponent',
  data() {
    return {
      token: localStorage.getItem('token') // добавляем в data для отслеживания изменений
    };
  },
  computed: {
    isAuthenticated() {
      // Проверяем наличие токена в localStorage как индикатор аутентификации
      return !!this.token;
    }
  },
  methods: {
    logout() {
      if (confirm('Вы действительно хотите выйти?')) {
        // Удаляем токен из localStorage
        localStorage.removeItem('token');
        this.token = null; // Обновляем локальное состояние

        // Перенаправляем на страницу входа
        this.$router.push('/login').then(() => {
          this.$forceUpdate(); // Принудительное обновление компонента
        });

        // Отображаем уведомление об успешном выходе (если используется система уведомлений)
        this.$notify({ type: 'success', message: 'Вы успешно вышли из системы.' });
      }
    }
  },
  watch: {
    // Наблюдаем за изменением токена
    token(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.$forceUpdate(); // Принудительное обновление компонента при изменении токена
      }
    }
  },
  created() {
    // Устанавливаем токен при создании компонента
    this.token = localStorage.getItem('token');
  }
};
</script>



<style scoped>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
}

header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #FFEB3B;
  padding: 20px 10px;
  flex-wrap: wrap;
}

.wrap-logo {
  display: flex;
  align-items: center;
}

header a {
  color: #212121;
  padding: 12px;
  text-decoration: none;
  font-size: 18px;
  border-radius: 4px;
}

header a.logo {
  font-size: 25px;
  font-weight: bold;
}

header a:hover {
  background-color: #FBC02D;
  color: #212121;
}

header a.active {
  background-color: #FBC02D;
}

nav {
  display: flex;
  align-items: center;
}

.logout-button {
  padding: 10px 15px;
  margin-left: 10px;
  background-color: #e57373;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.logout-button:hover {
  background-color: #d32f2f;
}
</style>
