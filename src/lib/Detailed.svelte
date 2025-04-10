<script lang="ts">
    import { System, SystemInfo } from "../parser";
    let {
        itemId = $bindable(),
        system = $bindable(),
        showDetailed = $bindable(),
    }: { itemId: string; system: System; showDetailed: boolean } = $props();

    let item: SystemInfo | null = system.getItem(itemId);
</script>

<div class=" {showDetailed ? '' : 'hidden'}">
    {#if item}
        There is something
    {:else}
        <div class="alert alert-warning shadow-lg">
            <div>
                <span>Nothing found</span>
            </div>
        </div>
    {/if}
</div>
