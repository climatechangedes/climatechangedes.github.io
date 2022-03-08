/* Initialize Back4App */
Parse.initialize("gVSoN5sdIsmv2LrvqJ1kTq1vKgzyp8zXMM5ExhlI","twMcwtMlTYJvUzpnNafjrAFLB16Xo5tKB0eOmAQU");
Parse.serverURL = 'https://parseapi.back4app.com/';

/* Page Swapping */
const start = document.querySelector('#start-btn');
const responses = document.querySelector('#responses');
const pageOne = document.querySelector('#pageOne');
const pageTwo = document.querySelector('#pageTwo');
const back2 = document.querySelector('#back2');
const next2 = document.querySelector('#next2');
const pageThree = document.querySelector('#pageThree');
const back3 = document.querySelector('#back3');
const next3 = document.querySelector('#next3');
const pageFour = document.querySelector('#pageFour');
const back4 = document.querySelector('#back4');
const next4 = document.querySelector('#next4');
const pageFive = document.querySelector('#pageFive');
const back5 = document.querySelector('#back5');
const next5 = document.querySelector('#next5');
const pageSix = document.querySelector('#pageSix');
const takeAction = document.querySelector('#takeAction');
const pageSeven = document.querySelector('#pageSeven');
const restart = document.querySelector('#restart');
const upload = document.querySelector('#upload');
const preview = document.querySelector("#preview");
const preview2 = document.querySelector('#preview2');
const small = document.querySelector('#small');
const medium = document.querySelector('#medium');
const large = document.querySelector('#large');
const red = document.querySelector('#red');
const orange = document.querySelector('#orange');
const yellow = document.querySelector('#yellow');
const green = document.querySelector('#green');
const blue = document.querySelector('#blue');
const purple = document.querySelector('#purple');
const black = document.querySelector('#black');
const white = document.querySelector('#white');

start.addEventListener('click', function(){            
    pageOne.className = 'hidden';
    pageTwo.className = 'show';
})
responses.addEventListener('click', function(){
    pageOne.className = 'hidden';
    pageSix.className = 'show';
})
back2.addEventListener('click', function(){
    pageOne.className = 'show';
    pageTwo.className = 'hidden';
})
next2.addEventListener('click', function(){
    pageTwo.className = 'hidden';
    pageThree.className = 'show';
})
back3.addEventListener('click', function(){
    pageTwo.className = 'show';
    pageThree.className = 'hidden';
})
next3.addEventListener('click', function(){
    /* Save the canvas to jpg*/
    saveCanvas(myCanvas, 'fifty-years-later', 'jpg');
    pageThree.className = 'hidden';
    pageFour.className = 'show';
})
back4.addEventListener('click', function(){
    pageThree.className = 'show';
    pageFour.className = 'hidden';
})
next4.addEventListener('click', function(){
    pageFour.className = 'hidden';
    pageFive.className = 'show';
})
back5.addEventListener('click', function(){
    pageFour.className = 'show';
    pageFive.className = 'hidden';
})
next5.addEventListener('click', showUserWord);
takeAction.addEventListener('click', function(){
    pageSix.className = 'hidden';
    pageSeven.className = 'show';
})
restart.addEventListener('click', function(){
    pageSeven.className = 'hidden';
    pageOne.className = 'show';
})

/* Other global variables */
var c = '#1D1D1D';
let myCanvas;
let img;
var userImage;
let brush = 5;

/* Setup */
function preload(){
    img = loadImage('images/field.jpg');
}
function setup() {
    myCanvas = createCanvas(920, 517);
    myCanvas.parent("canvas");
    background(0);
    image(img, 0, 0, 920, 517);
}

/* Draw */
function draw() {   
    if (mouseIsPressed) {
        stroke(c);
        strokeWeight(brush);
        line(mouseX, mouseY, pmouseX, pmouseY);
    }
    noStroke();
}

/* Select colors */
red.addEventListener('click', function(){
    c = "red";
    small.style.backgroundColor = c;
    medium.style.backgroundColor = c;
    large.style.backgroundColor = c;
})
orange.addEventListener('click', function(){
    c = "orange";
    small.style.backgroundColor = c;
    medium.style.backgroundColor = c;
    large.style.backgroundColor = c;
})
yellow.addEventListener('click', function(){
    c = "yellow";
    small.style.backgroundColor = c;
    medium.style.backgroundColor = c;
    large.style.backgroundColor = c;
})
green.addEventListener('click', function(){
    c = "green";
    small.style.backgroundColor = c;
    medium.style.backgroundColor = c;
    large.style.backgroundColor = c;
})
blue.addEventListener('click', function(){
    c = "blue";
    small.style.backgroundColor = c;
    medium.style.backgroundColor = c;
    large.style.backgroundColor = c;
})
purple.addEventListener('click', function(){
    c = "purple";
    small.style.backgroundColor = c;
    medium.style.backgroundColor = c;
    large.style.backgroundColor = c;
})
black.addEventListener('click', function(){
    c = "black";
    small.style.backgroundColor = c;
    medium.style.backgroundColor = c;
    large.style.backgroundColor = c;
})
white.addEventListener('click', function(){
    c = "white";
    small.style.backgroundColor = c;
    medium.style.backgroundColor = c;
    large.style.backgroundColor = c;
})

/* Select brush thickness */
small.addEventListener('click', function(){
    brush = 2;
})
medium.addEventListener('click', function(){
    brush = 5;
})
large.addEventListener('click', function(){
    brush = 8;
})

/* Clear the canvas to original state */
const clear = document.querySelector("#clear");
clear.addEventListener('click', function(){
    myCanvas.clear();
    background(0);
    image(img, 0, 0, 920, 517);
})

/* Upload Photo by Alvin Agana */
function readURL(i) {
    var reader = new FileReader();
    if (i.files && i.files[0]) {
        let res = reader.readAsDataURL(input.files[0]);
        reader.addEventListener("load", function() {
            preview.src = reader.result;
            userImage = reader.result;
        }, false)
    }
}
function showUpload(){
    // upload.style.display = 'none'; Idk if we need this, it was hiding the input line?
    preview.style.display = 'flex';
}
let input = document.querySelector("input");
input.addEventListener("change", function() {
    readURL(this);
    showUpload();
})

// Upload photo to Back4App Darren
document.querySelector('#next4').addEventListener('click', function(event){
    event.preventDefault();

    const fileUploadControl = document.querySelector('#fileupload');
    // this is a good place to collect data from the other fields
    if (fileUploadControl.files.length > 0) {
        const file = fileUploadControl.files[0];
        const name = fileUploadControl.files[0].name;
        const type = fileUploadControl.files[0].type;
        const size = fileUploadControl.files[0].size;
        if(size < 1000000 && type == 'image/jpeg' || type == 'image/png' || type == 'image/webp'){
            uploadPhoto(name, file);
        } else {
            alert('the file is too big or is not a .jpg or .png file');
        }
    }
});

let newPhoto;
async function uploadPhoto(name, file){
    newPhoto = new Parse.Object('Responses');
    newPhoto.set('filename', name);
    newPhoto.set('file', new Parse.File(name, file));
    //This is a good place to save data from the other fields to the database
    // newPhoto.set('title', document.getElementById('title').value);
    // newPhoto.set('description', document.getElementById('description').value);

    try {
        const result = await newPhoto.save();
        console.log(result.id);
        getNewPhoto(result.id);
    } catch (error) {
        console.error('Error while uploading the photo: ', error);
    }
};

// Get photo and put on page Darren
async function getNewPhoto(photoId){
    const records = Parse.Object.extend('Responses');
    const query = new Parse.Query(records);
    query.equalTo("objectId", photoId);
    try{
    const results = await query.find();
    const photoURL = results[0].get('file').url();
    // This is a good place to get data from the database fields
    // const photoTitle = results[0].get('title');
    // const photoDescription = results[0].get('description');
    showUploadedPhoto(photoURL);
    // This is a good place to run a function that clears out the form, which you will write below.
    // clearForm();
    } catch (error) {
        console.error('Error while getting photo', error);
    } 
};

function showUploadedPhoto(photoURL){
    document.getElementById('preview2').src = `${photoURL}`;
};

// This is a good place to write a function that clears out the form.
// function clearForm() {
//   document.getElementById('upload').reset();
// };

// showUserWord
async function showUserWord(){
    let userWord = document.querySelector('#description').value;
    pageFive.className = 'hidden';
    pageSix.className = 'show';
    document.querySelector('#heading6').innerHTML = `Do we want a ${userWord} future?`;
    addWord();
};


// Upload description to Back4App
// document.querySelector('#next5').addEventListener('click', function(event){
//     event.preventDefault();
// });

async function addWord(){
    let userWord = document.querySelector('#description').value;
    newPhoto.set('description', userWord);
    console.log(document.querySelector('#description').value);
    try {
        const result = await newPhoto.save();
        // console.log(result.description);
    } catch (error) {
        console.error('Error while uploading the photo: ', error);
    }
};

// const input = document.getElementById('description');
// document.querySelector('#next5').addEventListener('click', function(event){
//     event.preventDefault();
//     addWord();
// });

// async function addWord(){
//     const newWord = {};

//     const key = input.getAttribute('name');
//     const value = input.value;
//     newWord[key] = value;

//     if(newWord.description != ""){
//         newPhoto.set
//         newWordData.set('description', newWord.description);
//         try {
//             const result = await newWordData.save();
//             displayWord();
//         } catch (error) {
//             console.error('Error while uploading word: ', error);
//         }
//     } else {
//         alert('Please add a description for your image');
//     }
// }

// async function displayWord(){
//     const records = Parse.Object.extend('Responses');
//     const query = new Parse.Query(records);
//     try{
        
//     }
// };

// Get all photos for gallery Darren
document.querySelector('#next5').addEventListener('click', getPhotos()); // not sure if this part works

async function getPhotos(){
    const records = Parse.Object.extend('Responses');
    const query = new Parse.Query(records);
    try{
        const results = await query.find();
        // results.forEach(function(photo){
        //     console.log(photo);
        //     const photoURL = results[photo].get('file').url();
        //     showPhotosOnGallery(photoURL);
        // });
        for(i=0; i<results.length; i++){
            document.querySelector('.section').innerHTML += '<div class="slide"><img class="slideImage" src="" alt="drawing on landscape photo"></div>';
            let slideImages = document.querySelectorAll('.slideImage');
            const photoURL = results[i].get('file').url();
            slideImages[i].src = `${photoURL}`;
            console.log(results[i].id);
            // slideImages[i].className = 'show';
        };
        // This is a good place to run a function that clears out the form, which you will write below.
        // clearForm();
    } catch (error) {
        console.error('Error while getting photo', error);
    } 
};



/* fullPage */
// var myFullpage = new fullpage('#fullpage', {
//     autoScrolling: false,
//     fitToSection: false
// });