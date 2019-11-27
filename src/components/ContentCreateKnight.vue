<template>
    <div>
        <v-subheader class="title">Cadastrar Knight</v-subheader>
        
        <v-row class="mx-auto" align="center">
            
            <v-form
                ref="form"
                v-model="valid"
                :lazy-validation="lazy"
            >
                <v-text-field
                    v-model="nameValue"
                    label="Name"
                    required
                />
    
                <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                ></v-text-field>
    
                <v-select
                    v-model="select"
                    :items="items"
                    :rules="[v => !!v || 'Item is required']"
                    label="Item"
                    required
                ></v-select>
    
                <v-checkbox
                    v-model="checkbox"
                    :rules="[v => !!v || 'You must agree to continue!']"
                    label="Do you agree?"
                    required
                ></v-checkbox>
    
            </v-form>
        </v-row>
    </div>
    
</template>

<script>
export default {
    
    data() {
        return {
            nameValue: null,
        }
    }

}
</script>
<style>
   
</style>