<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

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
        $subject = 'Contact Request from Groopview';
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
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Invalid request method. Only POST is allowed.']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'An error occurred: ' . $e->getMessage()]);
}
?>
