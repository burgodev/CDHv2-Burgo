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
                required
                type="time"
                autofocus
              ></v-text-field>

            </v-form>

          <v-card-actions>
            <v-layout justify-end>
            <v-btn

              @click="cancel"
              round
              outline
              small
              class="custom-btn"
            >
              Cancelar
            </v-btn>

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

      cancel() {
        this.dialog = false;
      },

      async confirm(){
        let id = await localStorage.getItem('id');
        let date = new Date();
        let hour = this.expectedExit.slice(0, this.expectedExit.indexOf(":"));
        let min = this.expectedExit.slice(this.expectedExit.indexOf(":") + 1, this.expectedExit.length);
        let fullyear = date.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
        Number(hour);
        Number(min);
        date.setHours(hour);
        date.setMinutes(min);

        let expectedExit = date.getTime()
        console.log(expectedExit)

        let ret = await UserAPI.entry(id, expectedExit)

        console.log('expectedExit', ret);

        this.dialog = false;






        // let hour = this.expectedExit.split(':',1)
        // let min = this.expectedExit.split(':',2)
        //
        // console.log(hour)
        // console.log(min)
        //
        //
        // console.log(this.expectedExit);
        //
        //
        // date.setHours(this.expectedExit)
        //
        // console.log(date.toTimeString())
        //
        // // date.setTime(this.expectedExit)
        //
        // console.log(date.getTime())


      }
    }

  }


</script>

<style scoped>

</style>
