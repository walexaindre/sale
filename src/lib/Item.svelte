<script lang="ts">
    import type { SystemInfo } from "../parser";

    let { item, itemId = $bindable() }: { item: SystemInfo; itemId: string } =
        $props();

    let quantity = item.getLeft();

    function showDetails() {
        itemId = item.itemId;
    }
</script>

<div class="flex justify-center">
    <div class="card card-dash bg-base-300 w-96 shadow-sm">
        <div class="card-body">
            <button
                class="btn btn-ghost h-fit relative rounded-none"
                onclick={showDetails}
            >
                <figure>
                    <img src={item.thumbnailUrl} alt={item.shortDescription} />
                    {#if quantity <= 0}
                        <div
                            class=" absolute text-5xl text-error bg-error-content w-full py-2 -rotate-45 text-center"
                        >
                            Sold!
                        </div>
                    {/if}
                </figure>
            </button>
            <div class="flex justify-between">
                <h2 class="text-2xl font-bold">{item.name}</h2>
                {#if quantity > 0}
                    <span class="text-2xl text-secondary">${item.price}</span>
                {:else}
                    <span class="text-2xl text-secondary line-through"
                        >${item.price}</span
                    >
                {/if}
            </div>
            <p>
                {item.shortDescription}
            </p>
            <div class="flex flex-wrap gap-2">
                {#if item.condition == "new"}
                    <div class="badge badge-success">New</div>
                {:else if item.condition == "used"}
                    <div class="badge badge-info">Used</div>
                {:else}
                    <div class="badge badge-warning">Refurbished</div>
                {/if}
                {#if item.category}
                    <div class="badge badge-soft badge-warning">
                        {item.category}
                    </div>
                {/if}
                {#each item.tags as tag}
                    <div class="badge badge-outline badge-primary">
                        {tag}
                    </div>
                {/each}
                {#if quantity > 1}
                    <div class="badge badge-outline badge-success">
                        {quantity} units available
                    </div>
                {:else if quantity == 1}
                    <div class="badge badge-outline badge-warning">
                        Only one left
                    </div>
                {:else}
                    <div class="badge badge-error">Out of stock</div>
                {/if}
            </div>
        </div>
    </div>
</div>
