$(document).ready(function(){

  isLoggedIn();

  $("#addToList").on("click", function(){
    addToList();
  });

  //Grab our Fat/Protein/Carbs from Nutrition facts loaded onto nutrition.handlebars
  let fat = $("#fat").text();
  fat = parseInt(fat);

  let protein = $("#protein").text();
  protein = parseInt(protein);

  let carbs = $("#carbs").text();
  carbs = parseInt(carbs);

  let item = $("#item").text();

  //Google Charts
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {

    var data = google.visualization.arrayToDataTable([
      ['Nutrient', 'Macro % Breakdown'],
      ['Fat ' + fat + ' g',     fat],
      ['Protein ' + protein + ' g',      protein],
      ['Carbs ' + carbs + ' g',  carbs]
    ]);

    var options = {
      title: 'Macronutrient Breakdown of ' + item,
      is3D: false,
      slices: {
        0: { color: '#FB484C' }, //red
        1: { color: '#9ACA28' }, //green
        2: { color: '#1276B9' } //blue
      }
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(data, options);
  }

});

function addToList(){
  let nutrition_id = parseInt($("#nutritionID").text());
  let user_id = parseInt($("#user_id").text());
  let nutrition_name = $("#item").text();

  console.log("Name:" + nutrition_name);
  console.log("Nutrition ID: " + nutrition_id);
  console.log("User ID: " + user_id);

  let obj = {
    nutrition_id: nutrition_id,
    user_id: user_id,
    nutrition_name: nutrition_name
  }

  $.ajax({
    type: "POST",
    url: "/nutrition",
    data: obj,
    dataType: "json",
    success: function(response) {
      if(response.error){
        console.log("This is already in your list!");
      }
      else{
        //alert("Added to your list!");
        console.log("Disabled add to list button.");
        $("#addToList").attr("disabled", "disabled");
        $("#addToList").text("Added to your list.");
      }
    },
    error: function(err){
      console.log(err);
    }
  });
}

function isItemInList(){
  let nutrition_id = parseInt($("#nutritionID").text());
  let user_id = parseInt($("#user_id").text());
  let nutrition_name = $("#item").text();

  let obj = {
    nutrition_id: nutrition_id,
    user_id: user_id,
    nutrition_name: nutrition_name
  }

  let url = "/nutrition/inmylist";

  $.ajax({
    type: "POST",
    url: url,
    data: obj,
    dataType: "json",
    success: function(response) {
      if(response.inmylist){
        $("#addToList").attr("disabled", "disabled");
        $("#addToList").text("Added to your list.");
        console.log("Disabled add to list button.");
      }
      else{
        //Do Nothing! You can add to your list.
      }
    },
    error: function(err){
      console.log(err);
    }
  });

}

function isLoggedIn(){
  console.log("USER ID: " + $("#user_id").text());
  //If user is not logged in.
  if($("#user_id").text() === ""){
    $("#addToList").attr("disabled", "disabled");
  }
  //Logged in, let's see if its in their list.
  else{
     isItemInList();
  }
}
