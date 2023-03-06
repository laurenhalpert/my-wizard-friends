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
    <p id="rating"> Rating: ${getRatingsComments()}</p>
    <p id="comments"> Comments: ${getRatingsComments()}</p>
    <button>Add As Friend</button>
    <button>Edit</button>
    <button>Delete</button>
    `
}

function hasPatronus(wizard) {
    if(wizard.patronus !== "") {
        return wizard.patronus;
    } else {
        return "unknown";
    }
}

function getRatingsComments(){
    fetch("http://localhost:3000/ratingsComments")
    .then(resp => resp.json())
    .then(data=>data.forEach(elem=> showRatingComment(elem)))
}

function showRatingComment(data) {
    console.log(data);
    console.log(document.querySelector("#rating"));
    console.log(document.querySelector("#comments"));
    document.querySelector("#rating").innerText = `Rating: ${data.rating}`;
    document.querySelector("#comments").innerText = `Comments: ${data.comment}`;
}