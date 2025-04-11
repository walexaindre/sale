<script lang="ts">
    import { System, SystemInfo } from "../parser";
    import Image from "./Image.svelte";
    import ImageCollection from "./ImageCollection.svelte";
    import { transition } from "./Transition.svelte";
    let { system = $bindable() }: { system: System } = $props();

    let item: SystemInfo | null = $derived(system.getItem(transition.itemId));
</script>

<div class=" text-center text-2xl text-accent">Photos</div>

<ImageCollection result={[1, 1, 2, 1, 1, 1, 1]}></ImageCollection>

<div class=" {transition.showDetailed ? '' : 'hidden'}">
    {#if item}
        <div class=" text-center text-2xl text-accent">Summary Details</div>
        <div class="grid grid-cols-2 gap-4 rounded-2xl my-4">
            <div class="flex justify-center">
                <table class="table max-w-2/3">
                    <tbody>
                        <tr>
                            <th class=" text-xl">Name</th>
                            <td class="text-xl">{item.name}</td>
                        </tr>
                        <tr>
                            <th class=" text-xl">Short Description</th>
                            <td class="prose">{item.shortDescription}</td>
                        </tr>
                        <tr>
                            <th class=" text-xl">Sale Price</th>
                            <td class="text-xl"
                                >${item.price}
                                {item.getLeft() > 1 ? "per unit" : ""}</td
                            >
                        </tr>

                        <tr>
                            <th class=" text-xl">Retail Price</th>
                            <td
                                >${item.priceNew}
                                {item.getLeft() > 1 ? "per unit" : ""}</td
                            >
                        </tr>
                        <tr>
                            <th class=" text-xl">Retail Store</th>
                            <td><a href={item.urlNew}>{item.urlNew}</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="flex justify-center">
                <table class="table max-w-2/3">
                    <tbody>
                        <tr>
                            <th class=" text-xl">Category</th>
                            <td class="prose">{item.category}</td>
                        </tr>
                        <tr>
                            <th class=" text-xl">Quantity</th>
                            <td class="prose">{item.quantity}</td>
                        </tr>
                        <tr>
                            <th class=" text-xl">Brand</th>
                            <td>{item.brand}</td>
                        </tr>

                        <tr>
                            <th class=" text-xl">Model</th>
                            <td>{item.model}</td>
                        </tr>
                        <tr>
                            <th class=" text-xl">Location</th>
                            <td>{item.location}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    {:else}
        <div class="alert alert-warning shadow-lg">
            <div>
                <span>Nothing found</span>
            </div>
        </div>
    {/if}
</div>
