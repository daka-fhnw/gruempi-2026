<?php

$config = require('lib/config.php');
$dbconn = require('lib/dbconnect.php');

$sql = "SELECT * FROM teams";
$result = $dbconn->query($sql);

if ($result->rowCount() > 0) {
    echo "<table><tr><th>ID</th><th>Firstname</th><th>Lastname</th></tr>";
    // Output data of each row
    while ($row = $result->fetch()) {
        echo "<tr>";
        echo "<td>" . $row['id'] . "</td>";
        echo "<td>" . $row['firstname'] . "</td>";
        echo "<td>" . $row['lastname'] . "</td>";
        echo "</tr>";
    }
    echo "</table>";
    unset($result);
} else {
    echo "No records found.";
}

