function navigate(page) {
    const content = document.querySelector(".content");
    content.classList.add("slide-up");
    setTimeout(() => {
        window.location.href = page;
    }, 1500);
}
