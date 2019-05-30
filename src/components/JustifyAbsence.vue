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
            v-model="data.hours"
            label="Horas"
            required
            mask="##:##"
            class="mx-4"
          ></v-text-field>


          <v-flex md12>
            <v-text-field
              v-model="data.justification"
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

        data: {
          day: null,
          month: null,
          year: null,
          id: null,
          currentTimeRegister: null,
          hours: null,
          justification: null,

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
        let timeStampHour = (this.data.hours.slice(0, 2) * 60 * 60 * 1000);
        let timeStampMin = (this.data.hours.slice(2, 4) * 60 * 1000);
        let data = {
          ...this.data
        };

        data.hours = timeStampHour + timeStampMin;


        let ret = await AdminAPI.justifyAbsence(data);

        console.log('JustifyAbsence', ret)
      },

      open(data) {
        this.dialog = true;
        this.data = data;
      },

      cancel() {
        this.dialog = false;
      },
    }
  }

</script>

<style scoped>
</style>
