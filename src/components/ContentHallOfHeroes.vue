<template>
    <div>
        <v-subheader class="title">Lista de Heróis</v-subheader>
        <div class="row">
            <boxHero 
                v-for="(item, index) in this.heroList" :key="'hero'+index"
                :hero="item"
            />
        </div>
    </div>
</template>

<script>
import BoxHero from './BoxHero.vue'

export default {
    
    components: {
        BoxHero
    },

    data() {
        return {
            heroList: [],
        }
    },
    
    created() {
        this.listHeroes();
    },

    methods: {
        listHeroes() {
            const axios = require('axios');

            axios.get('http://localhost:3000/heroes')
                .then( (response) => {
                    this.heroList = response.data;
                })
                .catch( (error) => {
                    console.error(error);
                })
        },

    }

}
</script>