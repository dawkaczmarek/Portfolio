$(document).ready(function(){
    const $name = $('#name_Lastname');
    const $massage = $('#massage');


    $name.on('blur', function() {
        
    });

    const $contactButton = $('.contact__button');
    $contactButton.on('click', function(e) {
        e.preventDefault();
        console.log('ok');
    });
});