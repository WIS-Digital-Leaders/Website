let cursor = document.getElementById("cursor");
let slideInBlocks = document.querySelectorAll(".block");
const timeoutLen = 200;

function displayBlocks(option) {
    if (option == "show"){
        slideInBlocks.forEach((e,index) => {
            e.classList.remove("hide")
        })
    }
    else{
        slideInBlocks.forEach((e,index) => {
            e.classList.add("hide")
        })
    }
}
//Runs on page load
displayBlocks("show");
slideInBlocks.forEach((e, index) => {
    setTimeout(() => {
        e.classList.add("slide-down");
        setTimeout(() => {
            e.classList.add("hide")
            e.classList.remove("slide-down");
        },timeoutLen)
    },timeoutLen*(index+1)); //indexed dependant delay
});


function navigate(page) {
    slideInBlocks.forEach((e, index) => {
        setTimeout(() => {
            e.classList.add("slide-up");
            e.classList.remove("hide");
        }, timeoutLen*(index+1));
    });
    setTimeout(() => {
        if (page == "The Team.html"){ //TEMPORARY REDIRECT FOR DEVELOPMENT
            window.location.href = "Renovation.html"
        }
        if (page =="Events.html"){
            window.location.href = "Renovation.html"
        }
        else{window.location.href = page;}
    }, 1200);
}

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