$(document).ready(function(){

  $(".removeBtn").on("click", function(){
    let user_id = parseInt($("#user_id").text());
    let nutrition_id = $(this).attr('nutrition_id');
    nutrition_id = parseInt(nutrition_id);

    removeItem(user_id,nutrition_id);
  });

});

function removeItem(user_id,nutrition_id){
  let obj = {
    user_id: user_id,
    nutrition_id: nutrition_id
  }

  $.ajax({
    type: "DELETE",
    url: "/mylist",
    data: obj,
    dataType: "json",
    success: function(response) {
      location.reload();
    },
    error: function(err){
      console.log(err);
    }
  });
}