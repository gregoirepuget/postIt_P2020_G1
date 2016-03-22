$(document).ready(function(){
  
  //localStorage.removeItem('listePostItLocal');
  
  
  var listePostIt = localStorage.getItem('listePostItLocal');
  if(listePostIt == null)
  {
    listePostIt = new Array();
    console.log("liste vide");
  }
  else
  {
    listePostIt=JSON.parse(listePostIt);
    for (var i=0; i< listePostIt.length; i++)
    {
      afficherPostIt(i);
    }
    
    console.log(listePostIt);
  }
  
  $(".addPostIt").on('click', function(e){
    e.preventDefault();
    
    var couleurs = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#f39c12", "#e74c3c", "#16a085"];
    
    var info={
    "posX" : 200,
    "posY" : 200,
    "content" : "Nouveau Post-It",
    "couleur" : couleurs[getTirage(couleurs.length)]
    };
    
    listePostIt.push(info);
    localStorage.setItem('listePostItLocal', JSON.stringify(listePostIt));
    
    afficherPostIt(listePostIt.length-1);
    
  });
  
  
  function afficherPostIt(postIt_ID)
  {
    var content = '<div class="postick" data-key="'+postIt_ID+'" style="left:'+listePostIt[postIt_ID].posX+'px; top:'+listePostIt[postIt_ID].posY+'px; background:'+listePostIt[postIt_ID].couleur+';">';
    content += '<div class="toolbar"><span class="delete">x</span></div>';
    content += '<div contenteditable="true" class="editable">'+listePostIt[postIt_ID].content+'</div>';
    content += '</div>';

    $("body").append(content);
    
    $(".postick").draggable({
      cancel: ".editable",
      stack: ".postick",
      zIndex: 1000,
      stop: function( event, ui ) {
      
          var postIt_ID=$(this).attr("data-key");
          var posX = $(this).position().left;
          var posY = $(this).position().top;
          
          listePostIt[postIt_ID].posX=posX;
          listePostIt[postIt_ID].posY=posY;
          localStorage.setItem('listePostItLocal', JSON.stringify(listePostIt));
      }
      
    });
    $(".editable").on("blur", function(){
      var postIt_ID = $(this).parent().attr("data-key");
      var content = $(this).html();
      listePostIt[postIt_ID].content=content;
      localStorage.setItem('listePostItLocal', JSON.stringify(listePostIt));

      
    });
    
    $(".delete").on("click", function(){
      var postIt_ID= $(this).parent().parent().attr("data-key");
      listePostIt.splice(postIt_ID,1);
      localStorage.setItem('listePostItLocal', JSON.stringify(listePostIt));
      $('.postick[data-key='+postIt_ID+']').remove();
    
    });
  }
  
  
  
  
  function getTirage(limit)
  {
    return Math.floor(Math.random()*limit);
  
  }
  
  
  
});








