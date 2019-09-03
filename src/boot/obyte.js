// import something here
const obyte = require('obyte')

// Connect to mainnet official node 'wss://obyte.org/bb'
// "async" is optional
export default async ({ Vue }) => {
  // something to do
  Vue.prototype.$client = new obyte.Client()
}
