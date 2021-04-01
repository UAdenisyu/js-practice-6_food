function remover(){
    //deleting side text panel
    const d = document;
    
    const shit = d.querySelector('.sidepanel');
    shit.remove();
}

module.exports = remover;