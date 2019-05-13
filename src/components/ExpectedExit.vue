<template>
  <div class="text-xs-center">
    <v-dialog
      persistent
      v-model="dialog"
      max-width="350"
    >
      <v-card>
        <v-card-title class="headline" align-center justify-center> Previsão de Saída</v-card-title>
        <v-card-text>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
            >

              <v-text-field
                v-model="expectedExit"
                label="Previsão de Saída"
                required type="time"
                solo

                value="24hr hh:mm"
                autofocus
              ></v-text-field>

            </v-form>

          <v-card-actions>
            <v-layout justify-end>
            <v-btn
              @click ="confirm"
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
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import {
    UserAPI,
  } from '../requests';
  import {
    AdminCDH,
  } from '../views/AdminCDH';


  export default {
    name: "ExpectedExit",

    data() {
      return {
        dialog: false,
        valid: true,
        expectedExit: '',
      }
    },

    methods: {
      // validate () {
      //   if (this.$refs.form.validate()) {
      //     this.snackbar = true
      //   }
      // },
      // reset () {
      //   this.$refs.form.reset()
      // },
      // resetValidation () {
      //   this.$refs.form.resetValidation()
      // }

      open() {
          this.dialog = true;
      },

      async confirm(){
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

        this.dialog = false;

      }


    }
  }
</script>
<style scoped>
</style>
