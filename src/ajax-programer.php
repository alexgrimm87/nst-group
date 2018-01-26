<?php
    $subject = 'Заявка с сайта';
    $mess = '';
    $mess .= '<hr>';
    if(isset($_POST['info'])) {
        $subject = $_POST['info'];
    }
    if(isset($_POST['name'])) {
        $name = substr(htmlspecialchars(trim($_POST['name'])), 0, 100);
        $mess .= '<b>Имя:</b>' . $name . '<br>';
    }
    if(isset($_POST['email'])) {
        $mail = substr(htmlspecialchars(trim($_POST['email'])), 0, 100);
        $mess .= '<b>Почта:</b>' . $mail . '<br>';
    }
    if(isset($_POST['tel'])) {
        $tel = substr(htmlspecialchars(trim($_POST['tel'])), 0, 100);
        $mess .= '<b>Телефон:</b>' . $tel . '<br>';
    }
    if(isset($_POST['message'])) {
        $message = substr(htmlspecialchars(trim($_POST['message'])), 0, 100);
        $mess .= '<b>Сообщение:</b>' . $message . '<br>';
    }
    if(isset($_POST['city'])) {
        $city = substr(htmlspecialchars(trim($_POST['city'])), 0, 100);
        $mess .= '<b>Город доставки:</b>' . $city . '<br>';
    }
    if(isset($_POST['material'])) {
        $material = substr(htmlspecialchars(trim($_POST['material'])), 0, 100);
        $mess .= '<b>Материал:</b>' . $material . '<br>';
    }
    if(isset($_POST['fraction'])) {
        $fraction = substr(htmlspecialchars(trim($_POST['fraction'])), 0, 100);
        $mess .= '<b>Фракция:</b>' . $fraction . '<br>';
    }
    if(isset($_POST['amount'])) {
        $amount = substr(htmlspecialchars(trim($_POST['amount'])), 0, 100);
        $mess .= '<b>Количество:</b>' . $amount . '<br>';
    }
    if(isset($_POST['sale'])) {
        $sale = substr(htmlspecialchars(trim($_POST['sale'])), 0, 100);
        $mess .= '<b>Скидка:</b>' . $sale . '<br>';
    }
    $mess .= '<hr>';
    // подключаем файл класса для отправки почты
    require 'class.phpmailer.php';

    $mail = new PHPMailer();
    $mail->AddAddress('nstinfo@mail.ru','');   // кому - адрес, Имя
    $mail->IsHTML(true);                        // выставляем формат письма HTML
    $mail->Subject = $subject; // тема письма
    $mail->CharSet = "UTF-8";                   // кодировка
    $mail->Body = $mess;
    if(isset($_FILES['file'])) {
            if($_FILES['file']['error'] == 0){
            $mail->AddAttachment($_FILES['file']['tmp_name'], $_FILES['file']['name']);
        }
    }
    // отправляем наше письмо
    if (!$mail->Send()){
        die ('Mailer Error: ' . $mail->ErrorInfo);
    }else{
        echo 'true';
    }?>