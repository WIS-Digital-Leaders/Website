function navigate(page) {
    const content = document.querySelector(".content");
    const slideInBlocks = document.querySelectorAll()
    content.classList.add("slide-up");
    setTimeout(() => {
        window.location.href = page;
    }, 1000);
}

let cursor = document.getElementById("cursor");
function isTouchDevice() {
    try {
        document.createEvent("TouchEvent");
        return true;
    } catch (e) {
        return false;
    }
}
const move = (e) => {
    try {
        var x = !isTouchDevice() ? e.pageX : e.touches[0].pageX;
        var y = !isTouchDevice() ? e.pageY : e.touches[0].pageY;
    } catch (e) {}
    cursor.style.left = x - 80 + "px";
    cursor.style.top = y - 20 + "px";
};
document.addEventListener("mousemove", (e) => {
    move(e);
});
document.addEventListener("touchmove", (e) => {
    move(e);
});
