<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="/css/main_stryle.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet">
   <link rel="stylesheet" href="my_php.css">
</head>
<body>
<div class="wrapepr">
    <header class="header header-main">
        <div class="container">
            <div class="header_iner">
                <a href="/index.html" class="logo">
                    <div class="logo">
                        <div class="logo_container">
                            <span class="logo_first">AR</span>
                            <span class="logo_second">TEM.</span>
                        </div>
                    </div>
                </a>
                <nav class="menu">
                    <ul class="menu_list">
                        <li id="task1" class="menu_list_item"><a href="/css-drow/css-drow.html" class="menu_list_link">Рисунок
                                Css</a></li>
                        <li id="task2" class="menu_list_item"><a href="#" class="menu_list_link">Flexbox brand</a></li>
                        <li id="task3" class="menu_list_item"><a href="#" class="menu_list_link">Dom тест</a></li>
                        <li id="task4" class="menu_list_item"><a href="#" class="menu_list_link">Задание Слова</a></li>
                        <li id="task5" class="menu_list_item"><a href="#" class="menu_list_link">Курсовик</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>
    <main class="main">
        <div class="main_wrapper">
            <form method="post" action="">
                <div class="task">
                    <div class="main_params">
                        <label for="name">Имя:</label>
                        <input type="text" id="name" name="name">

                        <label for="height">Рост (в см):</label>
                        <input type="number" id="height" name="height">
                    </div>
                    <div class="age">
                        <input type="radio" id="Пожилой" name="age_group" value="Пожилой">
                        <label for="Пожилой">Пожилой</label>

                        <input type="radio" id="Молодой" name="age_group" value="Молодой">
                        <label for="Молодой">Молодой</label>

                        <input type="checkbox" id="athlete" name="athlete">
                        <label for="athlete">Спортсмен</label>
                    </div>
                    <div class="for_who">
                        <button id="target" type="submit" name="target" value="man">Мужчина</button>
                        <button id="target" type="submit" name="target" value="woman">Женщина</button>
                        <button id="target" type="submit" name="target" value="ghost">Приведение</button>
                    </div>
                </div>
            </form>
            <div class="my_php">
                <?php
                if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['target'])) {
                    $name = isset($_POST['name']) ? $_POST['name'] : '';
                    $target = isset($_POST['target']) ? $_POST['target'] : '';
                    $height = isset($_POST['height']) ? $_POST['height'] : '';
                    $age_group = isset($_POST['age_group']) ? $_POST['age_group'] : '';
                    $athlete = isset($_POST['athlete']) ? 'спортсмен' : 'не спортсмен';
                    $image_woman = "/images/woman.png";

                    echo "<h2>Результат:</h2>";
                    switch ($target) {
                        case 'woman':
                            $optimal_weight = "Вы всегда прекрасны!";
                            echo '<img src="/images/woman.png" alt="sale70" width="100px" height="100px">';;
                            break;
                        case 'man':
                            if ($height != '') {
                                $optimal_weight = $height * 0.7 - 50;
                            } else {
                                $optimal_weight = "не определено";
                            }
                            echo '<img src="/images/man.png" alt="sale70" width="100px" height="100px">';;
                            break;
                        case 'ghost':
                            $optimal_weight = "У приведений нет веса";
                            $image = "/images/ghost.png";
                            echo '<img src="/images/ghost.png" alt="sale70" width="100px" height="100px">';;
                            break;
                        default:
                            echo "не указано<br>";
                            $optimal_weight = "не определено";
                            break;
                    }
                    echo "$name , ваш рост $height см <br>";
                    echo "Возраст: $age_group<br>";
                    echo "$athlete<br>";
                    echo "Ваш оптимальный вес: $optimal_weight";
                }
                ?>
            </div>
        </div>
    </main>
    <footer class="footer">
        <div class="container">
            <nav class="nav_footer">
                <ul class="footer_menu">
                    <li class="footer_menu_item">
                        <a href="https://vk.com/zdes_net_novostei" class="footer_menu_item_link">VK</a>
                    </li>
                    <li class="footer_menu_item">
                        <a href="about.html" class="footer_menu_item_link">ABOUT ME</a>
                    </li>
                    <li class="footer_menu_item">
                        <a href="https://t.me/MilkyBeer" class="footer_menu_item_link">TG</a>
                    </li>
                </ul>
            </nav>
        </div>
    </footer>
</div>

</body>
</html>