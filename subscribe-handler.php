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
        $email = filter_input(INPUT_POST, 'subscribe_email', FILTER_VALIDATE_EMAIL);

        if (empty($email)) {
            echo json_encode(['success' => false, 'message' => 'Email address is required.']);
            exit;
        }

        if (!$email) {
            echo json_encode(['success' => false, 'message' => 'Please enter a valid email address.']);
            exit;
        }

        $to = 'info@groopview.com'; 
        $subject = 'Newsletter Subscription';
        $message = "New newsletter subscription request:\n\nEmail: $email\nDate: " . date('Y-m-d H:i:s');
        $headers = 'From: no-reply@groopview.com' . "\r\n" .
                   'Reply-To: ' . $email . "\r\n" .
                   'X-Mailer: PHP/' . phpversion();

        if (mail($to, $subject, $message, $headers)) {
            echo json_encode(['success' => true, 'message' => 'Thank you for subscribing! You will receive our latest updates.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error processing subscription. Please try again.']);
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