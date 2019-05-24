<template>
  <div class="text-xs-center">
    <v-dialog
      persistent=""
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline primary--text"
          primary-title
        >
          FALA DEV!
        </v-card-title>

        <v-divider
          class="mx-1"


        ></v-divider>

        <v-card-text class="primary--text" >
          Sua sessão começou... Bom trabalho e vê se faz um código limpinho pra gente entender depois né!
          <br/>
          <br/>

          Ah, não esquece de finalizar a sessão no final do seu expediente.


        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            round
            @click="dialog = false"
          >
            Let's dale!
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    name: "SessionConfirmation",

    data() {
      return {
        dialog: false,
        showDialog: null,
      }

    },

    methods: {

      open() {
        this.dialog = true;
      },

      close() {
        this.dialog = false;
      }
    }
  }
</script>


<style scoped>

</style>
