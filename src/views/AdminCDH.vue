<template>
  <v-container fluid fill-height>
    <v-layout wrap justify-center align-start>
      <v-flex xs10 sm10 md10>

        <v-toolbar flat>
          <v-toolbar-title class="primary--text">CDH</v-toolbar-title>

          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>


          <v-flex xs6 sm6 md4 d-flex>
            <v-select
              v-model="selectUser"
              :items="users"
              item-text="name"
              item-value="id"
              label="User"
              placeholder="Admin"

              @click="selectedUser"
            ></v-select>
          </v-flex>

          <v-spacer></v-spacer>

          <v-flex xs6 sm6 md2 d-flex>
            <v-select
              :items="month"
              label="Month"
            ></v-select>
          </v-flex>

          <v-spacer></v-spacer>

          <v-flex xs6 sm6 md2 d-flex>
            <v-select
              :items="year"
              label="Year"
            ></v-select>
          </v-flex>


          <v-spacer></v-spacer>

          <v-flex xs2 sm2 md2 d-flex>
            <v-layout justify-end align-center>
              <v-layout justify-end>

                <v-btn class="custom-btn" icon fab round @click="adminCdhSearch">
                  <v-icon class="custom-btn">search</v-icon>
                </v-btn>

              </v-layout>
              <v-divider
                class="mx-1"
                vertical
                inset
              ></v-divider>


              <v-layout wrap>
                <v-tooltip color="primary" bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn round outline small :color="sessionButton" class="custom-btn" @click="sessionControl"
                           v-on="on">
                      <v-icon class="custom-btn">power_settings_new</v-icon>
                    </v-btn>
                  </template>
                  <span> Iniciar/Finalizar Sessão </span>
                </v-tooltip>
              </v-layout>

            </v-layout>
          </v-flex>


        </v-toolbar>

        <v-data-table
          :headers="headers"
          :items="timeRegister"
          :search="search"
          class="elevation-1"

        >
          <template v-slot:items="props">

            <td class="text-xs-center">{{ props.item.day }}</td>
            <td class="text-xs-center">{{ props.item.entry }}</td>
            <td class="text-xs-center">{{ props.item.exit }}</td>
            <td class="text-xs-center">{{ props.item.timeWorked }}</td>
            <td class="justify-center layout px-0">
              <v-icon
                small
                class="custom-btn"
                @click="showJustifyAbsence(props.item)"
              >
                edit
              </v-icon>
            </td>
          </template>

          <template v-slot:no-results>
            <v-alert :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </template>

        </v-data-table>


        <JustifyAbsence ref="JustifyAbsence"/>
        <ExpectedExit ref="ExpectedExit"/>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import JustifyAbsence from "../components/JustifyAbsence";
  import ExpectedExit from "../components/ExpectedExit";
  import {
    AdminAPI,
    UserAPI

  } from '../requests';


  function addZero(i) {

    if (i < 10) {
      i = "0" + i;
    }
    return i;


  }

  export default {
    name: "AdminCDH",
    components: {ExpectedExit, JustifyAbsence},

    data: () => ({
      testOsv: true,
      selectUser: null,
      search: '',
      selected: false,
      headers: [

        {text: 'Dia', value: 'day', align: 'center'},
        {text: 'Entrada', value: 'entry', align: 'center'},
        {text: 'Saída', value: 'exit', align: 'center'},
        {text: 'Horas Trabalhadas', value: 'timeWorked', align: 'center'},
        {text: 'Justificativa', sortable: false, align: 'center'},


      ],
      timeRegister: [],
      users: [],
      month: [],
      year: []

    }),


    mounted() {
      this.initialize()


    },


    computed: {
      sessionButton() {
        if (this.selected) return 'primary';
      },

      formTitle() {
        return this.editedIndex === -1 ? 'Novo Usuário' : 'Editar Usuário'
      }

    },

    methods: {
      async initialize() {
        this.adminCdhSearch();
        this.getUser();

        if (localStorage.getItem('sessionOpen') == "true") {
          this.selected = true;
        }


      },


      showJustifyAbsence() {
        this.$refs.JustifyAbsence.open({})
      },

      async sessionControl() {
        this.selected = !this.selected;
        let id = await localStorage.getItem('id');

        if (this.selected) {
          await this.$refs.ExpectedExit.open({});
          await localStorage.setItem("sessionOpen", "true");
        } else {
          let ret = await UserAPI.exit(id);
          localStorage.setItem("sessionOpen", "false");
          console.log('exit', ret);
        }

        await this.initialize();
      },


      async adminCdhSearch() {
        let date = new Date();
        let month = date.getMonth();
        let year = date.getFullYear();
        let id;

        if (!this.selectUser) {
          id = localStorage.getItem('id');
        } else {
          id = this.selectUser;
        }

        let ret = await AdminAPI.adminCdhConsult(id, month, year);
        console.log('adminCdhConsult', ret);

        //Alimenta a table
        if (ret.data.length) {
          let cdh = [];
          let myDate = new Date();

          // for (let i = 0; i < ret.data[0].days.length; i++) {
          //   //formata o horario e adiciona 0 caso necessário;
          //   console.log('length', ret.data[0].days.length)
            for (let x = 0; x < ret.data[0].days[0].entryExit.length; x++) {

              console.log('teste')
              console.log(ret.data[0].days[0].entryExit.length);
              console.log(ret.data[0].days[0].entryExit[x]);



            myDate.setTime(ret.data[0].days[0].entryExit[x].entry);
            let formatedEntry = `${addZero(myDate.getHours())}:${addZero(myDate.getMinutes())}:${addZero(myDate.getSeconds())}`;
            myDate.setTime(ret.data[0].days[0].entryExit[x].exit);
            let formatedExit = `${addZero(myDate.getHours())}:${addZero(myDate.getMinutes())}:${addZero(myDate.getSeconds())}`;

            if (formatedExit == "NaN:NaN:NaN")
              formatedExit = "";

            cdh.push({
              day: ret.data[0].days[0].day,
              entry: formatedEntry,
              exit: formatedExit,
              timeWorked: ret.data[0].days[0].timeWorked
            });
            }
        //   }
          console.log('cdh', cdh)
          this.timeRegister = cdh;
        }
      }
      ,

      async getUser() {
        let ret = await AdminAPI.readAllUsers();
        console.log('getUser', ret);

        if (ret.success) {
          this.users = ret.data;
          let admin = {
            name:
              localStorage.getItem('name'),
            id:
              localStorage.getItem('id')
          };
          this.users.push(admin)
        }
      }
      ,

      selectedUser() {


      }

    }
  }

</script>

<style scoped>

</style>
