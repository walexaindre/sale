export let transition = $state({
    showDetailed: false,
    itemId: "",
});

export function toggleDetailed() {
    transition.showDetailed = !transition.showDetailed;
}