<template>

  <div class="text-xs-center">
    <v-dialog
      v-model="dialog"
      max-width="500"
    >
      <v-card>
        <v-card-title class="headline"> Justificar Ausência</v-card-title>

        <v-divider class="mb-2"/>

        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >

          <v-text-field
            v-model="time"
            label="Horas"
            required
            type="time"

            class="mx-4"
          ></v-text-field>


          <v-flex md12>
            <v-text-field
              v-model="text"
              label="Justificativa"
              required
              class="mx-4"
            ></v-text-field>
          </v-flex>
        </v-form>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            @click="cancel"
            round
            outline
            small
            class="custom-btn mb-2"
          >
            Cancelar
          </v-btn>

          <v-btn
            @click="confirm"
            :disabled="!valid"
            round
            outline
            small
            class="custom-btn mb-2 mr-2"
          >
            Confirmar
          </v-btn>

        </v-card-actions>

      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import {
    AdminAPI,
  } from '../requests';

  export default {
    name: "JustifyAbsence",

    data() {
      return {
        dialog: false,
        valid: true,
        text: null,
        time: '04:00',

        data: {
          day: null,
          month: null,
          year: null,
          userId: null,
          currentTimeRegister: null,
          justification:{},
        },

        //
        // hoursRules: [
        //   v => !!v || 'Este campo é obrigatório',
        //   v => (v && v.length >= 4) || 'Preencha este campo corretamente! (hh:mm)',
        // ],
        //
        // justificationRules: [
        //   v => !!v || 'Este campo é obrigatório!',
        // ],

        select: null,
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

      async confirm() {
        let timeStampHour = (this.time.slice(0, 2) * 60 * 60 * 1000);
        let timeStampMin = (this.time.slice(3, 5) * 60 * 1000);
        let data = {
          ...this.data
        };

        data.time = timeStampHour + timeStampMin;

        data.justification={
          time: data.time,
          text: this.text
        };

        console.log(data);


        let ret = await AdminAPI.justifyAbsence(data);
        console.log('JustifyAbsence', ret)

        this.dialog = false;
      },

      open(data) {
        this.dialog = true;
        this.data = data;

        console.log(data);
      },

      cancel() {
        this.dialog = false;
      },
    }
  }

</script>

<style scoped>
</style>
