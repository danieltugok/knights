<template>
    <fieldset class="fieldset-weapon my-5">
        <legend>Lista de Armas</legend>
        <v-subheader>Selecione a arma a ser equipada pelo knight</v-subheader>
        <v-row v-for="(weapon, index) in this.weaponList" :key="'weapon'+index">
            <v-col cols="1">
                <v-checkbox v-model="weapon.equipped"></v-checkbox>
            </v-col>
            <v-col>
                <v-text-field v-model="weapon.name" label="Nome" />
            </v-col>
            <v-col>
                <v-text-field v-model.number="weapon.mod" type="number" label="Mod"/>
            </v-col>
            <v-col>
                <v-combobox v-model="weapon.attr" :items="attributeList" label="Selecione o atributo"/>
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