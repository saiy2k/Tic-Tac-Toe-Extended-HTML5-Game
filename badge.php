<?php

$params = array();
if(count($_GET) > 0) {
    $params = $_GET;
} else {
    $params = $_POST;
}


$rankArray = array("Amoeba", "Mosquito", "Dog", "Monkey", "Baby", "Student", "Professor", "Scientist", "Super Hero", "God");
$picArray =	array("images/Amoeba.png", "images/Mosquito.png", "images/Dog.png", "images/Monkey.png", "images/Baby.png", "images/Student.png", "images/Professor.png", "images/Scientist.png", "images/SuperHero.png", "images/God.png");
$remarkArray = array("Amoeba huh? Wish you atleast had multi celled brains.",
                                         "Silly Insect. But atleast you hav brains",
                                         "You played with doggy instincts, not bad",
                                         "Come on. You are on the right track. Practice more",
                                         "Allast you show the IQ of human species",
                                         "You got the potential to be the best. just Practice",
                                         "Wow! Now can teach your fellow mates on how to play",
                                         "Brainy, Brainy, keep it up",
                                         "No one can beat you now. You are off the charts",
                                         "The Super computer AI bows before you my lord");

if($params['rank'] == "")
    $params['rank'] = "10";
$index = 10 - (int)$params['rank'];
$params['title'] = $rankArray[$index];
$params['image'] = "http://localhost/ttt/" . $picArray[$index];
$params['description'] = $remarkArray[$index];

?>

<!DOCTYPE html>
<html>
    <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# ggtestapplication: http://ogp.me/ns/fb/ggtestapplication#">
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>

        <meta property="fb:app_id" content="162128140592033" />
        <meta property="og:type" content="ggtestapplication:badge"/>
        <meta property="og:url" content="http:/localhost/ttt/badge.php?rank=<?php echo $params['rank']; ?>"/>
        <meta property="og:title" content="<?php echo $params['title']; ?>"/>
        <meta property="og:image" content="<?php echo $params['image']; ?>"/>
        <meta property="og:description" content="<?php echo $params['description']; ?>"/>
        <meta property="ggtestapplication:rank" content="<?php echo $params['rank']; ?>"/>

    </head>
</html> 
