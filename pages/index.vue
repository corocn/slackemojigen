<template>
  <section class="container">
    <div>
      <Logo />
      <HelloWorld />
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
import HelloWorld from '~/components/HelloWorld.vue'

export default {
  components: {
    Logo,
    HelloWorld
  }
}
</script>
