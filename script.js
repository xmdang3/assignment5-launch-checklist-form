// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/

window.addEventListener("load", function () {
   let form = document.querySelector("form");
   form.addEventListener("submit", function (event) {
      event.preventDefault();
      event.stopPropagation();

      let pilotName = document.querySelector("input[name=pilotName]");
      let copilotName = document.querySelector("input[name=copilotName]");
      let fuelLevel = document.querySelector("input[name=fuelLevel]");
      let cargoMass = document.querySelector("input[name=cargoMass]");

      if (pilotName.value === "" || copilotName.value === "" || fuelLevel.value === "" || cargoMass.value === "") {
         alert("All Fields Are Required!")
      } else {
         launchStatusCheck(pilotName.value, copilotName.value, fuelLevel.value, cargoMass.value);
      }
      if (!(isNaN(pilotName.value))) {
         alert("Pilot Name Must Be A String!")
      }

      if (!(isNaN(copilotName.value))) {
         alert("Co-Pilot Name Must Be A String!")
      }

      if ((isNaN(fuelLevel.value))) {
         alert("Fuel Level Must Be A Number!")
      }

      if ((isNaN(cargoMass.value))) {
         alert("Cargo MAss Must Be A Number!")
      }

      console.log(event)
   })

   function launchStatusCheck(pilotNamer, copilotNamer, fuelLevelr, cargoMassr) {
      let launchStatus = document.querySelector("#launchStatus");
      let faultyItems = document.querySelector("#faultyItems");
      let pilotStatus = document.querySelector("#pilotStatus");
      let copilotStatus = document.querySelector("#copilotStatus")
      let fuelStatus = document.querySelector("#fuelStatus");
      let cargoStatus = document.querySelector("#cargoStatus")

      pilotStatus.innerHTML = `Pilot ${pilotNamer} is Ready!`;
      copilotStatus.innerHTML = `Co-Pilot ${copilotNamer} is Ready!`;
      fuelStatus.innerHTML = (fuelLevelr > 10000) ? "Fuel Level High Enough For Launch!" : "Fuel Level Not High Enough For Launch!";
      cargoStatus.innerHTML = (cargoMassr > 10000) ? "Cargo Mass Too High For Launch!" : "Margo Mass Low Enough For Launch!";

      if (fuelLevelr > 10000 && cargoMassr < 10000) {
         launchStatus.innerHTML = `Shuttle ready for launch`;
         launchStatus.style.color = "green"
      } else {
         launchStatus.innerHTML = `Shuttle is not ready for launch`;
         launchStatus.style.color = "red"
      }

      faultyItems.style.visibility = "visible"
   }

   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
      return response.json();
   }).then(function (jsonArray) {
      let index = 0;
      let missionTarget = document.querySelector("#missionTarget");
      missionTarget.addEventListener("click", function () {
         missionTarget.innerHTML = 
         `
         <h2>Mission Destination</h2>
         <ol>
            <li>Name: ${jsonArray[index].name}</li>
            <li>Diameter: ${jsonArray[index].diameter}</li>
            <li>Star: ${jsonArray[index].star}</li>
            <li>Distance from Earth: ${jsonArray[index].distance}</li>
            <li>Number of Moons: ${jsonArray[index].moons}</li>
         </ol>
         <img src="${jsonArray[index].image}">
         `;
         index = (index +1) % jsonArray.length;
      })
   })

})
