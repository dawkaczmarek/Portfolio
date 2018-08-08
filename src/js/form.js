$(document).ready(function() {

    const $name = $('#name_Lastname');
    const $mail = $('#mail');
    const $subject = $('#subject');
    const $massage = $('#massage');


    $name.on('blur', function() {
        const $val = $(this).val();
        const reg = /^(?:[a-ząśżźćęółń -]){2,}$/i;
       
        if (reg.test($val)) {
            $name.addClass('valid');
            $('#error_name').remove();
        } else if ($val.length == 0 ) {
            $name.removeClass('valid');
            $('#error_name').remove();
        } else {
            $name.removeClass('valid');
            $('#error_name').remove();
            $('.errors').append('<p id="error_name"><b>Pole imię i nazwisko:</b> wpisano niepoprawne dane proszę nie używać znaków specjalnych np. $#^_- . Minimalna liczba liter to 2.</p>');
        }

    });

    $mail.on('blur', function() {
        const $val = $(this).val();
        const reg = /^[a-z\d]+[\w\d.-]{0,63}@(?:[a-z\d]+[a-z\d]*\.){1,6}[a-z]{2,7}$/i;
        
        if (reg.test($val)) {
            $mail.addClass('valid');
            $('#error_mail').remove();
        } else if ($val.length == 0 ) {
            $mail.removeClass('valid');
            $('#error_mail').remove();
        } else {
            $mail.removeClass('valid');
            $('#error_mail').remove();
            $('.errors').append('<p id="error_mail"><b>Pole email:</b> wpisano zły adres email. Proszę wpisać email na podstawie przykładu example@domain.com</p>');
        }
        
    });

    $subject.on('blur', function() {

        const $val = $(this).val();
        const reg = /^(?:[a-ząśżźćęółń -]){2,}$/i;

        if (reg.test($val)) {
            $subject.addClass('valid');
            $('#error_subject').remove();
        } else if ($val.length == 0 ) {
            $subject.removeClass('valid');
            $('#error_subject').remove();
        } else {
            $subject.removeClass('valid');
            $('#error_subject').remove();
            $('.errors').append('<p id="error_subject"><b>Pole temat:</b> wpisano niepoprawnie dane proszę nie używać znaków specjalnych ($#^_- i) i liczb. Minimalna liczba liter to 2.</p>');
        }
    });

    $massage.on('blur', function() {

        const $val = $(this).val();
       
        if ($val.length > 2 && $val.length < 200) {
            $massage.addClass('valid');
            $('#error_massage').remove();
        } else if ($val.length == 0 ) {
            $massage.removeClass('valid');
            $('#error_massage').remove();
        } else {
            $massage.removeClass('valid');
            $('#error_massage').remove();
            $('.errors').append('<p id="error_massage"><b>Pole wiadomość:</b> Minimalna liczba znaków to 2, a maksymalna to 200.</p>')
        }

    });

    const $massageDiv = $('.massage');
    const $contactButton = $('.contact__button');

    $contactButton.on('click', function(e) {

        e.preventDefault();
        const $details = $('#uForm').serialize();

        if ($name.hasClass('valid') && $mail.hasClass('valid') && $subject.hasClass('valid') && $massage.hasClass('valid')) {

            $.post('server/server.php', $details, function(data) {

                $massageDiv.attr('style', 'display:flex');
                $massageDiv.append('<p class="massage__success">' + data + '</p><button class="massage__button">Zamknij</button>');
                $('.massage__button').on('click', function() {
                    $('.massage__success, .massage__error, .massage__button').remove();
                    $massageDiv.css('display','none');
                }); 
                
            });

        } else {

            $massageDiv.attr('style', 'display:flex');
            $massageDiv.append('<p class="massage__error"> Nie wysłano emaila. Proszę wypełnić poprawnie pola w formularzu.</p><button class="massage__button">Zamknij</button>');
            $('.massage__button').on('click', function() {
                $('.massage__success, .massage__error, .massage__button').remove();
                $massageDiv.removeAttr('style');
            });

        }
    });
});