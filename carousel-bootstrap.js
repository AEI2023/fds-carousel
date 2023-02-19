class FdsCarousel extends HTMLElement {

    constructor() {
        super();
        this.name = 'World';
        this.speed = '1000';
        this.heightimg = '100%';
    }

    // component attributes
    static get observedAttributes() {
        return ['name','speed','heightimg'];
    }

    // attribute change
    attributeChangedCallback(property, oldValue, newValue) {

        if (oldValue === newValue) return;
        this[ property ] = newValue;
        
    }

    // connect component
    connectedCallback() {
        
        const shadow = this.attachShadow({ mode: 'closed' });

        //List of all of the screens in carousel
        //let screenStore = shadow.querySelectorAll("#carousel-1 .carousel-screen");
        let screens = document.querySelectorAll('.sections .carousel-screen');        
        let images ='';
        for (let i = 0; i < screens.length; i++) {
            const element = screens[i];
            images += `<section class="carousel-screen">${element.innerHTML}</section>`;
            
        }

        shadow.innerHTML = `
        <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: "Open Sans", sans-serif;
        }
        
        body {
            background-color: #f2f2f2;
        }
        
        .document-center {
            position: absolute;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .carousel-container {
            max-width: 100%;/*980px*/
            width: 100%; /*95%*/
        }
        .carousel {
            position: relative;
            width: 100%;
            /*Width of image is 980px. Height is 570px.*/
            padding-top: calc(570 / 980 * 100%);
            overflow: hidden;
            height: ${this.heightimg ? this.heightimg : '100vh'};
        }        
        .carousel-container img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: ${this.heightimg ? this.heightimg : '100%'};
            object-fit: fill;
        }        
        .left-arrow {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            top: 0;
            left: 0;
            height: ${this.heightimg ? this.heightimg : '100%'};
            width: 147px;
            cursor: pointer;
        }
        
        .left-arrow:hover {
            background: linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3));
        }
        
        .left-arrow:hover .chevron,
        .right-arrow:hover .chevron {
            border-color: #e6e6e6;
        }
        
        .right-arrow {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            top: 0;
            right: 0;
            height: ${this.heightimg ? this.heightimg : '100%'};
            width: 147px;
            cursor: pointer;
        }
        
        .right-arrow:hover {
            background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3));
        }
        
        .chevron {
            width: 25px;
            height: 25px;
            border: solid rgba(255, 255, 255, 0.5);
            border-width: 10px 10px 0 0;
        }
        
        .chevron.right {
            transform: rotate(45deg);
        }
        
        .chevron.left {
            transform: rotate(-135deg);
        }
        
        .circle-container {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: start;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 45px;
        }
        
        .circle {
            border: 1px solid white;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            margin: 0 5px;
            cursor: pointer;
        }
        
        .circle-fill {
            background-color: white;
        }
        
        .text-container {
            position: absolute;
            display: flex;
            flex-direction: column;
            justify-content: start;
            align-items: center;
            bottom: 45px;
            left: 0;
            width: 100%;
            color: white;
            text-shadow: 1px 1px black;
            text-align: center;
        }
        
        .text-container p:nth-child(1) {
            margin: 10px 100px;
            font-size: 1.5em;
        }
        
        .text-container p:nth-child(2) {
            margin: 10px 100px 20px 100px;
        }
        
        .carousel-screen {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: ${this.heightimg ? this.heightimg : '100%'};
        }
        
        /* Animations */
        @keyframes toRight {
            0% {
            left: 0;
            }
            100% {
            left: 100%;
            }
        }
        
        @keyframes toLeft {
            0% {
            left: 0;
            }
            100% {
            left: -100%;
            }
        }
        
        @keyframes comeRight {
            0% {
            left: 100%;
            }
            100% {
            left: 0;
            }
        }
        
        @keyframes comeLeft {
            0% {
            left: -100%;
            }
            100% {
            left: 0;
            }
        }
      
        </style>
        <div class="carousel-container">
        <div class="carousel" id="carousel-1" auto-scroll="${this.speed ? this.speed : '2000'}">
          ${images}
          <section class="circle-container"><div class="circle"></div><div class="circle"></div><div class="circle"></div></section>
          <div class="left-arrow"><span class="chevron left"></span></div>
          <div class="right-arrow"><span class="chevron right"></span></div>
        </div>
      </div>`;
        
        //Right Arrow & Left Arrow        
        let rightArrow = shadow.querySelector("#carousel-1 .right-arrow");
        let leftArrow = shadow.querySelector("#carousel-1 .left-arrow");
        
        let screenStore = shadow.querySelectorAll('#carousel-1 .carousel-screen');
        let numOfScreens = screenStore.length;
        
        //List of all the circle stores
        let circleStore = shadow.querySelectorAll("#carousel-1 .circle-container .circle");
        //number to target main screen
        let currentScreen = 0;
        //currently in animation or not
        let inAnim = false;
        //Animation Time
        let animTime = 500;
        //Sort out starting position
        sortPositioning(screenStore[currentScreen], screenStore[currentScreen - 1], screenStore[currentScreen + 1]);
        //Sort out circle styling
        highlightCircle(circleStore[0]);
        //User clicks on rightArrow
        rightArrow.addEventListener("click", () => {
            startAnim("right");
        });
        //User clicks on the leftArrow
        leftArrow.addEventListener("click", () => {
            startAnim("left");
        });
        //Start animation. Either towards left or right
        function startAnim(direction) {
            if(!inAnim) {
                inAnim = true;
                if(direction === "right") {
                    moveRight();
                    highlightCircle(circleStore[currentScreen + 1], "right");
                }else if(direction === "left"){
                    moveLeft();
                    highlightCircle(circleStore[currentScreen - 1], "left");
                }else{
                    isAnim = false;
                    return
                }
            }
        }
        //Move to the right
        function moveRight() {
            //Move towards Next screen as usual
            if(currentScreen < numOfScreens - 1){
            toLeft(screenStore[currentScreen]);
            comeRight(screenStore[currentScreen + 1]);
            setTimeout(() => {
                inAnim = false;
                currentScreen++;
                sortPositioning(screenStore[currentScreen], screenStore[currentScreen - 1], screenStore[currentScreen + 1]);
            }, animTime)
            }else{
                //Or the screen coming in is the first screen again
                toLeft(screenStore[currentScreen]);
                comeRight(screenStore[0]);
                setTimeout(() => {
                    inAnim = false;
                    currentScreen = 0;
                    sortPositioning(screenStore[currentScreen], screenStore[currentScreen - 1], screenStore[currentScreen + 1]);
                }, animTime)
            }
        }
        //Move to the left
        function moveLeft() {
            //Move back to screen previously on, as usual
            if(currentScreen > 0){
                toRight(screenStore[currentScreen]);
                comeLeft(screenStore[currentScreen - 1]);
                setTimeout(() => {
                inAnim = false;
                currentScreen--;
                sortPositioning(screenStore[currentScreen], screenStore[currentScreen - 1], screenStore[currentScreen + 1]);
                }, animTime)
            }else{
                //Move back to the last screen container
                toRight(screenStore[currentScreen]);
                comeLeft(screenStore[numOfScreens - 1]);
                setTimeout(() => {
                    inAnim = false;
                    currentScreen = numOfScreens - 1;
                    sortPositioning(screenStore[currentScreen], screenStore[currentScreen - 1], screenStore[currentScreen + 1]);
                    }, animTime)
            }
        }
        //User clicks on one of the circles
        circleStore.forEach(circle => {
            circle.addEventListener("click", event => {
                if(!inAnim){
                //Convert NodeList to Array, to use 'indexOf' method.
                let circleStoreArray = Array.prototype.slice.call(circleStore);
                let circleIndex = circleStoreArray.indexOf(event.target);
                //Configure circle styling
                highlightCircle(event.target);
                //Work out whether we need to move right or left, or nowhere.
                if(circleIndex > currentScreen){
                    changeScreenCircleClick(circleIndex, "right");
                }else if (circleIndex < currentScreen){
                    changeScreenCircleClick(circleIndex, "left");
                }
            }
        })
        })

        function changeScreenCircleClick(circleIndex, direction) {
            inAnim = true;
            if(direction === "right"){
                sortPositioning(screenStore[currentScreen], screenStore[currentScreen - 1], screenStore[circleIndex]);
                toLeft(screenStore[currentScreen]);
                comeRight(screenStore[circleIndex]);
            }else if (direction === "left"){
                sortPositioning(screenStore[currentScreen], screenStore[circleIndex], screenStore[currentScreen + 1]);
                toRight(screenStore[currentScreen]);
                comeLeft(screenStore[circleIndex]);
            }else{
                inAnim = false;
                return
            }
            setTimeout(() => {
            inAnim = false;
            currentScreen = circleIndex;
            sortPositioning(screenStore[currentScreen], screenStore[currentScreen - 1], screenStore[currentScreen + 1]);
            }, animTime)
        }

        function highlightCircle(circleSelect, direction) {
            if(circleSelect === undefined && direction === "right"){
                circleSelect = circleStore[0];
            }else if (circleSelect === undefined && direction === "left"){
                circleSelect = circleStore[numOfScreens - 1];
            }
            circleStore.forEach(circle => {
                if(circle === circleSelect){
                    circle.classList.add("circle-fill");
                }else{
                    circle.classList.remove("circle-fill");
                }
            })
        }


        //Animation methods
        function toLeft(screen) {
            screen.style.animation = "toLeft 0.5s ease-in-out forwards";
            setTimeout(() => {
                screen.style.animation = "";
            }, animTime);
        }

        function toRight(screen) {
            screen.style.animation = "toRight 0.5s ease-in-out forwards";
            setTimeout(() => {
                screen.style.animation = "";
            }, animTime);
        }

        function comeRight(screen) {
            screen.style.animation = "comeRight 0.5s ease-in-out forwards";
            setTimeout(() => {
                screen.style.animation = "";
            }, animTime);
        }

        function comeLeft(screen) {
            screen.style.animation = "comeLeft 0.5s ease-in-out forwards";
            setTimeout(() => {
                screen.style.animation = "";
            }, animTime);
        }



        //Sort positioning. Don't want images to overlap
        function sortPositioning(mainScreen, leftScreen, rightScreen) {
            //If right screen is undefined. We need to repeat first screen again
            if(rightScreen === undefined){
                rightScreen = screenStore[0];
            }
            //If left screen is undefined. We use the last screen
            if(leftScreen === undefined){
                leftScreen = screenStore[numOfScreens - 1];
            }
            screenStore.forEach(screen => {
                if(screen === mainScreen){
                    screen.style.display = "block";
                    screen.style.left = "0px";
                }else if (screen === leftScreen){
                    screen.style.display = "block";
                    screen.style.left = "-100%";
                }else if (screen === rightScreen){
                    screen.style.display = "block";
                    screen.style.left = "100%";
                }else{
                    screen.style.display = "none";
                }
            })
        }

        //Auto Scroll feature
        let carousel = shadow.getElementById("carousel-1");
        let scrollTime = Number(carousel.getAttribute("auto-scroll"));
        //Only implement the feature if the user has included the attribute 'auto-scroll'.
        if(scrollTime) {
            //Auto Scroll will be set up the very first time
            let autoWipe = setInterval(() => {
                startAnim("right");
            }, scrollTime);
            //Clear the timer when they hover on carousel
            carousel.addEventListener("mouseenter", () => {
                clearInterval(autoWipe);
            });
            //Re-initialise the timer when they hover out of the carousel
            carousel.addEventListener("mouseleave", () => {
                autoWipe = setInterval(() => {
                    startAnim("right");
                }, scrollTime);
            })

        }
        
    }
    
  }
  
  // Registrar el componente con el nombre "my-component"
  customElements.define('fds-carousel', FdsCarousel);  
  