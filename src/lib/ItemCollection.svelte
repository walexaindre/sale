<script lang="ts">
    import type { SystemInfo } from "../parser";
    import Item from "./Item.svelte";

    import { transition } from "./Transition.svelte";

    let {
        result = $bindable(),
    }: {
        result: SystemInfo[];
    } = $props();
</script>

<div
    class="grid grid-cols-[repeat(auto-fill,minmax(384px,1fr))] gap-4 p-4 {transition.showDetailed
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
        <Item {item}></Item>
    {/each}
</div>
