
//global definitions
const inquirer = require("inquirer");
let zombieHealth = Math.floor(Math.random() * 10 + 10);
let humanHealth = Math.floor(Math.random() * 20 + 50)

//game start
inquirer
    .prompt([

        {
            type: "input",
            message: "What's your name survivor?",
            name: "username"
        }

    ])
    .then((inquirerResponse) => {
        show("\nNight is coming " + inquirerResponse.username + ". It's time to fight for your life! \nYour health is " + humanHealth + ".");
        setTimeout(function(){show("\nA zombie is approaching. Its health is " + zombieHealth + ". Kill it before it kills you!")}, 3000);
        setTimeout(()=>zombieApproach(), 6000);
    })

//zombie attack function (repeats until somebody loses)
function zombieApproach(){
    inquirer
    .prompt([
        {
            type: "list",
            message: "\nChoose a weapon. Only one weapon will be effective each attack. \nIf you pick inncorrectly, you will take damage. \nChoose wisely!",
            choices: ["Axe", "Baseball Bat", "Broken Bottle", "Frying Pan", "Rubber Chicken"],
            name: "weapon"
        }
    ])
    .then((weaponResponse) => {
        let zombieRand = Math.floor(Math.random() * 5 + 1)
        let potentialWeapons = ["Axe", "Baseball Bat", "Broken Bottle", "Frying Pan", "Rubber Chicken"];
        let randDam = Math.floor(Math.random() * 5 + 1)
        let zombieWeakness = potentialWeapons[zombieRand]
        if (zombieWeakness === weaponResponse.weapon) {
            zombieHealth = zombieHealth - randDam;
            show("\nGreat choice! \nYour weapon was effective against the zombie. \nYou dealt " + randDam + " damage to the zombie! \nThe zombie's remaining heatlh is " + zombieHealth + " and you have " + humanHealth + " left.");
            if(zombieHealth > 0){
                setTimeout(()=>{show("\nThe zombie is still un-dead! \nAttack again until the zombie is dead-dead.")}, 3000);
                setTimeout(()=>{zombieApproach()}, 5000);
            }else{
                setTimeout(()=>{show("\nYou deafeated the zombie! \nThere are many more in this dangerous world, but for now you live to fight another day.")}, 3000)
            }
        } else {
            humanHealth = humanHealth - randDam;
            show("\nYour attack was Ineffective! \nThe zombie hurt you for " + randDam + " damage. \nYour remaining heatlh is " + humanHealth + " and the zombie has " + zombieHealth + " left.");
            if(humanHealth > 0){
                setTimeout(function(){show("\nYou're still alive. \nAttack again to prevent becoming un-alive.")}, 3000);
                setTimeout(()=>{zombieApproach()}, 5000);
            }else{
                setTimeout(()=>{show("\nYou were defeated by the zombie. You are now cursed to walk amoungst them; forever not-dead.")}, 3000)
            }
        }
    })
}

//i hate writing console.log
function show(arr) {
    console.log(arr)
}

