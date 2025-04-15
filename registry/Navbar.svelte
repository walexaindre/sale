<script lang="ts">
    import { store, Data } from "./Store.svelte";

    function loadPreviousRecords() {
        store.previousLoaded = true;
    }
</script>

<nav class="navbar">
    {#if !store.previousLoaded}
        <button class="btn btn-primary" onclick={loadPreviousRecords}
            >Load Previous<br />Records</button
        >
    {/if}
</nav>
