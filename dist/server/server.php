<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    
    require './PHPMailer/src/Exception.php';
    require './PHPMailer/src/PHPMailer.php';
    require './PHPMailer/src/SMTP.php';

    $name = $_POST['name'];
    $mailFrom = $_POST['mail'];
    $subject =  $name . " " . $mailFrom ." ". $_POST['subject'];
    $massage = strip_tags($_POST['massage']);
    $to = 'd.kaczmarek2908@gmail.com';


    $mail = new PHPMailer();
    try {
        $mail->isSMTP();
        $mail->SMTPAuth = true;
        $mail->SMTPSecure = 'ssl';
        $mail->Host = 'smtp.gmail.com';
        $mail->Port = 465;
        $mail->isHTML();
        $mail->Username = 'xxx@gmail.com';
        $mail->Password =  '';
        $mail->SetFrom($mailFrom);
        $mail->Subject = $subject;
        $mail->Body = $massage;
        $mail->AddAddress('xxx@gmail.com');
        $mail->Send();
        echo 'Email został wsysłany. Dziękuję za kontakt!';
    } catch (Exception $e) {
        echo 'Upss! Mail nie został wysłany';
    }