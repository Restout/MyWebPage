<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $for = $_POST["for"];
    $height = $_POST["height"];
    $age = $_POST["age"];
    $is_athlete = isset($_POST["athlete"]) ? "Да" : "Нет";
    $is_sportsman = isset($_POST["is_sportsman"]) ? "Да" : "Нет";

    echo "Имя: $name<br>";
    echo "Для кого определяем: $for<br>";
    echo "Рост: $height<br>";
    echo "Возраст: $age<br>";
    echo "Спортсмен: $is_athlete<br>";
    echo "Является спортсменом: $is_sportsman";
}
?>