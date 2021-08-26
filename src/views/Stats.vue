<template>
<b-container class="white-background">
  <div v-if="submitted.length > 0" class="main my-1">
    <MostShinyChart :submittedNames="submitted" />
  </div>
  <div v-if="submitted.length > 0" class="main my-3">
    <TopPickChart :submittedNames="submitted" />
  </div>
  <div v-if="users.length > 0" class="main my-3">
    <UserList :users="users" />
  </div>
</b-container>
</template>

<script>
import MostShinyChart from '@/components/stats/MostShinyChart'
import TopPickChart from '@/components/stats/TopPickChart'
import UserList from '@/components/stats/UserList'
import { getSubmittedTeams, getSubmittedNames } from '@/services/Firebase/firebase'
export default {
  components: {
    MostShinyChart,
    TopPickChart,
    UserList
  },
  data () {
    return {
      submitted: [],
      users: []
    }
  },
  async mounted () {
    this.submitted = await getSubmittedTeams()
    this.users = await getSubmittedNames()
  }
}
</script>

<style>

</style>