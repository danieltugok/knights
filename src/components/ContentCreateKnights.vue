<template>
    <div>
        <v-subheader class="title">cadastrar knight</v-subheader>
        
        <v-form class="px-3 form">
            <v-row>
                <v-col cols="6">
                    <v-text-field label="Nome" v-model="nameValue" />
                </v-col>
                <v-col cols="6">
                    <v-text-field label="Apelido" v-model="nicknameValue" />
                </v-col>
            </v-row>
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
                <legend>Lista de Armas</legend>
                <v-row>
                    <v-col>
                        <v-text-field v-model="weaponNameValue" label="Nome" />
                    </v-col>
                    <v-col>
                        <v-text-field v-model="weaponModValue" type="number" label="Mod"/>
                    </v-col>
                    <v-col>
                        <v-combobox v-model="weaponAttributeValue" :items="attributeList" label="Selecione o atributo"/>
                    </v-col>
                    <v-btn class="my-8" color="success" @click="onAddWeaponClicked" small>
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </v-row>

                <v-row v-if="this.weaponList.length">

                    <v-list color="#5a5d63" flat two-line>
                        <v-subheader>Selecione a arma a ser equipada pelo knight</v-subheader>
                        <v-list-item-group
                            v-model="equippedWeaponValue"
                            active-class="blue--text"
                            mandatory
                        >
                            <template v-for="(weapon, index) in this.weaponList">
                                <v-list-item :key="'weapon' + index">
                                    <template v-slot:default="{ active }">
                                        <v-list-item-action>
                                            <v-icon v-if="!active" class="my-8" color="grey lighten-1">
                                                mdi-radiobox-marked
                                            </v-icon>
                                            <v-icon v-else class="my-8" color="green">
                                                mdi-radiobox-marked
                                            </v-icon>
                                        </v-list-item-action>
                                        <v-list-item-content>
                                            <v-list-item-title>{{weapon.name}}</v-list-item-title>
                                            <v-list-item-subtitle>Mod: {{weapon.mod}}</v-list-item-subtitle>
                                            <v-list-item-subtitle>Atributo: {{weapon.attr}}</v-list-item-subtitle>
                                        </v-list-item-content>
                                        <v-btn class="my-8" color="error" @click="onRemoveWeaponItemClicked(index)" x-small fab>
                                            <v-icon small>mdi-close</v-icon>
                                        </v-btn>
                                    </template>
                                </v-list-item>
                                <v-divider :key="'divider'+index" />
                            </template>

                        </v-list-item-group>
                    </v-list>

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

            equippedWeaponValue    : null,

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
        
        dateBirthValue (val) {
            // NOTA - a título de avaliação, decidi não usar ferramentas como date-fns para formatar a data
            let splittedDate = val.split("-");
            this.formatedDateBirthValue = splittedDate[2] + "/" + splittedDate[1] + "/" + splittedDate[0] 
        },

    },

    methods: {
        
        onAddWeaponClicked() {
            this.weaponList.push({
                "name"     : this.weaponNameValue,
                "mod"      : this.weaponModValue,
                "attr"     : this.weaponAttributeValue,
                "equipped" : false
            })

            this.clearWeaponList();
        },

        onRemoveWeaponItemClicked(index) {
            this.$delete(this.weaponList, index);
        },

        clearWeaponList() {
            this.weaponNameValue      = null;
            this.weaponModValue       = null;
            this.weaponAttributeValue = null;
        },

        submit() {
            
        },
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