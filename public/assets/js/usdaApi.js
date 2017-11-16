$(document).ready(function(){
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
            var nameArr = dataArr[i].name.split('UPC: ');
            var title = nameArr[0].toLowerCase();
            title.charAt(0).toUpperCase();
            var content = nameArr[1];
            $('<div>')
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
                  .text(title),
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
  $('#searchBtn').on('click', function(){
    api.requestNutritions()
  });
  $(document).ajaxStart(function(){
    $('#loader').css('display', 'block');
  });
  //Hide loading spinner after ajax call is complete
  $(document).ajaxComplete(function(){
    $('#loader').css('display', 'none');
  });


});
