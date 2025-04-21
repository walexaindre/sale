<script lang="ts">
    import { System, Pagination } from "../shared/parser.svelte";
    import { Data } from "./Store.svelte";
    import SummarizedPart from "./SummarizedPart.svelte";

    import { downloadFile } from "../shared/downloader";

    let downloadItems = () => {
        downloadFile(
            "items.json",
            "application/json",
            Data.sys.serializeItems(),
        );
    };

    let downloadTransactions = () => {
        downloadFile(
            "transactions.json",
            "application/json",
            Data.sys.serializeTransactions(),
        );
    };

    let pag: Pagination = new Pagination(1, 25, Data.sys);
</script>

<button class="btn" onclick={downloadItems}> Download Item! </button>
<button class="btn" onclick={downloadTransactions}>
    Download Transactions!
</button>

{#if Data.sys.systemInfo.length}
    <div class="grid grid-cols-1 gap-2">
        <ul class="menu menu-xs bg-base-200 rounded-box min-w-48 w-full">
            {#if pag.totalPages > 1}
                <li>
                    <div class="text-warning">
                        Page {pag.currentPage} of {pag.totalPages}
                    </div>
                </li>
            {/if}
            {#each Data.sys.systemInfo.slice(pag.startIndex, pag.endIndex) as info}
                <li>
                    <details>
                        <summary
                            ><div class=" text-primary">Name:</div>
                            {info.name}
                            {#if info.getSoldOut()}
                                <div class=" text-error">
                                    Sold!
                                </div>{/if}</summary
                        >
                        <ul>
                            <li>
                                <div>Category: {info.category}</div>
                            </li>
                            <li>
                                <div>Brand: {info.brand}</div>
                            </li>
                            <li>
                                <div>Model: {info.model}</div>
                            </li>
                            <li>
                                <div>Price: {info.price}</div>
                            </li>
                            <li>
                                <div>Quantity: {info.quantity}</div>
                            </li>
                            <li>
                                <div>Condition: {info.condition}</div>
                            </li>
                            <li>
                                <div>Location: {info.location}</div>
                            </li>

                            <SummarizedPart
                                parts={info.missingParts}
                                name="Missing Parts"
                                color={1}
                            />

                            <SummarizedPart
                                parts={info.accessories}
                                name="Accessories"
                                color={2}
                            />
                            <SummarizedPart
                                parts={info.defects}
                                name="Defects"
                                color={3}
                            />
                        </ul>
                    </details>
                </li>
            {/each}
        </ul>

        {#if pag.totalPages > 1}
            <div class="flex justify-center items-center">
                <div class="join">
                    {#if pag.currentPage > 1}
                        <button
                            class="join-item btn btn-xs btn-secondary w-16"
                            onclick={pag.previousPage}
                        >
                            Previous
                        </button>
                    {/if}
                    {#if pag.currentPage < pag.totalPages}
                        <button
                            class="join-item btn btn-xs btn-secondary w-16"
                            onclick={pag.nextPage}
                        >
                            Next
                        </button>
                    {/if}
                </div>
            </div>
        {/if}
    </div>
{/if}
