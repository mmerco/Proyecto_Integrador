const inputFront = document.querySelector('.admin-file__front');
const inputBack = document.querySelector('.admin-file__back');
const imgFront = document.querySelector('.admin-img__front');
const imgBack = document.querySelector('.admin-img__back');
const imgFrontBtn = document.querySelector('.img-front__button');
const imgBackBtn = document.querySelector('.img-back__button');
const figureFront = document.querySelector('.admin-figure__front');
const figureBack = document.querySelector('.admin-figure__back');
const clearButton = document.querySelector('.clear-button');
const form = document.querySelector('.admin-form');



/** 
 * LISTENERS PARA LOS INPUT DE LAS IMAGENES
 */
inputFront.addEventListener('change', () => {

    let archivos = inputFront.files;

    if (!archivos || !archivos.length) {
        imgFront.src = "";

        return;
    }

    let url = URL.createObjectURL(archivos[0]);

    imgFront.src = url;
    figureFront.style.display = "block";
});


inputBack.addEventListener('change', () => {

    let archivos = inputBack.files;

    if (!archivos || !archivos.length) {
        imgBack.src = "";

        return;
    }

    let url = URL.createObjectURL(archivos[0]);

    imgBack.src = url;
    figureBack.style.display = "block";
});



/** 
 * LISTENERS PARA LOS INPUT DE LAS IMAGENES
 */
imgFrontBtn.addEventListener('click', () => {

    inputFront.click();
});


imgBackBtn.addEventListener('click', () => {

    inputBack.click();
});



/** 
 * LISTENER PARA FORM RESET
 */
if (clearButton) {

    clearButton.addEventListener('click', () => {
        form.reset();

        figureFront.style.display = "none";
        figureBack.style.display = "none";
    });
}