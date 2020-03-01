<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/profile">Profile</router-link> |
      <router-link to="/logout">Logout</router-link>
    </div>
    <hr>
    <router-view/>
  </div>
</template>
