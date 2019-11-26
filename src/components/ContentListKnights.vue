<template>
    <div>
        
        <div class="table-knights">
            <v-data-table
                :headers="headers"
                :items="knightList"
                :no-data-text="'Nenhum item encontrado'"
                item-key="name"
            />
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
                { text: 'Armas'   , value: 'name' },
                { text: 'Atributo', value: 'keyAttribute' },
                { text: 'Ataque'  , value: 'name' },
                { text: 'Exp'     , value: 'name' },
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