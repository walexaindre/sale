<script lang="ts">
    import { System, SystemInfo } from "../parser";
    import { transition } from "./Transition.svelte";
    let { system = $bindable() }: { system: System } = $props();

    let item: SystemInfo | null = $derived(system.getItem(transition.itemId));
</script>

<div class=" {transition.showDetailed ? '' : 'hidden'}">
    {#if item}
        <div>Summary Details</div>

        <table class="table max-w-1/3">
            <tbody>
                <!-- row 1 -->
                <tr>
                    <th>Name</th>
                    <td>{item.name}</td>
                </tr>
                <!-- row 2 -->
                <tr>
                    <th>Sale Price</th>
                    <td>${item.price}</td>
                </tr>
                <!-- row 3 -->
                <tr>
                    <th>Retail Price</th>
                    <td>${item.priceNew}</td>
                </tr>

                <tr>
                    <th>Short Description</th>
                    <td>{item.shortDescription}</td>
                </tr>

                <tr>
                    <th>Additional Details</th>
                    <td><a href={item.urlNew}>{item.urlNew}</a></td>
                </tr>
            </tbody>
        </table>
    {:else}
        <div class="alert alert-warning shadow-lg">
            <div>
                <span>Nothing found</span>
            </div>
        </div>
    {/if}
</div>
