let options = ["rock", "paper", "scissors"]
let options_div = document.querySelector(".options")
let container_div = document.querySelector(".container")
let heading = document.querySelector("h1")
let options_elements = {
    "rock": document.querySelector(".rock-option"),
    "paper": document.querySelector(".paper-option"),
    "scissors": document.querySelector(".scissors-option")
}
let user_score_el = document.querySelector(".user-score")
let computer_score_el = document.querySelector(".computer-score")
let scores = {'User': 0, 'Computer': 0, 'Tie': 0};
let play_again = document.querySelector(".play-again")
let btns = []

for (option of options) 
    btns.push(document.querySelector('.' + option))


function playOption(e) {
    let user_option = e.target.className;
    let computer_option = options[Math.floor(Math.random() * 3)];
    let selected_options = {'User': user_option, 'Computer': computer_option};
    play_again.style.visibility = "visible";
    result = getWinner(selected_options);
    displayResult(result, user_option, computer_option);    
    updateScore(result);
}


function getWinner(selected_options) {
    if (selected_options['User'] == "rock" && selected_options['Computer'] == "scissors")
        return "User";
    else if (selected_options['User'] == "paper" && selected_options['Computer'] == "rock")
        return "User";
    else if (selected_options['User'] == "scissors" && selected_options['Computer'] == "paper")
        return "User";
    else if (selected_options['User'] == selected_options['Computer'])
        return "Tie";  
            
    return "Computer"           
}

function displayResult(match_result, user_option, computer_option) {
    [result_el, user_option_el, computer_option_el] = displayChoices(user_option, computer_option);
    container_div.replaceChild(result_el, options_div);

    if (match_result == "User") {
        heading.textContent = "Winner is You!";
        user_option_el.children[1].classList.add("winner-wrapper");
        computer_option_el.children[1].classList.add("loser-wrapper");
        user_option_el.children[1].children[0].classList.add("winner");
        computer_option_el.children[1].children[0].classList.add("loser");
      
    }

    else if (match_result == "Computer") {
        heading.textContent = "Winner is Computer!";
        user_option_el.children[1].classList.add("loser-wrapper");
        computer_option_el.children[1].classList.add("winner-wrapper");
        user_option_el.children[1].children[0].classList.add("loser");
        computer_option_el.children[1].children[0].classList.add("winner");
    }

    else {
        heading.textContent = "Tie!";
    }
}

function displayChoices(user_option, computer_option) {
    result_el = document.createElement("div");
    let user_option_el = options_elements[user_option].cloneNode(true);
    let computer_option_el = options_elements[computer_option].cloneNode(true);
    result_el.classList.add("result-container");
    user_option_el.children[0].textContent = "YOU CHOSE " + user_option_el.children[0].textContent
    computer_option_el.children[0].textContent = "COMPUTER CHOSE " + computer_option_el.children[0].textContent
    
    result_el.appendChild(user_option_el);
    result_el.appendChild(computer_option_el);
    
    return [result_el, user_option_el, computer_option_el];
}

function updateScore(match_result) {
    scores[match_result] += 1;
    user_score_el.textContent = scores['User']
    computer_score_el.textContent = scores['Computer']
}

function resetScreen() {
    container_div.replaceChild(options_div, result_el)
    heading.textContent = "CHOOSE";
    play_again.style.visibility = "hidden";
}
btns.forEach(el => el.addEventListener("click", playOption));
play_again.addEventListener("click", resetScreen);
