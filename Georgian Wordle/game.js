const game = createElm("div", "#game", document.body);
game.style.width = `${gameW}px`;
game.style.height = `${gameH}px`;

const infoPanel = createElm("p",  "#info-panel", game);
infoPanel.innerText = "Word Not Found";

const guessPanel = createElm("div", "#guess-panel", game);
guessPanel.style.rowGap = `${wordGap}px`;

for (let r = 0; r < wordRow; r++) {
    const tileWrapper = createElm("span", "tile-wrapper", guessPanel)
    tileWrapper.style.gap = `${wordGap}px`;
    for (let c = 0; c < wordCol; c++) {
        const tile = createElm("p", "tile", tileWrapper);
        tile.style.width = `${(gameW / 5) - wordGap}px`;
        tile.style.height = `${(gameW / 5) - wordGap}px`;

    }
    tiles.push([tileWrapper.children]);
}
//

const keyboardPanel = createElm("div", "#keyboard-panel", game);
keyboardPanel.style.width = `${keyboardW}px`;
keyboardPanel.style.height = `${keyboardH}px`;

for (let i = 0; i < keyboardKeys.length; i++) {
    let key;
    if(i != 24){
        key = createElm("p", "key", keyboardPanel);
    }else{
        key = createElm("i", "key", keyboardPanel);
        key.classList.add("fa-solid", "fa-delete-left");
    }

    key.style.width = `${keySize / 1.15}px`;
    key.style.height = `${keySize}px`;

    key.innerText = keyboardKeys[i];

    // Very Bad Code I Know VVV
    
    if(i < 12) key.style.transform = `translate(${i * (keySize + wordGap / 1.5)}px, ${0}px)`;
    if(i > 11 && i < 24) key.style.transform = `translate(${((i - 12) * (keySize + wordGap / 1.5))}px, ${keySize + wordGap * 1.5}px)`;
    if(i > 23) key.style.transform = `translate(${((i - 23.5) * (keySize + wordGap / 1.5))}px, ${(keySize + wordGap * 1.5) * 2}px)`;
    
    //
    
    if(i == 24 || i == 34)
    {
        key.style.width = `${keySize + 30}px`;
    }
    else{
        keyMap.set(keyboardKeys[i], key);
    }
    //
    if(i == 24){
        key.style.transform = `translate(${-2}px, ${(keySize + wordGap * 1.5) * 2}px)`
    }
    if(i == 34){
        key.style.fontSize = "1.34rem";
        key.classList.add("submit");
    }
}
inputManager();
keyboardManager();