$(document).ready(function(){

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