<script lang="ts">
    import { transition } from "./Transition.svelte";
    import { imageSrc } from "./ImageStore.svelte";

    let { imgSrc }: { imgSrc: string } = $props();

    function updateImageSrc() {
        imageSrc.src = imgSrc;
        const modal = document.getElementById("img_modal") as HTMLDialogElement;
        if (modal) {
            modal.showModal();
        }
    }
</script>

<div class="flex justify-center">
    <div class="card card-dash bg-base-300 w-96 shadow-sm">
        <div class="card-body">
            <button
                class="btn btn-ghost h-fit relative rounded-none"
                onclick={updateImageSrc}
            >
                <figure>
                    <img src={imgSrc} alt={"Extended Image"} />
                </figure>
            </button>
        </div>
    </div>
</div>
