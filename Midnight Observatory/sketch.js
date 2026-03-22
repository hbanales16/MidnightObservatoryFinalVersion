let constellations = [];
let activeConstellation = -1;
let completedMessage = "";

function setup() {
  createCanvas(700, 450);
}
let cancer = {
    name: "Cancer",
    stars: [
      { x: 120, y: 150, revealed: false, selected: false },
      { x: 160, y: 120, revealed: false, selected: false },
      { x: 205, y: 145, revealed: false, selected: false },
      { x: 180, y: 195, revealed: false, selected: false }
    ]
  };
 
  let taurus = {
    name: "Taurus",
    stars: [
      { x: 350, y: 150, revealed: false, selected: false },
      { x: 395, y: 115, revealed: false, selected: false },
      { x: 445, y: 150, revealed: false, selected: false },
      { x: 490, y: 115, revealed: false, selected: false }
    ]
  };

let gemini = {
    name: "Gemini",
    stars: [
      { x: 180, y: 270, revealed: false, selected: false },
      { x: 180, y: 340, revealed: false, selected: false },
      { x: 250, y: 270, revealed: false, selected: false },
      { x: 250, y: 340, revealed: false, selected: false }
    ]
  };

   constellations.push(cancer);
  constellations.push(taurus);
  constellations.push(gemini);


  function draw() {
  background(10, 15, 35);

  drawBackgroundStars();
  drawInstructions();
  revealStars();
  drawConnections();
  drawStars();
  drawLabels();
}

function drawInstructions() {
  fill(255);
  textSize(14);
  text("Move your mouse to reveal stars.", 20, 25);
  text("Click revealed stars to build constellations.", 20, 45);
  text("Press R to reset.", 20, 65);
}

function drawBackgroundStars() {
  noStroke();

  let t = sin(frameCount * 0.03) * 2;

  fill(255, 255, 255, 120);
  ellipse(70, 100, 3 + t, 3 + t);
  ellipse(300, 60, 3 + t, 3 + t);
  ellipse(550, 80, 3 + t, 3 + t);
  ellipse(620, 200, 3 + t, 3 + t);
  ellipse(90, 370, 3 + t, 3 + t);
  ellipse(600, 340, 3 + t, 3 + t);
  ellipse(420, 60, 3 + t, 3 + t);
  ellipse(500, 390, 3 + t, 3 + t);
}

function revealStars() {
  for (let i = 0; i < constellations.length; i++) {
    let c = constellations[i];

    for (let j = 0; j < c.stars.length; j++) {
      let s = c.stars[j];

      let d = dist(mouseX, mouseY, s.x, s.y);

      if (d < 60) {
        s.revealed = true;
      }
    }
  }
}

function drawStars() {
  noStroke();

  for (let i = 0; i < constellations.length; i++) {
    let c = constellations[i];

    for (let j = 0; j < c.stars.length; j++) {
      let s = c.stars[j];

      let twinkle = sin(frameCount * 0.05 + j * 10) * 20;

      if (s.selected === true) {
        fill(255, 220, 120, 60);
        ellipse(s.x, s.y, 24, 24);

        fill(255, 220, 120);
        ellipse(s.x, s.y, 12, 12);

      } else if (s.revealed === true) {
        fill(180, 220, 255, 40);
        ellipse(s.x, s.y, 18 + twinkle * 0.2, 18 + twinkle * 0.2);

        fill(255);
        ellipse(s.x, s.y, 8 + twinkle * 0.05, 8 + twinkle * 0.05);

      } else {
        fill(25);
        ellipse(s.x, s.y, 5, 5);
      }
    }
  }
}

function drawConnections() {
  stroke(180, 200, 255);
  strokeWeight(2);

  for (let i = 0; i < constellations.length; i++) {
    let c = constellations[i];

    for (let j = 0; j < c.stars.length - 1; j++) {
      let s1 = c.stars[j];
      let s2 = c.stars[j + 1];

      if (s1.selected === true && s2.selected === true) {
        line(s1.x, s1.y, s2.x, s2.y);
      }
    }
  }
}

function drawLabels() {
  fill(200, 220, 255);
  textSize(16);

  for (let i = 0; i < constellations.length; i++) {
    let c = constellations[i];

    let allSelected = true;

    for (let j = 0; j < c.stars.length; j++) {
      if (c.stars[j].selected === false) {
        allSelected = false;
      }
    }

    if (allSelected === true) {
      text(c.name, c.stars[0].x, c.stars[0].y - 20);
    }
  }

  fill(255, 230, 180);
  textSize(20);
  text(completedMessage, width / 2 - 70, 35);
}

function mousePressed() {
  for (let i = 0; i < constellations.length; i++) {
    let c = constellations[i];

    if (activeConstellation === -1 || activeConstellation === i) {
      for (let j = 0; j < c.stars.length; j++) {
        let s = c.stars[j];

        let d = dist(mouseX, mouseY, s.x, s.y);

        if (d < 20 && s.revealed === true) {
          s.selected = true;
          activeConstellation = i;
        }
      }

      let allSelected = true;

      for (let j = 0; j < c.stars.length; j++) {
        if (c.stars[j].selected === false) {
          allSelected = false;
        }
      }

      if (allSelected === true) {
        completedMessage = c.name + " discovered!";
        activeConstellation = -1;
      }
    }
  }
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    resetStars();
  }
}

function resetStars() {
  for (let i = 0; i < constellations.length; i++) {
    let c = constellations[i];

    for (let j = 0; j < c.stars.length; j++) {
      let s = c.stars[j];

      s.revealed = false;
      s.selected = false;
    }
  }

  activeConstellation = -1;
  completedMessage = "";
}