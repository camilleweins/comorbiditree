    // global variable puragtory
    let sugar = document.getElementById('sugar');
    let exercise = document.getElementById('exercise');
    let summary = document.getElementById('summary-container');

    // variables for the equations
    let vein, foot, numb, kidney, heart;

    // initialize
    let dataset = [];
    let storageArray;
    let storage;
    let retrievedStorage;
    let scaler = 0.01;

    /* Radar chart design created by Nadieh Bremer - VisualCinnamon.com */
    ////////////////////////////////////////////////////////////// 
    //////////////////////// Set-Up ////////////////////////////// 
    ////////////////////////////////////////////////////////////// 

    let margin = { top: 100, right: 100, bottom: 100, left: 100 },
        width = Math.min(700, window.innerWidth - 10) - margin.left - margin.right,
        height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);

    // array of sugar values
    let a1c = [];

    let particles = [];

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

vein = Math.abs((sugarValue * .19) / scaler - exerciseValue / scaler);
        foot = Math.abs((sugarValue * .15) / scaler - exerciseValue / scaler);
        numb = Math.abs((sugarValue * .5) / scaler - exerciseValue / scaler);
        kidney = Math.abs((sugarValue * .25) / scaler - exerciseValue / scaler);
        heart = Math.abs((sugarValue * .75) / scaler - exerciseValue / scaler);

        let data = [];

        data.push(
            {axis:"Vein Disease", value:vein},
            {axis:"Foot Ulcers", value:foot},
            {axis:"Numbness", value:numb},
            {axis:"Kidney Failure", value:kidney},
            {axis:"Heart Disease", value:heart},
        );

        console.log(data);

        //make our collection of data
        dataset.push(data);

        console.log(dataset);

        // draw the chart
        // RadarChart(".radarChart", dataset, radarChartOptions);

        //push sugar values into array on submission
        // a1c.push(parseInt(sugarValue));

        // // an estimation of a1c value
        // let total = 0;
        // for (let i = 0; i < a1c.length; i++) {
        //     total += a1c[i];
        // }

        // // only calculate average if there's more than one item in array
        // if (a1c.length > 1) {
        //     let average = total / a1c.length;
        //     let a1cValue = (average + 46.7) / 28.7;
        //     console.log(average);

        //     // output value to the div
        //     let a1cContainer = document.getElementById("a1c-value");
        //     a1cContainer.innerHTML = a1cValue;

        //     console.log(a1cValue);

        // }

        // let heightValue = 65 / 39.37;
        // let weightValue = 135 / 2.205;

        // //only use the female Nadler's equation
        // //convert to US
        // let bV = ((0.3561 * Math.pow(heightValue, 3)) + (0.03308 * (weightValue) + 0.1833));

        // console.log(bV);

        // let bVContainer = document.getElementById("blood-volume-value");
        // bVContainer.innerHTML = '~' + Math.round(bV) + ' L';
    }

    function setup() {
        //let bloodConversion = parseInt(sugar.value)*10;
var cnv = createCanvas(windowWidth/2, windowHeight);
  //var x = (windowWidth - width) / 2;
  //var y = (windowHeight - height) / 2;
  cnv.position(0, windowHeight);
        // createCanvas(windowWidth, windowHeight);
    cnv.parent('sketch');

        // hide canvas until we have data
        select('#sketch').hide();
        button();
    }

    function windowResized() {
        resizeCanvas(windowWidth, windowHeight);
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

      // update(){
      //   //we're gonna clear the array and then 
      // }
    }

    function draw() {
        background('#be2b00');
        //for each particle draw them and make them move 
        for (let i=0; i<particles.length; i++) {
            particles[i].move();
            particles[i].render();
        }  
    }

    function button() {
        let run = select('#button');
        run.mousePressed(function() {
            //the button listener
            let bloodConversion = parseInt(sugar.value)*10;
            let bloodValue = sugar.value;

            for (let i = 0; i < bloodConversion; i++) {
                particles.push(new glucose());
            }
       // display on button press
        select('#sketch').show();
        })
    }

    // function storeValues(sugarValue, exerciseValue){
    //     // store to localStorage
    //     localStorage.setItem('sugarValue', sugarValue, Date.now());
    //     localStorage.setItem('exerciseValue', exerciseValue, Date.now());
    // }

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

       console.log(sugarValue);

        vein = Math.abs((sugarValue * .19) / scaler - exerciseValue / scaler);
        foot = Math.abs((sugarValue * .15) / scaler - exerciseValue / scaler);
        numb = Math.abs((sugarValue * .5) / scaler - exerciseValue / scaler);
        kidney = Math.abs((sugarValue * .25) / scaler - exerciseValue / scaler);
        heart = Math.abs((sugarValue * .75) / scaler - exerciseValue / scaler);

                let data = [];

                data.push(
                    {axis:"Vein Disease", value:vein},
                    {axis:"Foot Ulcers", value:foot},
                    {axis:"Numbness", value:numb},
                    {axis:"Kidney Failure", value:kidney},
                    {axis:"Heart Disease", value:heart},
                );

                dataset.push(data);

                RadarChart(".radarChart", dataset, radarChartOptions);
                summary.style.display = "block";


            } else {
                retrievedStorage = [];
                // let summary = document.getElementById('#summary-container');

            }
       }

        

        //renderChart();
        
       // console.log('retrievedStorage: ', retrievedStorage);
    }


    // function renderChart() {
    //     //render the chart on load if we have values already stored
    //     //redo the calculations???
    //     RadarChart(".radarChart", dataset, radarChartOptions);


    // }

    // function calculate(sugarValue, exerciseValue) {
    //     vein = Math.abs((sugarValue * .19) / scaler - exerciseValue / scaler);
    //     foot = Math.abs((sugarValue * .15) / scaler - exerciseValue / scaler);
    //     numb = Math.abs((sugarValue * .5) / scaler - exerciseValue / scaler);
    //     kidney = Math.abs((sugarValue * .25) / scaler - exerciseValue / scaler);
    //     heart = Math.abs((sugarValue * .75) / scaler - exerciseValue / scaler);
    // }
    // function retrieveValues(){
    //     // retrieve from localStorage
    //     let retrivedSugar = localStorage.getItem('sugarValue');
    //     let retrivedExercise = localStorage.getItem('exerciseValue');

    //     console.log('retrievedSugar: ', retrivedSugar);
    //     console.log('retrievedExercise: ', retrivedExercise);

    //     // same object
    //     // {
    //     //     sugarValue: 200,
    //     //     dateCaptured: ,
    //     //     someOtherField: ,
    //     // }
    // }

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