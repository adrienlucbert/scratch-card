<template>
  <div class="login">
    <form class="center" @submit.prevent="submit">
      <div class="error" v-if="error.length">
        {{ error }}
      </div>
      <input type="text" placeholder="login" name="login" id="login"/>
      <input type="submit" value="Log in"/>
    </form>
  </div>
</template>

<script>
import students from '@/assets/students.json';

export default {
  name: 'Login',
  data() {
    return {
      error: '',
    };
  },
  mounted: () => {
    localStorage.clear();
  },
  methods: {
    submit(e) {
      const input = e.target.login.value;
      const login = input.indexOf('@') < 0 ? `${input}@epitech.eu` : input;
      const group = students.find((pair) => {
        const stud1 = Object.keys(pair)[0];
        const stud2 = Object.values(pair)[0];
        return stud1 === login || stud2 === login;
      });
      if (group) {
        localStorage.setItem('login', login);
        window.location.replace('/#/card');
      } else {
        this.error = 'Invalid login';
      }
    },
  },
};
</script>

<style scoped>
  input, button, .error {
    font: inherit;
    color: inherit;
    background: inherit;
    border: 2px solid #555;
    display: block;
    padding: .3em 1em;
    margin-bottom: .5em;
    width: 300px;
  }

  .error {
    border-color: rgb(177, 46, 46);
  }

  input[type="submit"] {
    float: right;
  }
</style>
