<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="dialog"
      max-width="600"
    >
      <v-card>
        <v-card-title class="headline"> Ausência Justificada</v-card-title>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >

          <v-divider class="mb-2"/>

          <v-container fluid grid-list-md>
            <v-layout row wrap>
              <v-flex md12>
                <v-textarea
                  name="input-7-1"
                  label="Justificativa"

                ></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card>
    </v-dialog>
  </div>

</template>

<script>
  export default {
    name: "JustifyAbsenceUser",

    data() {
      return {
        dialog: false,
        data: null,
        valid: true,
      }
    },

    methods: {

      open(data) {
        this.dialog = true;
        this.data = data;
      },

      close() {
        this.dialog = false;
      }
    }
  }
</script>

<style scoped>

</style>
