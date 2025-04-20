<script lang="ts">
    import type { Part } from "../shared/parser.svelte";

    let { parts, name, color }: { parts: Part[]; name: string; color: number } =
        $props();
</script>

{#if parts.length}
    <li>
        <details>
            <summary>
                {#if color === 1}
                    <div class="text-error">
                        {name}
                    </div>
                {:else if color === 2}
                    <div class="text-warning">
                        {name}
                    </div>
                {:else if color === 3}
                    <div class="text-success">
                        {name}
                    </div>
                {/if}
            </summary>
            <ul>
                {#each parts as part}
                    <li>
                        <details>
                            <summary>Part: {part.partName}</summary>
                            <ul>
                                <li>
                                    <div>
                                        Stored Images: {part.imageUrls.length}
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        Available: {part.available}
                                    </div>
                                </li>
                            </ul>
                        </details>
                    </li>
                {/each}
            </ul>
        </details>
    </li>
{/if}
