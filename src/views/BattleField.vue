<script setup>
import MonsterAttribute from '../helpers/monsterAttribute.js';
</script>
<template>
<div class="second-field">

</div>
<div class="phase-field">

</div>
<div class="first-field">
    <div class="monster-field">
        <div class="first">
            first
        </div>
        <div class="second">
            second
        </div>
        <div class="third">
            third
        </div>
        <div class="fourth">
            fourth
        </div>
    </div>

    <div class="cards-wrapper">
        <div class="back-cards" @click="drawCard" v-if="!emptyCards">
            draw a card
        </div>
        <div v-for="card in cards">
       
            <div :class="'card card' + card.id" :ref="'card' + card.id"> 
                <div style="height:20%">
                    {{card.id}}  {{MonsterAttribute(card.id).name}}
                </div>

                <div style="height:50%; line-height: normal">
                    {{MonsterAttribute(card.id).effectDescription}}
                </div>
                <div style="height:15%" >
                    {{card.attack}}
                    {{MonsterAttribute(card.id).type}}
                </div>
                <div >
                    
                    <span v-if="card.effectStatus && !card.effectActivated" @click="activateEffect(card.id)"> Activate</span>
                    <span v-else-if="MonsterAttribute(card.id).attack <= 1500 && !card.summon" @click="summon(card.id)"> summon</span>

                </div>
            </div>

        </div>
        {{ lifePoints }}
    </div>


</div>
</template>


<script>
const monsterFieldEffect = 1;
const cardFieldEffect = 2;
import CardFieldEffect from '../helpers/cardFieldEffect.js';

export default {
    data() {
            return {
                cards: [],
                allCards: [
                    { id: 1, attack: MonsterAttribute(1).attack, typeEffect: 1, effectStatus: false, kindEffect: 5, effectActivated: false},
                    { id: 2, attack: MonsterAttribute(2).attack, typeEffect: 1, effectStatus: false, kindEffect: 4, effectActivated: false },
                    { id: 3, attack: MonsterAttribute(3).attack, typeEffect: 1, effectStatus: false, kindEffect: 7, effectActivated: false },
                    { id: 4, attack: MonsterAttribute(4).attack, typeEffect: 1, effectStatus: false, kindEffect: 6, effectActivated: false },
                    { id: 5, attack: MonsterAttribute(5).attack, typeEffect: 1, effectStatus: false, kindEffect: 2, effectActivated: false },
                    { id: 6, attack: MonsterAttribute(6).attack, typeEffect: 2, effectStatus: false, kindEffect: 1, effectActivated: false },
                    { id: 7, attack: MonsterAttribute(7).attack, typeEffect: 2, effectStatus: false, kindEffect: 1, effectActivated: false },
                    { id: 8, attack: MonsterAttribute(8).attack, typeEffect: 2, effectStatus: false, kindEffect: 1, effectActivated: false },
                ],
                count:0,
                summonThisCard:false,
                availableMonsterField:[
                    { name: 'first', available: true, cardId: null },
                    { name: 'second', available: true, cardId: null },
                    { name: 'third', available: true, cardId: null },
                    { name: 'fourth', available: true, cardId: null },
                ],
                availableCardField:[
                    { name: 'first', available: true, cardId: null },
                    { name: 'second', available: true, cardId: null },
                    { name: 'third', available: true, cardId: null },
                    { name: 'fourth', available: true, cardId: null },
                    { name: 'fifth', available: true, cardId: null },
                    { name: 'sixth', available: true, cardId: null },
                    { name: 'seventh', available: true, cardId: null },
                ],
                countCardDraw: 0,
                emptyCards: false,
                lifePoints: 4000,
            };
    },
     created(){
        this.shuffleCards();
        setTimeout(() => {
            this.drawFiveCards();
        }, 1000); 
    },
    watch: {
        availableMonsterField: {
            deep: true,
            handler(newValue) {
                this.checkingEffect(newValue, monsterFieldEffect, this.availableMonsterField)
            },
        },
        availableCardField: {
            deep: true,
            handler(newValue) {
                this.checkingEffect(newValue, cardFieldEffect, this.availableMonsterField)
            }
        }
    },
    methods: {
        checkingEffect(newCardsOnTheField, fieldEffect, cardsOnTheField){
            const cardIds = this.getIdsInTheField(newCardsOnTheField);
            const areCardsFieldEffect = this.cards.filter(item => cardIds.includes(item.id) && item.typeEffect == fieldEffect)
            //3
            if(areCardsFieldEffect.length > 0) {
                const listOfCardActivate = CardFieldEffect(areCardsFieldEffect, cardsOnTheField);

                this.cards.map((item) => {
                    if(cardIds.includes(item.id)){
                        if(listOfCardActivate.includes(item.id)) {
                            item.effectStatus = true;
                        } else {
                            item.effectStatus = false;
                        }
                    }
                });
                
            }

        },
        getIdsInTheField(cardsOnTheField) {
            return cardsOnTheField
                    .filter(item => item.cardId !== null)
                    .map(item => item.cardId);
        },
        activateEffect(cardId){
          let card = this.cardProperties(cardId);
          card.effectActivated = true;

          switch (card.kindEffect) {
                case 1:
                    this.specialSummon(cardId);
                    break;
                case 2:
                    this.addOtherMonsterAttack(cardId);
                    break;
                case 3:
                    this.addAttack(cardId);
                    break;
                case 4:
                    this.addLifePoints(cardId);
                    break;
                case 5:
                    this.decreaseLifePoints(cardId);
                    this.addAttack(cardId);
                    break;
                case 6:
                    this.decreaseAttack(cardId);
                    this.addOtherMonsterAttack(cardId);
                    break;
                case 7:
                    this.decreaseAttack(cardId);
                    this.addLifePoints(cardId);
                    break;
                default:
                    element.setAttribute("id", "summon-fourth-position");
                    break;
            }

        },
        shuffleCards(){
            const tempCard = [];
            const cards = this.allCards;
            const totalLength = this.allCards.length;
            var length = totalLength;
          
            for(let x = 0; x < totalLength; x++) {
                const randomNumber = Math.floor(Math.random() * length);
                tempCard.push(cards[randomNumber]);
                cards.splice(randomNumber, 1);
                length-=1;
            }
            this.cards = tempCard;
        
        },
        drawFiveCards(){
            for (let i = 0; i < 5; i++){
                this.drawCard();
            }
        },
        cardProperties(cardId){

            return this.cards.find((element) => {           
                    if(element.id == cardId){
                        return element
                    }
            });
        },
        summon(cardId) {
            let card = this.cardProperties(cardId);

            let field = this.availableMonsterField.find((element) => {
                if(element.available == true){
                    return element
                }
            });

            if (field) {
                field.available = false;
                field.cardId = card.id;
                card.summon = true;
                const element = document.querySelector(".card" + card.id);
                this.updateCardField(element.getAttribute('id'));

                switch (field.name) {
                    case 'first':
                        element.setAttribute("id", "summon-first-position");
                        break;
                    case 'second':
                        element.setAttribute("id", "summon-second-position");
                        break;
                    case 'third':
                        element.setAttribute("id", "summon-third-position");
                        break;
                    default:
                        element.setAttribute("id", "summon-fourth-position");
                        break;
                }
            } else{
                alert("monster field is full")
            }
        },
        specialSummon(cardId){
         
            this.summon(cardId);
        },
        addOtherMonsterAttack(cardId){
            this.cardProperties(cardId).effectActivated = true;
            const toAdd = MonsterAttribute(cardId).effect.addAttack;

            var ids = this.getIdsInTheField(this.availableMonsterField);
            const getIndex  = ids.indexOf(cardId);
            ids.splice(getIndex, 1)

            this.cards.map((item) => {
                if(ids.includes(item.id)){
                    item.attack += toAdd;
                }
            });
        },
        addAttack(cardId){
            const toAdd = MonsterAttribute(cardId).effect.addAttack;
            this.cardProperties(cardId).attack += toAdd
        },
        addLifePoints(cardId){
            const toAdd = MonsterAttribute(cardId).effect.addLp;
            this.lifePoints += toAdd;
        },
        decreaseLifePoints(cardId){
            const toDecrease = MonsterAttribute(cardId).effect.decreaseLp;
            this.lifePoints -= toDecrease;
        },
        decreaseAttack(cardId){
            const toAdd = MonsterAttribute(cardId).effect.decreaseAttack;
            this.cardProperties(cardId).attack -= toAdd
        },
        updateCardField(fieldPosition){

            switch (fieldPosition) {
                    case 'draw-first-position':
                        this.availableCardField.find(item => item.name == 'first' ).available = true;
                        this.availableCardField.find(item => item.name == 'first' ).cardId = null;
                        break;
                    case 'draw-second-position':
                        this.availableCardField.find(item => item.name == 'second' ).available = true;
                        this.availableCardField.find(item => item.name == 'second' ).cardId = null;
                        break;
                    case 'draw-third-position':
                        this.availableCardField.find(item => item.name == 'third' ).available = true;
                        this.availableCardField.find(item => item.name == 'third' ).cardId = null;
                        break;
                    case 'draw-fourth-position':
                        this.availableCardField.find(item => item.name == 'fourth' ).available = true;
                        this.availableCardField.find(item => item.name == 'fourth' ).cardId = null;
                        break;
                    case 'draw-fifth-position':
                        this.availableCardField.find(item => item.name == 'fifth' ).available = true;
                        this.availableCardField.find(item => item.name == 'fifth' ).cardId = null;
                        break;
                    case 'draw-sixth-position':
                        this.availableCardField.find(item => item.name == 'sixth' ).available = true;
                        this.availableCardField.find(item => item.name == 'sixth' ).cardId = null;
                        break;
                    case 'draw-seventh-position':
                        this.availableCardField.find(item => item.name == 'seventh' ).available = true;
                        this.availableCardField.find(item => item.name == 'seventh' ).cardId = null;
                        break;
                }
        },

        drawCard(){
            let card = this.getNextCardToDraw()
            let availableField = this.availableCardField.find((element) => {
                if(element.available == true){
                    return element
                }
            });
            const element = document.querySelector(".card" + card.id);
         
            if(availableField) {
                availableField.cardId = card.id;
                this.countCardDraw += 1;
                switch (availableField.name) {
                        case 'first':
                            element.setAttribute("id", "draw-first-position");
                            this.availableCardField.find(item => item.name == 'first' ).available = false;
                            break;
                        case 'second':
                            element.setAttribute("id", "draw-second-position");
                            this.availableCardField.find(item => item.name == 'second' ).available = false;
                            break;
                        case 'third':
                            element.setAttribute("id", "draw-third-position");
                            this.availableCardField.find(item => item.name == 'third' ).available = false;
                            break;
                        case 'fourth':
                            element.setAttribute("id", "draw-fourth-position");
                            this.availableCardField.find(item => item.name == 'fourth' ).available = false;
                            break;
                        case 'fifth':
                            element.setAttribute("id", "draw-fifth-position");
                            this.availableCardField.find(item => item.name == 'fifth' ).available = false;
                            break;
                        case 'sixth':
                            element.setAttribute("id", "draw-sixth-position");
                            this.availableCardField.find(item => item.name == 'sixth' ).available = false;
                            break;
                        case 'seventh':
                            element.setAttribute("id", "draw-seventh-position");
                            this.availableCardField.find(item => item.name == 'seventh' ).available = false;
                            break;
                }
            } else {
                alert('no avilable field');
            }

        },
        getNextCardToDraw(){
            const idtoDraw = (this.cards.length - 1)- this.countCardDraw

            if(idtoDraw == 0) {
                this.emptyCards = true;
            }

            return this.cards[idtoDraw];
        },
    }
};
</script>