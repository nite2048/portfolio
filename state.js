const handleOnDown = e => document.getElementById("image-track").dataset.mouse = e.clientX;

const handleOnUp = () => {
    document.getElementById("image-track").dataset.mouse = "0";
    document.getElementById("image-track").dataset.percentage = document.getElementById("image-track").dataset.percentage;
}

const handleOnMove = e => {
    if(document.getElementById("image-track").dataset.mouse === "0") return;

    const mouseDelta = parseFloat(document.getElementById("image-track").dataset.mouse) - e.clientX,
        maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(document.getElementById("image-track").dataset.percentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    document.getElementById("image-track").dataset.percentage = nextPercentage;


    document.getElementById("image-track").animate({
        transform: `translate(${nextPercentage}%, -50%)`
    }, { duration: 1200, fill: "forwards" });

    for(const image of document.getElementById("image-track").getElementsByClassName("image")) {
        image.animate({
            objectPosition: `${100 + nextPercentage}% center`
        }, { duration: 1200, fill: "forwards" });
    }
}

/* -- Had to add extra lines for touch events -- */

window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);


function toggle() {
    document.body.dataset.state = document.body.dataset.state === "true" ? "false" : "true";
}
