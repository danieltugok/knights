<template>
    <div>
        <v-subheader class="title">Listar Knights</v-subheader>

        <div class="table-knight">
            <v-data-table
                :headers="headers"
                :items="knightList"
                :no-data-text="'Nenhum item encontrado'"
                item-key="name"
            >
                <template v-slot:item.age="{ item }">
                    {{ formatAge(item) }}
                </template>

                <template v-slot:item.weaponsAmount="{ item }">
                    {{ formatWeaponsAmount(item.weapons) }}
                </template>

                <template v-slot:item.atack="{ item }">
                    {{ formatAttack(item) }}
                </template>

                <template v-slot:item.exp="{ item }">
                    {{ formatExp(item) }}
                </template>
            </v-data-table>
        </div>
        
    </div>
</template>

<script>
import getMod from '../functions/mod'

export default {
    
    data() {
        return {
            headers: [
                { text: 'Nome'    , value: 'name', },
                { text: 'Idade'   , value: 'age' },
                { text: 'Armas'   , value: 'weaponsAmount' },
                { text: 'Atributo', value: 'keyAttribute' },
                { text: 'Ataque'  , value: 'atack' },
                { text: 'Exp'     , value: 'exp' },
            ],

            knightList: [],
            getModFunction: getMod
        }
    },
    
    created() {
        this.listKnights();
    },

    methods: {

        onDialogCreateKnightsCreated() {

        },
        
        listKnights() {
            const axios = require('axios');

            axios.get('http://localhost:3000/knights')
                .then( (response) => {
                    this.knightList = response.data;
                })
                .catch( (error) => {
                    console.error(error);
                })
        },

        getAgeByBirthday(birthday) {
            //NOTA - a título de avaliação, decidi não usar o moment.js para obter essa informação.

            const today = new Date(),
                  splittedKnightBirthdayDate = birthday.split("/"),
                  knightBirthdayDateObject = new Date(+splittedKnightBirthdayDate[2], splittedKnightBirthdayDate[1] - 1, +splittedKnightBirthdayDate[0]),
                  
                  knightBirthdayDay = knightBirthdayDateObject.getDate(),
                  knightBirthdayMonth = knightBirthdayDateObject.getMonth() + 1,
                  knightBirthdayYear = knightBirthdayDateObject.getFullYear()

            let age = today.getFullYear() - knightBirthdayYear;
             
            if (knightBirthdayMonth === today.getMonth()+1 ) {
                if ( knightBirthdayDay > today.getDate() ) {
                    age -= 1
                }
            } else if (knightBirthdayMonth > today.getMonth()+1) {
                age -= 1
            }
            return age;
        },

        formatAge(knight) {
            
            return this.getAgeByBirthday(knight.birthday)
            
        },

        formatWeaponsAmount(weapons){
            return weapons.length;
        },

        formatAttack(knight){
            
            let equippedWeapon = knight.weapons.find( (weapon) => {
                return weapon.equipped;
            });

            return 10 + this.getModFunction(knight.attributes[knight.keyAttribute]) + equippedWeapon.mod;
        },

        formatExp(knight){

            let age = this.getAgeByBirthday(knight.birthday);

            return Math.floor((age - 7) * Math.pow(22, 1.45));
        },

    },
}

</script>
<style>
    .table-knight {
        padding: 30px;
        background-color: #585858;
        margin: 20px;
    }
</style>