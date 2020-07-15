<template>
  <div class="card-view">
    <card :mate="mate"/>
  </div>
</template>

<script>
import students from '@/assets/students.json';
import Card from '@/components/Card.vue';

export default {
  name: 'CardView',
  data() {
    return {
      mate: '',
    };
  },
  beforeMount() {
    const login = localStorage.getItem('login');
    if (!login) {
      window.location.replace('/');
    }
    const group = students.find((pair) => {
      const stud1 = Object.keys(pair)[0];
      const stud2 = Object.values(pair)[0];
      return stud1 === login || stud2 === login;
    });
    if (!group) {
      window.location.replace('/');
    }
    const stud1 = Object.keys(group)[0];
    const stud2 = Object.values(group)[0];
    this.mate = stud1 === login ? stud2 : stud1;
  },
  components: {
    Card,
  },
};
</script>
