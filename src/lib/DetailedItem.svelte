<script lang="ts">
    let {
        name,
        description = "quo erat demostratum",
        img,
        imgdesc,
        price,
        quantity = 0,
        tags = ["alpha", "beta prunning", "eta gama eta"],
        category = "a",
        condition = "new",
    } = $props();
</script>

<h2 class="text-2xl font-bold text-center">Item: {name}</h2>
<div class="flex justify-center">
    <div class="carousel rounded-box w-[600px]">
        <div id="item1" class="carousel-item w-[600px]">
            <img src={img} alt={imgdesc} />
        </div>
        <div id="item2" class="carousel-item w-[600px]">
            <img src={img} alt={imgdesc} />
        </div>
        <div id="item3" class="carousel-item w-[600px]">
            <img src={img} alt={imgdesc} />
        </div>
        <div id="item4" class="carousel-item w-[600px]">
            <img src={img} alt={imgdesc} />
        </div>
    </div>
</div>

<div class="flex w-full justify-center gap-2 py-2">
    <a href="#item1" class="btn btn-xs">1</a>
    <a href="#item2" class="btn btn-xs">2</a>
    <a href="#item3" class="btn btn-xs">3</a>
    <a href="#item4" class="btn btn-xs">4</a>
</div>
