/* Global variables */
var c = "white";
let myCanvas;
let img;

/* Setup */
function preload(){
    img = loadImage('moon1.jpg');
}
function setup() {
    myCanvas = createCanvas(600, 400);
    myCanvas.parent("draw");
    background(0);
    image(img, 0, 0, 600, 400);
}
/* Draw */
function draw() {   
    if (mouseIsPressed) {
	    stroke(c);
    line(mouseX, mouseY, pmouseX, pmouseY);
    }
    noStroke();
}

/* Clear the canvas to original state */
const clear = document.querySelector("#clear");
clear.addEventListener('click', function(){
    myCanvas.clear();
    background(0);
    image(img, 0, 0, 600, 400);
})

/* Save the canvas to jpg*/
const download = document.querySelector("#download");
download.addEventListener('click',function(){
    console.log('click');
    saveCanvas(myCanvas, 'myCanvas', 'jpg');
})

/* Upload Photo */
function readURL(i) {
    var reader = new FileReader();
    if (i.files && i.files[0]) {
        let res = reader.readAsDataURL(input.files[0]);
        let j = document.querySelector("#preview");
        reader.addEventListener("load", function() {
            j.src = reader.result;
        }, false)
    }
}
let input = document.querySelector("input");
input.addEventListener("change", function() {
    readURL(this);
})

// Upload to Back4App
