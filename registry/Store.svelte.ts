import { System } from "../shared/parser.svelte";



export let Data = $state({ sys: new System() });


export enum Actions {
    CreateItem = 1,
}

export let store = $state({
    previousLoaded: false,
    step: 1
});