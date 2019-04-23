    // global variable puragtory
    let sugar = document.getElementById('sugar');
    let exercise = document.getElementById('exercise');
    let summary = document.getElementById('summary-container');
    let showGraph = document.getElementById('radarChart');

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
    //let a1c = [];

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

        //console.log(data);

        //make our collection of data
        dataset.push(data);

    }

    function setup() {
        //let bloodConversion = parseInt(sugar.value)*10;
        var cnv = createCanvas(windowWidth/2, windowHeight);
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
        fill(26, 23, 60, 85);
        noStroke();
        rectMode(CENTER);

          //x ,y ,width, height
        rect(windowWidth/4, windowHeight/4+200, windowWidth/4+50, windowHeight/2, 3);

        fill(255);
        textAlign(CENTER);

        textSize(width/6);
       text(sugar.value, windowWidth/4, windowHeight/2-100);

       // if (retrievedStorage = []) {
       //      text(sugar.value, windowWidth/4, windowHeight/2-100);

       // } else {

       // }

    }

    function button() {
        let run = select('#button');
        run.mousePressed(function() {
            //the button listener
            //no more deciliters
            let bloodConversion = parseInt(sugar.value)*10;
            //value in mg
            let bloodValue = sugar.value;

            // //
            // let newBloodValue; 


            for (let i = 0; i < bloodConversion; i++) {
               // if (particles = []) {
                    particles.push(new glucose());

                // } else {
                //     if old < new
                //         if new > old
                // }
            }
       //  fill(255);
       //  textAlign(CENTER);
       //  textSize(width/6);
       // text(sugar.value, windowWidth/4, windowHeight/2-100);
       // display on button press
        select('#sketch').show();
        })
    }

    function redraw() {
        //same as draw but it needs to use stored values

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
            // fill(0);
            // textAlign(CENTER);

            // textSize(width/6);
            sugar.value = lastEntry.sugarValue;
            // text(, windowWidth/4, windowHeight/2-100);
            // console.log(lastSugar/10);
            //redraw();
            // // only calculate average if there's more than one item in array
        // if (a1c.length > 1) {
        //     let average = total / a1c.length;
        //     let a1cValue = (average + 46.7) / 28.7;
        //     console.log(average);

        //     // output value to the div
        //     let a1cContainer = document.getElementById("a1c-value");
        //     a1cContainer.innerHTML = a1cValue;

        //     console.log(a1cValue);

           // display onload from current data



          /// draw();
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