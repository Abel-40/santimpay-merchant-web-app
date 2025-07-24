<script setup lang="ts">
import { ref, watch } from 'vue';

const user = ref({
  name: 'John',
  age: 25,
});

// Watch the whole object (deep)
watch(user, (newUser, oldUser) => {
  console.log('User object changed:', newUser, oldUser);
}, { deep: true });

// Watch only the name property
watch(() => user.value.name, (newName, oldName) => {
  console.log('Name changed from', oldName, 'to', newName);
});
</script>
