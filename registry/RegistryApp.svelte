<script lang="ts">
    import * as parser from "../shared/parser.svelte";
    import CreateItem from "./CreateItem.svelte";
    import Navbar from "./Navbar.svelte";
    import { Data, store, Actions } from "./Store.svelte";
    import SummarizedItem from "./SummarizedItem.svelte";

    //let system = new parser.System();

    function parsePreviousFile() {}

    function addItem() {
        //Data.sys.addSystemInfo();
    }
</script>

<Navbar></Navbar>
<div class="flex flex-row gap-4 justify-center items-center py-4">
    <SummarizedItem />
    <CreateItem />
</div>
