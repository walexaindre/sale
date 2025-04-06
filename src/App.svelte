<script lang="ts">
  import Item from "./lib/Item.svelte";
  import Mesh from "./assets/grid.svg?raw";
  import * as Cons from "./Constants";
</script>

<div class="navbar text-neutral-content z-20 sticky top-0 bg-base-100">
  <div class="navbar-start">
    <button class="btn btn-square btn-ghost mx-2">
      {@html Mesh}
    </button>
  </div>
  <div class="navbar-center">
    <label class="input">
      <span class="label">Search</span>
      <input type="text" placeholder="Type something" />
    </label>
  </div>
  <div class="navbar-end"></div>
</div>

<div class="grid grid-cols-[repeat(auto-fill,minmax(384px,1fr))] gap-4 p-4">
  <Item name="alpha" img="luggage.svg" imgdesc="sale" price="300"></Item>
</div>

<div class="flex justify-center">
  <div class="join">
    <button class="join-item btn">«</button>
    <button class="join-item btn">Page 22</button>
    <button class="join-item btn">»</button>
  </div>
</div>
