<?php
// Carica i file di PHPMailer
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recupera e valida i dati inviati dal form
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // Controlla che i campi non siano vuoti e che l'email sia valida
    if (empty($name) || empty($email) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Dati non validi. Per favore, verifica e riprova.";
        exit();
    }

    // Crea una nuova istanza di PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Configurazione SMTP
        $mail->isSMTP();
        $mail->Host = 'smtp.office365.com';         // Inserisci il tuo host SMTP
        $mail->SMTPAuth = true;
        $mail->Username = 'info@simoneligi.it';  // Inserisci il tuo indirizzo email
        $mail->Password = 'your-password';           // Inserisci la tua password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Tipo di crittografia (STARTTLS o SSL)
        $mail->Port = 587;                           // Porta SMTP (587 per STARTTLS, 465 per SSL)

        // Impostazioni email
        $mail->setFrom('info@simoneligi.it', 'Studio Geometra Ligi Simone'); // Email e nome del mittente
        $mail->addAddress('info@simoneligi.it');       // Destinatario
        $mail->addReplyTo($email, $name);              // Indirizzo per risposte

        // Contenuto dell'email
        $mail->isHTML(false);                          // Imposta su `true` per HTML
        $mail->Subject = "Nuovo messaggio dal modulo di contatto";
        $mail->Body    = "Hai ricevuto un nuovo messaggio.\n\nNome: $name\nEmail: $email\nMessaggio:\n$message";

        // Invia l'email
        $mail->send();

        // Reindirizza l'utente alla pagina di ringraziamento se l'invio è riuscito
        header("Location: thank_you.html");
        exit();

    } catch (Exception $e) {
        // In caso di errore, mostra un messaggio e registra l'errore
        echo "Impossibile inviare l'email. Errore: {$mail->ErrorInfo}";
        error_log("Errore nell'invio dell'email: " . $mail->ErrorInfo);
    }
} else {
    // Se il metodo non è POST, mostra un messaggio di errore
    echo "Metodo non valido.";
}
?>
