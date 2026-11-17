function createElm(type, attr, par){
    const elm = document.createElement(type);

    if(attr.includes("#"))
        elm.id = attr.slice(1);
    else
        elm.classList.add(attr);

    par.appendChild(elm);

    return elm;
}
function rndmNumb(min, max, float){
    if(float == undefined)
        return Math.floor(Math.random() * (max - min + 1)) + min
    else
        return Math.random() * (max - min + 1) + min
}
function inputManager(){
    let guess = "";

    window.addEventListener("keydown", function (e){
        if (/^\p{L}$/u.test(e.key)) {
            if(currentCol != wordCol){
                tiles[currentRow][0][currentCol].innerText = convertToGeorgian(e.key); 
                tiles[currentRow][0][currentCol].classList.add("active");
                currentCol++;
            }
        }
        if(e.key == "Backspace"){
            if(currentCol > 0){
                currentCol--;
                tiles[currentRow][0][currentCol].innerText = ""; 
                tiles[currentRow][0][currentCol].classList.remove("active");
            }
        }
        if(e.key == "Enter"){
            if(currentCol == wordCol){
                for (let i = 0; i < wordCol; i++) {
                    guess += tiles[currentRow][0][i].innerText;
                }
                // CORRECT GUESS
                if(guess == ANSWER){
                    infoPanel.classList.add("active");
                    infoPanel.innerText = "You Won!";

                    const states = checkGuess(guess, ANSWER);
                    states.forEach((state, i) => {
                        tiles[currentRow][0][i].classList.add(state);
                    });
                    updateKeyboard(guess, states);

                    for (let i = 0; i < CONFETTI_COUNT; i++) { setTimeout(() => {confetti();}, i * confetti_stagger_time); }
                }
                if(guess != ANSWER){
                    if(WordList.isValid(guess)){

                        const states = checkGuess(guess, ANSWER);
                        states.forEach((state, i) => {
                            tiles[currentRow][0][i].classList.add(state);
                        });
                        updateKeyboard(guess, states);

                        // INCORRECT GUESS
                        if(currentRow != wordRow - 1){
                            currentRow++;
                            currentCol = 0;
                        }else{
                            infoPanel.innerText = `You Lost \n The Answer: ${ANSWER}`;
                            infoPanel.classList.add("active");
                        }
                    }else{
                        // NOT A WORD
                        infoPanel.innerText = "Word Not Found";
                        infoPanel.classList.add("active");
                        setTimeout(() => { infoPanel.classList.remove("active"); }, 1000);
                    }
                }
               guess = "";
            }
        }
    });
}
function keyboardManager(){
    let guess = "";
    keyboardPanel.addEventListener("click", function(e){
        if(e.target.innerText.length == 1 && /^\p{L}$/u.test(e.target.innerText)){
            if(currentCol != wordCol){
                tiles[currentRow][0][currentCol].innerText = convertToGeorgian(e.target.innerText); 
                tiles[currentRow][0][currentCol].classList.add("active");
                currentCol++;
            }
        }
        if(e.target.classList.contains("fa-delete-left")){
            if(currentCol > 0){
                currentCol--;
                tiles[currentRow][0][currentCol].innerText = ""; 
                tiles[currentRow][0][currentCol].classList.remove("active");
            }
        }
        if(e.target.classList.contains("submit")){
             if(currentCol == wordCol){
                for (let i = 0; i < wordCol; i++) {
                    guess += tiles[currentRow][0][i].innerText;
                }
                // CORRECT GUESS
                if(guess == ANSWER){
                    infoPanel.classList.add("active");
                    infoPanel.innerText = "You Won!";

                    const states = checkGuess(guess, ANSWER);
                    states.forEach((state, i) => {
                        tiles[currentRow][0][i].classList.add(state);
                    });
                    updateKeyboard(guess, states);

                    for (let i = 0; i < CONFETTI_COUNT; i++) { setTimeout(() => {confetti();}, i * confetti_stagger_time); }
                }
                if(guess != ANSWER){
                    if(WordList.isValid(guess)){
                        const states = checkGuess(guess, ANSWER);
                        states.forEach((state, i) => {
                            tiles[currentRow][0][i].classList.add(state);
                        });
                        updateKeyboard(guess, states);
                        
                        // INCORRECT GUESS
                        if(currentRow != wordRow - 1){
                            currentRow++;
                            currentCol = 0;
                        }else{
                            infoPanel.innerText = `You Lost \n The Answer: ${ANSWER}`;
                            infoPanel.classList.add("active");
                        }
                    }else{
                        // NOT A WORD
                        infoPanel.innerText = "Word Not Found";
                        infoPanel.classList.add("active");
                        setTimeout(() => { infoPanel.classList.remove("active"); }, 1000);
                    }
                }
               guess = "";
            }
        }
    });
}
function convertToGeorgian(text) {
  return text
    .split('')
    .map(char => enToGeMapping[char] || enToGeMapping[char.toLowerCase()] || char)
    .join('');
}
function checkGuess(guess, answer) {
  const result = Array(guess.length).fill("absent");
  const remaining = {};

  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === answer[i]) {
      result[i] = "correct";
    } else {
      remaining[answer[i]] = (remaining[answer[i]] || 0) + 1;
    }
  }

  for (let i = 0; i < guess.length; i++) {
    if (result[i] === "correct") continue;
    if (remaining[guess[i]] > 0) {
      result[i] = "present";
      remaining[guess[i]]--;
    }
  }

  return result;
}
function updateKeyboard(guess, states) {
  for (let i = 0; i < guess.length; i++) {
    const key = keyMap.get(guess[i]);
    if (!key) continue;

    const current = key.dataset.state;
    if (current && KEY_RANK[states[i]] <= KEY_RANK[current]) continue;

    if (current) key.classList.remove(current);
    key.classList.add(states[i]);
    key.dataset.state = states[i];
  }
}
function confetti({ count = 150, colors = ["#f94144", "#f9c74f", "#90be6d", "#43aa8b", "#577590"] } = {}) {
  const canvas = document.createElement("canvas");
  Object.assign(canvas.style, {
    position: "fixed", inset: 0, width: "100%", height: "100%",
    pointerEvents: "none", zIndex: 9999,
  });
  const dpr = devicePixelRatio || 1;
  canvas.width = innerWidth * dpr;
  canvas.height = innerHeight * dpr;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);

  const pieces = Array.from({ length: count }, () => ({
    x: innerWidth / 2,
    y: innerHeight * 0.6,
    vx: (Math.random() - 0.5) * 16,
    vy: -Math.random() * 16 - 4,
    size: Math.random() * 6 + 6,
    rot: Math.random() * Math.PI,
    vr: (Math.random() - 0.5) * 0.3,
    color: colors[(Math.random() * colors.length) | 0],
  }));

  let last = performance.now();
  (function frame(now) {
    const dt = Math.min((now - last) / 16.67, 3);
    last = now;
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    let alive = 0;
    for (const p of pieces) {
      p.vy += 0.35 * dt;
      p.vx *= 0.99;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.rot += p.vr * dt;
      if (p.y > innerHeight + 20) continue;
      alive++;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    }
    alive ? requestAnimationFrame(frame) : canvas.remove();
  })(last);
}