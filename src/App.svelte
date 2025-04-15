<script lang="ts">
  import * as Cons from "./Constants";
  import * as parser from "./parser";
  import ImageHandler from "./lib/ImageView.svelte";
  import Detailed from "./lib/Detailed.svelte";
  import ItemCollection from "./lib/ItemCollection.svelte";
  import Navbar from "./lib/Navbar.svelte";
  import { transition, imageSrc } from "./lib/Transition.svelte";

  let system = new parser.System();
  system.generateRandomData(50);

  console.log("Ccall");
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

<Navbar bind:searchText></Navbar>

<ItemCollection bind:result></ItemCollection>

<Detailed {system}></Detailed>

<ImageHandler bind:imgSrc={imageSrc.src}></ImageHandler>
