<script lang="ts">
    let {
        name,
        description = "quo erat demostratum",
        img,
        imgdesc,
        price,
        quantity = 0,
        tags = ["alpha", "beta prunning", "eta gama eta"],
        category = "a",
        condition = "new",
    } = $props();
    function a() {
        console.log("hello");
    }
</script>

<div class="flex justify-center">
    <div class="card card-dash bg-base-300 w-96 shadow-sm">
        <div class="card-body">
            <button class="btn btn-ghost h-fit relative">
                <figure>
                    <img src={img} alt={imgdesc} />
                    {#if quantity == 0}
                        <div
                            class=" absolute text-5xl text-error bg-error-content w-full py-2 -rotate-45 text-center"
                        >
                            Sold!
                        </div>
                    {/if}
                </figure>
            </button>
            <div class="flex justify-between">
                <h2 class="text-2xl font-bold">{name}</h2>
                {#if quantity > 0}
                    <span class="text-2xl text-secondary">${price}</span>
                {:else}
                    <span class="text-2xl text-secondary line-through"
                        >${price}</span
                    >
                {/if}
            </div>
            <p>
                {description}
            </p>
            <div class="flex flex-wrap gap-2">
                {#if condition == "new"}
                    <div class="badge badge-info">New</div>
                {:else if condition == "used"}
                    <div class="badge badge-info">Used</div>
                {:else}
                    <div class="badge badge-info">Refurbished</div>
                {/if}
                {#if category}
                    <div class="badge badge-soft badge-warning">
                        {category}
                    </div>
                {/if}
                {#each tags as tag}
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
