$(function() {
  //Gets the button 
  $('#get-button').on('click', function() {
       //get all user ids and display them
        $.ajax({
         url: '/tweets',
         contentType: 'application/json',
         success: function(response) {
           
            var nameBody = $('#namebody');
            nameBody.html('');
            response.tweetinfo.forEach(function(tweet){ 
            nameBody.append(`\<tr>\ <td class = "id">` + tweet.user.id + `</td>\
             <td><input type = "screen_name" class = "screen_name" value= "` + tweet.user.screen_name + `"></td>\
             <td><input type = "name" class = "name" value= "` + tweet.user.name + `"></td>\
            </tr>\
            `);
            });
           }
        });
  });

   //Get tweets
   $('#get-tweets-button').on('click', function(){
       //get tweet info and display it
       $.ajax({
        url: '/tweetinfo',
        contentType: 'application/json',
        success: function(response) {
          console.log(response);
           var tweetBody = $('#tweetbody');
           tweetBody.html('');
           response.tweetinfo.forEach(function(tweetinf){ 
            tweetBody.append(`\<tr>\ <td class = "id">` + tweetinf.id_str + `</td>\
            <td><input type = "text" class = "Text" value= "` + tweetinf.text + `"></td>\
            <td><input type = "created_at" class = "created_at" value= "` + tweetinf.created_at + `"></td>\
           </tr>\
           `);
           });
          }
       });
   });

   //obtains the searched tweets and displays them 
   $('#get-searched-tweets').on('click', function() {
       //get a searched tweet(s) & display it
       $.ajax({
        url: '/searchinfo',
        contentType: 'application/json',
        success: function(response) {
          console.log(response);
           var searchBody = $('#searchbody');
           searchBody.html('');
           response.searchinfo.forEach(function(searchinf){ 
            searchBody.append(`\<tr>\ <td class = "id">` + searchinf.id_str + `</td>\
            <td><input type = "text" class = "Text" value= "`+ searchinf.text + `"></td>\
            <td><input type = "text" class = "Created At" value= "` + searchinf.created_at + `"></td>\
           </tr>\
           `);
           });
          }
       });
   });

 //creates a new tweet
 $('#create-form').on('submit', function(event){
       event.preventDefault();
       var createInput = $('#create-input');
       var inputString = createInput.val();
       const parsedStrings = inputString.split(';');
       var newid = parsedStrings[0];
       var newtext = parsedStrings[1];
       //this obtains the new id and new text
       $.ajax({ 
        url: '/tweetinfo',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({id: newid, text:newtext}),
        success: function(response) { 
          console.log(response); 
          createInput.val('');
          $('#get-tweets-button').click(); 
        }
        })
 });

   //Create searched tweets
 $('#search-form').on('submit', function(event){
   event.preventDefault();
   var userID = $('#search-input');
   
   //search a tweet and display it.
   $.ajax({ 
    url: '/searchinfo/',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({id:userID.val()}),
    success: function(response) { 
      console.log(response); 
      $('#get-searched-tweets').click(); 
    }
  });

 });

 //UPDATE/PUT
 $("#update-user").on('submit', function(event){
   event.preventDefault();
   var updateInput = $('#update-input');
   var inputString = updateInput.val();

   const parsedStrings = inputString.split(';');

   var name = parsedStrings[0];
   var newName = parsedStrings[1];

    $.ajax({ 
    url: '/tweets/' + name,
    method: 'PUT',
    contentType: 'application/json',
    data: JSON.stringify({name: newName}),
    success: function(response) { 
      console.log(response); 
      updateInput.val('');
      $('#get-button').click(); 
    }
    });
 });


 //DELETE
 $("#delete-form").on('submit', function() {
   var id = $('#delete-input')
   $.ajax({ 
    url: '/tweetinfo/' + id.val(),
    method: 'DELETE',
    contentType: 'application/json',
    success: function(response) { 
      console.log(response); 
      $('#get-tweets-button').click(); 
    }
  });
 });
	function test_print(){
	
		console.log("test code")
	}

});
