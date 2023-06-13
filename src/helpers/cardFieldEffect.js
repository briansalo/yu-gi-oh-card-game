import MonsterEffect from '../helpers/monsterEffect.js';

export default function(cards, statusOfField) {
    var test = []
    for(let i = 0; i < cards.length; i++) {
            // switch (cards[i].id) {

            if(MonsterEffect(cards[i].id, statusOfField, cards) != false) {
              test.push(MonsterEffect(cards[i].id, statusOfField))  ;
            }

    }    

    return test;
  }