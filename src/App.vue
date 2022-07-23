<template>
  <nav>
    <div class="nav-wrapper teal">
      <a href="#" class="brand-logo">To-Do App</a>
    </div>
  </nav>
  <div class="container white" style="margin-top: 30px">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>