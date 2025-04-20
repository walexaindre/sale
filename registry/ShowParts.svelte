<script lang="ts">
    import type { Part } from "../shared/parser.svelte";

    let { partFamily = $bindable() }: { partFamily: Part[] } = $props();

    function Delete(index: number) {
        partFamily.splice(index, 1);
    }
</script>

{#each partFamily as part, index}
    <div class="card card-dash bg-accent">
        <div class="card-body">
            <div class=" card-title">
                {part.partName}
            </div>
            <div>
                <img src={part.imageUrls[0]} alt={part.partName} />
                <div class="card-description">
                    <p>{part.description}</p>
                    <p>{part.available ? "Available" : "Not Available"}</p>
                </div>
            </div>
            <div class="card-actions justify-end">
                <button class="btn btn-secondary" onclick={() => Delete(index)}>
                    Delete</button
                >
            </div>
        </div>
    </div>
{/each}
