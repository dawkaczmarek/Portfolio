$(document).ready(function() {
    const $name = $('#name_Lastname');
    const $mail = $('#mail');
    const $subject = $('#subject');
    const $massage = $('#massage');


    $name.on('blur', function() {
        const $val = $(this).val();
        const reg = /^(?:[a-ząśżźćęółń -]){2,}$/i;
       
       if($val.length == 0 ) {
        $('#error_name').remove();
       } else if (!reg.test($val)) {
            $('.errors').find('#error_name').remove();
            $('.errors').append('<span id="error_name"><b>Pole imię i nazwisko:</b> wpisane nie poprawnie dane proszę nie używać znaków specjalnych np. $#^_- . Minimalna liczba liter to 2.</span>');
        } else {
            $('#error_name').remove();
        }
    });

    $mail.on('blur', function() {
        const $val = $(this).val();
        const reg = /^[a-z\d]+[\w\d.-]{0,63}@(?:[a-z\d]+[a-z\d]*\.){1,6}[a-z]{2,7}$/i;
        
        if($val.length == 0) {
            $('#error_mail').remove();
        } else if (!reg.test($val)) {
            $('.errors').find('#error_mail').remove();
            $('.errors').append('<span id="error_mail"><b>Pole email:</b> wpisano zły adres email. Proszę wpisać email na podstawie przykładu example@domain.com</span>');
        } else {
            $('#error_mail').remove();
        }    
    });

    $subject.on('blur', function() {
        const $val = $(this).val();
        const reg = /^(?:[a-ząśżźćęółń -]){2,}$/i;
       
       if($val.length == 0 ) {
        $('#error_subject').remove();
       } else if (!reg.test($val)) {
            $('.errors').find('#error_subject').remove();
            $('.errors').append('<span id="error_subject"><b>Pole temat:</b> wpisane nie poprawnie dane proszę nie używać znaków specjalnych ($#^_- i) i liczb. Minimalna liczba liter to 2.</span>');
        } else {
            $('#error_subject').remove();
        }
    });

    $massage.on('blur', function() {
        const $val = $(this).val();
        const reg = /^(?:[a-ząśżźćęółń\d\s.@"'\[\]\{\}\(\)_ -]){2,}$/i;
       
       if($val.length == 0 ) {
        $('#error_massage').remove();
       } else if (!reg.test($val)) {
            $('.errors').find('#error_massage').remove();
            $('.errors').append('<span id="error_massage"><b>Pole wiadomość:</b> Minimalna liczba liter to 2.</span>');
        } else {
            $('#error_massage').remove();
        }
    });

    const $contactButton = $('.contact__button');
    $contactButton.on('click', function(e) {
        e.preventDefault();
        console.log('ok');
    });
});