export default function(id, attribute = null) {

    switch (id) {
        case 1:
            return {
                effectDescription: 'decrease 1,000 life points to gain 500 attack',
                name: 'snake',
                type: 'water',
                attack: 1500,
                effect: {decreaseLp:2000, addAttack: 500},
            };
            break;
        case 2:
            return {
                effectDescription: 'add 2,000 life points',
                name: 'fairy',
                type: 'air',
                attack: 1000,
                effect: {addLp:2000},
            };
            break;
        case 3:
            return {
                effectDescription: 'decrease 100 attack and you will gain 1,000 life points',
                name: 'fish',
                type: 'water',
                attack: 1200,
                effect: {decreaseAttack:100, addLp:1000},
            };
            break;
        case 4:
            return {
                effectDescription: 'decrease 200 attack and other monster will gain 200 attack',
                name: 'crocodile',
                type: 'water',
                attack: 1500,
                effect: {decreaseAttack:300, addAttack: 200},
            };
            break;
        case 5:
            return {
                effectDescription: 'other monster will gain 300 attack',
                name: 'zebra',
                type: 'land',
                attack: 1250,
                effect: {addAttack: 300},
            };
            break;
        case 6:
            return {
                effectDescription: 'if there is no monster on the field you can special summon this',
                name: 'dragon',
                type:'fire',
                attack: 2000,
            };
            break;
        case 7:
            return {
                effectDescription: 'if there is no air(type) monster on the field you can special summon this',
                name: 'eagle',
                type:'air',
                attack: 1300,
            };
            break;
        case 8:
            return {
                effectDescription: 'if you control two or more monster on the field, you can special summon this',
                name: 'lion',
                type:'land',
                attack: 1900,
            };
            break;
    }

}