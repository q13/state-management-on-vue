<script>
import { defineComponent, inject, onMounted, provide, reactive, readonly, ref, watch } from 'vue';
import Mobile from './mobile/index.vue';
import Car from './car/index.vue';
import { useStateSimple } from '../../boost/inject-extra';

const user = reactive({
  name: '13',
  profile: {
    age: '30'
  }
});

export default defineComponent({
  setup() {
    const miRef = ref(null);
    const isMobile = ref(false);
    const configs = inject('configs');
    console.log('user-configs', configs);
    // provide('configs', {
    //   name: 'user'
    // });
    onMounted(function () {
      setTimeout(() => {
        miRef.value.mobileArgs.width = 200;
        console.log('user component', miRef.value.mobileArgs);
      }, 4000);
    });

    setTimeout(() => {
      isMobile.value = true;
      setTimeout(() => {
        isMobile.value = false;
      }, 1000);
    }, 3000);

    return {
      user,
      miRef,
      isMobile
    };
  },
  components: {
    Mobile,
    Car
  }
})


const useUser = useStateSimple(user);

export {
  useUser
}

</script>
<template>
<div class="user-pane">
  <h3>{{ user.name }}</h3>
  <div class="user-profile">Age: {{ user.profile.age }}</div>
  <Mobile v-if="isMobile" ref="miRef" v-state="'mi'" />
  <Car />
</div>
</template>
<style scoped>
</style>
