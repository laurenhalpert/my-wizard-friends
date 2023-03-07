let wizardArray = [];
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
function handleSubmit(event) {
    event.preventDefault();
    let wizardObj={};
    wizardObj.name = event.target[0].value;
    wizardObj.gender = event.target[1].value;
    wizardObj.house = event.target[2].value;
    wizardObj.patronus= event.target[3].value;
    wizardObj.image= event.target[4].value;
    wizardArray.push(wizardObj);
    renderWizard(wizardObj);
}

function renderWizard(wizard) {
    const wizardPicture = document.createElement("img");
    wizardPicture.src= wizard.image;
    wizardPicture.className="wizard-thumbnail";
    wizardPicture.addEventListener("click", () => showWizardProfile(wizard));
    document.querySelector("#wizard-pics-here").appendChild(wizardPicture);
}

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
            <label for="rating-input">Rating: </label>
            <input type="text" id="rating-input" name="rating-input" placeholder="Rating">
            <label for="comment-input">Comment: </label>
            <textarea id="comment-input" name="comment-input" placeholder="Comment"></textarea>
            <input type="submit" id="update-btn" value="Update">
        </form>
    </div>
    <button id="add-friend-btn">Add As Friend</button>
    <button id="edit-btn">Edit</button>
    <button id="del-btn">Delete</button>
    `
    profile.querySelector("#edit-btn").addEventListener("click", editRatingComment);
    profile.querySelector("#add-friend-btn").addEventListener("click", () =>addFriend(wizard));
    profile.querySelector("#edit-form").addEventListener("submit", (event)=> updateRatingComment(event, wizard));
}
function editRatingComment(){
    document.querySelector("#container-for-edit-form").style.visibility = "visible";
}

function addFriend(wizard) {
    const myFriendPic = document.createElement("img");
    myFriendPic.className = "wizard-thumbnail";
    myFriendPic.src= wizard.image;
    myFriendPic.addEventListener("click", () => showWizardProfile(wizard));
    document.querySelector("#my-friends-here").appendChild(myFriendPic);
}


function updateRatingComment(event, wizard) {
    event.preventDefault();
    let likeObj={};
    likeObj.id = wizard.id;
    likeObj.forName = wizard.name;
    if (document.querySelector("#rating").innerText.substring(8) === "undefined" && document.querySelector("#comments").innerText.substring(10) === "undefined"){
        if (event.target[0].value !== ""){
            document.querySelector("#rating").innerText= `Rating: ${event.target[0].value}`;
            likeObj.rating = event.target[0].value;
        }
        if(event.target[1].value !== "") {
            document.querySelector("#comments").innerText = `Comments: ${event.target[1].value}`;
            likeObj.comment = event.target[1].value;
            
        }

        postRatingComment(likeObj);
    }
    else {
        if (event.target[0].value !== ""){
            document.querySelector("#rating").innerText= `Rating: ${event.target[0].value}`;
            likeObj.rating = event.target[0].value;
        }
        if(event.target[1].value !== "") {
            document.querySelector("#comments").innerText = `Comments: ${event.target[1].value}`;
            likeObj.comment = event.target[1].value;
            
        }
        patchRatingComment(likeObj)
    } 
    
}

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

function hasPatronus(wizard) {
    if(wizard.patronus !== "") {
        return wizard.patronus;
    } else {
        return "unknown";
    }
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

document.querySelector("#sorter").addEventListener("change", event=> sortWizards(event));

function sortWizards(event) {
    let nameArray = [];
    wizardArray.forEach(wizard => nameArray.push(wizard.name));
    let arrOfSortedNames = nameArray.sort();
    
    let arrOfSortedWizards =[];
    if (event.target.value === "name-a-z") {
        arrOfSortedNames.forEach(name => {
            wizardArray.forEach(wizard => {
                if (wizard.name === name) {
                    arrOfSortedWizards.push(wizard);
                }
            })
        })
        document.querySelector("#wizard-pics-here").innerHTML = "";
        arrOfSortedWizards.forEach(wizard => renderWizard(wizard));
    }

}




/*function sortWizards(event) {
    let nameArray = [];
    let arrOfSortedWizards =[];
    fetch("https://hp-api.onrender.com/api/characters")
    .then(resp=>resp.json())
    .then(wizard => {
        for(let i=0; i<10; i++) {
            nameArray.push(wizard[i].name);
            
        }
        let sortedNames = nameArray.sort();
        if(event.target.value === "name-a-z"){
            sortedNames.forEach(name=> {
                for (let i=0; i< 10; i++) {
                    if(name === wizard[i].name){
                        arrOfSortedWizards.push(wizard[i]);
                    }
                }
            })
            document.querySelector("#wizard-pics-here").innerHTML = "";
            arrOfSortedWizards.forEach(wizard => renderWizard(wizard));
        }
        let reverseAlphabetical = sortedNames.reverse();
        if (event.target.value === "name-z-a") {
            reverseAlphabetical.forEach(name=> {
                for (let i=0; i< 10; i++) {
                    if(name === wizard[i].name){
                        arrOfSortedWizards.push(wizard[i]);
                    }
                }
            })
            document.querySelector("#wizard-pics-here").innerHTML = "";
            arrOfSortedWizards.forEach(wizard => renderWizard(wizard));
        }
        
    })
}*/

document.querySelector("#filter").addEventListener("change", event =>filterBy(event))
function filterBy(event) {
    console.log(event.target.value.toLowerCase());
    if (event.target.value === "male"){
        wizardArray.forEach(wizard=> {
            if (wizard.gender === "male") {
                document.querySelector("#wizard-pics-here").innerHTML = "";
            }
        })
        fetch ("https://hp-api.onrender.com/api/characters")
        .then (resp=>resp.json())
        .then(wizard => {
            for (let i=0; i<10; i++) {
                if (wizard[i].gender === "male") {
                    renderWizard(wizard[i]);
                }
            }
        })
    }
    if (event.target.value === "female"){
        wizardArray.forEach(wizard=> {
            if (wizard.gender === "female") {
                document.querySelector("#wizard-pics-here").innerHTML = "";
            }
        })
        fetch ("https://hp-api.onrender.com/api/characters")
        .then (resp=>resp.json())
        .then(wizard => {
            for (let i=0; i<10; i++) {
                if (wizard[i].gender === "female") {
                    renderWizard(wizard[i]);
                }
            }
        })
    }
    if (event.target.value === "gryffindor"){
        wizardArray.forEach(wizard=> {
            if (wizard.house.toLowerCase() === "gryffindor") {
                document.querySelector("#wizard-pics-here").innerHTML = "";
            }
        })
        fetch ("https://hp-api.onrender.com/api/characters")
        .then (resp=>resp.json())
        .then(wizard => {
            for (let i=0; i<10; i++) {
                if (wizard[i].house.toLowerCase() === "gryffindor") {
                    renderWizard(wizard[i]);
                }
            }
        })
    }
    if (event.target.value === "hufflepuff"){
        wizardArray.forEach(wizard=> {
            if (wizard.house.toLowerCase() === "hufflepuff") {
                document.querySelector("#wizard-pics-here").innerHTML = "";
            }
        })
        fetch ("https://hp-api.onrender.com/api/characters")
        .then (resp=>resp.json())
        .then(wizard => {
            for (let i=0; i<10; i++) {
                if (wizard[i].house.toLowerCase() === "hufflepuff") {
                    renderWizard(wizard[i]);
                }
            }
        })
    }
    if (event.target.value === "ravenclaw"){
        wizardArray.forEach(wizard=> {
            if (wizard.house.toLowerCase() === "ravenclaw") {
                document.querySelector("#wizard-pics-here").innerHTML = "";
            }
        })
        fetch ("https://hp-api.onrender.com/api/characters")
        .then (resp=>resp.json())
        .then(wizard => {
            for (let i=0; i<10; i++) {
                if (wizard[i].house.toLowerCase() === "ravenclaw") {
                    renderWizard(wizard[i]);
                }
            }
        })
    }
    if (event.target.value === "slytherin"){
        wizardArray.forEach(wizard=> {
            if (wizard.house.toLowerCase() === "slytherin") {
                document.querySelector("#wizard-pics-here").innerHTML = "";
            }
        })
        fetch ("https://hp-api.onrender.com/api/characters")
        .then (resp=>resp.json())
        .then(wizard => {
            for (let i=0; i<10; i++) {
                if (wizard[i].house.toLowerCase() === "slytherin") {
                    renderWizard(wizard[i]);
                }
            }
        })
    }
}