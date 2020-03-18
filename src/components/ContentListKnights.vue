<template>
    <div>
        <v-subheader class="title">Listar Knights</v-subheader>

        <a href="#" @click.prevent="teste">testeeeee</a>

        <div class="table-knight">
            <v-data-table
                :headers="headers"
                :items="knightList"
                :no-data-text="'Nenhum item encontrado'"
                ref="table"
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

                <template v-slot:item.update="{ item }">
                    <DialogUpdateNickname :knight="item" @reload="updated"/>
                </template>

                <template v-slot:item.delete="{ item }">
                    <v-btn text class="error mx-0 my-5" @click="onDeleteKnightClick(item)" small>
                        <v-icon small>mdi-trash-can-outline</v-icon>
                    </v-btn>
                </template>
            </v-data-table>
        </div>
        
    </div>
</template>

<script>
import getMod from '../functions/mod'
import DialogUpdateNickname from './DialogUpdateNickname'

export default {
    
    components: {
        DialogUpdateNickname
    },

    data() {
        return {
            headers: [
                { text: 'Nome'    , value: 'name', },
                { text: 'Idade'   , value: 'age' },
                { text: 'Armas'   , value: 'weaponsAmount' },
                { text: 'Atributo', value: 'keyAttribute' },
                { text: 'Ataque'  , value: 'atack' },
                { text: 'Exp'     , value: 'exp' },
                { text: 'Alterar' , value: 'update' },
                { text: 'Excluir' , value: 'delete' },
            ],

            knightList: [],
            getModFunction: getMod
        }
    },
    
    created() {
        this.listKnights();
    },

    methods: {

        updated() {
            const axios = require('axios');

            axios.get('http://localhost:3000/knights')
                .then( (response) => {
                    this.knightList = response.data;
                })
                .catch( (error) => {
                    console.error(error);
                })


        },

        onDeleteKnightClick(knight) {
            
            
            this.createHero(knight)
                .then( () => {
                    this.deleteKnight(knight)
                })
        },

        onEditKnightClick(knight) {
            
            this.createHero(knight)
                .then( () => {
                    this.deleteKnight(knight)
                })
        },

        createHero(hero) {
            const axios = require('axios');
            
            return new Promise((resolve, reject) => {
                
                axios.post('http://localhost:3000/heroes', hero)
                    .then( (response) => {
                        resolve();
                    })
                    .catch( (error) => {
                        reject(error);
                    });
            })
        },

        deleteKnight(knight) {
            const axios = require('axios');

            axios.delete('http://localhost:3000/knights/'+knight.id)
                .then( (response) => {
                    this.listKnights();
                })
                .catch( (error) => {
                    console.error(error);
                });
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