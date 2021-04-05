function remover(trashSelector){
    //deleting side text panel
    const d = document;
    
    const shit = d.querySelector(trashSelector);
    shit.remove();
}

export default remover;