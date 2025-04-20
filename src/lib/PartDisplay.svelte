<script lang="ts">
    import type { Part } from "../../shared/parser.svelte";
    import { imageSrc } from "./Transition.svelte";

    let { part }: { part: Part } = $props();

    function showDetails() {
        imageSrc.src = part.imageUrl;
        const modal = document.getElementById("img_modal") as HTMLDialogElement;
        if (modal) {
            modal.showModal();
        }
    }

    let loadingThumbnail = $state(true);
    function loaded() {
        loadingThumbnail = false;
    }
</script>

<div class="flex justify-center">
    <div class="card card-dash bg-base-300 w-96 shadow-sm">
        <div class="card-body">
            <button
                class="btn btn-ghost h-fit relative rounded-none"
                onclick={showDetails}
            >
                <figure>
                    <div
                        class="skeleton w-[300px] h-[300px] {loadingThumbnail
                            ? ''
                            : 'hidden'}"
                    ></div>
                    <img
                        src={part.imageUrl}
                        alt={part.description}
                        onload={loaded}
                    />
                    {#if !part.available}
                        <div
                            class=" absolute text-5xl text-error bg-error-content w-full py-2 -rotate-45 text-center"
                        >
                            Not Available!
                        </div>
                    {/if}
                </figure>
            </button>
            <p>
                {part.description}
            </p>
        </div>
    </div>
</div>
