<script lang="ts">
    import Mesh from "../assets/grid.svg?raw";
    import { transition, toggleDetailed } from "./Transition.svelte";
    let { searchText = $bindable() }: { searchText: string } = $props();
</script>

<div class="navbar text-neutral-content z-20 sticky top-0 bg-base-100">
    <div class="navbar-start">
        <button
            class="btn btn-info {transition.showDetailed ? '' : 'hidden'}"
            onclick={toggleDetailed}>Regresar</button
        >
    </div>
    <div class="navbar-center">
        <label class="input">
            <span class="label text-neutral">Search</span>
            <input
                bind:value={searchText}
                type="text"
                class="text-neutral"
                placeholder="Type something"
            />
        </label>
    </div>
    <div class="navbar-end"></div>
</div>
