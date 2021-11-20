let post_it_container = document.querySelector(".post-it-notes");
let add_task_btn = document.querySelector('.add-task');
let task_inputbox = document.querySelector('.task-textbox');
let color_selectors = document.querySelectorAll('.color-selector');
let checkmark_btns = document.querySelectorAll(".checkmark-button")
let trash_btns = document.querySelectorAll(".trash-button")

function createPostIt(task) {
    let post_it_note = document.createElement("div");
    post_it_note.classList.add("post-it");
    post_it_note = createChildElements(post_it_note, task)
    return post_it_note
   
}

function createChildElements(post_it_note, task) {
    let pin_img = document.createElement("img");
    let post_it_task = document.createElement("div");
    let options_container = document.createElement("div");
    let btns_container = document.createElement("div");
    let checkmark_btn = document.createElement("input");
    let trash_btn = document.createElement("input");
    let color_selector = document.createElement("input");
    let eye_dropper = document.createElement("input")

    changeElementsProperties(task, post_it_task, pin_img, options_container, btns_container, eye_dropper, color_selector, checkmark_btn, trash_btn);
    addEventListeners(color_selector, checkmark_btn, trash_btn)

    btns_container.append(checkmark_btn, trash_btn);
   
    options_container.append(eye_dropper, color_selector, btns_container);
 
    post_it_note.append(pin_img, post_it_task, options_container);
    
    return post_it_note
}

function changeElementsProperties(...elements) {
    let [task, post_it_task, pin_img, options_container, btns_container, eye_dropper, color_selector, checkmark_btn, trash_btn] = elements;

    post_it_task.classList.add("task")
    post_it_task.textContent = task;

    pin_img.classList.add("pin-img")
    pin_img.height = 100;
    pin_img.width = 150;
    pin_img.src = "pin.png";
    
    options_container.classList.add("options-container")
    btns_container.classList.add("buttons-container")
    
    eye_dropper.classList.add("eye-dropper")
    eye_dropper.type = "image"
    eye_dropper.width = eye_dropper.height = 20
    eye_dropper.src = "eyedropper.png"
    
    color_selector.classList.add("color-selector")
    color_selector.type = "color"

    checkmark_btn.type = trash_btn.type = "image"
    checkmark_btn.classList.add("checkmark-button");    
    trash_btn.classList.add("trash-button");

    checkmark_btn.src = "checkmark.png"
    trash_btn.src = "trash.png"
   
}


function addEventListeners(...elements) {
    let [color_selector, checkmark_btn, trash_btn] = elements;
    color_selector.addEventListener("input", changePostItColor);
    checkmark_btn.addEventListener("click", markCompleted);
    trash_btn.addEventListener("click", deletePostIt);
}

function addPostIt() {
    let task = task_inputbox.value;
    task_inputbox.value = "";
    let post_it_note = createPostIt(task);
    post_it_container.append(post_it_note);
}

function changePostItColor(e) {
    color = e.target.value;
    post_it = e.target.parentElement.parentElement;
    post_it.style.backgroundColor = color;
}


function markCompleted(e) {
    let checkmark = e.target;
    let pin_img = checkmark.parentElement.parentElement.parentElement.firstElementChild;
    let post_it = checkmark.parentElement.parentElement.parentElement;

    if (checkmark.classList.toggle("completed")){
        pin_img.src = 'completed-pin.png'
        post_it.style.borderColor = "lightgreen"
    }
    else {
        pin_img.src = 'pin.png'
        post_it.style.borderColor = "black" 
    }
}

function deletePostIt(e) {
    let post_it = e.target.parentElement.parentElement.parentElement;
    post_it.remove();
}


add_task_btn.addEventListener("click", addPostIt);
color_selectors.forEach(el => el.addEventListener("input", changePostItColor))


