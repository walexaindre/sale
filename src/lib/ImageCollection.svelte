<script lang="ts">
    import Image from "./Image.svelte";

    let { result } = $props();
</script>

<div class="">
    <div class="grid grid-cols-[repeat(auto-fill,minmax(384px,1fr))] gap-4 p-4">
        {#if result.length == 0}
            <div class="alert alert-warning shadow-lg">
                <div>
                    <span>No images to display</span>
                </div>
            </div>
        {/if}
        {#each result as item}
            <Image></Image>
        {/each}
    </div>
</div>
