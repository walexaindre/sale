<script lang="ts">
    import { Data, store, Actions } from "./Store.svelte";

    function addItem() {
        // Data.sys.addSystemInfo();
        console.log("Add Item clicked");
    }

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
    let thumbnail: File | null = $state(null);
    let category: string = $state("");
</script>

{#if store.step == Actions.CreateItem}
    <fieldset
        class="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box"
    >
        <legend class="fieldset-legend">Create Item</legend>

        <label class="fieldset-label" for="name">Name</label>
        <input
            type="text"
            class="input"
            placeholder="Item Name"
            bind:value={name}
        />

        <label class="fieldset-label" for="name">Brand</label>
        <input
            type="text"
            class="input"
            placeholder="Brand"
            bind:value={brand}
        />

        <label class="fieldset-label" for="name">Model</label>
        <input
            type="text"
            class="input"
            placeholder="Model"
            bind:value={model}
        />

        <label class="fieldset-label" for="price">Price</label>
        <input
            type="number"
            min="0"
            step="0.1"
            class="input"
            placeholder="Price per unit"
            bind:value={price}
        />

        <label class="fieldset-label" for="thumbnail">Thumbnail File</label>
        <input
            type="file"
            class="file-input file-input-accent"
            bind:value={thumbnail}
        />

        <label class="fieldset-label" for="quantity">Quantity</label>
        <input
            type="number"
            min="0"
            step="1"
            class="input"
            placeholder="Total items"
            bind:value={quantity}
        />
        <label class="fieldset-label" for="shortdsc">Short Description</label>
        <textarea
            class="textarea"
            placeholder="Short description"
            bind:value={shortdsc}
        ></textarea>

        <label class="fieldset-label" for="longdsc">Long Description</label>
        <textarea
            class="textarea"
            placeholder="Long description"
            bind:value={longdsc}
        ></textarea>

        <label class="fieldset-label" for="cond">Condition</label>

        <select class="select" bind:value={cond}>
            <option disabled selected>Pick a condition</option>
            <option value="new">New</option>
            <option value="used">Used</option>
            <option value="open box">Open Box</option>
            <option value="refurbished">Refurbished</option>
        </select>

        <label class="fieldset-label" for="priceNew">Price New</label>
        <input
            type="number"
            min="0"
            step="0.1"
            class="input"
            placeholder="Price per unit when New"
            bind:value={priceNew}
        />

        <label class="fieldset-label" for="URLnew">Url for new item</label>

        <input
            type="url"
            class="input"
            placeholder="URL referencing this item when new"
            bind:value={urlNew}
        />
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

        <button class="btn btn-primary" onclick={addItem}> Add Item </button>
    </fieldset>
{/if}
