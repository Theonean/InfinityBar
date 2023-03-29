//var has global scope
var fruitsNow = 0;
var fruitMAX = 160;

function addfruits(fruitNo) {
    const fruitFall = document.getElementById("fruitfall");

    //spawns as many fruits as input by first function call or until max fruits
    if (fruitsNow < fruitMAX) {
        const newDiv = document.createElement("div");
        newDiv.classList.add("fruit", getRandomFruit())
        newDiv.style.left += Math.random() * 100 + '%';
        newDiv.style.top += -10 + '%';
        newDiv.addEventListener("click", function () { clickedfruit(newDiv) })
        //console.log("added fruit No" + fruitsNow);
        fruitFall.appendChild(newDiv);
        fruitsNow += 1;
    }
}

function clickedfruit(fruitdiv) {
    fruitdiv.innerHTML = "SLICED ";
    console.log("sliced");
}

function getRandomFruit() {
    const fruits = ["strawberry", "banana", "lime"];
    const randomIndex = Math.floor(Math.random() * fruits.length);
    return fruits[randomIndex];
  }