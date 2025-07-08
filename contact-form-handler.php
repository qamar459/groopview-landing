<?php
header('Content-Type: application/json');

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
        $email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
        $tel = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_STRING);
        $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);

        if (empty($name) || empty($email) || empty($tel)) {
            echo json_encode(['success' => false, 'message' => 'Required fields are missing.']);
            exit;
        }

        $to = 'info@groopview.com'; 
        $subject = 'Contact Form Submission';
        $emailMessage = "Name: $name\nEmail: $email\nTel: $tel\nMessage: $message";
        $headers = 'From: no-reply@groopview.com' . "\r\n" .
                   'Reply-To: ' . $email . "\r\n" .
                   'X-Mailer: PHP/' . phpversion();

        if (mail($to, $subject, $emailMessage, $headers)) {
            echo json_encode(['success' => true, 'message' => 'Email has been sent successfully! We will get back to you soon.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error sending email.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'An error occurred: ' . $e->getMessage()]);
}
?>
