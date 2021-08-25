<template>
  <div class="main">
    {{submitted}}
  </div>
</template>

<script>
import { getSubmittedTeams } from '@/services/Firebase/firebase'
export default {
  data () {
    return {
      submitted: []
    }
  },
  async mounted () {
    this.submitted = await getSubmittedTeams()
  }
}
</script>

<style>

</style>