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
          Ô mô quiridu, tais vazante mesmo ou viajasse???
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
            @click="close"
          >
            Foi mal, viajei!
          </v-btn>

          <v-btn
            round
            small
            outline
            class="custom-btn mt-2 mb-1 mr-2"
            @click="endSession"
          >
            To vazante!
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
  import {
    UserAPI
  } from '../requests';

  export default {
    name: "EndSessionConfirmation",

    data() {
      return {
        dialog: false,
        showDialog: null,
        updateTable: null,
      }

    },

    methods: {

      open(fn) {
        this.dialog = true;
        this.updateTable = fn;
      },

      close() {
        this.dialog = false;
      },

      async endSession() {
        let id = await localStorage.getItem('id');
        let ret = await UserAPI.exit(id);
        localStorage.setItem("sessionOpen", "false");
        console.log('exit', ret);


        this.updateTable();
        this.close();
      }
    }
  }

</script>


<style scoped>

</style>
