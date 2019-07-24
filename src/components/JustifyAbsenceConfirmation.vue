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
          Justificativa confirmada!
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
    name: "JustifyAbsenceConfirmation",

    data() {
      return {
        dialog: false,
        showDialog: null,
        updateTable: null
      }
    },

    methods: {
      open(fn) {
        this.dialog = true;
        this.updateTable = fn;
      },

      close() {

        this.dialog = false;
      }
    }
  }
</script>

<style scoped>

</style>
