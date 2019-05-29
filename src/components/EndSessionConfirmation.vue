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
          Ô mô quiridu, queres vazar mesmo ou tais viajando?
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
            Foi mal, viajei!
          </v-btn>

          <v-btn
            round
            small
            outline
            class="custom-btn mt-2 mb-1 mr-2"
            @click="dialog = false"
          >
            To vazante!
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    name: "EndSessionConfirmation",

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
