import MonsterAttribute from '../helpers/monsterAttribute.js';

export default function(id, statusOfField) {
    const monsterIds= statusOfField.filter(item => item.cardId !== null).map(item => item.cardId);

    switch (id) {
        case 1:
            return 1;
        break;
        case 2:
            return 2;
        break;
        case 3:
            return 3;
        break;
        case 4:
            if(monsterIds.length == 1) {
                return false
            }
            return 4;
        break;
        case 5:
            if(monsterIds.length == 1) {
                return false
            }
            return 5;
        break;
        case 6:
            if(monsterIds.length != 0){
                return false
            }
            return 6;
            break;
        case 7:
            var monsterType = []
            for(let i = 0; i < monsterIds.length; i++) {
                var attribute = MonsterAttribute(monsterIds[i])
                monsterType.push(attribute.type);
            }

            if (monsterType.includes('air')){
                return false
            }
            return 7;
            break;
        case 8:
            if(monsterIds.length < 2) {
                return false
            }
            return 8;
            break;
    }

  }