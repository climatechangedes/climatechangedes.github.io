/* Initialize Back4App */
Parse.initialize("ZkNDxNYhyGGfWavSo8Vj3HqwtGI7whDAuWqJ3ndu","A1UxuUSyOeNjiNMQB13YtkUQbcd9PXaM9Bo9PROI");
Parse.serverURL = 'https://parseapi.back4app.com/';

/* Page Swapping */
const start = document.querySelector('#start-btn');
const pageOne = document.querySelector('#pageOne');
const pageTwo = document.querySelector('#pageTwo');
start.addEventListener('click', function(){
    pageOne.className = 'hidden';
    pageTwo.className = 'show';
})


/* Global variables */
var c = "white";
let myCanvas;
let img;
var userImage;

/* Setup */
function preload(){
    img = loadImage('/images/field.png');
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

/* Upload Photo by Alvin Agana */
function readURL(i) {
    var reader = new FileReader();
    if (i.files && i.files[0]) {
        let res = reader.readAsDataURL(input.files[0]);
        let preview = document.querySelector("#preview");
        reader.addEventListener("load", function() {
            preview.src = reader.result;
            userImage = reader.result;
        }, false)
    }
}
let input = document.querySelector("input");
input.addEventListener("change", function() {
    readURL(this);
})

/* Upload to Back4App */
// async function run(){
//     const result = await userImage;
//     console.log(result);
// }

// async function run(){
//     let myFile = fs.readFileSync('moon1.jpg').toString('base64');
//     // let myFile = userImage.toString('base64');
//     console.log(myFile);
//     let myPhoto = new Parse.File('myfile.jpg', {base64: myFile});
//     let Photo = Parse.Object.extend('Photo');
//     let photo = new Photo();
//     photo.set('photo', myPhoto);
//     photo.set('name', 'Jackie');
// }

// run();
