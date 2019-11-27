<template>
	<v-card class="mx-auto my-5" max-width="310">
		<v-img height="200" src="../assets/knight.jpg" />

		<v-card-title>{{hero.name}}</v-card-title>

		<v-card-text>

			<div class="subtitle-1">
				{{hero.birthday}}
			</div>
		</v-card-text>

		<v-divider class="mx-4"></v-divider>

		<v-card-title>Atributos</v-card-title>

		<v-card-text>

			<v-chip title="Força" class="icon ma-2" :color="getChipColor('strength')" text-color="white">
        		<v-avatar left>
          			<v-icon>mdi-sword</v-icon>
        		</v-avatar>
        		{{hero.attributes.strength}}
      		</v-chip>

			<v-chip title="Destreza" class="icon ma-2" :color="getChipColor('dexterity')" text-color="white">
        		<v-avatar left>
          			<v-icon>mdi-cube</v-icon>
        		</v-avatar>
        		{{hero.attributes.dexterity}}
      		</v-chip>

			<v-chip title="Regeneração" class="icon ma-2" :color="getChipColor('constitution')" text-color="white">
        		<v-avatar left>
          			<v-icon>mdi-pill</v-icon>
        		</v-avatar>
        		{{hero.attributes.constitution}}
      		</v-chip>

			<v-chip title="Inteligência" class="icon ma-2" :color="getChipColor('intelligence')" text-color="white">
        		<v-avatar left>
          			<v-icon>mdi-brain</v-icon>
        		</v-avatar>
        		{{hero.attributes.intelligence}}
      		</v-chip>

			<v-chip  title="Sabedoria" class="icon ma-2" :color="getChipColor('wisdom')" text-color="white">
        		<v-avatar left>
          			<v-icon>mdi-glasses</v-icon>
        		</v-avatar>
        		{{hero.attributes.wisdom}}
      		</v-chip>

			<v-chip title="Carisma" class="icon ma-2" :color="getChipColor('charisma')" text-color="white">
        		<v-avatar left>
          			<v-icon>mdi-emoticon-happy-outline</v-icon>
        		</v-avatar>
        		{{hero.attributes.charisma}}
      		</v-chip>

		</v-card-text>
	</v-card>
</template>

<script>
export default {
    props: {
		hero: {
            type: Object,
            required: true
        },
	},

	methods: {
		getChipColor(attribute) {
			if(attribute === this.hero.keyAttribute){
				return "#D4AF37"
			} else {
				return "grey"
			}
		}
	}
}
</script>

<style>
	.icon {
		cursor: pointer;
	}
</style>