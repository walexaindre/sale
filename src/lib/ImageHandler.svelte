<script lang="ts">
    let { imgSrc = $bindable("https://picsum.photos/512/512") } = $props();
    //TODO: add image functionality.
</script>

<dialog id="img_modal" class="modal">
    <div class="modal-box w-10/12 max-w-4xl max-h-10/12">
        <div class="flex justify-center">
            <img src={imgSrc} alt="object img" class="w-11/12" />
        </div>
    </div>
    <form method="dialog" class="modal-backdrop">
        <button>close</button>
    </form>
</dialog>
