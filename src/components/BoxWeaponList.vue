<template>
    <fieldset class="fieldset-weapon my-5">
        <legend>Lista de Armas</legend>
        <v-subheader>Selecione a arma a ser equipada pelo knight</v-subheader>
        <v-row v-for="(weapon, index) in this.weaponList" :key="'weapon'+index">
            <v-col cols="1">
                <v-checkbox v-model="weapon.equipped" :rules="checkboxRules"></v-checkbox>
            </v-col>
            <v-col>
                <v-text-field v-model="weapon.name" label="Nome" :rules="inputRules"/>
            </v-col>
            <v-col>
                <v-text-field v-model.number="weapon.mod" type="number" label="Mod" :rules="inputNumberRules"/>
            </v-col>
            <v-col>
                <v-combobox v-model="weapon.attr" :items="attributeList" label="Selecione o atributo" :rules="inputRules"/>
            </v-col>
            <v-col cols="1">
                <v-icon @click="onRemoveWeaponItemClicked(index)" class="my-6">mdi-close</v-icon>
            </v-col>
        </v-row>
        <v-row class="mx-auto">
            <v-btn class="my-8" color="success" @click="onAddWeaponClicked" small>
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </v-row>
    </fieldset>
</template>

<script>
import AttributeList from '../functions/attributeList'

export default {

    model: {
        prop: 'weaponList',
        event: 'on-change'
    },

    watch: {
        weaponList: {
            deep: true,
            handler() {
                this.$emit('on-change', this.weaponList)
            }
        }
    },

    data() {
        return {

            attributeList: AttributeList,

            weaponList: [{
                "name"     : null,
                "mod"      : null,
                "attr"     : null,
                "equipped" : false
            }],

            inputRules: [
                value => !!value || 'O campo é obrigatório.'
            ],
            inputNumberRules: [
                value => !!value || 'O campo é obrigatório.',
                value => value > 0 || 'O valor deve ser maior que 0.'
            ],
            checkboxRules: [
                value => {
                    let result = this.weaponList.find( (weapon) => {
                        return weapon.equipped;
                    });
                    return result !== undefined || 'Selecione ao menos 1 arma para ser equipada'
                }
            ],
        }
    },

    methods: {
        onAddWeaponClicked() {
            this.weaponList.push({
                "name"     : null,
                "mod"      : null,
                "attr"     : null,
                "equipped" : false
            });
        },

        onRemoveWeaponItemClicked(index) {
            this.$delete(this.weaponList, index);
        },

        forceReset() {
            this.weaponList = [];
            this.weaponList.push({
                "name"     : null,
                "mod"      : null,
                "attr"     : null,
                "equipped" : false
            })
        }
    },
}
</script>

<style>

</style>