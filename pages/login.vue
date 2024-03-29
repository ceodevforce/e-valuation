<script setup lang="ts">

const fields = [{
  name: 'email',
  type: 'text',
  label: 'Email',
  placeholder: 'Enter email'
},{
  name: 'password',
  type: 'password',
  label: 'Password',
  placeholder: 'Enter your password'
}]
</script>
<template>
  <div>
    <UCard class="max-w-sm w-full">
      <UAuthForm title="Sign In" description="Enter your credentials to access E-Val" align="bottom" :fields="fields"/>
    </UCard>
  </div>
</template>
