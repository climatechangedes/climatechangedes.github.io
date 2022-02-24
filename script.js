// TODO: add color options
// TODO: one single secction for gallery view
// (function (){
    // window.addEventListener('load',function(){
        /* Initialize Back4App */
        Parse.initialize("ZkNDxNYhyGGfWavSo8Vj3HqwtGI7whDAuWqJ3ndu","A1UxuUSyOeNjiNMQB13YtkUQbcd9PXaM9Bo9PROI");
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
        const restart = document.querySelector('#restart');

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
        next5.addEventListener('click', function(){
            pageFive.className = 'hidden';
            pageSix.className = 'show';
        })
        restart.addEventListener('click', function(){
            pageSix.className = 'hidden';
            pageOne.className = 'show';
        })

        /* Other global variables */
        var c = '#1D1D1D';
        let myCanvas;
        let img;
        var userImage;

        /* Setup */
        function preload(){
            img = loadImage('images/field.jpg');
        }
        function setup() {
            myCanvas = createCanvas(871, 490);
            myCanvas.parent("draw");
            background(0);
            image(img, 0, 0, 871, 490);
        }

        /* Draw */
        function draw() {   
            if (mouseIsPressed) {
                stroke(c);
                strokeWeight(10);
                line(mouseX, mouseY, pmouseX, pmouseY);
            }
            noStroke();
        }

        /* Clear the canvas to original state */
        const clear = document.querySelector("#clear");
        clear.addEventListener('click', function(){
            myCanvas.clear();
            background(0);
            image(img, 0, 0, 871, 490);
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

        /* fullPage */
        // var myFullpage = new fullpage('#fullpage', {
        //     autoScrolling: false,
        //     fitToSection: false
        // });

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
    // })
// })();