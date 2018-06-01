var song;
var button;
var jumpButton;
var amp;
var restartButton;
var balloons = [];

function setup() {
  createCanvas(600, 600);
  

  song = loadSound("lucid_Dreamer.mp3", loaded);
  restart = loadSound("rewind.mp3");
  amp = new p5.Amplitude();
  jumpButton = createButton("jump");
  jumpButton.mousePressed(jumpSong);
  restartButton = createButton("restart");
  restartButton.mousePressed(restartSong);
  fft = new p5.FFT(0.5, 32);
 


}


function jumpSong() {
  var len = song.duration();
  var t = random(len);
  console.log(t);
  song.jump(t);
}

function restartSong() {
  if (song.isPlaying()) {
    song.stop();
    restart.play();
    song.play();
  }
}

function loaded() {
  console.log("loaded");
  button = createButton("play");
  button.mousePressed(togglePlaying);
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.play();
    button.html("pause");
  } else {
    song.pause();
    button.html("play");
  }
}

function draw() {
  background(song.currentTime(), 0, 255);
  
  for (var i = 0; i < balloons.length; i++) {
    
        balloons[i].display();
        balloons[i].move();
}
  var spectrum = fft.analyze();
  var vol = amp.getLevel();
  var diam = map(vol, 0, 0.3, 10, 400);

  fill(random(255), random(255), random(255))
  ellipse(width / 2, height / 2, diam, diam);
  ellipse(width / 2, height / 2, diam / 2, diam / 2);
  ellipse(width / 2, height / 2, diam / 3, diam / 3);
  ellipse(width / 2, height / 2, diam / 4, diam / 4);
  
  for (var i = 0; i < spectrum.length; i++) {
    var y = map(i, 0, spectrum.length, 0, height);
    var w = -width + map(spectrum[i], 0, 255, width, 0);
    rect(width, y, w, height / spectrum.length);
  }

  var waveform = fft.waveform();
  noFill();
  beginShape();
  stroke(random(255), random(255), random(255));
  strokeWeight(1);
  for (var i = 0; i < waveform.length; i++) {
    var x = map(i, 0, waveform.length, 0, 600)
    var y = map(waveform[i], -1, 1, 0, height);
    vertex(y, x);
  }
  endShape();
  
}

function mouseClicked() {
        balloons.push(new Balloon());}
        
function Balloon() {
    this.x = random(width);
    this.y = 600;
    this.speed = 8;
    
      this.display = function() {
        fill(255, 0, 0);
        ellipse(this.x, this.y, 50, 50);
      }
      
      this.move = function() {
        this.y = this.y - this.speed;
      }
      
    
  }