<template>
    <div>
        <v-subheader class="title">cadastrar knight</v-subheader>
        
        <v-form class="px-3 form">
            <v-text-field label="Nome" v-model="nameValue" />
            <v-text-field label="Apelido" v-model="nicknameValue" />
            <v-row>
                <v-col cols="6">
                    <v-menu>
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                label="Data de Nascimento"
                                :value="formatedDateBirthValue"
                                readonly
                                v-on="on"
                            />
                        </template>
                        
                            <v-date-picker 
                                v-model="dateBirthValue"
                                no-title
                            />
                        
                    </v-menu>
                </v-col>
                <v-col cols="6">
                    <v-combobox
                        v-model="attributeKeyValue"
                        :items="attributeList"
                        label="Selecione o atributo chave do knight"
                    />
                </v-col>
            </v-row>
            <fieldset class="fieldset-attributes">
                <legend>Atributos</legend>
                <v-row>
                    <v-col cols="2">
                        <v-text-field 
                            type="number"
                            label="Strength"
                            v-model="attrStrengthValue"
                        />
                    </v-col>
                    <v-col cols="2">
                        <v-text-field 
                            type="number"
                            label="Dexterity"
                            v-model="attrDexterityValue"
                        />
                    </v-col>
                    <v-col cols="2">
                        <v-text-field
                            type="number"
                            label="Constitution"
                            v-model="attrConstitutionValue"
                        />
                    </v-col>
                    <v-col cols="2">
                        <v-text-field
                            type="number"
                            label="Intelligence"
                            v-model="attrIntelligenceValue"
                        />
                    </v-col>
                    <v-col cols="2">
                        <v-text-field
                            type="number"
                            label="Wisdom"
                            v-model="attrWisdomValue"
                        />
                    </v-col>
                    <v-col cols="2">
                        <v-text-field
                            type="number"
                            label="Charisma"
                            v-model="attrCharismaValue"
                        />
                    </v-col>
                </v-row>
            </fieldset>
            
            <fieldset class="fieldset-weapon">
                <legend>Arma</legend>
                <v-row>
                    <v-col>
                        <v-text-field v-model="weaponNameValue" label="Nome" />
                    </v-col>
                    <v-col>
                        <v-text-field v-model="weaponModValue" type="number" label="Constituição"/>
                    </v-col>
                    <v-col>
                        <v-combobox v-model="weaponAttributeValue" :items="attributeList" label="Selecione o atributo"/>
                    </v-col>
                    <v-btn class="my-8" color="success" @click="onAddWeaponClicked" small>
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </v-row>
            </fieldset>

            <v-btn text class="primary mx-0 my-5" @click="submit">Cadastrar</v-btn>
        </v-form>

    </div>
</template>

<script>
export default {
    data () {
        return {
            nameValue              : null,
            nicknameValue          : null,
            dateBirthValue         : null,
            formatedDateBirthValue : null,
            attributeKeyValue      : null,
            
            attrStrengthValue      : null,
            attrDexterityValue     : null,
            attrConstitutionValue  : null,
            attrIntelligenceValue  : null,
            attrWisdomValue        : null,
            attrCharismaValue      : null,

            weaponNameValue        : null,
            weaponModValue         : null,
            weaponAttributeValue   : null,

            weaponList             : [],

            attributeList          : [
                    "strength",
                    "dexterity",
                    "constitution",
                    "intelligence",
                    "wisdom",
                    "charisma"
                ]
        }
    },
    
    watch: {
        
        dateBirthValue: function (val) {
            // NOTA - a título de avaliação, decidi não usar ferramentas como date-fns para formatar a data
            let splittedDate = val.split("-");
            this.formatedDateBirthValue = splittedDate[2] + "/" + splittedDate[1] + "/" + splittedDate[0] 
        },

    },

    methods: {
        submit() {

        },

        onAddWeaponClicked() {

        }
    }
}
</script>

<style>
    .form {
        padding: 30px;
        background-color: #585858;
        margin: 20px;
    }
    .title {
        text-transform: capitalize;
    }
    .fieldset-attributes {
        padding: 20px;
        background-color: #5a5d63;
    }
    .fieldset-weapon {
        padding: 20px;
        background-color: #5a5d63;
    }
</style>