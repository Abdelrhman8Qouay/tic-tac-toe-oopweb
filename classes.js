

const main_menu = document.querySelector('.main_menu'),

playing_content = document.querySelector('.playing_content'),
boxes_game = document.querySelectorAll('.playing_content .content .box'),
playerName1 = document.getElementById('playerName1'),
playerName2 = document.getElementById('playerName2'),
playerSymbol1 = document.getElementById('playerSymbol1'),
playerSymbol2 = document.getElementById('playerSymbol2');


class Player {
    static player_number = 0;
    static pc_player_info = {
        name: 'AI',
        symbol: 'O',
    };
    name= '';
    symbol= '';
    wins = 0;
    my_turn = false;

    constructor(isFirst) {
        if(isFirst) Player.player_number++;
        this.is_first = isFirst;
        if(Player.player_number == 1) this.my_turn = true;
    }

    choose_name() {
        if(!this.is_first)Player.player_number++;
        var chosen = prompt(`Player ${Player.player_number}, Write your name (max: 15 letters)(numbers and characters only)`, `Player ${Player.player_number}`);
        while (true) {
            if(chosen.length > 15) {
                chosen = prompt('Player ${Player.player_number}, Write your name (max: 15 letters)(numbers and characters only)', `Player ${Player.player_number}`);
                continue;
            }
            if(chosen.match(/[^a-zA-Z0-9_' ']/g)) {
                chosen = prompt(`Player ${Player.player_number}, Write your name (max: 20 letters)(numbers and characters only)`, `Player ${Player.player_number}`);
                continue;
            }
            this.name = chosen;
            break;
        }
        if(this.is_first) {
            playerName1.innerText = chosen;
        } else playerName2.innerText = chosen;
    }

    static default_symbol() {
        if(Player.player_number == 1) {
            return 'X';
        } else {
            return 'O';
        }
    }

    choose_symbol() {
        var chosen = prompt(`${this.name}, Write your symbol game (max: 1 letter)(characters only)`, Player.default_symbol() );
        while (true) {
            if(chosen.length > 1) {
                chosen = prompt(`${this.name}, Write your symbol game (max: 1 letter)(characters only)`, Player.default_symbol() );
                continue;
            }
            if(chosen.match(/[^a-zA-Z]/g)) {
                chosen = prompt(`${this.name}, Write your symbol game (max: 1 letter)(characters only)`, Player.default_symbol() );
                continue;
            }
            this.symbol = chosen.toUpperCase();
            break;
        }
        if(this.is_first) {
            playerSymbol1.innerText = chosen;
        } else playerSymbol2.innerText = chosen;
    }
}

class Board{
    constructor() {
        this.list = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    }

    display_board() {
        return this.list;
    }

    update_board(index, symbol) {
        if(!index || !symbol || index < 0 || index > 9) {
            console.error("Board Error: update board can not work, check the problem!");
            return;
        }
        if(!this.list[index]) {
            console.error("Board Error: update board can not work, check the problem!");
            return;
        }
        this.list[index] = symbol;
    }

    reset_board() {
        this.list = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    }

    board_isfull() {
        if(typeof this.list[0] != 'number' && typeof this.list[1] != 'number' && typeof this.list[2] != 'number' && typeof this.list[3] != 'number' && typeof this.list[4] != 'number' && typeof this.list[5] != 'number' && typeof this.list[6] != 'number' && typeof this.list[7] != 'number' && typeof this.list[8] != 'number') {
            return true;
        } else {
            return false;
        }
    }

    available_board_places(wantCondition = true /* true >> return boolean | false >> return array */) {
        if(wantCondition) { // return boolean
            return this.list.some(place=> typeof place == 'number');
        } else { // return array
            return this.list.filter(place=> typeof place == 'number');
        }
    }

    checkItemEmpty(placeIndex) {
        return typeof this.list[placeIndex] == 'number';
    }
}

class UI {
    static reset_board() {
        boxes_game.forEach(box => box.innerHTML = '');
    }

    static reset_all_info() {
        boxes_game.forEach(box => {
            box.onclick = null;
            box.innerHTML = '';
        });
        playerName1.innerText = 'player 1';
        playerSymbol1.innerText = 'X';
        playerName2.innerText = 'player 2';
        playerSymbol2.innerText = 'O';
    }

    static reset_players() {
        playerName1.innerText = 'player 1';
        playerSymbol1.innerText = 'X';
        playerName2.innerText = 'player 2';
        playerSymbol2.innerText = 'O';
    }

    static change_element_info(ele, value) {
        ele.innerText = value;
    }
    static reset_nested_info(element) {
        element.forEach(ele => ele.innerHTML = '');
    }

    static changeAIPlayerInfo(name, symbol) {
        Player.pc_player_info.name = name;
        Player.pc_player_info.symbol = symbol;
    }

    handleAIshow() {

    }
}

class Game {
    static total_gaming = 0;
    eventFunction = null;

    constructor(gameType, gameTime, players) {
        this.players = {
            player1: players ? players.player1 : new Player(true),
            player2: players ? players.player2 : new Player(),
        };
        this.board = new Board();
        this.game_type = gameType || 'human'; // pc or human
        this.game_time = gameTime || 140;
        Game.total_gaming++;
    }

    static game_winner_logic(board_list) {
        if(board_list[0] == board_list[1] && board_list[1] == board_list[2] && board_list[2]) {
            console.log('0 1 2')
            return true
        } else if(board_list[3] == board_list[4] && board_list[4] == board_list[5] && board_list[5]) {
            console.log('3 4 5')
            return true
        } else if(board_list[6] == board_list[7] && board_list[7] == board_list[8] && board_list[8]) {
            console.log('6 7 8')
            return true
        } else if(board_list[0] == board_list[3] && board_list[3] == board_list[6] && board_list[6]) {
            console.log('0 3 6')
            return true
        } else if(board_list[1] == board_list[4] && board_list[4] == board_list[7] && board_list[7]) {
            console.log('1 4 7')
            return true
        } else if(board_list[2] == board_list[5] && board_list[5] == board_list[8] && board_list[8]) {
            console.log('2 5 8')
            return true
        } else if(board_list[0] == board_list[4] && board_list[4] == board_list[8] && board_list[8]) {
            console.log('0 4 8')
            return true
        } else if(board_list[2] == board_list[4] && board_list[4] == board_list[6] && board_list[6]) {
            console.log('2 4 6')
            return true
        } else {
            console.log('not yet')
            return false;
        }
    }

    start_game(startType) {
        console.log('in playing game now')
        if(this.game_type == 'human') {
            // get users info
            if(startType != 'restarted') {
                this.players.player1.choose_name();
                this.players.player1.choose_symbol();
                this.players.player2.choose_name();
                this.players.player2.choose_symbol();
            }

            boxes_game.forEach(box => {
                box.onclick = async ()=> {
                    if(this.board.checkItemEmpty([box.dataset['index']])) { // if empty box >>
                        var symbolNow = this.players.player1.my_turn ? this.players.player1.symbol : this.players.player2.symbol;
                        this.board.update_board(box.dataset['index'], symbolNow);
                        UI.change_element_info(box, this.board.list[box.dataset['index']]);

                        await sleep(200); // after 0.2 second do the rest

                        // check game before change the turns of players
                        // if win(return true that meaning end the game)
                        if(Game.game_winner_logic(this.board.list) || this.board.board_isfull()) {
                            if(Game.game_winner_logic(this.board.list) && this.board.board_isfull()) {
                                this.end_game(this.players.player1.my_turn ? this.players.player1 : this.players.player2); // with specific player won
                                return;
                            } else if(Game.game_winner_logic(this.board.list) && !this.board.board_isfull()) {
                                this.end_game(this.players.player1.my_turn ? this.players.player1 : this.players.player2); // with specific player won
                                return;
                            } else {
                                // with no player won
                                this.end_game();
                                return;
                            }
                        }

                        // change the turn of players
                        this.player_turn(false);
                    }
                }
            })
        } else {
            // get user info only
            if(startType != 'restarted') {
                this.players.player1.choose_name();
                this.players.player1.choose_symbol();
                this.players.player2.name = Player.pc_player_info.name;
                this.players.player2.symbol = Player.pc_player_info.symbol;
            }

            boxes_game.forEach(box => {
                box.onclick = async ()=> {
                    if(this.board.checkItemEmpty([box.dataset['index']])) { // if empty box >>
                        if(this.players.player1.my_turn) { // if human Player
                            var symbolNow = this.players.player1.symbol;
                            this.board.update_board(box.dataset['index'], symbolNow);
                            box.innerText = symbolNow;
                            console.log('this work')

                            await sleep(200); // after 0.2 second do the rest

                            // check game before change the turns of players
                            // if win(return true that meaning end the game)
                            if(Game.game_winner_logic(this.board.list) || this.board.board_isfull()) {
                                if(Game.game_winner_logic(this.board.list) && this.board.board_isfull()) {
                                    this.end_game(this.players.player1.my_turn ? this.players.player1 : this.players.player2); // with specific player won
                                    return;
                                } else if(Game.game_winner_logic(this.board.list) && !this.board.board_isfull()) {
                                    this.end_game(this.players.player1.my_turn ? this.players.player1 : this.players.player2); // with specific player won
                                    return;
                                } else {
                                    // with no player won
                                    this.end_game();
                                    return;
                                }
                            }

                            // change the turn of players
                            this.player_turn();
                            await sleep(2000); // after 0.5 second make ai playing..
                            this.ai_playing();
                        }
                    }
                }
            })
        }
    }

    end_game(playerWon) {
        console.log('in end game')
        if(playerWon) {
            playerWon.wins++;
            alert(`The Winner Player is: ${playerWon.name}`);
        } else {
            alert('Tie.. No Winner in this Game....');
        }

        // make all are empty to use again
        this.player_turn(true);
        UI.reset_board();

        var confirming = confirm('do you want to restart the game?');
        if(confirming) {
            this.restart_game();
        }else {
            this.game_result();
        }
    }

    restart_game() {
        console.log('in restart game')
        this.destroy_game();
        var newGame = new Game(this.game_type, this.game_time, this.players);
        newGame.start_game('restarted');
    }

    game_result() {
        console.log('in results game')
        if(this.players.player1.wins > this.players.player2.wins) {
            alert(`the Final Winner Player is ${this.players.player1.name} with total wins: ${this.players.player1.wins}`);
        } else if (this.players.player1.wins < this.players.player2.wins) {
            alert(`the Final Winner Player is ${this.players.player2.name} with total wins: ${this.players.player2.wins}`);
        } else {
            alert(`No one win, with total games: ${Game.total_gaming}`);
        }
        Game.total_gaming = 0;
        this.destroy_game();
        hideShow('main');
    }

    destroy_game() {
        console.log('in destroying the game')
        Player.player_number = 0;
        UI.reset_all_info();
    }

    // Functions Used as(Static)
    player_turn(isDefault= false) {
        if(isDefault) {
            this.players.player1.my_turn = true;
            this.players.player2.my_turn = false;
        } else {
            if(this.players.player1.my_turn) {
                this.players.player1.my_turn = false;
                this.players.player2.my_turn = true;
            } else {
                this.players.player1.my_turn = true;
                this.players.player2.my_turn = false;
            }
        }
    }

    ai_playing() {
        // =========== AI Play Process ===========
        var aiSymbol = this.players.player2.symbol;
        var huSymbol = this.players.player1.symbol;
        let possibleMoves = this.board.available_board_places(false);
        let moveIndex = null;

        var turns_win = [];

        // check user turns before win
        if(!moveIndex) {
            console.log('check user work')
            for(let i = 0; i < possibleMoves.length; i++) {
                let tempBoard = [...this.board.list];
                tempBoard[possibleMoves[i]]= huSymbol;
                console.log(tempBoard[possibleMoves[i]]);
                if(Game.game_winner_logic(tempBoard)) {
                    console.log('win turn for user', possibleMoves[i]);
                    turns_win.push(possibleMoves[i]);
                }
            }
            if(selectRandom(turns_win)) moveIndex = selectRandom(turns_win);
        }
        console.log('turns arr after user', turns_win)

        // check ai turn to play a win place
        if(!moveIndex) {
            console.log('check ai work')
            for(let i = 0; i < possibleMoves.length; i++) {
                let tempBoard = [...this.board.list];
                tempBoard[possibleMoves[i]]= aiSymbol;
                if(Game.game_winner_logic(tempBoard)) {
                    console.log('win turn for ai', possibleMoves[i]);
                    turns_win.push(possibleMoves[i]);
                }
            }
            if(selectRandom(turns_win)) moveIndex = selectRandom(turns_win);
        }
        console.log('turns arr after ai', turns_win)

        // if all empty move to random place on the board
        if(!moveIndex) {
            console.log('made it random on all')
            moveIndex = selectRandom(possibleMoves);
        }
        console.log(moveIndex, possibleMoves);
        console.log('=======================================================')

        // =========== Change the data ===========
        if(moveIndex) {
            var ele_box = document.querySelector(`[data-index="${moveIndex}"]`);
            this.board.update_board(moveIndex, aiSymbol);
            ele_box.innerText = aiSymbol;

            // check game before change the turns of players
            // if win(return true that meaning end the game)
            if(Game.game_winner_logic(this.board.list) || this.board.board_isfull()) {
                if(Game.game_winner_logic(this.board.list) && this.board.board_isfull()) {
                    this.end_game(this.players.player2); // with specific player won
                    return;
                } else if(Game.game_winner_logic(this.board.list) && !this.board.board_isfull()) {
                    this.end_game(this.players.player2); // with specific player won
                    return;
                } else {
                    // with no player won
                    this.end_game();
                    return;
                }
            }
        }

        this.player_turn();
    }
}
