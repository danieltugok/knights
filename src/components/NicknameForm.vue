<template>
    <v-card>
        <v-card-title>
            <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
            <v-container>
                <v-row>
                    <v-row>
                        <v-text-field label="Apelido" v-model="nicknameValue"></v-text-field>
                    </v-row>
                </v-row>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="onClose">Cancelar</v-btn>
            <v-btn color="blue darken-1" text @click="onSave">Alterar</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    props: {
        knight: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            nicknameValue: null
        }
    },

    created() {
        this.fillNickname();
    },

    methods: {
        onClose () {
            this.$emit("onClose");
        },

        onSave() {
            
        },

        fillNickname() {
           this.nicknameValue = this.knight.nickname;
        }
    }
}
</script>

<style>

</style>