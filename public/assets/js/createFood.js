$(document).ready(function(){
  $("#submit").on("click", function(){
    event.preventDefault();
    submitFunc();
  }
});

function submitFunc(){
  //Check for Null Values
  let newFood = {
    "Name": checkForUndefined(name),
    "Serving Size": checkForUndefined(servingSize),
    "Calories": checkForUndefined(calories),
    "Total Fat": checkForUndefined(totalFat),
    "Saturated Fat": checkForUndefined(saturatedFat),
    "Trans Fat": checkForUndefined(transFat),
    "Cholesterol": checkForUndefined(cholesterol),
    "Sodium": checkForUndefined(sodium),
    "Total Carbohydrate": checkForUndefined(totalCarbohydrate),
    "Dietary Fiber": checkForUndefined(dietaryFiber),
    "Sugars": checkForUndefined(sugars),
    "Protein": checkForUndefined(protein),
    "Vitamin A": checkForUndefined(vitaminA),
    "Vitamin C": checkForUndefined(vitaminC),
    "Calcium": checkForUndefined(calcium),
    "Iron": checkForUndefined(iron)
  }

  console.log(newFood);

}

function checkForUndefined(element){
  if($("#" + element).val().trim() === undefined){
    return null
  }
  else {
    return $("#" + element).val().trim()
  }
}