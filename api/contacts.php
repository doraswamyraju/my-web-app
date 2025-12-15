<?php
include 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

// Handle JSON input from React
$input = json_decode(file_get_contents('php://input'), true);

switch ($method) {
    case 'POST':
        // Save form data to database
        if(isset($input["name"]) && isset($input["email"]) && isset($input["message"])){
            $name = $conn->real_escape_string($input["name"]);
            $email = $conn->real_escape_string($input["email"]);
            $message = $conn->real_escape_string($input["message"]);

            $sql = "INSERT INTO contacts (name, email, message) VALUES ('$name', '$email', '$message')";

            if ($conn->query($sql) === TRUE) {
                echo json_encode(["message" => "New record created successfully"]);
            } else {
                echo json_encode(["error" => "Error: " . $sql . "<br>" . $conn->error]);
            }
        } else {
            echo json_encode(["error" => "Invalid Input"]);
        }
        break;

    case 'GET':
        // Fetch data for the dashboard
        $sql = "SELECT * FROM contacts ORDER BY created_at DESC";
        $result = $conn->query($sql);
        $contacts = [];

        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $contacts[] = $row;
            }
        }
        echo json_encode($contacts);
        break;
}

$conn->close();
?>