<template>
    <v-dialog v-model="dialog" max-width="600px">
        <template v-slot:activator="{ on }">
            <v-btn 
                small text
                v-on="on"
                class="primary mx-0 my-5"
            >
                <v-icon small>mdi-pencil-outline</v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-card-title>Alteração de Apelido</v-card-title>
            <v-card-text>
                <v-form ref="form" class="px-3">
                    <v-text-field v-model="nicknameValue" label="Apelido" :rules="inputRules"/>
                    <v-btn text class="success mx-0 mt-3" @click="onUpdateClicked">Alterar</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
        
    </v-dialog>
</template>

<script>
export default {
    props: {
		knight: {
            type: Object,
            required: true
        },
    },

    data () {
        return {
            inputRules: [
                value => !!value || 'O campo é obrigatório.'
            ],
            nicknameValue: null,
            dialog: false
        }
    },
    
    mounted() {
        this.nicknameValue = this.knight.nickname;
    },

    methods: {
        onUpdateClicked() {
            if (this.$refs.form.validate()) {
                const axios = require('axios');
            
                axios.patch('http://localhost:3000/knights/'+this.knight.id,
                    {nickname: this.nicknameValue})
                    .then( (response) => {
                        this.afterUpdateKnight();
                    })
                    .catch( (error) => {
                        console.error(error);
                    })

            }
        },

        afterUpdateKnight() {
            this.dialog = false;
        }
    }
}
</script>

<style>

</style>