<template>
    <div>
        
        <div class="table-knights">
            <v-data-table
                :headers="headers"
                :items="knightList"
                :no-data-text="'Nenhum item encontrado'"
                item-key="name"
            >
                <template v-slot:item.age="{ knight }">
                    {{ formatAge(knight) }}
                </template>

                <template v-slot:item.weaponsAmount="{ knight }">
                    {{ formatWeaponsAmount(knight.weapons) }}
                </template>

                <template v-slot:item.atack="{ knight }">
                    {{ formatAttack(knight) }}
                </template>

                <template v-slot:item.exp="{ knight }">
                    {{ formatExt(knight) }}
                </template>
            </v-data-table>
        </div>
    </div>
</template>

<script>

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

            knightList: []
        }
    },
    
    created() {
        this.listKnights();
    },

    methods: {
        
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

        formatAge(knight) {
            //NOTA - a título de avaliação, decidi não usar o moment.js para obter essa informação.
            
            const today = new Date(),
                  splittedKnightBirthdayDate = knight.birthday.split("/"),
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

        formatWeaponsAmount(weapons){
            return weapons.length;
        },

        formatAttack(knight){
            return 'ataque'
        },

        formatExp(knight){
            return 'ataque'
        }

    },
}

</script>
<style>
    .table-knights {
        padding: 30px;
        background-color: #585858;
        margin: 75px;
    }
</style>