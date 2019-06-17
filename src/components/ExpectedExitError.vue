<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="dialog"
      max-width="600"
    >
      <v-card>
        <v-card-title class="headline"> Deu boa! Não, pera.... </v-card-title>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >

          <v-divider class="mb-2"/>

          <v-container fluid grid-list-md>
            <v-layout row wrap>

              <v-card-text>
                Oooooo cabeça... Devido as leis da física referentes ao tempo e espaço é impossível você sair
                antes de ter entrado. Seleciona o horário de saída direito ai po!
              </v-card-text>

            </v-layout>
          </v-container>

          <v-divider class="mb-2"/>


          <v-layout justify-end>

            <v-btn
              round
              small
              outline
              class="custom-btn mt-1 mb-2 mr-1"
              @click="close"
            >
              Foi mal, viajei!
            </v-btn>

          </v-layout>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    name: "ExpectedExitError",


    data() {
      return {
        dialog: false,
        valid: true,
        updateTable: null,
      }
    },

    methods: {

      open(fn) {
        this.dialog = true;

      },

      close() {
        this.dialog = false;
      },



    }
  }


</script>

<style scoped>

</style>
