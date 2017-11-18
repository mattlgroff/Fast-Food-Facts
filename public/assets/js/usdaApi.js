$(document).ready(function(){
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  var api = {
    baseUrl: "https://api.nal.usda.gov/ndb/search/?format=json&max=20&offset=0&api_key=sEypfLXBh6IJ2K7npHuoolMvrfH48HALizvk1mUD",
    filters: [],
    getFilters: function(){
      $('.filters').on('click', function(){
        if($(this).is(':checked')){
          api.filters.push($(this).data());
        }
      })
    },
    /**
    * [Create Query String with filters and query plus the baseUrl]
    * @return {[String]} [BaseUrl String with query and filters]
    */
    toQueryString: function(){
      var query = $('#searchInput').val().trim();
      var queryStr = '';
      if (this.filters.length !== 0){
        for (var i in this.filters){
          queryStr += '&' +  Object.keys(this.filters[i]) + '=' + Object.values(this.filters[i]);
        }
        queryStr +=  '&' + "q=" + query;
      }
      else {
        queryStr = this.baseUrl + '&q=' + query;
      }
      return queryStr;
    },
    /**
    * [Ajax request from the API server]
    * @return {[JSON]} [Recipes Data]
    */
    requestNutritions: function(){
      $('#recipe-container').empty();
      $.ajax({
        url: this.toQueryString(),
        type: 'GET'
      }).done(function(data){
        if(data.list.total !== 0){
          var dataArr = data.list.item;
          $('#cardsContainer').empty();
          for(var i=0; i < dataArr.length; i++){
            var ndbno = dataArr[i].ndbno;
            var nameArr = dataArr[i].name.split('UPC: ');
            var title = nameArr[0].toLowerCase();
            var captializeTitle = capitalizeFirstLetter(title).substring(0, 60);
            captializeTitle.length === 60 ? captializeTitle += '...' : captializeTitle;
            if(nameArr[1]){
              var content = 'UPC: ' + nameArr[1];
            }
            $('<a>')
            .addClass('nutritionCard')
            .attr('href', '#')
            .data('ndbno', ndbno)
            .addClass('col-lg-4')
            .append(
              $('<div>')
              .addClass('card')
              .append(
                $('<div>')
                .addClass('card-block')
                .append(
                  $('<h4>')
                  .addClass('card-title')
                  .text(captializeTitle),
                  $('<p>')
                  .addClass('card-text')
                  .text(content)
                )
              )
            ).appendTo('#cardsContainer');
          }
        }
      });
    }
  }

  $('#cardsContainer').on('click', 'a.nutritionCard', function() {
      var ndbno = $(this).data().ndbno;
      var url = "https://api.nal.usda.gov/ndb/reports/V2?ndbno="+ndbno+"&type=b&format=json&api_key=sEypfLXBh6IJ2K7npHuoolMvrfH48HALizvk1mUD";
      console.log(url);
      $.ajax({
        url: url,
        method: "GET"
      }).then(function(results){
        console.log(results)
      })
  });


  $('#searchBtn').on('click', function(){
    api.requestNutritions()
  });
  $('#searchInput').on('keydown', function(event){
    if(event.which === 13){
      api.requestNutritions();
    }
  });
  $(document).ajaxStart(function(){
    $('.loader').css('display', 'block');
  });
  //Hide loading spinner after ajax call is complete
  $(document).ajaxComplete(function(){
    $('.loader').css('display', 'none');
  });


});
