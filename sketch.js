/*
*  randomOscillator
*
*  Four differnt types of oscillators create a modulating soundscape.
*  The patterns are created by an algorithm, using probabilty
*  to determine "some notes here and some notes there".
*  During the draw() loop the variable step is incremented and
*  all oscillators change their freqency and amp accordingly.
*
*  @author        Matthias Jäger, Graz 2018
*  @libraries     http://p5js.org/
*  @github        https://github.com/matthias-jaeger-net/randomOscillator
*/

// Stores the four possible types of p5 oscillators
let types = ["sawtooth", "square", "sine", "triangle"];

// Holds p5 oscillator objects
let oscillators = [];

// Patterns to hold random notes
let patterns = [];

// Amp values for all oscillators
let modulations = [];

// Length of the created patterns
let time = 8;

// Counter for the current note to play
let step = 0;

// p5 dom element
let output;


// runs first
function setup() {

   // no visuals needed
   noCanvas();

   // using p5 dom to create a <P>
   output = createElement("p");

   // For all four types
   for (let i = 0; i < types.length; i++) {
      // the function createOscillator(type) returns a p5 oscillator
      oscillators[i] = createOscillator(types[i]);
      // set initial amp value
      modulations[i] = random(0.1, 0.6);
   }

   // Create random notes and save them in the four patterns
   patterns[0] = createRandomNotes(time, 10, 50, 0.4);
   patterns[1] = createRandomNotes(time, 90, 100, 0.6);
   patterns[2] = createRandomNotes(time, 100, 300, 0.4);
   patterns[3] = createRandomNotes(time, 100, 200, 0.8);
}

// Animation loop, runs countiously
function draw() {

   // play shorter patterns slower
   frameRate(time);

   // limit step to pattern length
   if (step >= time) {
      step = 0;
   }

   // Set amp and freqency
   let i = oscillators.length;
   while (i--) {
      oscillators[i].amp(noise(modulations[i]), 0.20);
      oscillators[i].freq(patterns[i][step]);
   }

   // Increase modulations with a small random number
   let j = modulations.length;
   while (j--) {
      modulations[j] += random(0, 0.1);
   }

   // Render in html dom element
   renderOutput(output);

   // Move forward in time
   step++;
}

// A function to create "some notes here and some notes there".
function createRandomNotes(steps, low, high, prob) {

   // start with an empty list
   let arr = [];

   // create random frequency value
   let a = floor(random(low, high));

   // b is "a bit higher, but low"
   let b = a + low;

   // loop over steps backwards
   let i = steps;

   while (i--) {
      // test random against given probabilty
      if (random() > prob) {
         // "some notes here"
         if (random() > 0.5) {
            // still a 50% chance of getting b
            arr[i] = a;
         } else {
            arr[i] = b;
         }
      } else {
         // or create a 0
         arr[i] = 0;
      }
   }
   return arr;
}

// Returns a p5 oscillator of given type
function createOscillator(type) {
   let o = new p5.Oscillator();
   o.setType(type);
   o.start();
   return o;
}

// Renders the output string
function renderOutput(element) {

   // Start with an empty string
   let string = "";

   // Shows the patterns
   for (let i = 0; i < patterns.length; i++) {
      // of all four types
      string += "<b>" + types[i] + "</b> [ ";
      // each number is seperated with space
      for(let j = 0; j < patterns[i].length; j++) {
         string += patterns[i][j] + " ";
      }
      // close the patterns
      string += "], ";
      // display the amp values
      string += "amp: " + noise(modulations[i])  + " <br> ";
   }

   // element is a p5 dom element
   element.html(string);
}
