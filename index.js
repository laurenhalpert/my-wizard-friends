document.addEventListener("DOMContentLoaded", () =>{
    function getWizards() {
        fetch("https://hp-api.onrender.com/api/characters")
        .then(resp => resp.json())
        .then(wizard => {
            for (let i =0; i<10; i++) {
                renderWizard(wizard[i]);
                showWizardProfile(wizard[0])
            }
        })
    }
    getWizards();
})

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
    <p id="rating"> Rating: ${getRatingsComments(wizard)}</p>
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
    profile.querySelector("#add-friend-btn").addEventListener("click", addFriend);
    /*profile.querySelector("#update-btn").addEventListener("submit", event => {
        event.preventDefault();
        updateRatingComment(event);
    });*/
}
function editRatingComment(){
    document.querySelector("#container-for-edit-form").style.visibility = "visible";
}

function addFriend() {
    console.log("hi");
}

/*function updateRatingComment(event) {
    event.preventDefault();
    console.log(event);
}*/

/*function patchRatingComment(){
    fetch(`http://localhost:3000/ratingsComments`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(obj)
    })
    .then(resp => resp.json());
    .then(data => console.log(data));
}*/

function hasPatronus(wizard) {
    if(wizard.patronus !== "") {
        return wizard.patronus;
    } else {
        return "unknown";
    }
}

function getRatingsComments(wizard){
    fetch("http://localhost:3000/ratingsComments")
    .then(resp => resp.json())
    .then(data=>data.forEach(elem=> showRatingComment(elem, wizard)))
}

function showRatingComment(data, wizard) {
    if (wizard.name === data.forName) {
        document.querySelector("#rating").innerText = `Rating: ${data.rating}`;
        document.querySelector("#comments").innerText = `Comments: ${data.comment}`;
    } 
}