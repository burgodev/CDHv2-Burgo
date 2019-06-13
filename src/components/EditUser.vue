<template>
  <v-dialog
    persistent
    v-model="dialog"
    max-width="500"
  >
    <v-card>
      <v-card-title>
        <span class="headline white--text"> Editar Usuário </span>
      </v-card-title>

      <v-divider class="mb-2"/>

      <v-layout wrap align-center justify-center>
        <v-flex xs12 sm6 md5>
          <v-text-field v-model="user.name" label="Nome"
                        class="mr-2"
                        prepend-icon="person"></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 md5>
          <v-text-field v-model="user.surname" label="Sobrenome"
                        class="mr-2"
                        prepend-icon="person"></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 md5>
          <v-text-field v-model="user.email" label="Email"
                        class="mr-2"
                        prepend-icon="email"></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 md5>
          <v-text-field v-model="user.password" label="Senha"
                        class="mr-2"
                        prepend-icon="vpn_key"
                        type="password"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 md5>
          <v-text-field v-model="user.cpf" label="CPF"
                        class="mr-2"
                        prepend-icon="credit_card" mask="###-###-###-##"
          ></v-text-field>
        </v-flex>


        <v-flex xs3 sm3 md5>
          <template>
            <v-menu
              ref="menu3"
              v-model="menu3"
              :close-on-content-click="false"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="user.birthday"
                  label="Data de Nascimento"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                  class="mr-2"
                ></v-text-field>
              </template>

              <v-date-picker
                color="primary"
                ref="picker"
                v-model="date1"
                :max="new Date().toISOString().substr(0, 10)"
                min="1980-01-01"
                @change="datePicker3"
              ></v-date-picker>
            </v-menu>
          </template>
        </v-flex>

        <v-flex xs3 sm3 md5>
          <template>
            <v-menu
              ref="menu1"
              v-model="menu1"
              :close-on-content-click="false"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="user.entryDate"
                  label="Data de Entrada"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                  class="mr-2"
                ></v-text-field>
              </template>
              <v-date-picker
                color="primary"
                ref="picker"
                v-model="date2"
                :max="new Date().toISOString().substr(0, 10)"
                min="1980-01-01"
                @change="datePicker1"
              ></v-date-picker>
            </v-menu>
          </template>
        </v-flex>

        <v-flex xs3 sm3 md5>
          <template>
            <v-menu
              ref="menu2"
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="user.exitDate"
                  label="Data de Saída"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                  class="mr-2"
                ></v-text-field>
              </template>
              <v-date-picker
                class="primary"
                ref="picker"
                v-model="date3"
                :max="new Date().toISOString().substr(0, 10)"
                min="1980-01-01"
                @change="datePicker2"
              ></v-date-picker>
            </v-menu>
          </template>
        </v-flex>

        <v-layout justify-start>
          <v-flex xs12 sm6 md4>
            <v-switch color="primary" v-model="user.isAdm"
                      label="Admin"
                      class="ml-5"
            ></v-switch>
          </v-flex>
        </v-layout>

      </v-layout>

      <v-divider class="mb-2"/>
      <v-layout wrap>
        <v-layout justify-end>
          <v-btn justify-end align-end class="custom-btn mb-2"
                 round outline small @click="close">Cancelar
          </v-btn>

          <v-btn justify-end align-end class="custom-btn mb-2 mr-3"
                 round outline small @click="save">Salvar
          </v-btn>
        </v-layout>
      </v-layout>
    </v-card>
  </v-dialog>
</template>

<script>
  import {
    AdminAPI,
  } from '../requests';
  import UsersBurgo from "../views/Users";


  export default {
    data() {
      return {
        name: "EditUser",
        date1: '',
        date2: '',
        date3: '',
        menu1: false,
        menu2: false,
        menu3: false,
        dialog: false,
        updateTable: null,

        user: {
          name: '',
          surname: '',
          email: '',
          cpf: '',
          entryDate: '',
          exitDate: '',
          password: '',
          birthday: '',
          isAdm: ''
        }
      }
    },


    watch: {
      date1(val) {
        this.user.birthday = this.formatDate(this.date1);
      },

      date2(val) {
        this.user.entryDate = this.formatDate(this.date2);
      },

      date3(val) {
        this.user.exitDate = this.formatDate(this.date3);
      },


      menu1(val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
      menu2(val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
      menu3(val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },

      dialog(val) {
        val || this.close()
      }
    },

    methods: {
      open(fn, data) {
        this.user = {
          ...data.update
        };

        this.dialog = true;
        this.updateTable = fn;
      },

      close() {
        this.dialog = false
      },

      async save() {
        let myDate = new Date();
        let year, month, day;

        let update = {
          id: this.user.id,
          update: {
            ...this.user
          }
        };

        update.update.birthday = this.date1;
        update.update.entryDate = this.date2;
        update.update.exitDate = this.date3;


        // //formata data de string pra timeStamp

        if (update.update.birthday) {
          year = update.update.birthday.slice(0, 4);
          month = update.update.birthday.slice(5, 7);
          day = update.update.birthday.slice(8, 10);
          myDate.setFullYear(Number(year), Number(month) - 1, Number(day));
          update.update.birthday = myDate.getTime();
        }


        if (update.update.entryDate) {
          year = update.update.entryDate.slice(0, 4);
          month = update.update.entryDate.slice(5, 7);
          day = update.update.entryDate.slice(8, 10);
          myDate.setFullYear(Number(year), Number(month) - 1, Number(day));
          update.update.entryDate = myDate.getTime();
        }

        if (update.update.exitDate) {
          year = update.update.exitDate.slice(0, 4);
          month = update.update.exitDate.slice(5, 7);
          day = update.update.exitDate.slice(8, 10);
          myDate.setFullYear(Number(year), Number(month) - 1, Number(day));
          update.update.exitDate = myDate.getTime();
        }

        console.log('update', update)


        let ret = await AdminAPI.updateUser(update);
        console.log('update user', ret);

        this.user = {};
        this.updateTable();
        this.close();
      }
      ,

      datePicker1(date) {
        this.$refs.menu1.save(date)
      }
      ,

      datePicker2(date) {
        this.$refs.menu2.save(date)
      }
      ,

      datePicker3(date) {
        this.$refs.menu3.save(date)
      }
      ,

      showChangePassword() {
        this.$refs.ChangePassword.open({});
        this.close();
      }
      ,

      formatDate(date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`

      }


    }
  }
</script>

<style scoped>

</style>
