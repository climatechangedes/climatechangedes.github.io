// TODO: add color options
// TODO: one single secction for gallery view
// (function (){
    // window.addEventListener('load',function(){
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
        const restart = document.querySelector('#restart');
        const upload = document.querySelector('#upload');
        const preview = document.querySelector("#preview");
        const preview2 = document.querySelector('#preview2');

        alert('User Testing Tasks\n\n1. Draw over the image, and clear your drawing at least once\n2. Download and upload your drawing\n3. Get to the gallery view where you can see other submissions');

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
            myCanvas.parent("canvas");
            background(0);
            image(img, 0, 0, 871, 490);
        }

        /* Draw */
        function draw() {   
            if (mouseIsPressed) {
                stroke(c);
                strokeWeight(5);
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
        
        async function uploadPhoto(name, file){
            const newPhoto = new Parse.Object('Responses');
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
            const photoName = results[0].get('filename');
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