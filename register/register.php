<?PHP
//process login
session_start();
$u = $_POST["user"];
$p = $_POST["password"];

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
$sql = "INSERT INTO users
(username,password)
VALUES
('{$u}','{$p}');";

$result = $mysqli -> query($sql);


header("location: ../index.htm");
?>