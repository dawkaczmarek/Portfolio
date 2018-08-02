<?php
    $name = $_POST['name'];
    $mail = $_POST['mail'];
    $subject = $name . " " . $_POST['subject'];
    $massage = strip_tags($_POST['massage']);
    $to = 'd.kaczmarek2908@gmail.com';
    $emailSent = mail($to, $subject, $message);