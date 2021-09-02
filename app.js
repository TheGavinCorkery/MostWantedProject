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
      mainMenu(searchResults, people);
      break;
    case 'no':
      let namesOfPeople = '';
      let filter = promptFor('What do you want to look for? Enter gender, dob, height, weight, eyeColor, occupation', autoValid).toLowerCase();
      switch(filter){
        case 'gender':
          let genderOfPeople = searchByGender(people);
          for (let i = 0; i < genderOfPeople.length; i++) {
            namesOfPeople += `${genderOfPeople[i].firstName.toString()} ${genderOfPeople[i].lastName.toString()}, `;
          }
          alert(`People with this gender: ${namesOfPeople}`);
          break;
        case 'dob':
          //Call the function to filter based on date of birth
          let dobOfPeople = searchByDOB(people);
          for (let i = 0; i < dobOfPeople.length; i++) {
            namesOfPeople += `${dobOfPeople[i].firstName.toString()} ${dobOfPeople[i].lastName.toString()}, `;
          }
          alert(`People with this date of birth: ${namesOfPeople}`);
          break;
        case 'height':
          let heightOfPeople = searchByHeight(people);
          for (let i = 0; i < heightOfPeople.length; i++) {
            namesOfPeople += `${heightOfPeople[i].firstName.toString()} ${heightOfPeople[i].lastName.toString()}, `;
          }
          alert(`People with this height: ${namesOfPeople}`);
          break;
        case 'weight':
          let weightOfPeople = searchByWeight(people);
          for (let i = 0; i < weightOfPeople.length; i++) {
            namesOfPeople += `${weightOfPeople[i].firstName.toString()} ${weightOfPeople[i].lastName.toString()}, `;
          }
          alert(`People with this weight: ${namesOfPeople}`);
          break;
        case 'eyecolor':
          let peopleWithEyeColor = searchByEyeColor(people);
          for (let i = 0; i < peopleWithEyeColor.length; i++) {
            namesOfPeople += `${peopleWithEyeColor[i].firstName.toString()} ${peopleWithEyeColor[i].lastName.toString()}, `;
          }
          alert(`People with this color eyes: ${namesOfPeople}`);
          break;
        case 'occupation':
          //Call the function to filter based on occupation
          let occupationOfPeople = searchByOccupation(people);
          for (let i = 0; i < occupationOfPeople.length; i++) {
            namesOfPeople += `${occupationOfPeople[i].firstName.toString()} ${occupationOfPeople[i].lastName.toString()}, `;
          }
          alert(`People with this occupation: ${namesOfPeople}`);
          break;
      }
      break;
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for

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
    
    break;
    case "family":
      let children = findChildren(person[0].id, people);
      console.log(children);
      let spouse = findSpouse(person[0], people);
      console.log(spouse);
      let parents = findParents(person[0], people);
      console.log(parents);
    break;
    case "descendants":

      let descendants = findDescendants(person[0].id, people);
      console.log(descendants);
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

 


//unfinished function to search through an array of people to find matching eye colors. Use searchByName as reference.
function searchByEyeColor(people){
  let eyeColor = promptFor("What color eyes do you want to look for? Enter 'black', 'brown', 'hazel', 'blue', 'green", autoValid);
  let peopleWithEyeColor = people.filter(function(element) {
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
    let dobOfPeople = people.filter(function(element) {
      if (element.dob === filterDOB){
        return true;
      }
      else{
        return false;
      }
    });
    return dobOfPeople;
}

//TODO: add other trait filter functions here.

function searchByGender(people){
   let gender = promptFor("What gender do you want to look for? Male or female", autoValid);
   let genderOfPeople = people.filter(function(el){
     if (el.gender === gender) {
       return true;
     } else {
       return false;
     }

  });
  return genderOfPeople;
}

function searchByHeight(people){
  let height = promptFor("What height do you want to look for?", autoValid);
  let heightOfPeople = people.filter(function(el){
    if (el.height === height) {
      return true;
    } else {
      return false;
    }

 });
 return heightOfPeople;
}

function searchByWeight(people){
  let weight = promptFor("What weight do you want to look for?", autoValid);
  let weightOfPeople = people.filter(function(el){
    if (el.weight === weight) {
      return true;
    } else {
      return false;
    }

 });
 return weightOfPeople;
}

 
   
function searchByOccupation(people) {
  let filterOccupation = promptFor("What occupation do you want to search for?", autoValid);
   let occupationOfPeople = people.filter(function(el){
     if (el.occupation === filterOccupation) {
       return true;
     } else {
       return false;
     }


  });
  return occupationOfPeople;
}

//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region 


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
  // TODO: finish getting the rest of the information to display.
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

function findChildren (parentId, people) {
  let arrayOfChildren = people.filter(function(element) {
    for (let x = 0; x < element.parents.length; x++) {
      if (element.parents[x] == parentId){
        return true;
      } else {
        return false;
      }
    }
  });
  return arrayOfChildren;
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