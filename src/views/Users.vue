<template>
  <v-container fluid fill-height>
    <v-layout wrap justify-center align-start>
      <v-flex xs10 sm10 md10>
        <v-toolbar flat class="light">
          <v-toolbar-title
            class="primary--text"
            margin-left="10px">
            <v-icon
              class="custom-btn primary--text">
              person
            </v-icon>
            Usuários
          </v-toolbar-title>

          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>

          <v-flex xs3 sm3 md3>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
            ></v-text-field>
          </v-flex>

          <v-layout justify-end>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
          </v-layout>

          <v-divider vertical inset class="mr-3"/>

          <v-tooltip color="primary" bottom>
            <template v-slot:activator="{ on }">
              <v-btn v-on:click="showCreateUser" v-on="on" outline small icon fab round class="custom-btn primary--text">
                <v-icon class="custom-btn">add</v-icon>
              </v-btn>
            </template>
            <span class="black--text"> CDH </span>
          </v-tooltip>



          <v-dialog persistent v-model="dialog" max-width="500px">
            <!--<template v-slot:activator="{ on }">-->
            <!--<v-btn icon fab round class="custom-btn" v-on="on"-->
            <!--&gt;-->
            <!--<v-icon class="custom-btn" dark>add</v-icon>-->
            <!--</v-btn>-->
            <!--</template>-->


            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-divider
                class="mx-8"
              ></v-divider>

              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12 sm6 md6>
                      <v-text-field v-model="editedItem.name" label="Nome" prepend-icon="person"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-text-field v-model="editedItem.surname" label="Sobrenome" prepend-icon="person"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-text-field v-model="editedItem.email" label="Email" prepend-icon="email"></v-text-field>
                    </v-flex>

                    <v-flex xs12 sm6 md6>
                      <v-text-field v-model="editedItem.password" label="Senha"
                                    prepend-icon="vpn_key"

                      ></v-text-field>
                    </v-flex>

                    <v-flex xs12 sm6 md6>
                      <v-text-field v-model="editedItem.cpf" label="CPF"
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
                              v-model="editedItem.birthday"
                              label="Data de Nascimento"
                              prepend-icon="event"
                              readonly
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            color="primary"
                            ref="picker"
                            v-model="editedItem.birthday"
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
                              v-model="editedItem.entryDate"
                              label="Data de Entrada"
                              prepend-icon="event"
                              readonly
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            color="primary"
                            ref="picker"
                            v-model="editedItem.entryDate"
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
                              v-model="editedItem.exitDate"
                              label="Data de Saída"
                              prepend-icon="event"
                              readonly
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            color="primary"
                            ref="picker"
                            v-model="editedItem.exitDate"
                            :max="new Date().toISOString().substr(0, 10)"
                            min="1980-01-01"
                            @change="datePicker2"
                          ></v-date-picker>
                        </v-menu>
                      </template>
                    </v-flex>

                    <v-flex xs12 sm6 md4>
                      <v-switch color="primary" v-model="editedItem.isAdm" label="Admin" value="isAdm"></v-switch>
                    </v-flex>

                  </v-layout>
                  <v-divider
                    class="mx-8"
                  ></v-divider>
                </v-container>

                <v-layout wrap>
                  <v-layout justify-end>
                    <v-btn justify-end align-end class="custom-btn" round outline small @click="close">Cancelar</v-btn>
                    <v-btn justify-end align-end class="custom-btn" round outline small @click="save">Salvar</v-btn>
                  </v-layout>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-dialog>


        </v-toolbar>

        <v-data-table
          :headers="headers"
          :items="users"
          :search="search"
          class="elevation-1"
          v-on:initializetable="initialize"
          dark


        >
          <template v-slot:items="props">
            <td class="text-xs-left">{{ props.item.name }}</td>
            <td class="text-xs-center">{{ props.item.surname }}</td>
            <td class="text-xs-center">{{ props.item.email }}</td>
            <td class="text-xs-center">{{ props.item.cpf }}</td>
            <td class="text-xs-center">{{ props.item.entryDate }}</td>
            <td class="text-xs-center">{{ props.item.exitDate }}</td>
            <td class="justify-center layout px-0">
              <v-icon
                small
                @click="editItem(props.item)"
                class="custom-btn"
              >
                edit
              </v-icon>

              <v-icon
                small
                @click="deleteItem(props.item)"
                class="custom-btn"
              >
                delete
              </v-icon>
            </td>
          </template>

          <template v-slot:no-results>
            <v-alert :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </template>
          <!--<template v-slot:no-data>-->
          <!--&lt;!&ndash;<v-btn color="primary" @click="initialize">Reset</v-btn>&ndash;&gt;-->
          <!--</template>-->
        </v-data-table>

        <ChangePassword ref="ChangePassword"/>
        <CreateUser ref="CreateUser"/>
        <EditUser ref="EditUser"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import ChangePassword from "../components/ChangePassword";
  import CreateUser from "../components/CreateUser";
  import {
    AdminAPI,
  } from '../requests';
  import EditUser from "../components/EditUser";

  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  export default {
    name: "UsersBurgo",
    components: {EditUser, ChangePassword, CreateUser},

    data: () => ({
      date: null,
      menu1: false,
      menu2: false,
      menu3: false,
      search: '',
      dialog: false,
      headers: [
        {
          text: 'Nome',
          align: 'left',
          value: 'name'
        },

        {text: 'Sobrenome', value: 'surname', align: 'center'},
        {text: 'Email', value: 'email', align: 'center'},
        {text: 'CPF', value: 'cpf', align: 'center'},
        {text: 'Data de Entrada', value: 'entryDate', align: 'center'},
        {text: 'Data de Saída', value: 'exitDate', align: 'center'},
        {text: 'Ações', sortable: false, align: 'center'}


      ],
      users: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        surname: '',
        email: '',
        cpf: '',
        entryDate: '',
        exitDate: '',
        password: '',
        birthday: '',
        isAdm: false
      },
      defaultItem: {
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

    computed: {
      formTitle() {
        return this.editedIndex === -1 ? 'Novo Usuário' : 'Editar Usuário'
      }
    },

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

    mounted() {
      this.initialize()
    },

    methods: {
      async initialize() {
        let ret = await AdminAPI.readAllUsers();
        console.log('readAllUsers', ret);

        let myDate = new Date();

        console.log('length', ret.data.length);

        for (let i = 0; i < ret.data.length; i++) {

          myDate.setTime(ret.data[i].entryDate);
          ret.data[i].entryDate = `${addZero(myDate.getDate())}/${addZero(myDate.getMonth() + 1)}/${addZero(myDate.getFullYear())}`

          myDate.setTime(ret.data[i].exitDate);
          ret.data[i].exitDate = `${addZero(myDate.getDate())}/${addZero(myDate.getMonth() + 1)}/${addZero(myDate.getFullYear())}`

          if (ret.data[i].entryDate == "NaN/NaN/NaN")
            ret.data[i].entryDate = "";

          if (ret.data[i].exitDate == "NaN/NaN/NaN")
            ret.data[i].exitDate = "";
        }


        this.users = ret.data;
      },


      editItem(item) {
        this.editedIndex = this.users.indexOf(item);
        this.editedItem = {
          ...item
        };

        this.dialog = true
      },

      async deleteItem(item) {
        const index = this.users.indexOf(item);

        if (window.confirm('Are you sure you want to delete this item?')) {

          let ret = await AdminAPI.deleteUser(this.users[index].id);
          console.log('delete', ret);
        }

        this.initialize();
      },

      close() {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      async save() {
        if (this.editedIndex > -1) {
          //update user => NAO TA FUNCIONANTE
          Object.assign(this.users[this.editedIndex], this.editedItem);
          console.log(this.editedItem.id);
          let ret = await AdminAPI.updateUser(this.editedItem);

          console.log('update user', ret)
        } else {
          //new user =>
          let myDate = new Date();
          let newUser = {
            ...this.editedItem
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
        }


        this.close()

        this.initialize();
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


      showChangePassword() {
        this.$refs.ChangePassword.open({});
        this.close();
      },

      showCreateUser() {
        this.$refs.CreateUser.open(this.initialize.bind(this));

      },

      showEditUser() {
        this.$refs.EditUser.open(this.initialize.bind(this));
        this.close;
      },


    },
  }
</script>

<style scoped>

</style>
