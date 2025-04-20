<script lang="ts">
    import { Part } from "../shared/parser.svelte";

    let { partFamily = $bindable() }: { partFamily: Part[] } = $props();

    let image: FileList | null = $state(null);

    let part: Part = $state(new Part("", "", [], true));

    function ProcessImage() {
        if (image) {
            image.length
                ? (part.imageUrls = Array.from(image).map((file) => file.name))
                : (part.imageUrls = []);
        }
    }

    function addPart() {
        partFamily.push(part);
        image = new DataTransfer().files;
        part = new Part("", "", [], true);
    }
</script>

<label class="fieldset-label" for="name">Name</label>
<input
    type="text"
    class="input"
    placeholder="Item Name"
    bind:value={part.partName}
/>
<label class="fieldset-label" for="thumbnail">Image</label>
<input
    type="file"
    class="file-input file-input-accent"
    bind:files={image}
    multiple
    onchange={ProcessImage}
/>

<label class="fieldset-label" for="shortdsc">Description</label>
<textarea
    class="textarea"
    placeholder="Short description"
    bind:value={part.description}
></textarea>

<label class="fieldset-label">
    Available
    <input
        type="checkbox"
        class="toggle toggle-warning"
        bind:checked={part.available}
    />
</label>
<div class="flex justify-end">
    <button class="btn btn-primary w-1/3" onclick={addPart}> Add</button>
</div>
{#if partFamily.length}
    <div class="divider"></div>
{/if}
