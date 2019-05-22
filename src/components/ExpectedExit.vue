<template>
  <div class="text-xs-center">

    <v-dialog
      persistent
      v-model="dialog"
      max-width="350"
    >
      <v-card>
        <v-card-title class="headline"> Previsão de Saída</v-card-title>
        <v-layout align-center justify-start wrap>
        </v-layout>
        <v-divider
          class="mx-8"
        ></v-divider>
        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-time-picker
              v-model="expectedExit"
              type="month"
              width="300"
              class="mt-3"
              color="primary"
              format="24hr"
            ></v-time-picker>
            <v-card></v-card>
          </v-form>
        </v-card-text>

        <v-divider
          class="mx-6"
        ></v-divider>
        <v-spacer></v-spacer>
        <v-card-actions >
          <v-layout justify-end wrap>
            <v-btn
              @click="confirm"
              :disabled="!valid"
              round
              small
              outline
              class="custom-btn"
            >
              Confirmar
            </v-btn>

          </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <SessionConfirmation ref="SessionConfirmation"/>
    <ChangePassword ref="ChangePassword"/>

  </div>
</template>

<script>
  import {UserAPI} from '../requests';
  import SessionConfirmation from "./SessionConfirmation";
  import ChangePassword from "./ChangePassword";



  export default {
    name: "ExpectedExit",
    components: {SessionConfirmation, ChangePassword},

    data() {
      return {
        dialog: false,
        valid: true,
        expectedExit: '',
        updateTable: null,
      }
    },

    methods: {

      open(fn) {
        this.dialog = true;
        this.updateTable = fn;
      },

      async confirm() {
        let id = await localStorage.getItem('id');
        let date = new Date();
        let hour = this.expectedExit.slice(0, this.expectedExit.indexOf(":"));
        let min = this.expectedExit.slice(this.expectedExit.indexOf(":") + 1, this.expectedExit.length);

        date.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
        date.setHours(Number(hour));
        date.setMinutes(Number(min));

        let expectedExit = date.getTime();

        let ret = await UserAPI.entry(id, expectedExit);
        console.log('expectedExit', ret);


        this.$refs.SessionConfirmation.open();

        this.updateTable();
        this.dialog = false;
      }
    }
  }
</script>
<style scoped>
</style>
