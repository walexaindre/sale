<script lang="ts">
  import Item from "./lib/Item.svelte";
  import Mesh from "./assets/grid.svg?raw";
  import * as Cons from "./Constants";
  import * as parser from "./parser";
  import DetailedItem from "./lib/DetailedItem.svelte";

  let system = new parser.System();
  system.generateRandomData(50);
  //console.log(system.getAllItems());
  //console.log(system.getAllTransactions());
  //  <DetailedItem name="alpha" img="luggage.svg" imgdesc="sale" price="300"
  //></DetailedItem>

  //<div class="flex justify-center">
  //  <div class="join">
  //    <button class="join-item btn">«</button>
  //    <button class="join-item btn">Page 22</button>
  //    <button class="join-item btn">»</button>
  //  </div>
  //</div>

  let searchText = $state("");

  let result: parser.SystemInfo[] = $state([]);

  $effect(() => {
    result = system.search(searchText);
  });
</script>

<div class="navbar text-neutral-content z-20 sticky top-0 bg-base-100">
  <div class="navbar-start">
    <button class="btn btn-square btn-ghost mx-2 stroke-neutral">
      {@html Mesh}
    </button>
  </div>
  <div class="navbar-center">
    <label class="input">
      <span class="label text-neutral">Search</span>
      <input
        bind:value={searchText}
        type="text"
        class="text-neutral"
        placeholder="Type something"
      />
    </label>
  </div>
  <div class="navbar-end"></div>
</div>

<div class="grid grid-cols-[repeat(auto-fill,minmax(384px,1fr))] gap-4 p-4">
  {#each result as item}
    <Item
      name={item.name}
      description={item.shortDescription}
      img={item.thumbnailUrl}
      imgdesc={""}
      price={item.price}
      quantity={item.getLeft()}
      tags={item.tags}
      category={item.category}
      condition={item.condition}
    ></Item>
  {/each}
</div>
