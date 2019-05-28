<template>
  <div class="text-xs-center">
    <v-dialog
      persistent=""
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline white--text"
          primary-title
        >
          FALA DEV!
        </v-card-title>

        <v-divider
        ></v-divider>

        <v-card-text class="white--text" >
          Sua sessão começou... Bom trabalho e vê se faz um código limpinho pra gente entender depois né!
          <br/>
          <br/>
          Ah, não esquece de finalizar a sessão no final do seu expediente.
        </v-card-text>

        <v-divider
          class="mx-3"
        ></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            round
            small
            outline
            class="custom-btn mt-2 mb-1 mr-2"
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
