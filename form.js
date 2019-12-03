function handleFormSubmit(event) {
    // This next line prevents the reload of the form
    event.preventDefault();
    // Get values of inputs
    gamertag = document.getElementById("formGamertag").value
    comment = document.getElementById("formComment").value
    color = document.getElementById("formColor").value
    // Pass values to addNewPost()
    addNewComment(gamertag,comment,color)
 }

 function addNewComment(gamertag, comment, color) {
    // Create the parent post div
    var div = document.createElement("div");
    var divClass = document.createAttribute("class");
    divClass.value = "comment";
    div.setAttributeNode(divClass);
    var divText = document.createTextNode(gamertag + ": " + comment);
    div.appendChild(divText);

    if(color == 0)
    {
        div.style.backgroundColor = "#000000"
        div.style.color = "#00CC00"
        div.style.fontSize = "24px"
        div.style.margin = "24px"
    }
    else if(color == 1)
    {
        div.style.backgroundColor = "#FF9800"
        div.style.color = "#D303FC"
        div.style.fontSize = "24px" 
        div.style.margin = "24px"
    }
    else if(color == 2)
    {
        div.style.backgroundColor = "#fc00ec"
        div.style.color = "#FFFF00"
        div.style.fontSize = "24px"
        div.style.margin = "24px"
    }
    else if(color == 3)
    {
        div.style.backgroundColor = "#FFFFFF"
        div.style.color = "#000000"
        div.style.fontSize = "24px"
        div.style.margin = "24px"
    }
    
    // Add post element to post list
    commentList.appendChild(div);
 }

 window.onload = () => {
    // Once our window is loaded, we add the event listener for our post form
    postForm.addEventListener('submit', handleFormSubmit);
 };