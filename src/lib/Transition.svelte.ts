export let transition = $state({
    showDetailed: false,
    itemId: "",
});

export let imageSrc = $state({
    src: "https://picsum.photos/512/512"
})

export function toggleDetailed() {
    transition.showDetailed = !transition.showDetailed;
}