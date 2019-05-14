    // global variable puragtory
    let sugar = document.getElementById('sugar');
    let exercise = document.getElementById('exercise');
    let summary = document.getElementById('summary-container');
    let showGraph = document.getElementById('radarChart');

    // variables for the equations
    let vein, foot, numb, kidney, heart;

    let veinRiskContainer = document.getElementById('vein-disease'); 
    let footRiskContainer = document.getElementById('foot-disease');
    let numbRiskContainer = document.getElementById('nerve-disease');
    let kidneyRiskContainer = document.getElementById('kidney-disease'); 
    let heartRiskContainer = document.getElementById('heart-disease');

    let veinRisk = document.getElementById('veins-risk'); 
    let footRisk = document.getElementById('foot-risk');
    let numbRisk = document.getElementById('nerve-risk');
    let kidneyRisk = document.getElementById('kidney-risk'); 
    let heartRisk = document.getElementById('heart-risk');

    // initialize
    let dataset = [];
    let storageArray;
    let storage;
    let retrievedStorage;
    let scaler = 1000;

    /* Radar chart design created by Nadieh Bremer - VisualCinnamon.com */
    ////////////////////////////////////////////////////////////// 
    //////////////////////// Set-Up ////////////////////////////// 
    ////////////////////////////////////////////////////////////// 

    let margin = { top: 100, right: 100, bottom: 100, left: 100 },
        width = Math.min(600, window.innerWidth - 10) - margin.left - margin.right,
        height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);

    // array of sugar values
    //let a1c = [];

    let particles = [];

let rangeSlider = document.getElementById("slider-range");
let rangeBullet = document.getElementById("slider-label");
rangeSlider.disabled = true;


    function run() {
        let sugarValue = parseInt(sugar.value);
        let exerciseValue = parseInt(exercise.value);

        //values needs to be a list i think

        //checks if localStorage already exists
        storageArray = localStorage.getItem('storage') ? JSON.parse(localStorage.getItem('storage')) : [];

        storage = {
            'sugarValue': sugarValue,
            'exerciseValue': exerciseValue,
            'dateCaptured': Date.now()
        };

        storeValues();
        retrieveValues();

        vein = Math.abs(exerciseValue - pow(sugarValue, 19)) / scaler;
        foot = Math.abs(pow(sugarValue, 15) - exerciseValue) / scaler;
        numb = Math.abs((sugarValue^50) - exerciseValue) / scaler;
        kidney = Math.abs((sugarValue^25) - exerciseValue) / scaler;
        heart = Math.abs(pow(sugarValue, 75) - exerciseValue) / scaler;

        let data = [];

        data.push(
            {axis:"Vein Disease", value:vein},
            {axis:"Foot Ulcers", value:foot},
            {axis:"Numbness", value:numb},
            {axis:"Kidney Failure", value:kidney},
            {axis:"Heart Disease", value:heart},
        );

        //console.log(data);

        //make our collection of data
        dataset.push(data);

    rangeBullet.innerHTML = sugarValue;
  let bulletPosition = sugarValue;
  rangeSlider.value = sugarValue;
  rangeBullet.style.left = (bulletPosition) + "vw";
  console.log(bulletPosition);

            if (heart > 0.063 && heart < 0.201) {
                heartRisk.innerHTML = 'high';
                heartRisk.style.color = '#be2b00';
                heartRiskContainer.style.display = 'block';
                // console.log('high ');

            }

            if (heart < 0.063 && heart > 0.006){
                heartRisk.innerHTML = 'moderate';
                heartRisk.style.color = '#f6963b';
                heartRiskContainer.style.display = 'none';


            }

            if (heart < 0.006) {
                heartRisk.innerHTML = 'low';
                heartRisk.style.color = '#00bd56';
                heartRiskContainer.style.display = 'none';
            }

            //foot ranges
            if (foot >= 0.123 && foot <= 0.141) {
                footRisk.innerHTML = 'high';
                footRisk.style.color = '#be2b00';
                footRiskContainer.style.display = 'block';
                // console.log('high ');

            }

            if (foot <= 0.123 && foot >= 0.054){
                footRisk.innerHTML = 'moderate';
                footRisk.style.color = '#f6963b';
                footRiskContainer.style.display = 'none';


            }

            if (foot <= 0.054) {
                footRisk.innerHTML = 'low';
                footRisk.style.color = '#00bd56';
                footRiskContainer.style.display = 'none';
            }

            //vein ranges
            if (vein >= 0.103 && vein <=1.45) {
                veinRisk.innerHTML = 'high';
                veinRisk.style.color = '#be2b00';
                veinRiskContainer.style.display = 'block';
                // console.log('high ');

            }

            if (vein <= 0.103 && vein >= 0.082){
                veinRisk.innerHTML = 'moderate';
                veinRisk.style.color = '#f6963b';
                veinRiskContainer.style.display = 'none';


            }

            if (vein <= 0.082) {
                veinRisk.innerHTML = 'low';
                veinRisk.style.color = '#00bd56';
                veinRiskContainer.style.display = 'none';
            }

            //numb ranges
            if (numb >= 0.065 && numb <=0.176) {
                numbRisk.innerHTML = 'high';
                numbRisk.style.color = '#be2b00';
                numbRiskContainer.style.display = 'block';
                // console.log('high ');

            }

            if (numb <= 0.065 && numb >= 0.049){
                numbRisk.innerHTML = 'moderate';
                numbRisk.style.color = '#f6963b';
                numbRiskContainer.style.display = 'none';


            }

            if (numb <= 0.049) {
                numbRisk.innerHTML = 'low';
                numbRisk.style.color = '#00bd56';
                numbRiskContainer.style.display = 'none';
            }

            //kidney ranges
            if (kidney >= 0.109 && kidney <=0.155) {
                kidneyRisk.innerHTML = 'high';
                kidneyRisk.style.color = '#be2b00';
                kidneyRiskContainer.style.display = 'block';
                // console.log('high ');

            }

            if (kidney <= 0.109 && kidney >= 0.072){
                kidneyRisk.innerHTML = 'moderate';
                kidneyRisk.style.color = '#f6963b';
                kidneyRiskContainer.style.display = 'none';


            }

            if (kidney <= 0.072) {
                kidneyRisk.innerHTML = 'low';
                kidneyRisk.style.color = '#00bd56';
                kidneyRiskContainer.style.display = 'none';
            }

    }

    function setup() {
        //let bloodConversion = parseInt(sugar.value)*10;
        var cnv = createCanvas(windowWidth/3, windowHeight);
        cnv.position(0, windowHeight);
        cnv.parent('sketch');
        // hide canvas until we have data
        select('#sketch').hide();
        button();
    }

    class glucose{
      constructor(){
        this.x = random((windowWidth-1));
        this.y = random((windowHeight-1));
        this.speed = .1;
      }
      
      move() {
        this.x+=random(-this.speed, this.speed);
        this.y+= random (-this.speed, this.speed);
      }
      
      render() {
        fill('#fcebe1');
        noStroke();
        ellipse(this.x, this.y, 2);
      }

    }

    function draw() {
        background('#be2b00');
        //for each particle draw them and make them move 
        for (let i=0; i<particles.length; i++) {
            particles[i].move();
            particles[i].render();
        }  

        rectMode(CENTER);
        fill(26, 23, 60,99.9);
        noStroke();
        rectMode(CENTER);

          //x ,y ,width, height
        rect(windowWidth/6, windowHeight/4+200, windowWidth/6+50, windowHeight/2, 3);

        fill(255);
        textAlign(CENTER);

        textSize(width/6);
       text(sugar.value*10, windowWidth/6.2, windowHeight/2-100);
        textSize(16);
        text("mg/L", windowWidth/4.5, windowHeight/2-100);

        text("out of 3.81 Liters total in your body", windowWidth/6, windowHeight-400);
    }



    function button() {
        let run = select('#button');
        run.mousePressed(function() {
            //the button listener
            //no more deciliters
            let bloodConversion = parseInt(sugar.value)*10;
            //value in mg
            let bloodValue = sugar.value;

            for (let i = 0; i < bloodConversion; i++) {
                    particles.push(new glucose());
            }
        select('#sketch').show();
        })
    }

function windowResized() {
  resizeCanvas(windowWidth/3, windowHeight);
  //if resized value is ipad width//
}

    function storeValues(){
        // store to localStorage
        //on submit we'll store in this array
        storageArray.push(storage);

        localStorage.setItem('storage', JSON.stringify(storageArray)); 
        console.log('storage: ', JSON.stringify(storageArray));

    }

    function retrieveValues(){
        // retrieve from localStorage

        //checks if localStorage already exists
        localStorage.getItem('storage') ? JSON.parse(localStorage.getItem('storage')) : [];
        
        let retrievedStorage = JSON.parse(localStorage.getItem('storage'));
       // console.log('retrievedStorage: ', retrievedStorage[1].sugarValue);

       for (let i = 0; i < retrievedStorage.length; i++) {
            if (localStorage.getItem('storage')) {

            let sugarValue = retrievedStorage[i].sugarValue;
            let exerciseValue = retrievedStorage[i].exerciseValue;

          // console.log(sugarValue);

            vein = Math.abs((sugarValue^19)  - exerciseValue) / scaler;
            foot = Math.abs((sugarValue^15)  - exerciseValue) / scaler;
            numb = Math.abs((sugarValue^50)  - exerciseValue) / scaler;
            kidney = Math.abs((sugarValue^ 25) - exerciseValue) / scaler;
            heart = Math.abs((sugarValue^ 75)  - exerciseValue )/ scaler;

            //heart ranges
            if (heart >= 0.063 && heart <= 0.201) {
                heartRisk.innerHTML = 'high';
                heartRisk.style.color = '#be2b00';
                heartRiskContainer.style.display = 'block';
                // console.log('high ');

            }

            if (heart <= 0.063 && heart >= 0.006){
                heartRisk.innerHTML = 'moderate';
                heartRisk.style.color = '#f6963b';
                heartRiskContainer.style.display = 'none';


            }

            if (heart <= 0.006) {
                heartRisk.innerHTML = 'low';
                heartRisk.style.color = '#00bd56';
                heartRiskContainer.style.display = 'none';
            }

            //foot ranges
            if (foot >= 0.123 && foot <= 0.141) {
                footRisk.innerHTML = 'high';
                footRisk.style.color = '#be2b00';
                footRiskContainer.style.display = 'block';
                // console.log('high ');

            }

            if (foot <= 0.123 && foot >= 0.054){
                footRisk.innerHTML = 'moderate';
                footRisk.style.color = '#f6963b';
                footRiskContainer.style.display = 'none';


            }

            if (foot <= 0.054) {
                footRisk.innerHTML = 'low';
                footRisk.style.color = '#00bd56';
                footRiskContainer.style.display = 'none';
            }
            //vein ranges
            if (vein >= 0.103 && vein <=1.45) {
                veinRisk.innerHTML = 'high';
                veinRisk.style.color = '#be2b00';
                veinRiskContainer.style.display = 'block';
                // console.log('high ');

            }

            if (vein <= 0.103 && vein >= 0.082){
                veinRisk.innerHTML = 'moderate';
                veinRisk.style.color = '#f6963b';
                veinRiskContainer.style.display = 'none';


            }

            if (vein <= 0.082) {
                veinRisk.innerHTML = 'low';
                veinRisk.style.color = '#00bd56';
                veinRiskContainer.style.display = 'none';
            }

                        //numb ranges
            if (numb >= 0.065 && numb <=0.176) {
                numbRisk.innerHTML = 'high';
                numbRisk.style.color = '#be2b00';
                numbRiskContainer.style.display = 'block';
                // console.log('high ');

            }

            if (numb <= 0.065 && numb >= 0.049){
                numbRisk.innerHTML = 'moderate';
                numbRisk.style.color = '#f6963b';
                numbRiskContainer.style.display = 'none';


            }

            if (numb <= 0.049) {
                numbRisk.innerHTML = 'low';
                numbRisk.style.color = '#00bd56';
                numbRiskContainer.style.display = 'none';
            }

                        //kidney ranges
            if (kidney >= 0.109 && kidney <=0.155) {
                kidneyRisk.innerHTML = 'high';
                kidneyRisk.style.color = '#be2b00';
                kidneyRiskContainer.style.display = 'block';
                // console.log('high ');

            }

            if (kidney <= 0.109 && kidney >= 0.072){
                kidneyRisk.innerHTML = 'moderate';
                kidneyRisk.style.color = '#f6963b';
                kidneyRiskContainer.style.display = 'none';


            }

            if (kidney <= 0.072) {
                kidneyRisk.innerHTML = 'low';
                kidneyRisk.style.color = '#00bd56';
                kidneyRiskContainer.style.display = 'none';
            }

            let data = [];

            data.push(
                {axis:"Vein Disease", value:vein},
                {axis:"Foot Ulcers", value:foot},
                {axis:"Numbness", value:numb},
                {axis:"Kidney Failure", value:kidney},
                {axis:"Heart Disease", value:heart},
            );

            //console.log(vein);
            dataset.push(data);

            RadarChart('#radarChart', dataset, radarChartOptions);
            
            summary.style.display = 'block';
            showGraph.style.display = 'block';
            
            //scope
            let bloodConversion = sugarValue*10;
            //value in mg
            //let bloodValue = retrievedStorage[i].sugarValue;

            //should hold the last object in the array
            let lastEntry = retrievedStorage[retrievedStorage.length-1];
            //last entered sugar value
            let lastSugar = lastEntry.sugarValue*10;
            //console.log(lastSugar);
               particles = [];
            for (let i = 0; i < lastSugar; i++) {

                particles.push(new glucose());

            }

            sugar.value = lastEntry.sugarValue;


  rangeBullet.innerHTML = lastEntry.sugarValue;
  let bulletPosition = lastEntry.sugarValue;
  rangeSlider.value = lastEntry.sugarValue;
  rangeBullet.style.left = (bulletPosition) + "vw";
  console.log(bulletPosition);

            select('#sketch').show();
            } else {
                retrievedStorage = [];
                text(sugar.value, windowWidth/4, windowHeight/2-100);

                // let summary = document.getElementById('#summary-container');

            }
       }

    
        //renderChart();
        
       // console.log('retrievedStorage: ', retrievedStorage);
    }

    // ////////////////////////////////////////////////////////////// 
    // //////////////////// Draw the Chart ////////////////////////// 
    // ////////////////////////////////////////////////////////////// 

    let color = d3.scale.ordinal()
        .range(['#ff6600', '#CC333F', '#00A0B0', '#7848c0', '#7574ea', '#907985', '#74564b', '#ff6600']);

    let radarChartOptions = {
        w: width,
        h: height,
        margin: margin,
        maxValue: 1,
        levels: 10,
        roundStrokes: true,
        color: color
    };