<script lang="ts">
    import type { SystemInfo } from "../parser";
    import Item from "./Item.svelte";
    let {
        itemId = $bindable(),
        showDetailed = $bindable(),
        result = $bindable(),
    }: {
        itemId: string;
        showDetailed: boolean;
        result: SystemInfo[];
    } = $props();
</script>

<div
    class="grid grid-cols-[repeat(auto-fill,minmax(384px,1fr))] gap-4 p-4 {showDetailed
        ? 'hidden'
        : ''}"
>
    {#if result.length == 0}
        <div class="alert alert-warning shadow-lg">
            <div>
                <span>Nothing found</span>
            </div>
        </div>
    {/if}
    {#each result as item}
        <Item bind:itemId {item}></Item>
    {/each}
</div>
