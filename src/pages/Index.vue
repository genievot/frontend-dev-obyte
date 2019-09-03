<template>
  <q-page class="flex flex-center">
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
      >
      <q-chip color="grey-9" text-color="white" icon="directions">
        {{userName}}
      </q-chip>
        <q-input
          filled
          v-model="sendingToUser"
          label="Receiver Address *"
          disable
        />

        <q-input
          filled
          type="number"
          v-model="amount"
          label="Your Amount in Bytes*"
          lazy-rules
          :rules="[
            val => val !== null && val !== '' || 'Please type amount',
            val => val >= 1000 || 'Please type amount in bytes'
          ]"
        />
        <div>
          <q-btn label="Send" outline type="submit" color="black">
            <q-avatar class="q-ml-sm" size="22px">
              <img src="https://cdn.worldvectorlogo.com/logos/byteball-bytes.svg">
            </q-avatar>
          </q-btn>
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      sendingToUser: null,
      amount: '1000',
      userName: null
    }
  },
  mounted () {
    this.$q.loading.show({
      message: 'Collecting discord info...'
    })
    this.sendingToUser = this.$route.params.rec
    let params = {
      address: this.$route.params.rec
    }
    this.$client.api.getAttestations(params, (err, result) => {
      // console.log(err, result)
      if (err) {
        this.$q.notify(err)
      }
      for (var i = 0; i < result.length; i++) {
        if (result[i].attestor_address === '65JEA52AZK34MT4JBN2RCJTQEYMHUUGJ') {
          this.userName = result[i].profile.discord_name
        }
      }
    })
    // console.log(process.env.TOKEN)
    console.log(process.argv)
    this.$dclient.login(process.argv.length[2]).then((res) => {
      this.$q.loading.hide()
      this.$dclient.on('message', msg => {
        const guildTag = msg.channel.type === 'text' ? `[${msg.guild.name}]` : '[DM]'
        const channelTag = msg.channel.type === 'text' ? `[#${msg.channel.name}]` : ''
        console.log(`${guildTag}${channelTag} ${msg.author.tag}: ${msg.content}`)
      })
      // let channel = this.$dclient.channels.find('name', 'accountant-bot')
      // this.accChannel = channel
      // console.log(channel)
    })
  },
  methods: {
    onSubmit () {
      console.log(this.$q.platform.is)
      let url = null
      if (this.$q.platform.is.safari) {
        url = 'byteball:' + this.sendingToUser + '?amount=' + this.amount + '&asset=base'
      } else {
        url = 'obyte:' + this.sendingToUser + '?amount=' + this.amount + '&asset=base'
      }
      let win = window.open(url, '_self')
      this.$dclient.channels.get('583702719915753474').send(`<@${this.$route.params.recId}> , You are getting **${this.amount} bytes** from <@${this.$route.params.sen}>`)
      win.focus()
    },
    onReset () {
      this.sendingToUser = this.$route.params.rec
      this.amount = 1000
      this.$q.notify('Reset Completed')
    }
  }
}
</script>
