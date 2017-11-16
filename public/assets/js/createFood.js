$( document ).ready(function() {
  $("#submit").on("click", function(){
    event.preventDefault();
    submitFunc();
  });
});

function submitFunc(){
  //Make a new obj 'newFood' and run values through functions
  let newFood = {
    "Name": checkForEmptyString("name"),
    "Serving Size": checkForEmptyString("servingSize"),
    "Calories": checkForEmptyInt("calories"),
    "Total Fat": checkForEmptyInt("totalFat"),
    "Saturated Fat": checkForEmptyInt("saturatedFat"),
    "Trans Fat": checkForEmptyInt("transFat"),
    "Cholesterol": checkForEmptyInt("cholesterol"),
    "Sodium": checkForEmptyInt("sodium"),
    "Total Carbohydrate": checkForEmptyInt("totalCarbohydrate"),
    "Dietary Fiber": checkForEmptyInt("dietaryFiber"),
    "Sugars": checkForEmptyInt("sugars"),
    "Protein": checkForEmptyInt("protein"),
    "Vitamin A": checkForEmptyInt("vitaminA"),
    "Vitamin C": checkForEmptyInt("vitaminC"),
    "Calcium": checkForEmptyInt("calcium"),
    "Iron": checkForEmptyInt("iron")
  }

  //Remove null values from the obj
  clean(newFood);

  //Debugging
  console.log(newFood);

  //Ajax Post Request to Server
  postToSerer(newFood);

}

function postToSerer(obj){
  $.ajax({
    type: "POST",
    url: window.location.href,
    data: obj,
    dataType: "json",
    success: function(response) {
      if (response.redirect) {
        console.log("Redirect URL: " + response.redirect_url);
        window.location.href = response.redirect_url;
        console.log(window.location.href);
      }
      else {
          emptyForm();
          alert("Sucessfully added to DB!");
      }
    }
  });
}

function checkForEmptyString(element){
  if($("#" + element).val().trim() === ""){
    return null;
  }
  else {
    let val = $("#" + element).val().trim();
    
    return val;
  }
}

function checkForEmptyInt(element){
  if($("#" + element).val().trim() === ""){
    return null;
  }
  else {
    let val = $("#" + element).val().trim();
    parseInt(val);

    return val;
  }
}

function clean(obj) {
  for (var propName in obj) { 
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
}

function emptyForm(){
  $("#name").empty();
  $("#servingSize").empty();
  $("#calories").empty();
  $("#protein").empty();
  $("#totalFat").empty();
  $("#totalCarbohydrate").empty();
}