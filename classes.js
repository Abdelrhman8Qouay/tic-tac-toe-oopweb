

const main_menu = document.querySelector('.main_menu'),

playing_content = document.querySelector('.playing_content'),
boxes_game = document.querySelectorAll('.playing_content .content .box'),
playerName1 = document.getElementById('playerName1'),
playerName2 = document.getElementById('playerName2'),
playerSymbol1 = document.getElementById('playerSymbol1'),
playerSymbol2 = document.getElementById('playerSymbol2');


class Player {
    static player_number = 0;
    name= '';
    symbol= '';
    wins = 0;
    my_turn = false;
    constructor() {
        // Player.player_number++;
    }

    choose_name() {
        Player.player_number++;
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
    }
}

class Board{
    constructor() {
        this.list = [
            '','','',
            '','','',
            '','',''
        ];
    }

    display_board() {
        return this.list;
    }

    update_board(index, symbol) {
        if(!this.list[index]) this.list[index] = symbol;
    }

    reset_board() {
        this.list = [
            '','','',
            '','','',
            '','',''
        ];
    }

    board_isfull() {
        if(this.list[0] && this.list[1] && this.list[2] && this.list[3] && this.list[4] && this.list[5] && this.list[6] && this.list[7] && this.list[8]) {
            return true;
        } else {
            return false;
        }
    }
}

class Settings {}

class Game {
    static total_gaming = 0;
    constructor(gameType, gameTime, players) {
        this.players = {
            player1: players ? players.player1 : new Player(),
            player2: players ? players.player2 : new Player(),
        };
        this.board = new Board();
        this.game_type = gameType || 'human'; // pc or human
        this.game_time = gameTime || 140;
        Game.total_gaming++;
    }

    static game_logic_winor(board_list) {
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

    start_game(name1_ele,sym1_ele,name2_ele, sym2_ele, boxes) {
        if(this.game_type == 'human') {
            // get users info
            if(!this.players.player1.name || !this.players.player2.name) {
                this.players.player1.choose_name();
                this.players.player1.choose_symbol();
                this.players.player2.choose_name();
                this.players.player2.choose_symbol();
                name1_ele.innerText = this.players.player1.name;
                sym1_ele.innerText = this.players.player1.symbol;
                name2_ele.innerText = this.players.player2.name;
                sym2_ele.innerText = this.players.player2.symbol;
            }

            this.players.player1.my_turn = true;
            boxes.forEach(box => {
                box.addEventListener('click', async ()=> {
                    if(!this.board.list[box.dataset['index']]) { // if empty box >>
                        var symbolNow = this.players.player1.my_turn ? this.players.player1.symbol : this.players.player2.symbol;
                        this.board.update_board(box.dataset['index'], symbolNow);
                        box.innerText = this.board.list[box.dataset['index']];
                        console.log(this.board.display_board());

                        await sleep(200); // after 0.2 second do the rest

                        // check game before change the turns of players
                        // if win(return true that meaning end the game)
                        if(Game.game_logic_winor(this.board.list) || this.board.board_isfull()) {
                            this.end_game(this.players.player1.my_turn ? this.players.player1 : this.players.player2);
                        }

                        // change the turn of players
                        this.player_turn('my_turn');
                    }
                })
            })
        }
    }
    end_game(playerWon) {
        if(playerWon) {
            alert(`the Winner Player is ${playerWon.name}`);
        } else {
            alert('non Winner in this Game....');
        }
        var confirming = confirm('do you want to restart the game?');
        if(confirming) {
            this.restart_game();
        }else {
            this.game_result();
            hideShow('back');
        }
        // make all are empty to use again
        this.board.reset_board();
        this.player_turn('default');
        boxes_game.forEach(box => box.innerHTML = '');
    }
    restart_game() {
        Player.player_number = 0;
        var newGame = new Game(this.game_type, this.game_time, this.players);
        newGame.start_game(playerName1, playerSymbol1, playerName2, playerSymbol2, boxes_game);
    }
    game_result() {
        if(this.players.player1.wins > this.players.player2.wins) {
            alert(`the Winner Player is ${this.players.player1.name}`);
        } else if (this.players.player1.wins == this.players.player2.wins) {
            alert(`No one win, with total games: ${Game.total_gaming}`);
        } else {
            alert(`the Winner Player is ${this.players.player2.name}`);
        }
        Game.total_gaming = 0;
    }

    player_turn(what) {
        if(what == 'default') {
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
}
