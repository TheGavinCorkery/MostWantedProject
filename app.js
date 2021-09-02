"use strict"


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

  let displayOption = promptFor("Found " + person[0].firstName + " " + person[0].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);

  switch(displayOption){
    case "info":
    // TODO: get person's info
      displayPerson(person[0]);
      break;
    case "family":
      let parents = findParents(person[0], people);
      let spouse = findSpouse(person[0], people);
      let siblings = findSiblings(person[0], people);
      printFamily(parents, spouse, siblings);
    break;
    case "descendants":
      let descendants = findDescendants(person[0].id, people);
      printDescendants(descendants);
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
  let firstName = promptFor("What is the person's first name?", autoValid);
  let lastName = promptFor("What is the person's last name?", autoValid);

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
  let numOfFilters = promptFor('How many items do you want to filter by?', autoValid);
  let filters = [];
  for (let x = 0; x < numOfFilters; x++) {
    let currentFilter = promptFor('What do you want to filter by? Enter gender, dob, height, weight, eyeColor, occupation.', autoValid).toLowerCase();
    filters += currentFilter;
    switch(currentFilter){
      case 'gender':
        let filteredGender = searchByGender(people);
        break;
      case 'dob':
        //Call the function to filter based on date of birth
        let filteredDOB = searchByDOB(people);
        break;
      case 'height':
        let filteredHeight = searchByHeight(people);
        break;
      case 'weight':
        let filteredWeight = searchByWeight(people);
        break;
      case 'eyecolor':
        let filteredEyeColor = searchByEyeColor(people);
        break;
      case 'occupation':
        //Call the function to filter based on occupation
        let filteredOccupation = searchByOccupation(people);
        break;
    }
  }

  

  return peopleFittingFilter;
}


//unfinished function to search through an array of people to find matching eye colors. Use searchByName as reference.
function searchByEyeColor(people){
  let eyeColor = promptFor("What color eyes do you want to look for? Enter 'black', 'brown', 'hazel', 'blue', 'green", autoValid);
  let peopleWithEyeColor = [];
  peopleWithEyeColor = people.filter(function(element) {
      if (element.eyeColor === eyeColor){
        return true;
      }
      else{
        return false;
      }
    });
  
  return peopleWithEyeColor;
}

function searchByDOB(people) {
  let filterDOB = promptFor("What date of birth do you want to search for?", autoValid);
  let peopleWithDOB = [];
  peopleWithDOB = people.filter(function(element) {
    if (element.dob === filterDOB){
      return true;
    }
    else{
      return false;
    }
  });

  return peopleWithDOB;
}

//TODO: add other trait filter functions here.

function searchByGender(people){
   let gender = promptFor("What gender do you want to look for? Male or female", autoValid);
   let genderOfPeople = [];

    genderOfPeople = people.filter(function(element) {
      if (element.gender === gender){
        return true;
      }
      else{
        return false;
      }
    });

  return genderOfPeople;
}

function searchByHeight(people){
  let heightFilter = promptFor("What height do you want to look for?", autoValid);
  let heightOfPeople = [];
    heightOfPeople = people.filter(function(element) {
      if (element.height === heightFilter){
        return true;
      }
      else{
        return false;
      }
    });

 return heightOfPeople;
}

function searchByWeight(people){
  let weightFilter = promptFor("What weight do you want to look for?", autoValid);
  let weightOfPeople = [];
    weightOfPeople = people.filter(function(element) {
      if (element.weight === weightFilter){
        return true;
      }
      else{
        return false;
      }
    });

 return weightOfPeople;
}

 
   
function searchByOccupation(people) {
  let filterOccupation = promptFor("What occupation do you want to search for?", autoValid);
  let peopleOfOccupation = [];
  
    peopleOfOccupation = people.filter(function(element) {
      if (element.occupation === filterOccupation){
        return true;
      }
      else{
        return false;
      }
    });
  
  return peopleOfOccupation;
}

//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region 

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
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Date of Birth: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  alert(personInfo);
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

function printDescendants(descendants) {
  let descendantsNames = '';
  for (let i = 0; i < descendants.length; i++) {
    if (i < descendants.length - 1){
      descendantsNames += `${descendants[i].firstName} ${descendants[i].lastName}, `;
    }else {
      descendantsNames += `${descendants[i].firstName} ${descendants[i].lastName}`;
    }
  }
  alert(descendantsNames);
}

function printFamily(parents, spouse, siblings) {
  let parentsNames = '';
  let spouseName = `${spouse[0].firstName} ${spouse[0].lastName}`;
  let siblingsNames = '';
  for (let i = 0; i < parents.length; i++) {
    if (i < parents.length - 1){
      parentsNames += `${parents[i].firstName} ${parents[i].lastName}, `;
    }else {
      parentsNames += `${parents[i].firstName} ${parents[i].lastName}`;
    }
  }
  for (let i = 0; i < siblings.length; i++) {
    if (i < siblings.length - 1){
      siblingsNames += `${siblings[i].firstName} ${siblings[i].lastName}, `;
    }else {
      siblingsNames += `${siblings[i].firstName} ${siblings[i].lastName}`;
    }
  }
  alert('Parents: ' + parentsNames + '  Spouse: ' + spouseName + '  Siblings: ' + siblingsNames);
}

function findChildren (person, people) {
  let children = people.filter(function(element) {
    for (let i =0; i < element.parents.length; i++){
      if (element.parents[i] == person.id){
        return true;
      } else {
        return false;
      }
    }
  });
  return children;
};

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
function autoValid(input){
  return true; // default validation only
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.
function customValidation(input){
  
}

//#endregion