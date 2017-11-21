$(document).ready(function(){

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
  let nutrition_id = parseInt( $("#nutrition_id").text() );
  let user_id = parseInt( $("#user_id").text() );

  console.log("ID: " + nutrition_id);

  let obj = {
    nutrition_id: nutrition_id,
    user_id: user_id
  }

  $.ajax({
    type: "POST",
    url: "/nutrition",
    data: obj,
    dataType: "json",
    success: function(response) {
      alert("Added to your list!");
    }
  });
}