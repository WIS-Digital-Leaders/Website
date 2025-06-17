let cursor = document.getElementById("cursor");
let slideInBlocks = document.querySelectorAll(".block");
let slideInBlockContainer = document.querySelector(".scrollInBlocks");
const timeoutLen = 200;

function displayBlocks(option) {
    if (option == "show"){
        slideInBlocks.forEach((e,index) => {
            e.classList.remove("hide")
        });
    }
    else{
        slideInBlocks.forEach((e,index) => {
            e.classList.add("hide")
        });
    }
}

function displayBlocksContainer(option) {
    if (option == "show"){
        slideInBlockContainer.classList.remove("hide");
    }
    else{
        slideInBlockContainer.classList.add("hide");
    }
}

//Runs on page load
displayBlocksContainer("show");
displayBlocks("show");
slideInBlocks.forEach((e, index) => {
    setTimeout(() => {
        e.classList.add("slide-down");
        setTimeout(() => {
            e.classList.add("hide")
            e.classList.remove("slide-down");
            if(index == 4){
                displayBlocksContainer("hide");
            }
        },timeoutLen)
    },timeoutLen*(index+1)); //indexed dependant delay
});



function navigate(page) {
    displayBlocksContainer("show");
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
document.querySelectorAll('.expander').forEach(expander => {
    expander.addEventListener('click', function(e) {
        e.stopPropagation();
        const node = expander.parentElement;
        const infoBox = node.querySelector('.more-info');
        if (infoBox) {
            if (!infoBox.classList.contains('show')) {
                infoBox.style.display = 'block';
                setTimeout(() => infoBox.classList.add('show'), 10);
            } else {
                infoBox.classList.remove('show');
                infoBox.addEventListener('transitionend', function handler() {
                    infoBox.style.display = 'none';
                    infoBox.removeEventListener('transitionend', handler);
                });
            }
        }
        // Optionally, toggle arrow direction here
        const arrow = expander.querySelector('.arrow');
        if (arrow) {
            arrow.classList.toggle('open');
        }
    });
});