<template>
  <v-dialog
    persistent
    v-model="dialog"
    max-width="500"
  >
    <v-card>
      <v-card-title>
        <span class="headline"> Novo Usuário </span>
      </v-card-title>

      <v-divider
        class="mx-8"
      ></v-divider>

      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm6 md6>
              <v-text-field v-model="user.name" label="Nome"
                            prepend-icon="person"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-text-field v-model="user.surname" label="Sobrenome"
                            prepend-icon="person"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-text-field v-model="user.email" label="Email"
                            prepend-icon="email"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-text-field v-model="user.password" label="Senha"
                            prepend-icon="vpn_key"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md6>
              <v-text-field v-model="user.cpf" label="CPF"
                            prepend-icon="credit_card" mask="###-###-###-##"
              ></v-text-field>
            </v-flex>

            <v-flex xs3 sm3 md6>
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
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    color="primary"
                    ref="picker"
                    v-model="user.birthday"
                    :max="new Date().toISOString().substr(0, 10)"
                    min="1980-01-01"
                    @change="datePicker3"
                  ></v-date-picker>
                </v-menu>
              </template>
            </v-flex>

            <v-flex xs3 sm3 md6>
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
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    color="primary"
                    ref="picker"
                    v-model="user.entryDate"
                    :max="new Date().toISOString().substr(0, 10)"
                    min="1980-01-01"
                    @change="datePicker1"
                  ></v-date-picker>
                </v-menu>
              </template>
            </v-flex>

            <v-flex xs3 sm3 md6>
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
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    color="primary"
                    ref="picker"
                    v-model="user.exitDate"
                    :max="new Date().toISOString().substr(0, 10)"
                    min="1980-01-01"
                    @change="datePicker2"
                  ></v-date-picker>
                </v-menu>
              </template>
            </v-flex>

            <v-flex xs12 sm6 md4>
              <v-switch color="primary" v-model="user.isAdm"
                        label="Admin" value="isAdm"></v-switch>
            </v-flex>

          </v-layout>
          <v-divider
            class="mx-8"
          ></v-divider>
        </v-container>

        <v-layout wrap>
          <v-layout justify-end>
            <v-btn justify-end align-end class="custom-btn"
                   round outline small @click="close">Cancelar
            </v-btn>

            <v-btn justify-end align-end class="custom-btn"
                   round outline small @click="save">Salvar
            </v-btn>
          </v-layout>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import {
    AdminAPI,
  } from '../requests';


  export default {
    name: "CreateUser",
    data: () => ({
      date: null,
      menu1: false,
      menu2: false,
      menu3: false,
      dialog: false,

      user: {
        name: '',
        surname: '',
        email: '',
        cpf: '',
        entryDate: '',
        exitDate: '',
        password: '',
        birthday: '',
        isAdm: false
      }
    }),

    watch: {
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
      close() {
        this.dialog = false
      },

      async save() {
        let myDate = new Date();
        let newUser = {
          ...this.user
        };

        // //formata data de string pra timeStamp
        let year = newUser.birthday.slice(0, 4);
        let month = newUser.birthday.slice(5, 7);
        let day = newUser.birthday.slice(8, 10);
        myDate.setFullYear(Number(year), Number(month) - 1, Number(day));
        newUser.birthday = myDate.getTime();

        year = newUser.entryDate.slice(0, 4);
        month = newUser.entryDate.slice(5, 7);
        day = newUser.entryDate.slice(8, 10);
        myDate.setFullYear(Number(year), Number(month) - 1, Number(day));
        newUser.entryDate = myDate.getTime();

        year = newUser.exitDate.slice(0, 4);
        month = newUser.exitDate.slice(5, 7);
        day = newUser.exitDate.slice(8, 10);
        myDate.setFullYear(Number(year), Number(month) - 1, Number(day));
        newUser.exitDate = myDate.getTime();
        console.log('birthday', newUser.exitDate);

        let ret = await AdminAPI.createUser(newUser);
        console.log('create user', ret);


        this.$refs.Users.initialize();

        this.close();

      },

      datePicker1(date) {
        this.$refs.menu1.save(date)
      },

      datePicker2(date) {
        this.$refs.menu2.save(date)
      },

      datePicker3(date) {
        this.$refs.menu3.save(date)
      },

      open() {
        this.dialog = true;
      },
    }
  }
</script>

<style scoped>

</style>
