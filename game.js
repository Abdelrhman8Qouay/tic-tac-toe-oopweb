



function gamePlay() {
    var newGame = new Game('human', 150, null, boxes_game);
    newGame.start_game();
}

// App Functions Needed
function hideShow(where) {
    if(where == 'game' || !where) {
        addClass(main_menu, 'hide');
        addClass(playing_content, 'show');
    } else {
        removeClass(main_menu, 'hide');
        removeClass(playing_content, 'show');
    }
}


// Static Functions Work
function playAudio(aud, audioLoop) {
    if(audioLoop) {
        aud.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
    }
    aud.volume = '0.4';
    aud.preload = 'none';
    aud.play();
}

function isSpaceChar(str) {
    return / [^ ]*$/.test(str);
}

function hasClass(el, className)
{
    if (el.classList)
        return el.classList.contains(className);
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
}

function addClass(el, className)
{
    if (el.classList)
        el.classList.add(className)
    else if (!hasClass(el, className))
        el.className += " " + className;
}

function removeClass(el, className)
{
    if (el.classList)
        el.classList.remove(className)
    else if (hasClass(el, className))
    {
        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
        el.className = el.className.replace(reg, ' ');
    }
}


const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}