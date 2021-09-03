"use strict"

const container = document.getElementById('container')
//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region 
// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      let filteredArray = searchByCriteria(people);
      displayFilterNames(filteredArray);
      app(people);
      break;
    default:
      app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}
// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = promptFor("Found " + person[0].firstName + " " + person[0].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", displayValid);

   switch(displayOption){
     case "info":
     // TODO: get person's info
       displayPerson(person[0]);
       showImage(person[0].gender);
       break;
     case "family":
       let parents = findParents(person[0], people);
       let spouse = findSpouse(person[0], people);
       let siblings = findSiblings(person[0], people);
       printFamily(parents, spouse, siblings);
     break;
     case "descendants":
       let descendants = findDescendants(person[0].id, people);
       let descendantsNames = '';
       printDescendants(descendants, descendantsNames);
       break;
     case "restart":
       app(people); // restart
       break;
     case "quit":
       return; // stop execution
     default:
       return mainMenu(person, people); // ask again
   }
 }

//#endregion

//Filter functions.
//Ideally you will have a function for each trait.
/////////////////////////////////////////////////////////////////
//#region 

//nearly finished function used to search through an array of people to find matching first and last name and return a SINGLE person object.
function searchByName(people){

  let firstName = promptFor("What is the person's first name?", nameValidation);
  let lastName = promptFor("What is the person's last name?", nameValidation);

  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.firstName === firstName && potentialMatch.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person single person object using the name they entered.
  return foundPerson;
}
function searchByCriteria(people) {
  let numOfFilters = promptFor('How many filters do you want to use?', filterValidation);
  let namesOfPeople = [];
  for (let x = 0; x < numOfFilters; x++) {
    let filter = promptFor('What do you want to look for? Enter gender, dob, height, weight, eyeColor, occupation. If no other criteria, enter done', filterOptionValid).toLowerCase();
    switch(filter){
      case 'gender':
        namesOfPeople = searchByGender(people, namesOfPeople);
        break;
      case 'dob':
        //Call the function to filter based on date of birth
        namesOfPeople = searchByDOB(people, namesOfPeople);
        break;
      case 'height':
        namesOfPeople = searchByHeight(people, namesOfPeople);
        break;
      case 'weight':
        namesOfPeople = searchByWeight(people, namesOfPeople);

        break;
      case 'eyecolor':
        namesOfPeople = searchByEyeColor(people, namesOfPeople);
        
        break;
      case 'occupation':
        //Call the function to filter based on occupation
        namesOfPeople = searchByOccupation(people, namesOfPeople);
        
        break;
      case 'done':
        break;
    }
  }
  
  return namesOfPeople;
}


//unfinished function to search through an array of people to find matching eye colors. Use searchByName as reference.
function searchByEyeColor(people, namesOfPeople){
  let eyeColor = promptFor("What color eyes do you want to look for? Enter 'black', 'brown', 'hazel', 'blue', 'green", eyeColorValid).toLowerCase();
  let peopleWithEyeColor;
  if (namesOfPeople.length > 0) {
    peopleWithEyeColor = namesOfPeople.filter(function(element) {
      if (element.eyeColor == eyeColor){
        return true;
      }
      else{
        return false;
      }
    });
  }else {
    peopleWithEyeColor = people.filter(function(element) {
      if (element.eyeColor == eyeColor){
        return true;
      }
      else{
        return false;
      }
    });
  }
  return peopleWithEyeColor;
}

function searchByDOB(people, namesOfPeople) {
  let filterDOB = promptFor("What date of birth do you want to search for?", dobValid);
  let peopleWithDOB;
  if (namesOfPeople.length > 0) {
    peopleWithDOB = namesOfPeople.filter(function(element) {
      if (element.dob == filterDOB){
        return true;
      }
      else{
        return false;
      }
    });
  }else {
    peopleWithDOB = people.filter(function(element) {
      if (element.dob == filterDOB){
        return true;
      }
      else{
        return false;
      }
    });
  }
    return peopleWithDOB;
}

//TODO: add other trait filter functions here.

function searchByGender(people, namesOfPeople){
   let gender = promptFor("What gender do you want to look for? Male or female", genderValidation).toLowerCase();
   let genderOfPeople;
  if (namesOfPeople.length > 0) {
    genderOfPeople = namesOfPeople.filter(function(element) {
      if (element.gender == gender){
        return true;
      }
      else{
        return false;
      }
    });
  }else {
    genderOfPeople = people.filter(function(element) {
      if (element.gender == gender){
        return true;
      }
      else{
        return false;
      }
    });
  }
  return genderOfPeople;
}

function searchByHeight(people, namesOfPeople){
  let heightFilter = promptFor("What height do you want to look for?", heightValid);
  let heightOfPeople;
  if (namesOfPeople.length > 0) {
    heightOfPeople = namesOfPeople.filter(function(element) {
      if (element.height == heightFilter){
        return true;
      }
      else{
        return false;
      }
    });
  }else {
    heightOfPeople = people.filter(function(element) {
      if (element.height == heightFilter){
        return true;
      }
      else{
        return false;
      }
    });
  }
 return heightOfPeople;
}

function searchByWeight(people, namesOfPeople){
  let weightFilter = promptFor("What weight do you want to look for?", weightValidation);
  let weightOfPeople;
  if (namesOfPeople.length > 0) {
    weightOfPeople = namesOfPeople.filter(function(element) {
      if (element.weight == weightFilter){
        return true;
      }
      else{
        return false;
      }
    });
  }else {
    weightOfPeople = people.filter(function(element) {
      if (element.weight == weightFilter){
        return true;
      }
      else{
        return false;
      }
    });
  }
 return weightOfPeople;
}

 
   
function searchByOccupation(people, namesOfPeople) {
  let filterOccupation = promptFor("What occupation do you want to search for?", occupationValid).toLowerCase();
  let peopleOfOccupation;
  if (namesOfPeople.length > 0) {
    peopleOfOccupation = namesOfPeople.filter(function(element) {
      if (element.occupation == filterOccupation){
        return true;
      }
      else{
        return false;
      }
    });
  }else {
    peopleOfOccupation = people.filter(function(element) {
      if (element.occupation == filterOccupation){
        return true;
      }
      else{
        return false;
      }
    });
  }
  return peopleOfOccupation;
}

//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region 

function display(functToRun) {
  functToRun();
}

function displayFilterNames(filteredArray) {
  let filteredArrayNames = '';
  for (let i = 0; i < filteredArray.length; i++) {
    filteredArrayNames += `${filteredArray[i].firstName} ${filteredArray[i].lastName}, `
  }
  alert(`People fitting your filter: ${filteredArrayNames}`);
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.

  let personInfo = "<br>First Name: " + person.firstName + "\n";
  personInfo += "<br>Last Name: " + person.lastName + "\n";
  personInfo += "<br>Gender: " + person.gender + "\n";
  personInfo += "<br>Date of Birth: " + person.dob + "\n";
  personInfo += "<br>Height: " + person.height + "\n";
  personInfo += "<br>Weight: " + person.weight + "\n";
  personInfo += "<br>Eye Color: " + person.eyeColor + "\n";
  personInfo += "<br>Occupation: " + person.occupation + "\n";

  let paragraph = document.createElement('p');
  paragraph.innerHTML = personInfo;
  document.body.appendChild(paragraph);
  // document.getElementById("descendants").innerHTML = personInfo;
  // alert(personInfo);
}


function findDescendants (parentId, people) {
  let arrayOfDescendants = people.filter(function(element) {
    for (let x = 0; x < element.parents.length; x++) {
      if (element.parents[x] == parentId){
        return element.id;
      }
    }    
  })

  let grandkids = people.filter(function(element) {
    for (let i = 0; i < arrayOfDescendants.length; i++) {
      for (let x = 0; x < arrayOfDescendants.length; x++) {
        if (element.parents[i] == arrayOfDescendants[x].id){
          return element.id;
        }
    }
    }
  })
  for (let x = 0; x < grandkids.length; x++) {
    arrayOfDescendants.push(grandkids[x]);
  }

  return arrayOfDescendants;
}

function printDescendants(descendants, descendantsNames) {

  if (descendants.length > 0) {
    descendantsNames += `${descendants[0].firstName} ${descendants[0].lastName}, `;
    descendants.splice(0, 1);
    return printDescendants(descendants, descendantsNames);
  }else {
    if (descendantsNames == '') {
      let paragraph = document.createElement('p');
      paragraph.innerHTML = 'This person has no descendants';
      document.body.appendChild(paragraph);
    }else {
      let paragraph = document.createElement('p');
      paragraph.innerHTML = descendantsNames;
      document.body.appendChild(paragraph);
      // alert(descendantsNames);
    }
  }

}

function printFamily(parents, spouse, siblings) {
  let parentsNames = '';
  let spouseName = '';
  let siblingsNames = '';
  
  if (parents.length == 0) {
    parentsNames = 'None';
  } else {
    for (let i = 0; i < parents.length; i++) {
      if (i < parents.length - 1){
        parentsNames += `${parents[i].firstName} ${parents[i].lastName}, `;
      }else {
        parentsNames += `${parents[i].firstName} ${parents[i].lastName}`;
      }
    }
  }
  if (spouse.length == 0) {
    spouseName = 'None';
  } else {
    spouseName = `${spouse[0].firstName} ${spouse[0].lastName}`
  }
  if (siblings.length == 0) {
    siblingsNames = 'None';
  } else {
    for (let i = 0; i < siblings.length; i++) {
      if (i < siblings.length - 1){
        siblingsNames += `${siblings[i].firstName} ${siblings[i].lastName}, `;
      }else {
        siblingsNames += `${siblings[i].firstName} ${siblings[i].lastName}`;
      }
    }
  }
  
  let paragraph = document.createElement('p');
  paragraph.innerHTML = 'Parents: ' + parentsNames;
  paragraph.innerHTML += '<br>Spouse: ' + spouseName;
  paragraph.innerHTML += '<br>Siblings: ' + siblingsNames;
  document.body.appendChild(paragraph);
  // alert('Parents: ' + parentsNames + '   Spouse: ' + spouseName + '   Siblings: ' + siblingsNames);
}

function findParents (person, people) {
  let parents = people.filter(function(element) {
      if (element.id == person.parents){
        return true;
      } else {
        return false;
      } 
  });
  return parents;
};

function findSpouse (person, people) {
  let spouse = people.filter(function(element) {
      if (element.id == person.currentSpouse){
        return true;
      } else {
        return false;
      }
  });
  return spouse;
};

function findSiblings (person, people) {
  let siblings = people.filter(function(element) {
    for (let i =0; i < element.parents.length; i++){
      for (let j =0; j < person.parents.length; j++){
        if (element.parents[i] == person.parents[j] && element.id != person.id){
          return true;
        } else {
          return false;
        }
      }
    }
  });
  return siblings;
};
//#endregion



//Validation functions.
//Functions to validate user input.
/////////////////////////////////////////////////////////////////
//#region 

//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).
function promptFor(question, valid){
  let isValid = false;
  do{
    var response = prompt(question).trim();
    isValid = valid(response);
  } while(response === ""  ||  isValid === false)
  return response;
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input){
  if(input.toLowerCase() == "yes" || input.toLowerCase() == "no"){
    return true;
  }
  else{
    return false;
  }
}

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
// function autoValid(input){
//   return true; // default validation only
// }

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.
function nameValidation(input){
  let numbers = "0123456789`~!@#$%^&*()-_=+[{]}|;:',<.>/?";
  if (input.length < 1 || input.length > 50) {
    return false;
  }
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < numbers.length; j++) {
      if(input[i] == numbers[j]) {
        return false;
      }
    }
  }
  return true;
}
function filterValidation(input) {
  if (input >= 1 && input <= 5 && Number.isInteger(parseInt(input, 10)) === true) {
    return true;
  }else{
    alert('Please enter 1-5.');
    return false;
  }
}
function genderValidation(input) {
  if (input.toLowerCase() === 'male' || input.toLowerCase() === 'female') {
    return true;
  }else{
    alert('Please enter male or female.');
    return false;
  }
}
function weightValidation(input) {
  if (input >= 80 && input <= 800 && Number.isInteger(parseInt(input, 10)) === true) {
    return true;
  }else{
    alert('Please enter a valid weight.');
    return false;
  }
}
function displayValid(input) {
  if (input.toLowerCase() === 'info' || input.toLowerCase() === 'descendants' || input.toLowerCase() === 'family' || input.toLowerCase() === 'restart' || input.toLowerCase() === 'quit') {
    return true;
  }else{
    alert('Please enter a valid option.');
    return false;
  }
}

function filterOptionValid(input) {
  if (input.toLowerCase() === 'gender' || input.toLowerCase() === 'dob' || input.toLowerCase() === 'height' || input.toLowerCase() === 'weight' || input.toLowerCase() === 'eyecolor' || input.toLowerCase() === 'occupation') {
    return true;
  }else {
    alert('Please enter a valid option.');
    return false;
  }
}
function eyeColorValid(input){
  let numbers = "0123456789`~!@#$%^&*()-_=+[{]}|;:',<.>/?";
  if (input.length < 1 || input.length > 30) {
    alert('Please enter a valid option.')
    return false;
  }
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < numbers.length; j++) {
      if(input[i] == numbers[j]) {
        alert('Please enter a valid option.')
        return false;
      }
    }
  }
  if (input.toLowerCase() === 'black' || input.toLowerCase() === 'brown' || input.toLowerCase() === 'hazel' || input.toLowerCase() === 'blue' || input.toLowerCase() === 'green') {
    return true;
  } else {
    alert('That eye color is not in the database.');
    return false;
  }
}

function dobValid(input) {
  if (input.length > 10 || input.length < 9) {
    alert('Please enter a valid date of birth.');
    return false;
  }
  return true;
}

function heightValid(input) {
  if (input > 100 || input < 0) {
    alert('Please enter a valid height.');
    return false;
  }
  for (let i = 0; i < input.length; i++) {
    if (input.charCodeAt(i) > 57 || input.charCodeAt(i) < 48) {
      alert('Please enter a valid height.');
      return false;
    }
  }
  return true;
}

function occupationValid(input) {
  if (input.toLowerCase() === 'programmer' || input.toLowerCase() === 'assisstant' || input.toLowerCase() === 'landscaper' || input.toLowerCase() === 'nurse' || input.toLowerCase() === 'student' || input.toLowerCase() === 'architect' || input.toLowerCase() === 'doctor' || input.toLowerCase() === 'politician') {
    return true;
  }else {
    alert('Please enter a valid option.');
    return false;
  }
}

function showImage(gender) {
  let image = document.createElement("img");
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  if (gender == 'male') {
    
    image.src = 'https://images.pexels.com/photos/775358/pexels-photo-775358.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260';
    image.style.height = '500px';
    image.style.width = '300px';
  }else{
    image.src = 'https://images.pexels.com/photos/9345708/pexels-photo-9345708.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260';
    image.style.height = '500px';
    image.style.width = '300px';
  }

  container.appendChild(image);

}