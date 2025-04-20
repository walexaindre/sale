<script lang="ts">
    import { Item, Part, SystemInfo } from "../shared/parser.svelte";
    import { Data, store, Actions } from "./Store.svelte";
    import SinglePart from "./SinglePart.svelte";
    import ShowParts from "./ShowParts.svelte";

    let name: string = $state("");
    let brand: string = $state("");
    let model: string = $state("");
    let price: number = $state(0);
    let quantity: number = $state(0);
    let shortdsc: string = $state("");
    let longdsc: string = $state("");
    let cond: string = $state("");
    let priceNew: number = $state(0);
    let urlNew: string = $state("");
    let thumbnail: FileList | null = $state(null);
    let category: string = $state("");
    let location: string = $state("");
    let additionalImages: FileList | null = $state(null);
    let newItem: Item = $state(Item.emptyItem());

    let missingParts: Part[] = $state([]);
    let defects: Part[] = $state([]);
    let accessories: Part[] = $state([]);

    function addItem() {
        // Data.sys.addSystemInfo();
        const newId = Data.sys.getNewItemId();

        newItem = new Item(
            newId,
            name,
            price,
            quantity,
            shortdsc,
            longdsc,
            missingParts,
            defects,
            accessories,
            cond,
            brand,
            model,
            thumbnail?.item(0)?.name ?? "",
            [],
            [],
            priceNew,
            urlNew,
            category,
            location,
        );
        Data.sys.addSystemInfo(new SystemInfo(newItem, []));
        console.log(Data.sys);
    }

    function addItems(incr: number = 5000) {
        Data.sys.addRandom(incr);
    }

    function addRandomItem() {
        Data.sys.addRandom(1);
    }
</script>

{#if store.step == Actions.CreateItem}
    <div>
        <fieldset
            class="fieldset bg-base-200 border border-base-300 p-4 rounded-box grid-cols-3"
        >
            <legend class="fieldset-legend">Create Item</legend>
            <div>
                <label class="fieldset-label" for="name">Name</label>
                <input
                    type="text"
                    class="input"
                    placeholder="Item Name"
                    bind:value={name}
                />
            </div>
            <div>
                <label class="fieldset-label" for="name">Brand</label>
                <input
                    type="text"
                    class="input"
                    placeholder="Brand"
                    bind:value={brand}
                />
            </div>

            <div>
                <label class="fieldset-label" for="name">Model</label>
                <input
                    type="text"
                    class="input"
                    placeholder="Model"
                    bind:value={model}
                />
            </div>

            <div>
                <label class="fieldset-label" for="price">Price</label>
                <input
                    type="number"
                    min="0"
                    step="0.1"
                    class="input"
                    placeholder="Price per unit"
                    bind:value={price}
                />
            </div>

            <div>
                <label class="fieldset-label" for="thumbnail"
                    >Thumbnail File</label
                >
                <input
                    type="file"
                    class="file-input file-input-accent"
                    bind:files={thumbnail}
                />
            </div>

            <div>
                <legend class="fieldset-label">Additional Images</legend>
                <input
                    type="file"
                    class="file-input file-input-accent"
                    multiple
                    bind:files={additionalImages}
                />
            </div>

            <div>
                <label class="fieldset-label" for="quantity">Quantity</label>
                <input
                    type="number"
                    min="0"
                    step="1"
                    class="input"
                    placeholder="Total items"
                    bind:value={quantity}
                />
            </div>
            <div>
                <label class="fieldset-label" for="shortdsc"
                    >Short Description</label
                >
                <textarea
                    class="textarea"
                    placeholder="Short description"
                    bind:value={shortdsc}
                ></textarea>
            </div>

            <div>
                <label class="fieldset-label" for="longdsc"
                    >Long Description</label
                >
                <textarea
                    class="textarea"
                    placeholder="Long description"
                    bind:value={longdsc}
                ></textarea>
            </div>

            <div>
                <label class="fieldset-label" for="cond">Condition</label>

                <select class="select" bind:value={cond}>
                    <option disabled selected>Pick a condition</option>
                    <option value="new">New</option>
                    <option value="used">Used</option>
                    <option value="open box">Open Box</option>
                    <option value="refurbished">Refurbished</option>
                </select>
            </div>
            <div>
                <label class="fieldset-label" for="name">Location</label>
                <input
                    type="text"
                    class="input"
                    placeholder="Item Location"
                    bind:value={location}
                />
            </div>

            <div>
                <label class="fieldset-label" for="priceNew">Price New</label>
                <input
                    type="number"
                    min="0"
                    step="0.1"
                    class="input"
                    placeholder="Price per unit when New"
                    bind:value={priceNew}
                />
            </div>

            <div>
                <label class="fieldset-label" for="URLnew"
                    >Url for new item</label
                >

                <input
                    type="url"
                    class="input"
                    placeholder="URL referencing this item when new"
                    bind:value={urlNew}
                />
            </div>
            <div>
                <label class="fieldset-label" for="cond">Category</label>

                <select class="select" bind:value={category}>
                    <option disabled selected>Pick a Category</option>
                    <option value="electronics">Electronics</option>
                    <option value="furniture">Furniture</option>
                    <option value="clothing">Clothing</option>
                    <option value="toys">Toys</option>
                    <option value="books">Books</option>
                    <option value="sports">Sports</option>
                    <option value="automotive">Automotive</option>
                    <option value="health">Health</option>
                    <option value="beauty">Beauty</option>
                    <option value="groceries">Groceries</option>
                    <option value="jewelry">Jewelry</option>
                    <option value="home">Home</option>
                    <option value="garden">Garden</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div></div>
            <div>
                <label class="fieldset-label" for="cond1">Btn 1</label>
                <button class="btn btn-primary w-full" onclick={addItem}>
                    Add Item
                </button>
            </div>
            <div>
                <label class="fieldset-label" for="cond1">Btn 2</label>

                <button
                    class="btn btn-primary w-full"
                    onclick={() => addItems(30000)}
                >
                    Add Random Items (30000)
                </button>
            </div>
            <div>
                <label class="fieldset-label" for="cond1">Btn 3</label>

                <button class="btn btn-primary w-full" onclick={addRandomItem}>
                    Add a Random Item
                </button>
            </div>
        </fieldset>

        <div class="grid grid-cols-3 gap-4">
            <fieldset
                class="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box"
            >
                <legend class="fieldset-legend">Add Accesories</legend>
                <SinglePart bind:partFamily={accessories}></SinglePart>
                <ShowParts bind:partFamily={accessories}></ShowParts>
            </fieldset>
            <fieldset
                class="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box"
            >
                <legend class="fieldset-legend">Add Missing Parts</legend>
                <SinglePart bind:partFamily={missingParts}></SinglePart>
                <ShowParts bind:partFamily={missingParts}></ShowParts>
            </fieldset>

            <fieldset
                class="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box"
            >
                <legend class="fieldset-legend">Add Defects</legend>
                <SinglePart bind:partFamily={defects}></SinglePart>
                <ShowParts bind:partFamily={defects}></ShowParts>
            </fieldset>
        </div>
    </div>
{/if}
