import './style.css';
import OpenAI from 'openai';

import p5 from 'p5';

const openAIKey = import.meta.env.VITE_OPENAI_KEY;

let openai;
let isLoading = false;

class Letter {
  constructor(p, letter, x, y, vx, vy) {
    this.p = p;
    this.letter = letter;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.angle = 0;
    this.angularVelocity = p.random(-0.05, 0.05);
    this.isSettled = false;
  }

  applyForce(fx, fy) {
    if (!this.isSettled) {
      this.vx += fx;
      this.vy += fy;
    }
  }

  update() {
    if (!this.isSettled) {
      this.x += this.vx;
      this.y += this.vy;
      this.angle += this.angularVelocity;
      this.applyForce(0, 0.5); // Gravity

      if (this.y >= this.p.height - 20) {
        this.y = this.p.height - 20;
        this.vy *= -0.5; // Bounce effect
        this.vx *= 0.7; // Friction
        this.angularVelocity *= 0.6; // Dampen rotation

        if (Math.abs(this.vy) < 1) {
          this.isSettled = true;
          this.vy = 0;
          this.angularVelocity = 0; // Stop rotation
        }
        
      }
    }
  }

  display() {
    this.p.push();
    this.p.translate(this.x, this.y);
    this.p.rotate(this.angle);
    this.p.text(this.letter, 0, 0);
    this.p.pop();
  }

  isMouseOver() {
    let distance = this.p.dist(this.p.mouseX, this.p.mouseY, this.x, this.y);
    return distance < 30; // Adjust the value based on your letter size
  }

  moveWithMouse() {
    if (this.isMouseOver() && this.isSettled) {
      this.x = this.p.mouseX;
      this.y = this.p.mouseY;
      this.isSettled = false; // Make it movable
    }
  }
}

class GrowingLine {
  constructor(p, startX, targetLetter) {
    this.p = p;
    this.startX = startX; // Start from a random X position at the top
    this.startY = 0; // Start from the top of the canvas
    this.targetLetter = targetLetter;
    this.currentX = this.startX;
    this.currentY = this.startY;
    this.speed = 2;
    this.reached = false;
  }

  update() {
    // Update the end point to the current position of the letter
    this.currentX = this.targetLetter.x;
    this.currentY = this.targetLetter.y;
  }

  display() {
    // Draw line from the top edge to the current position of the letter
    this.p.stroke(192, 192, 192);
    this.p.strokeWeight(1);
    this.p.line(this.startX, this.startY, this.currentX, this.currentY);
  }
}

let letters = [];
let textToShow = "";
let textIndex = 0;
let isDragging = false; // Variable to track dragging state
let lastConversionFrame = 0;
const conversionInterval = 60;
let lines = [];

const sketch = p => {
  p.setup = function() {
    p.createCanvas(p.windowWidth, 700);
    p.fill(p.color('black'));
    p.textSize(30);
  };

  p.keyPressed = function() {
    if (p.keyCode === 32) {
      isLoading = true;
      chat("Generate one short haiku about AI, entropy and LLMs high dimensional space, and philosophy of language, be aware that you are a text that is running in the browser, programmed in P5.js and is falling apart and you worry about model collapse, irony, they represent vectors of neural activity. Write it three times times one in English (place the English always last) and in two other languages or codes: always include a two of these: middle eastern, tibetan, morse code, esperanto, cha64, emojis, ASCII, enigma, smartphone slang, BRAILLE, verctor wights, python, javascript,basic). don't name or number the language");
    }
  };

  async function chat(prompt) {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        temperature: 0.5,
        messages: [{ "role": "user", "content": prompt }]
      });

      textToShow = completion.choices[0].message.content;
      textIndex = 0;
      letters = [];
      lines = []; // Reset lines when a new prompt is generated
      isLoading = false;
    } catch (err) {
      console.error("An error occurred in the chat function:", err);
      isLoading = false;
    }
  }

  function createFallingLetter(x, y, index) {
    let newLetter = new Letter(
      p, 
      textToShow.charAt(index), 
      x, 
      y, 
      p.random(-2, 2), 
      p.random(-5, -2)
    );
    letters.push(newLetter);

    if (textToShow.charAt(index) !== ' ') {
      textToShow = textToShow.substring(0, index) + ' ' + textToShow.substring(index + 1);
      let randomStartX = p.random(p.width);
      lines.push(new GrowingLine(p, randomStartX, newLetter));
    }
  }

  p.mouseMoved = function() {
    if (textToShow.length > 0 && !isDragging) {
      createFallingLetter(p.mouseX, p.mouseY, textIndex);
      textIndex = (textIndex + 1) % textToShow.length;
    }
  };

  p.mousePressed = function() {
    for (let letter of letters) {
      if (letter.isMouseOver()) {
        isDragging = true;
        break;
      }
    }
  };

  p.mouseReleased = function() {
    isDragging = false;
  };

  p.draw = function() {
    p.background(p.color(255));

    if (isLoading) {
      displayLoader(p);
    } else {
      p.textAlign(p.CENTER, p.TOP);
      p.fill(p.color(50));
      p.text(textToShow, 10, 50, p.width - 20, p.height - 20);

      if (p.frameCount - lastConversionFrame > conversionInterval && textToShow.length > 0) {
        let index = p.floor(p.random(textToShow.length));
        createFallingLetter(p.width / 2, 0, index);
        lastConversionFrame = p.frameCount;
      }

      for (let i = 0; i < letters.length; i++) {
        letters[i].update();
        if (isDragging) {
          letters[i].moveWithMouse();
        }
        letters[i].display();
      }

      for (let line of lines) {
        line.update();
        line.display();
      }
    }
  };
};

function displayLoader(p) {
  p.push();
  p.translate(p.width / 2, p.height / 2);
  p.rotate(p.frameCount / 100.0);
  p.strokeWeight(1);
  p.stroke(195, 195, 195);
  p.line(0, 0, p.windowWidth, 600);

  p.pop();
  p.push();
  p.translate(p.width / 2, p.height / 2);
  p.rotate(p.frameCount / -180.0);
  p.strokeWeight(1);
  p.stroke(195, 195, 195); 
  p.line(0, 0, p.windowWidth, 100);
  p.pop();


  p.push();
  p.translate(p.width / 2, p.height / 2);
  p.rotate(p.frameCount / 180.0);
  p.strokeWeight(1);
  p.stroke(195, 195, 195);
  p.line(0, 0, p.windowWidth, 100);
  p.pop();
  


}

function onReady() {
  openai = new OpenAI({
    apiKey: openAIKey,
    dangerouslyAllowBrowser: true
  });

  const mainElt = document.querySelector('main');
  new p5(sketch, mainElt);
}

if (document.readyState === 'complete') {
  onReady();
} else {
  document.addEventListener("DOMContentLoaded", onReady);
}

 