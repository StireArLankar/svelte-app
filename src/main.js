import App from './App.svelte'

const app = new App({
  target: document.body,
  props: {
    name: 'world'
  }
})

console.log(app)

app.$on('change', evt => console.log(evt))

export default app
