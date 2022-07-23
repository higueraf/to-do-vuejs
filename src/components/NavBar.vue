<template>
  <nav>
    <div class="nav-wrapper teal">
      <ul class="right hide-on-med-and-down">
        <li>Logout</li>
      </ul>
    </div>
  </nav> 
</template>

<script>

export default {
  name: 'App',
  computed: {
    email(){
      return localStorage.getItem('userName')
    },
    id(){
      return localStorage.getItem('id')
    }
  }
}
</script>

<style scoped>
  .user-data
  {
    position:fixed;
    bottom: 0px; left: 0px;
    padding:10px;
    background-color:white;
    border-radius:5px;
    z-index: 2;
  }
</style>