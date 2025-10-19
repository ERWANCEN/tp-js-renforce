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
        // Initialisation du tableu contenant les caractéristiques de combattants
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
        this.winnerId = null;
        this.endReason = "points";

        this.entireFight();
    }


    // Fonction permettant de récupérer l'ID du gagnant, et la raison de la fin du combat
    endFight(winnerId, reason = "points") {
        this.winnerId = winnerId;
        this.endReason = reason;
        this.stopFight = true;
    }



    // Fonction permmettant d'afficher le résultat du combat en fonction de la cause de la fin du combat
    announceResult() {
        const ippoStamina = this.ippo.caractéristiques.stamina;
        const challengerStamina = this.challenger.caractéristiques.stamina;

        // Message fin de combat selon la raison de la fin du combat
        if (this.winnerId !== null) {
            const winner = this.fightersCharacteristics[this.winnerId].name;
            const loser  = this.fightersCharacteristics[this.winnerId === 0 ? 1 : 0].name;

            if (this.endReason === "KO") {
                console.log(`${loser} est K.O. ! ${winner} remporte le combat par K.O. !`);
            } else if (this.endReason === "critical") {
                console.log(`${loser} s'est éteint sur un coup critique ! ${winner} gagne !`);
            };
            return;
        }

        // Message fin de match hors coup critique : qui a le plus de Stamina restante ?
        if (ippoStamina > challengerStamina) {
            console.log("Ippo remporte ce combat et devient une nouvelle fois champion du monde !");
        } else if (ippoStamina < challengerStamina) {
            console.log("Challenger devient notre nouveau champion du monde en détrônant Ippo, invaincu depuis 20 ans !!!");
        } else {
            console.log("Match nul !");
        }
    }



    // Première fonction appelée qui permet l'enchaînement de tout le combat
    entireFight() {
        // Message début de combat
        console.log(`Ladies and Gentlemen. Bienvenue, en ce jour historique, au combat opposant le plus grand, le plus fort, le plus titré, je vous demande de faire un tonnerre d'applaudissements pour IIIPPOOOOOOOOO !!!!\nFace à lui, un combattant qui n'a pas froid aux yeux et qui compte bien faire tomber notre champion en titre, j'ai nommé Challengerrrr !!`);
        console.log(`*** Musique d'ambiance ***`);
        console.log(`Sans plus tarder, place au combat !\n`);

        // Les 10 rounds sauf coup critique -> arrêt prématuré
        for (let i = 0; i < 10; i++) {
            console.log(`==================== ROUND ${i + 1} ====================\n`);

            this.whoHitsFirst();

            // Permet de stopper la boucle for en cas de fin de combat prématuré
            if (this.stopFight) break;
        }

        this.announceResult();
    }



    // Permet de déterminer selon la vitesse de chaque combatant qui attaque en premier
    whoHitsFirst() {
        const ippoSpeed = this.ippo.caractéristiques.speed;
        const challengerSpeed = this.challenger.caractéristiques.speed;

        if (ippoSpeed > challengerSpeed) {
            console.log(`${this.ippo.name} frappe en premier, il utilise un ${this.technique(0)}\n`);
            if (this.stopFight) return;
            console.log(`${this.challenger.name} répond avec un ${this.technique(1)}\n`);
        } else {
            console.log(`${this.challenger.name} frappe en premier, il utilise un ${this.technique(1)}\n`);
            if (this.stopFight) return;
            console.log(`${this.ippo.name} répond avec un ${this.technique(0)}\n`);
        }
    }



    // Permet de déterminer le coup qui va être joué par chaque joueur
    technique(fighter) {
        return this.sortAttacks(fighter);
    }



    // Permet d'aller récupérer de manière aléatoire la prochaine attaque de chaque combattant
    sortAttacks(fighter) {
        const randomChance = Math.random();

        // Création de la variable permettant d'avoir l'ID de l'adversaire et une lecture plus claire pour le prochain dev
        // Nous affectons donc à opponentID la valeur de "fighter" et nous vérifions que la valeur est bien 0 ou 1, sinon nous mettons 0 par défaut
        let opponentId = fighter === 0 ? 1 : 0;

        // 1 chance sur 10 pour que le coup soit un coup critique
        if (randomChance < 0.1) {
            this.criticalHitHappened = true;
            if (fighter === 0) this.ippoMadeTheCriticalHit = true;
            else this.challengerMadeTheCriticalHit = true;

            this.endFight(fighter, "critical");
            return `coup critique et met ${this.fightersCharacteristics[opponentId].name} K.O ! 💢`;
        } else {
            // Si pas de coup critique, va récupérer une attaque aléatoirement parmis les 4 du combattant
            const indexHit = Math.floor(Math.random() * this.fightersCharacteristics[fighter].techniques.length);

            const damage = this.damageTaken(fighter, opponentId, indexHit);
            this.damageGiven = damage;

            const oppStats = this.fightersCharacteristics[opponentId].caractéristiques;

            // Permet de stopper le combat si l'adversaire n'a plus de stamina
            if (oppStats.stamina <= 0) {
                this.endFight(fighter, "KO");
                return `${this.fightersCharacteristics[fighter].techniques[indexHit].name} et inflige ${damage} de dégats.`;
            }

            return `${this.fightersCharacteristics[fighter].techniques[indexHit].name} et inflige ${damage} de dégats. \nIl reste donc ${oppStats.stamina} de stamina à ${this.fightersCharacteristics[opponentId].name} !`;
        }
    }
    



    // Permet de déterminer les dégats reçus
    damageTaken(fighter, opponentId, indexHit, damageGiven) {
        const power = this.fightersCharacteristics[fighter].techniques[indexHit].power;
        const def = this.fightersCharacteristics[opponentId].caractéristiques.defense;
        const damage = Math.max(0, power - def);
        const opp = this.fightersCharacteristics[opponentId].caractéristiques;
        
        opp.stamina = Math.max(0, opp.stamina - damage);

        return damage;
    }
}

// Permet d'instantier la class et donc de lancer l'exercice complet
const fight = new Fight();