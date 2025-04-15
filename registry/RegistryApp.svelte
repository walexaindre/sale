<script lang="ts">
    import * as parser from "../shared/parser";
    import CreateItem from "./CreateItem.svelte";
    import Navbar from "./Navbar.svelte";
    import { Data, store, Actions } from "./Store.svelte";

    let system = new parser.System();

    function parsePreviousFile() {}

    function addItem() {
        //Data.sys.addSystemInfo();
    }
</script>

<Navbar></Navbar>

<CreateItem></CreateItem>

<div></div>
