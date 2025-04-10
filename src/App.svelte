<script lang="ts">
  import Item from "./lib/Item.svelte";
  import Mesh from "./assets/grid.svg?raw";
  import * as Cons from "./Constants";
  import * as parser from "./parser";
  import ImageHandler from "./lib/ImageHandler.svelte";
  import Detailed from "./lib/Detailed.svelte";
  import ItemCollection from "./lib/ItemCollection.svelte";

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

  let imageSrc = $state("https://picsum.photos/512/512");

  let result: parser.SystemInfo[] = $state([]);

  $effect(() => {
    result = system.search(searchText);
  });

  function showModal() {
    const modal = document.getElementById("img_modal") as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  }

  let showDetailed = $state(false);
  let itemId = $state("");
</script>

<button class="btn" onclick={showModal}>open modal</button>
<button
  class="btn"
  onclick={() => {
    showDetailed = !showDetailed;
  }}
  >Details
</button>
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

<div class="flex justify-left mx-15">
  <div class="breadcrumbs text-sm">
    <ul>
      <li>
        <a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="h-4 w-4 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
            ></path>
          </svg>
          Home
        </a>
      </li>
      <li>
        <a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="h-4 w-4 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
            ></path>
          </svg>
          Documents
        </a>
      </li>
      <li>
        <span class="inline-flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="h-4 w-4 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            ></path>
          </svg>
          Add Document
        </span>
      </li>
    </ul>
  </div>
</div>

<ItemCollection bind:itemId bind:showDetailed bind:result></ItemCollection>

<Detailed bind:itemId {system} bind:showDetailed></Detailed>

<ImageHandler bind:imgSrc={imageSrc}></ImageHandler>
