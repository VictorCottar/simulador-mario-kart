const player1 = {
    nome: "Mario",
    velocidade: 4,
    manobrabilidade: 3,
    poder: 3,
    pontos: 0
};

const player2 = {
    nome: "Luigi",
    velocidade: 3,
    manobrabilidade: 4,
    poder: 4,
    pontos: 0
};

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}    

async function getRandomBlock() {
    let random = Math.random();
    let result

    switch(true) {
        case random < 0.33:
            result = "RETA";
            break;
        case random < 0.66:
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO";
    }

    return result;
}

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} rolou o dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

async function playRaceEngine(character1, character2) {
    
    for(let round = 1; round <=5; round++) {
        console.log(`Rodada ${round}`);
        
        // sortear bloco
        let  block = await getRandomBlock();
        console.log(`Bloco: ${block}`);

        // rolar dados
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        // teste de habilidade
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if(block === "RETA") {
            totalTestSkill1 = character1.velocidade + diceResult1;
            totalTestSkill2 = character2.velocidade + diceResult2;

            await logRollResult(
                character1.nome,
                "velocidade",
                diceResult1,
                character1.velocidade);
            await logRollResult(
                character2.nome,
                "velocidade",
                diceResult2,
                character2.velocidade); 
        }        
        if(block === "CURVA") {
            totalTestSkill1 = character1.manobrabilidade + diceResult1;
            totalTestSkill2 = character2.manobrabilidade + diceResult2;

            await logRollResult(
                character1.nome,
                "manobrabilidade",
                diceResult1,
                character1.velocidade);
            await logRollResult(
                character2.nome,
                "manobrabilidade",
                diceResult2,
                character2.velocidade);                

        }
        if(block === "CONFRONTO") {
            let powerResult1 = character1.poder + diceResult1;
            let powerResult2 = character2.poder + diceResult2;
        
            console.log(`${character1.nome} confrontou com ${character2.nome}!`);
            await logRollResult(
                character1.nome,
                "poder",
                diceResult1,
                character1.poder);

            await logRollResult(
                character2.nome,
                "poder",
                diceResult2,
                character2.poder);

            if(powerResult1 > powerResult2 && character2.pontos > 0) {
                console.log(`${character1.nome} venceu o confronto! ${character2.nome} perdeu um ponto!`);
                character2.pontos--;
            }
            if(powerResult2 > powerResult1 && character1.pontos > 0) {
                console.log(`${character2.nome} venceu o confronto! ${character1.nome} perdeu um ponto!`);
                character1.pontos--;
            }    
            
            console.log(powerResult1 === powerResult2 ? "Confronto empatado! Nenhum ponto perdido!" : "");

    }     
        // verificar vencedor
        if(totalTestSkill1 > totalTestSkill2) {
            character1.pontos++;
            console.log(`${character1.nome} venceu a rodada!`);
        } else if(totalTestSkill2 > totalTestSkill1) {
            character2.pontos++;
            console.log(`${character2.nome} venceu a rodada!`);
        }

        console.log("-----------------------");
    }
}

async function declareWinner(character1, character2) {
    console.log("Resultado final:");
    console.log(`${character1.nome}: ${character1.pontos} pontos`);
    console.log(`${character2.nome}: ${character2.pontos} pontos`);

    if(character1.pontos > character2.pontos) 
        console.log(`\n${character1.nome} venceu a corrida!`);
    else if(character2.pontos > character1.pontos)
        console.log(`\n${character2.nome} venceu a corrida!`);
    else 
        console.log("\nA corrida terminou empatada!");
}

(async function main() {
    console.log("\n") 
    console.log(`Corrida entre ${player1.nome} e ${player2.nome} começando...\n`);
    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
})();
