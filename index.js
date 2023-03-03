document.addEventListener("DOMContentLoaded", () =>{
    function getWizards() {
        fetch("https://hp-api.onrender.com/api/characters")
        .then(resp => resp.json())
        .then(wizard => {
            for (let i =0; i<10; i++) {
                renderWizard(wizard[i]);
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
    const profilePicture = document.querySelector("#placeholder");
    const name = document.createElement("h2");
    const gender = document.createElement("p");
    const house = document.createElement("p");
    const patronus = document.createElement("p");
    
    profilePicture.src = wizard.image;
    name.innerText = wizard.name;
    gender.innerText= wizard.gender;
    house.innerText = `House: ${wizard.house}`;
    patronus.innerText = `Patronus: ${wizard.patronus}`;
    
    const profile = document.querySelector("#wizard-profile")
    profile.appendChild(name);
    profile.appendChild(gender);
    profile.appendChild(house);
    profile.appendChild(patronus);
}
