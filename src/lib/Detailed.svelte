<script lang="ts">
    import { System, SystemInfo } from "../../shared/parser.svelte";
    import Image from "./Image.svelte";
    import ImageCollection from "./ImageCollection.svelte";
    import { imageSrc } from "./ImageStore.svelte";
    import PartDisplay from "./PartDisplay.svelte";
    import { transition } from "./Transition.svelte";
    let { system = $bindable() }: { system: System } = $props();

    let item: SystemInfo | null = $derived(system.getItem(transition.itemId));
</script>

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
                            <td
                                ><a class="link" href={item.urlNew}
                                    >{item.urlNew}</a
                                ></td
                            >
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="flex justify-center">
                <table class="table max-w-2/3">
                    <tbody>
                        <tr>
                            <th class=" text-xl">Category</th>
                            <td class="prose">
                                {item.category}
                            </td>
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

        <div class=" text-center text-2xl text-accent">Photos</div>

        <ImageCollection
            result={[item.thumbnailUrl, ...item.complementaryImages]}
        ></ImageCollection>

        {#if item.defects.length > 0}
            <div class=" text-center text-2xl text-accent">Defects</div>
            <div
                class="grid grid-cols-[repeat(auto-fill,minmax(384px,1fr))] gap-4 p-4"
            >
                {#each item.defects as damage}
                    <PartDisplay part={damage}></PartDisplay>
                {/each}
            </div>
        {/if}

        {#if item.missingParts.length > 0}
            <div class=" text-center text-2xl text-accent">Missing Parts</div>
            <div
                class="grid grid-cols-[repeat(auto-fill,minmax(384px,1fr))] gap-4 p-4"
            >
                {#each item.missingParts as missing}
                    <PartDisplay part={missing}></PartDisplay>
                {/each}
            </div>
        {/if}
        {#if item.accessories.length > 0}
            <div class=" text-center text-2xl text-accent">Accesories</div>
            <div
                class="grid grid-cols-[repeat(auto-fill,minmax(384px,1fr))] gap-4 p-4"
            >
                {#each item.accessories as accessory}
                    <PartDisplay part={accessory}></PartDisplay>
                {/each}
            </div>
        {/if}
    {:else}
        <div class="alert alert-warning shadow-lg">
            <div>
                <span>Nothing found</span>
            </div>
        </div>
    {/if}
</div>
