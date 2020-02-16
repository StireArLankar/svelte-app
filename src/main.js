import App from './App.svelte'
import Stream from './EventStream.svelte'

const app = new App({
  target: document.body,
  props: {
    name: 'world'
  }
})

console.log(app)

app.$on('change', evt => console.log(evt))

const stream = new Stream({
  target: document.body
})

export default stream
