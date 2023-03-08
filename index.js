//Variables
let wizardArray = [];
let friendArray = [];
let ratingValue;

//Event Listeners
document.addEventListener("DOMContentLoaded", () =>{
    function getWizards() {
        fetch("https://hp-api.onrender.com/api/characters")
        .then(resp => resp.json())
        .then(wizard => {
            for (let i =0; i<10; i++) {
                renderWizard(wizard[i]);
                showWizardProfile(wizard[0]);
                wizardArray.push(wizard[i]);
            }
        })
    }
    getWizards();
})

document.querySelector("#create-wizard").addEventListener("submit", handleSubmit);

document.querySelector("#sorter-friends").addEventListener("change", event => sortWizards(event, friendArray, renderFriend));

document.querySelector("#sorter").addEventListener("change", event=> sortWizards(event, wizardArray, renderWizard));

document.querySelector("#filter").addEventListener("change", event =>filterBy(event, wizardArray))

document.querySelector("#filter-friends").addEventListener("change", event => filterBy(event, friendArray) )

//Event Call Back Functions
function handleSubmit(event) {
    event.preventDefault();
    
    let wizardObj={};
    //if no house is selected
    if (document.querySelector("#house").value=== "") {
        let random = Math.floor(Math.random()*4)
        wizardObj.house = document.querySelectorAll(".house-option")[random].value;
    }
    //if a house is selected
    else {
        wizardObj.house =event.target[2].value;
    }

    wizardObj.name = event.target[0].value;
    wizardObj.gender = event.target[1].value;
    wizardObj.patronus= event.target[3].value;
    wizardObj.image= event.target[4].value;
    wizardArray.push(wizardObj);

    renderWizard(wizardObj);

    event.target.reset();
}

function editRatingComment(){
    document.querySelector("#container-for-edit-form").style.visibility = "visible";
}

function addFriend(wizard) {
    const myFriendPic = document.createElement("img");
    
    myFriendPic.id = `${wizard.id}`
    myFriendPic.className = "wizard-thumbnail";
    myFriendPic.src= wizard.image;
    myFriendPic.addEventListener("click", () => {
        showWizardProfile(wizard);
        document.querySelector("#del-btn").style.visibility="visible";
    });
    
    document.querySelector("#my-friends-here").appendChild(myFriendPic);
  
    friendArray.push(wizard);
    document.querySelector("#del-btn").style.visibility="visible";
}

function removeFriend(event, wizard) {
    document.querySelectorAll(".wizard-thumbnail").forEach(elem => {
        if (elem.id === wizard.id) {
            elem.remove();
        }
    })
    
}

function updateRatingComment(event, wizard) {
    event.preventDefault();
    let likeObj={};
    likeObj.id = wizard.id;
    likeObj.forName = wizard.name;

    function isEmptyComment() {
        if(event.target[5].value !== "") {
            document.querySelector("#comments").innerText = `Comments: ${event.target[5].value}`;
            likeObj.comment = event.target[5].value;
        }
    }
    
    if (document.querySelector("#rating").innerText.substring(8) === "undefined" && document.querySelector("#comments").innerText.substring(10) === "undefined"){
        getRadioRatings();
        likeObj.rating =ratingValue;
        
        isEmptyComment();
        postRatingComment(likeObj);
    }
    else {
        getRadioRatings();
        likeObj.rating =ratingValue;
        isEmptyComment();
        patchRatingComment(likeObj)
    } 
    event.target.reset();
}

function sortWizards(event, arr, foo) {
    let nameArray = [];
    arr.forEach(wizard => nameArray.push(wizard.name));
    let arrOfSortedNames = nameArray.sort();
    
    let arrOfSortedWizards =[];
    if (event.target.value === "name-a-z") {
        arrOfSortedNames.forEach(name => {
            arr.forEach(wizard => {
                if (wizard.name === name) {
                    arrOfSortedWizards.push(wizard);
                }
            })
        })
        if (foo === renderWizard) {
            document.querySelector("#wizard-pics-here").innerHTML = "";
        }
        if (foo === renderFriend) {
            document.querySelector("#my-friends-here").innerHTML = "";
        }
        arrOfSortedWizards.forEach(wizard => foo(wizard));
    }
    let reverseAlphabetical = nameArray.sort().reverse();
    if (event.target.value === "name-z-a") {
        reverseAlphabetical.forEach(name => {
            arr.forEach(wizard => {
                if (wizard.name === name) {
                    arrOfSortedWizards.push(wizard);
                }
            })
        })
        if (foo === renderWizard) {
            document.querySelector("#wizard-pics-here").innerHTML = "";
        }
        if (foo === renderFriend) {
            document.querySelector("#my-friends-here").innerHTML = "";
        }
        arrOfSortedWizards.forEach(wizard => foo(wizard));
    }
    
}

function filterBy(event, arr) {
    let filteredArr =[];
    if (event.target.value === "male") {
        arr.forEach(wizard => {
            if (wizard.gender === "male") {
                filteredArr.push(wizard);
                if (arr === wizardArray) {
                    document.querySelector("#wizard-pics-here").innerHTML = "";
                }
                if (arr === friendArray) {
                    document.querySelector("#my-friends-here").innerHTML = "";
                }
                
            }
        })

    }
    if (event.target.value === "female") {
        arr.forEach(wizard => {
            if (wizard.gender === "female") {
                filteredArr.push(wizard);
                if (arr === wizardArray) {
                    document.querySelector("#wizard-pics-here").innerHTML = "";
                }
                if (arr === friendArray) {
                    document.querySelector("#my-friends-here").innerHTML = "";
                }
            }
        })

    }
    if (event.target.value === "gryffindor") {
        arr.forEach(wizard => {
            if (wizard.house.toLowerCase() === "gryffindor") {
                filteredArr.push(wizard);
                if (arr === wizardArray) {
                    document.querySelector("#wizard-pics-here").innerHTML = "";
                }
                if (arr === friendArray) {
                    document.querySelector("#my-friends-here").innerHTML = "";
                }
            }
        })

    }
    if (event.target.value === "hufflepuff") {
        arr.forEach(wizard => {
            if (wizard.house.toLowerCase() === "hufflepuff") {
                filteredArr.push(wizard);
                if (arr === wizardArray) {
                    document.querySelector("#wizard-pics-here").innerHTML = "";
                }
                if (arr === friendArray) {
                    document.querySelector("#my-friends-here").innerHTML = "";
                }
            }
        })

    }
    if (event.target.value === "ravenclaw") {
        arr.forEach(wizard => {
            if (wizard.house.toLowerCase() === "ravenclaw") {
                filteredArr.push(wizard);
                if (arr === wizardArray) {
                    document.querySelector("#wizard-pics-here").innerHTML = "";
                }
                if (arr === friendArray) {
                    document.querySelector("#my-friends-here").innerHTML = "";
                }
            }
        })

    }
    if (event.target.value === "slytherin") {
        arr.forEach(wizard => {
            if (wizard.house.toLowerCase() === "slytherin") {
                filteredArr.push(wizard);
                if (arr === wizardArray) {
                    document.querySelector("#wizard-pics-here").innerHTML = "";
                }
                if (arr === friendArray) {
                    document.querySelector("#my-friends-here").innerHTML = "";
                }
            }
        })

    }
    filteredArr.forEach(wizard=>{
        if (arr === wizardArray) {
            renderWizard(wizard)
        }
        if (arr === friendArray) {
            renderFriend(wizard);
        }
    });
    document.querySelector("#sorter").addEventListener("change", event=> sortWizards(event, filteredArr, renderWizard));
    document.querySelector("#sorter-friends").addEventListener("change", event => sortWizards(event, filteredArr, renderFriend))
}

//Helper Functions
function renderWizard(wizard) {
    const wizardPicture = document.createElement("img");
    wizardPicture.src= wizard.image;
    wizardPicture.className="wizard-thumbnail";
    wizardPicture.addEventListener("click", () => showWizardProfile(wizard));
    document.querySelector("#wizard-pics-here").appendChild(wizardPicture);
}

function renderFriend(wizard) {
    const myFriendPic = document.createElement("img");
    myFriendPic.className = "wizard-thumbnail";
    myFriendPic.src= wizard.image;
    myFriendPic.addEventListener("click", () => showWizardProfile(wizard));
    document.querySelector("#my-friends-here").appendChild(myFriendPic);
}

function hasPatronus(wizard) {
    if(wizard.patronus !== "") {
        return wizard.patronus;
    } else {
        return "unknown";
    }
}

function getRadioRatings() {
    document.querySelectorAll(".radio").forEach(elem=>{
        if(elem.checked) {
            ratingValue= elem.value;
            document.querySelector("#rating").innerText= `Rating: ${ratingValue}`;
        }
    })
}

//Event Call Back Function && helper function
function showWizardProfile(wizard) {
    const profile = document.querySelector("#wizard-profile")
    profile.innerHTML=`
    <img src="${wizard.image}" class="profile-picture">
    <h2>${wizard.name}</h2>
    <p>${wizard.gender}</p>
    <p>House: ${wizard.house}<p>
    <p>Patronus: ${hasPatronus(wizard)}</p>
    <p id="rating"> Rating: <span id="num-rating">${getRatingsComments(wizard)}</span></p>
    <p id="comments"> Comments: ${getRatingsComments(wizard)}</p>
    <div id="container-for-edit-form">
        <form id="edit-form">
            <label>Rating: </label>
            <input class = "radio" type="radio" id="rating-input-1" name="rating-input" value="&#9734">
            <label for = "rating-input-1">&#9734</label>
            <input class = "radio" type="radio" id="rating-input-2" name="rating-input" value="&#9734 &#9734">
            <label for = "rating-input-2">&#9734 &#9734</label>
            <input class = "radio" type="radio" id="rating-input-3" name="rating-input" value="&#9734 &#9734 &#9734">
            <label for = "rating-input-3">&#9734 &#9734 &#9734</label>
            <input class = "radio" type="radio" id="rating-input-4" name="rating-input" value="&#9734 &#9734 &#9734 &#9734">
            <label for = "rating-input-4">&#9734 &#9734 &#9734 &#9734</label>
            <input class = "radio" type="radio" id="rating-input-5" name="rating-input" value="&#9734 &#9734 &#9734 &#9734 &#9734">
            <label for = "rating-input-5">&#9734 &#9734 &#9734 &#9734 &#9734</label>
            <br>
            <label for="comment-input">Comment: </label>
            <textarea id="comment-input" name="comment-input" placeholder="Comment"></textarea>
            <input type="submit" id="update-btn" value="Update">
        </form>
    </div>
    <button id="add-friend-btn">Add As Friend</button>
    <button id="edit-btn">Edit</button>
    <button id="del-btn">Remove Friend</button>
    `
    profile.querySelector("#edit-btn").addEventListener("click", editRatingComment);
    profile.querySelector("#add-friend-btn").addEventListener("click", () =>addFriend(wizard));
    profile.querySelector("#edit-form").addEventListener("submit", (event)=> updateRatingComment(event, wizard));
    profile.querySelector("#del-btn").addEventListener("click", (event) =>removeFriend(event,wizard));
}



//fetch functions

function patchRatingComment(likeObj){
    fetch(`http://localhost:3000/ratingsComments/${likeObj.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(likeObj)
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
}
function postRatingComment(likeObj) {
    fetch("http://localhost:3000/ratingsComments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(likeObj)
    })
    .then(resp=>resp.json())
    .then(data => console.log(data))
}


function getRatingsComments(wizard){
    fetch("http://localhost:3000/ratingsComments/")
    .then(resp => resp.json())
    .then(data=>data.forEach(elem=> showRatingComment(elem, wizard)))
}

function showRatingComment(data, wizard) {
    if (wizard.name === data.forName) {
        document.querySelector("#rating").innerText = `Rating: ${data.rating}`;
        document.querySelector("#comments").innerText = `Comments: ${data.comment}`;
    } 
}