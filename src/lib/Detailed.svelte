<script lang="ts">
    import { System, SystemInfo } from "../parser";
    import { transition } from "./Transition.svelte";
    let { system = $bindable() }: { system: System } = $props();

    let item: SystemInfo | null = $derived(system.getItem(transition.itemId));
</script>

<div class=" {transition.showDetailed ? '' : 'hidden'}">
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
