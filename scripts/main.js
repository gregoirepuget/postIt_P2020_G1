$(document).ready(function(){
  
  var listePostIt = localStorage.getItem('listePostItLocal');
  if(listePostIt == null)
  {
    listePostIt = new Array();
    console.log("liste vide");
  }
  else
  {
    listePostIt=JSON.parse(listePostIt);
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
    
  });
  
  function getTirage(limit)
  {
    return Math.floor(Math.random()*limit);
  
  }
  
  
  
});
