wrapper = document.getElementById("map-wrapper");
locations = document.getElementById("locations");
map = wrapper.children[0]

function offset_calc(x) {
    // console.log( (x / 100) * (map.clientWidth / map.naturalWidth * 100) )
    return (x / 100) * (map.clientWidth / map.naturalWidth * 100)
}

loc_html = `<div><i class="fas fa-map-marker-alt"></i>  {name}</div>`
pin_html = `
<div class="tooltip" style="top:{top};left:{left};">
    <i class="tooltip-icon icon fas fa-map-marker-alt"></i>
    <span class="tooltip-text">{name}</span>
</div>`
det_html = `
<div id="details">
    <div id="back">← Πίσω</div>
    <h1>{name}<br>{location}<a class="icon fas fa-external-link-alt" href="{link}" target="_blank"></a></h1>
    <span>{desc}</span>

    <div id="media-container">
        <div id="slideshow-container" class="slideshow-container">
            <div class="dot-container"></div>
        </div>
        {audio}
    </div>
</div>`
det_slide_html = `
<div class="slide">
    <div class="num">{image} / {images}</div>
    <img src="static/images/{id}/{image}.jpg" style="width:100%">
    <div class="text">{desc}</div>
</div>`
det_dot_html = `<span class="dot" onclick="currentSlide(this)"></span>`

function click(config) {
    document.body.insertAdjacentHTML("beforeend", det_html
        .replace("{name}", config["name"])
        .replace("{desc}", config["description"].split("::").map((x) => {return `<p>${"&nbsp;".repeat(4)}${x}</p>`}).join(""))
        .replace("{location}", config["location"])
        .replace("{link}", config["link"])
        .replace("{audio}", config["audio"] ? `<audio src="static/audio/${config["id"]}.mp3" style="width:100%;" controls></audio>` : "")
        .replace("{id}", config["id"])
    )
    details = document.body.children["details"]
    details.children[0].onclick = () => { details.remove() }
    media_container = details.children[details.children.length - 1]
    slideshow_container = media_container.children[0]
    dot_container = slideshow_container.children[slideshow_container.children.length - 1]

    for (let i = 0; i < config["captions"].length; i++) {
        slideshow_container.insertAdjacentHTML("afterbegin", det_slide_html
            .replace("{image}", config["captions"].length - i)
            .replace("{image}", config["captions"].length - i - 1)
            .replace("{images}", config["captions"].length)
            .replace("{id}", config["id"])
            .replace("{desc}", config["captions"][config["captions"].length - i - 1])
        )
        dot_container.insertAdjacentHTML("afterbegin", det_dot_html)
    }
}

fetch("static/items.json")
.then(response => { return response.json(); })
.then(data => {
    for (i = 0; i < data.length; i++) {
        let config = data[i]
        locations.insertAdjacentHTML("beforeend", loc_html.replace("{name}", config["name"]))
        locations.children[locations.children.length - 1].onclick = () => { click(config) }
        wrapper.insertAdjacentHTML("beforeend", pin_html
            .replace("{top}", offset_calc(config["coords"][0]-160) + "px")
            .replace("{left}", offset_calc(config["coords"][1]-40) + "px")
            .replace("{name}", config["name"])
        )
        wrapper.children[wrapper.children.length - 1].onclick = () => { click(config) }
    }
});
