<template>
  <div>
    <b-avatar 
      :size="size"
      :src="require('@/assets/' + image + '')"
      v-b-tooltip="{
        title: type.charAt(0).toUpperCase() + type.slice(1),
        placement: 'top',
        customClass: 'left-0',
      }"
    >
    </b-avatar> 
  </div>
</template>

<script>
export default {
  name: 'EnergyType',
  props: {
    image: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: '2rem'
    }
  }
}
</script>

<style>

</style>