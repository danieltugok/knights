<template>
    <v-app id="inspire">
        <v-navigation-drawer
            v-model="drawer"
            app
            clipped
        >
            <v-list dense>

                <router-link to="/create-knights">
                    <v-list-item link>
                        <v-list-item-action>
                            <v-icon>mdi-sword</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>
                                Cadastrar Knight
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </router-link>

                <router-link to="/get-knights">
                    <v-list-item link>
                        <v-list-item-action>
                            <v-icon>mdi-sword-cross</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>
                                Listar Knights
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </router-link>

                <router-link to="/get-hall-of-heroes">
                    <v-list-item link>
                        <v-list-item-action>
                            <v-icon>mdi-shield-cross</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>
                                Hall of Heroes
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </router-link>

            </v-list>
        </v-navigation-drawer>

        <v-app-bar
            app
            clipped-left
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <v-toolbar-title>Knights</v-toolbar-title>
        </v-app-bar>

        <v-content>
            <router-view />
        </v-content>    
    </v-app>

</template>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
    }),
    created () {
      this.$vuetify.theme.dark = true
    },
  }
</script>