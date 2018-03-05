

var types = ["sawtooth", "square", "sine", "triangle"];
var oscillators = [];
var patterns = [];
var modulations = []; 

var time = 8; 
var step = 0;

var output; 

function setup() {
   noCanvas();
   output = createElement("p");
   for (var i = 0; i < types.length; i++) {
      oscillators[i] = createOscillator(types[i]);
      modulations[i] = random(0.1, 0.6); 
   }
   setPattern();
}

function draw() {
   frameRate(time);

   if (step >= time) {
      step = 0;
   }
   
   var i = oscillators.length;

   while (i--) {
      oscillators[i].amp(noise(modulations[i]), 0.20);
      oscillators[i].freq(patterns[i][step]);
   }
   
   var j = modulations.length;
   
   while (j--) {
      modulations[j] += random(0, 0.1);
   }

   renderOutput(output);
   
   step++;
}

function setPattern() {
   patterns[0] = createRandomNotes(time, 10, 50, 0.4);
   patterns[1] = createRandomNotes(time, 90, 100, 0.6);
   patterns[2] = createRandomNotes(time, 100, 300, 0.4);
   patterns[3] = createRandomNotes(time, 100, 200, 0.8);
}

function createRandomNotes(steps, low, high, prob) {
   var arr = [];
   var a = floor(random(low, high));
   var b = a + low;
   var i = steps;
   while (i--) {
     if (random() > prob) {
        if (random() > 0.5) {
           arr[i] = a;
        } else {
           arr[i] = b;
        }
      } else {
         arr[i] = 0;
      }
   }
   return arr;
}

function createOscillator(type) {
   var o = new p5.Oscillator();
   o.setType(type);
   o.amp(0.4, 0.20);
   o.start();
   return o;
}

function renderOutput(element) {
   var string = "";
   for (var i = 0; i < patterns.length; i++) {
      string += "<b>" + types[i] + "</b> [ ";
      for(var j = 0; j < patterns[i].length; j++) {
         string += patterns[i][j] + " ";
      }
      string += "], ";
      string += "amp: " + noise(modulations[i])  + " <br> ";
   }
   element.html(string);
}
