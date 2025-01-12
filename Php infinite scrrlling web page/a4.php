<?php
/**
 * Infinite Scroll implementation for displaying quotes.
 * 
 * I, Harsh Goswami, 000894310, certify that this material is my original work.
 * No other person's work has been used without suitable acknowledgment and I have not made my work available to anyone else.
 * 
 * @author Harsh Goswami
 * @version 202335.00
 * @package COMP 10260 Assignment 4
 */

header('Content-Type: application/json');

// Database connection setup
try {
    $dbh = new PDO("mysql:host=csunix.mohawkcollege.ca;dbname=000894310;port=3306", "sa000894310", "qwert12345");
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}

/**
 * Validate the page number from the GET request
 * If the page number is not set or is less than 1, default to 1
 * 
 * @param integer $page The page number for pagination (default is 1)
 * @return integer The validated page number
 */
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$page = max($page, 1);
$limit = 20;
$offset = ($page - 1) * $limit;

/**
 * Prepare the SQL query to fetch quotes along with their authors
 * 
 * @param integer $limit The maximum number of records to fetch
 * @param integer $offset The starting point for fetching records
 * @return PDOStatement The prepared statement ready for execution
 */
$sql = "SELECT quotes.quote_id, authors.author_name, quotes.quote_text 
        FROM quotes 
        INNER JOIN authors ON authors.author_id = quotes.author_id
        ORDER BY quotes.quote_id
        LIMIT :limit OFFSET :offset";

$stmt = $dbh->prepare($sql);
$stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
$stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
$stmt->execute();

/**
 * Fetch the result set into an associative array
 * 
 * @return array The fetched quotes with their corresponding authors
 */
$quotes = $stmt->fetchAll(PDO::FETCH_ASSOC);

/**
 * Generate HTML cards for each quote
 * 
 * @param array $quotes The array of quotes and their authors
 * @return array An array of HTML strings representing the quotes
 */
$htmlOutput = array_map(function ($quote) {
    return sprintf('<div class="card mb-3 a4card w-100">
            <div class="card-header">%s</div>
            <div class="card-body d-flex align-items-center">
                <p class="card-text w-100">%s</p>
            </div>
        </div>',
        htmlspecialchars($quote['author_name']),
        htmlspecialchars($quote['quote_text'])
    );
}, $quotes);

// Encode the HTML cards as a JSON array and send as the response
echo json_encode($htmlOutput);
?>
