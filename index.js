// JS

// Pour executer le fichier : node nomFichier.js

// Un combat de boxe est grandement attendu dans le monde entier,
// le numéro 1, Ippo, contre le numéro 2, vous-même. 😗

// Le combat s'effectuera en tour par tour avec un maximum de 10 rounds !

// Si vous allez jusqu'au dernier round, vous devez afficher le vainqueur et indiquer que le combat est bien terminé.

// Vous devez ajouter la probabilité d'effectuer un KO (coup critique, 10% de chance)  et, dans ce cas, le combat s'arrête aussi.

// Ippo (IA) vous attaque également à chaque round ; il peut donc vous mettre KO ou gagner le combat à la fin en fonction de votre stamina restante.

// [
//   {
//     id: 1,
//     name: "Ippo",
//     caractéristiques: { 
//       strength: 1300,  
//       defense: 900,   
//       stamina: 25000,  
//       speed: 180      
//     },
//     techniques: [ 
//       { name: "Smash", power: 1300 },             
//       { name: "Uppercut", power: 1330 },          
//       { name: "Gazelle Punch", power: 1320 },     
//       { name: "Dempsey Roll", power: 1350 }       
//     ]
//   },
//   {
//     id: 2,
//     name: "Challenger",
//     caractéristiques: { 
//       strength: 1250,  
//       defense: 900,    
//       stamina: 26000,  
//       speed: 190       
//     },
//     techniques: [ 
//       { name: "Jab", power: 1250 },                
//       { name: "Uppercut", power: 1280 },          
//       { name: "Crochet", power: 1265 },            
//       { name: "Enchaînement", power: 1290 }        
//     ]
//   }
// ];

// Étape 2 :

// Ajouter des compétences aux combattons

// -> Vous-même

// Jab (force de base)
// Uppercut (force de base + 20)
// Crochet (force de base + 15)
// Enchaînement (lance deux coups dévastateurs) (force de base + 30)

// -> Ippo

// Smash (c'est un coup à mi-chemin entre un crochet et un uppercut qui frappe le côté du menton) (force de base)

// Uppercut (uppercut surpuissant) (force de base + 30)

// Gazelle Punch (après avoir pris une impulsion sur ses appuis, Ippo lance un uppercut dévastateur qui met souvent à terre directement) (force de base + 20)

// Dempsey Roll (Ippo déplace son torse afin de former un huit à l'horizontale, puis il se sert de l'impulsion pour distribuer des coups puissants, rendant la riposte très difficile) (force de base + 50)

// Ippo doit lancer des techniques aléatoirement, tout comme le Challenger.
// Les techniques n'ont pas toutes la même puissance.

// Implémentez tout cela selon votre propre raisonnement, vous êtes libre pour la valeur des propriétés.

// La vitesse détermine qui frappe en premier.

// La stamina est déduite en fonction de la force de l'adversaire.

// Le coup critique est aléatoire (probabilité de réussir un KO).

"use strict";

class Fight {

    constructor() {

        this.fightersCharacteristics = [
            {
                id: 1,
                name: "Ippo",
                caractéristiques: { 
                    strength: 1300,  
                    defense: 900,   
                    stamina: 25000,  
                    speed: 180      
                },
                techniques: [ 
                    { name: "Smash", power: 1300 },             
                    { name: "Uppercut", power: 1330 },          
                    { name: "Gazelle Punch", power: 1320 },     
                    { name: "Dempsey Roll", power: 1350 }       
                ]
            },
            {
                id: 2,
                name: "Challenger",
                caractéristiques: { 
                strength: 1250,  
                defense: 900,    
                stamina: 26000,  
                speed: 190       
                },
                techniques: [ 
                { name: "Jab", power: 1250 },                
                { name: "Uppercut", power: 1280 },          
                { name: "Crochet", power: 1265 },            
                { name: "Enchaînement", power: 1290 }        
                ]
            }
        ];
        this.ippo = this.fightersCharacteristics[0];
        this.challenger = this.fightersCharacteristics[1];

        this.stopFight = false;
        this.criticalHitHappened = false;
        this.ippoMadeTheCriticalHit = false;
        this.challengerMadeTheCriticalHit = false;

        this.damageGiven = 0;
        
        this.entireFight();

    }



    entireFight() {

        console.log(`Ladies and Gentlemen. Bienvenue, en ce jour historique, au combat opposant le plus grand, le plus fort, le plus titré, je vous demande de faire un tonnerre d'applaudissements pour IIIPPOOOOOOOOO !!!!\nFace à lui, un combattant qui n'a pas froid aux yeux et qui compte bien faire tomber notre champion en titre, j'ai nommé Challengerrrr !!`);
        console.log(`*** Musique d'ambiance ***`);
        console.log(`Sans plus tarder, place au combat !\n`);
        
        
        

        for (let i = 0; i < 10; i++) {

            console.log(`==================== ROUND ${i + 1} ====================`);
            
            this.whoHitsFirst();

            if (this.stopFight) {
                break;
            }            

        }



        if (this.stopFight) {

            console.log(``)

        } else if (this.ippo.caractéristiques.stamina > this.challenger.caractéristiques.stamina) {

            console.log("Ippo remporte ce combat et devient une nouvelle fois champion du monde !");

        } else if (this.ippo.caractéristiques.stamina < this.challenger.caractéristiques.stamina) {

            console.log("Challenger devient notre nouveau champion du monde en détronnant Ippo, invaincu depuis 20 ans !!!");

        } else {

            console.log("Y a un problème");    

        }

    }



    whoHitsFirst() {

        if (this.ippo.speed > this.challenger.speed) {

            console.log(`${this.ippo.name} frappe en premier, il utilise un ${this.technique(0)}\n`);
            console.log(`${this.challenger.name} répond avec un ${this.technique(1)}\n`);

        } else {

            console.log(`${this.challenger.name} frappe en premier, il utilise un ${this.technique(1)}\n`);
            console.log(`${this.challenger.name} répond avec un ${this.technique(0)}\n`);

        }

    }



    technique(fighter) {

        return this.sortAttacks(fighter);

    }



    sortAttacks(fighter) {

        const randomChance = Math.random();
        let opponentId = 0;

        if (randomChance < 0.1) {

            this.stopFight = true;
            this.criticalHitHappened = true;

            switch (fighter) {
                case 0:
                    opponentId = 1;
                    this.ippoMadeTheCriticalHit = true;
                    break;
                case 1:
                    opponentId = 0;
                    this.challengerMadeTheCriticalHit = true;
                    break;
                default:
                    console.log("Problème d'index dans le paramètre \"fighter\"");
                    break;
            }

            return `Coup critique et met K.O ${this.fightersCharacteristics[opponentId].name} ! 💢`;

        } else {

            const indexHit = Math.floor(Math.random() * this.fightersCharacteristics[fighter].techniques.length);

            this.damageTaken(fighter, opponentId, indexHit, this.damageGiven);

            return `${this.fightersCharacteristics[fighter].techniques[indexHit].name} et inflige ${this.damageGiven}. \nIl reste donc ${this.fightersCharacteristics[opponentId].caractéristiques.stamina} de stamina à ${this.fightersCharacteristics[opponentId].name} !`;

        }

    }



    damageTaken(fighter, opponentId, indexHit, damageGiven) {

        this.damageGiven = this.fightersCharacteristics[fighter].techniques[indexHit].power - this.fightersCharacteristics[opponentId].caractéristiques.defense;

        return this.fightersCharacteristics[opponentId].caractéristiques.stamina -= damageGiven;

    }



    winnerByCriticalHit() {

        switch (this.criticalHitHappened) {
            case this.ippoMadeTheCriticalHit || !this.challengerMadeTheCriticalHit:
                console.log("Challenger s'est éteint ! Ippo lui a mis un K.O !");
                break;
            case this.challengerMadeTheCriticalHit || !this.ippoMadeTheCriticalHit:
                console.log("Ippo s'est éteint ! Challenger lui a mis un K.O !");
                break;
        
            default:
                break;
        }

    }

}

const fight = new Fight();

/* if joueur 1 frappe en premier
    console.log("Machin frappe en premier")
    for (blablabla) {
        console.log("Tout le texte");
    }
*/