<script lang="typescript">
  export let item: string;
  interface Test {
    text: string;
    id: number;
  }

  let items: Test[] = [];
  let queue: Test[] = [];

  const duration = 800;

  import { beforeUpdate, onDestroy } from "svelte";

  beforeUpdate(() => {
    if (item) {
      queue = [...queue, { text: item, id: Date.now() }];
      item = undefined;
    }
  });

  function onClick() {
    queue = [...queue, { text: Date.now().toString(), id: Date.now() }];
  }

  const interval = setInterval(() => {
    if (queue.length > 0) {
      const [first, ...rest] = queue;
      items = [first, ...items.slice(0, 3)];
      queue = rest;
    }
  }, 2000);

  onDestroy(() => clearInterval(interval));

  import { crossfade } from "svelte/transition";
  import { flip } from "svelte/animate";
  import { expoInOut } from "svelte/easing";

  function transIn(node, params) {
    const transform = getComputedStyle(node).transform.replace("none", "");

    return {
      duration,
      easing: expoInOut,
      css: (t, u) => `
					transform: ${transform} translateX(-${110 * u}%);
        `
    };
  }

  function transOut(node, params) {
    const transform = getComputedStyle(node).transform.replace("none", "");

    return {
      duration,
      easing: expoInOut,
      css: (t, u) => `
          transform: ${transform} translateX(${110 * u}%);
        `
    };
  }
</script>

<style lang="scss">
  div {
    position: fixed;
    height: 50px;
    width: 100%;
    bottom: 0;
    background: rgb(185, 185, 185);
  }

  ul {
    margin: 0;
    padding: 5px;
    list-style: none;
    display: flex;
    height: 100%;

    &:hover {
      background: red;
    }

    & li {
      width: 200px;
      background: rgba(255, 245, 98, 0.7);
      border-radius: 5px;
      margin: 0 10px;
    }
  }

  // li {
  //   width: 200px;
  //   background: rgba(255, 245, 98, 0.7);
  //   border-radius: 5px;
  //   margin: 0 10px;
  // }
</style>

<div>
  <ul on:click={onClick}>
    {#each items as item, i (item.id)}
      <li
        in:transIn
        out:transOut
        animate:flip={{ duration, easing: expoInOut }}>
        {item.text}
      </li>
    {/each}
  </ul>
</div>
