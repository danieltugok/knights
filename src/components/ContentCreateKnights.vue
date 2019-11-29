<template>
    <div>
        <v-subheader class="title">cadastrar knight</v-subheader>
        
        <v-form ref="form" class="px-3 form" >
            <v-row>
                <v-col cols="6">
                    <v-text-field label="Nome" v-model="nameValue" :rules="inputRules"/>
                </v-col>
                <v-col cols="6">
                    <v-text-field label="Apelido" v-model="nicknameValue" :rules="inputRules"/>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6">
                    <v-menu>
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                label="Data de Nascimento"
                                :value="formattedDateBirthValue"
                                readonly
                                v-on="on"
                                :rules="inputRules"
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
                        v-model="keyAttributeValue"
                        :items="attributeList"
                        label="Selecione o atributo chave do knight"
                        :rules="inputRules"
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
                            v-model.number="attrStrengthValue"
                            :rules="inputNumberRules"
                        />
                    </v-col>
                    <v-col cols="2">
                        <v-text-field 
                            type="number"
                            label="Dexterity"
                            v-model.number="attrDexterityValue"
                            :rules="inputNumberRules"
                        />
                    </v-col>
                    <v-col cols="2">
                        <v-text-field
                            type="number"
                            label="Constitution"
                            v-model.number="attrConstitutionValue"
                            :rules="inputNumberRules"
                        />
                    </v-col>
                    <v-col cols="2">
                        <v-text-field
                            type="number"
                            label="Intelligence"
                            v-model.number="attrIntelligenceValue"
                            :rules="inputNumberRules"
                        />
                    </v-col>
                    <v-col cols="2">
                        <v-text-field
                            type="number"
                            label="Wisdom"
                            v-model.number="attrWisdomValue"
                            :rules="inputNumberRules"
                        />
                    </v-col>
                    <v-col cols="2">
                        <v-text-field
                            type="number"
                            label="Charisma"
                            v-model.number="attrCharismaValue"
                            :rules="inputNumberRules"
                        />
                    </v-col>
                </v-row>
            </fieldset>
            
            <BoxWeaponList ref="boxWeapon" v-model="weaponList"/>

            <v-btn text class="primary mx-0 my-5" @click="create">Cadastrar</v-btn>
        </v-form>

    </div>
</template>

<script>
import BoxWeaponList from './BoxWeaponList'
import AttributeList from '../functions/attributeList'

export default {
    
    components: {
        BoxWeaponList
    },

    data () {
        return {
            nameValue               : null,
            nicknameValue           : null,
            dateBirthValue          : null,
            formattedDateBirthValue : null,
            keyAttributeValue       : null,
            
            attrStrengthValue      : null,
            attrDexterityValue     : null,
            attrConstitutionValue  : null,
            attrIntelligenceValue  : null,
            attrWisdomValue        : null,
            attrCharismaValue      : null,
            weaponList             : [],

            inputRules: [
                value => !!value || 'O campo é obrigatório.'
            ],

            inputNumberRules: [
                value => !!value || 'O campo é obrigatório.',
                value => value > 0 || 'O valor deve ser maior que 0.'
            ],

            attributeList: AttributeList
        }
    },

    watch: {

        dateBirthValue (val) {
            if (val) {
                // NOTA - a título de avaliação, decidi não usar ferramentas como date-fns para formatar a data
                let splittedDate = val.split("-");
                this.formattedDateBirthValue = splittedDate[2] + "/" + splittedDate[1] + "/" + splittedDate[0] 
            } else {
                this.formattedDateBirthValue = null;
            }

        },

    },

    methods: {
        
        create() {
            if (this.$refs.form.validate()) {
                const axios = require('axios');
            
                axios.post('http://localhost:3000/knights', this.defineCreateParams())
                    .then( (response) => {
                        this.afterWeaponCreated();
                    })
                    .catch( (error) => {
                        console.error(error);
                    });
            }

            
        },

        defineCreateParams () {
            const uuidv1 = require('uuid/v1');
            
            return {
                id       : uuidv1(),
                name     : this.nameValue,
                nickname : this.nicknameValue,
                birthday : this.formattedDateBirthValue,
                weapons  : this.weaponList,
                attributes: {
                    strength     : this.attrStrengthValue,
                    dexterity    : this.attrDexterityValue,
                    constitution : this.attrConstitutionValue,
                    intelligence : this.attrIntelligenceValue,
                    wisdom       : this.attrWisdomValue,
                    charisma     : this.attrCharismaValue
                },
                keyAttribute: this.keyAttributeValue
            }
        },

        afterWeaponCreated() {
            this.forceFormReset();
        },

        forceFormReset () {
            this.$refs.form.reset();
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