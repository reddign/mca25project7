<?PHP
//process login
session_start();
$u = $_POST["user"];
$p = $_POST["pass"];

// connect to database
// 
if($_SERVER['HTTP_HOST']=="127.0.0.1"){
    $mysqli = new mysqli("127.0.0.1","root","","mca");
}else{
    $mysqli = new mysqli("195.35.59.14","u121755072_games",'J=$ARBm8',"u121755072_gamesdb");
}

if ($mysqli->connect_errno){
    echo "Failed to connect to MySQL: " . $mysqli->connect_error;
    exit;
}
//send a sql statement
$sql = "SELECT * FROM users where username='{$u}' and password='{$p}';";
//echo $sql;
$result = $mysqli -> query($sql);
$rows = $result -> fetch_all(MYSQLI_ASSOC);


//change if statement
if (is_array($rows) && array_key_exists(0, $rows) && $rows[0]["approved"]==1){
    //do something to keep user logged in
    $_SESSION["loggedin"] = "YES";
    $_SESSION["userID"] = $u;
    header("location: index.htm");
}else{
    $_SESSION["loggedin"] = "NO";
    $_SESSION["userID"] = "";
    header("location: login.htm?message=Incorrect Username or Password");
}
//print_r($_SESSION);
?>