<script>
import { provide, readonly } from 'vue';
/**
 * App component
 */
import User, {
  useUser
} from './modules/user/index.vue';

export default {
  setup() {
    const [user, setUser] = useUser;
    setTimeout(() => {
      // user.name = '14';
      setUser({
        name: '14'
      });
    }, 1000);

    provide('configs', {
      name: 'app'
    });

    return {
      user
    };
  },
  components: {
    User
  }
}
</script>

<template>
  <User />
  <p>The user is {{user.name}}</p>
</template>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
