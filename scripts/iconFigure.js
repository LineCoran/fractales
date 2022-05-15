
(function(){
    
    let str = "figure__icon--active";
    let buttonIcon = document.getElementsByClassName('figure__icon');
    
    console.log(buttonIcon);
    
    for (let i = 0; i< buttonIcon.length; i++){
        buttonIcon[i].addEventListener('click', function(event){
            
            let button = event.target;
            
            for (let j = 0; j<buttonIcon.length; j++){
                buttonIcon[j].classList.remove(str);
            }
            
            button.classList.add(str);
        })
    }

}())