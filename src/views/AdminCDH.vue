<template>
  <v-container fluid fill-height>
    <v-layout wrap justify-center align-start>
      <v-flex xs10 sm10 md10>
        <v-toolbar flat>
          <v-toolbar-title
            class="primary--text"
            margin-left="10px">
            <v-icon
              class="custom-btn primary--text">
              access_time
            </v-icon>
            CDH
          </v-toolbar-title>

          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>


          <v-flex xs6 sm6 md4 d-flex>
            <v-select
              class="mt-3"
              v-model="selectUser"
              return-object
              :items="users"
              @change="adminCdhSearch"
              item-text="name"
              item-value="id"
              label="Usuário"
            ></v-select>
          </v-flex>


          <v-spacer></v-spacer>

          <v-flex xs6 sm6 md2 d-flex>
            <v-select
              class="mt-3"
              v-model="selectedMonth"
              return-object
              :items="month"
              item-text="Text"
              item-value="Number"
              @change="adminCdhSearch"
              label="Mês"
            ></v-select>
          </v-flex>

          <v-spacer></v-spacer>

          <v-flex xs6 sm6 md2 d-flex>
            <v-select
              class="mt-3"
              :items="year"
              v-model="selectedYear"
              @change="adminCdhSearch"
              label="Ano"
            ></v-select>
          </v-flex>


          <v-spacer></v-spacer>

          <v-divider
            class="ml-3"
            vertical
            inset
          ></v-divider>


          <v-layout justify-end align-end class="mt-1">
            <v-tooltip color="primary" bottom>
              <template v-slot:activator="{ on }">
                <v-btn round outline small :color="sessionButton" class="custom-btn" @click="sessionControl"
                       v-on="on">
                  <v-icon class="custom-btn">power_settings_new</v-icon>
                </v-btn>
              </template>
              <span class="black--text"> Iniciar/Finalizar Sessão </span>
            </v-tooltip>

          </v-layout>


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
        <EndSessionConfirmation ref="EndSessionConfirmation"/>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import JustifyAbsence from "../components/JustifyAbsence";
  import ExpectedExit from "../components/ExpectedExit";
  import {
    AdminAPI,
  } from '../requests';
  import EndSessionConfirmation from "../components/EndSessionConfirmation";

  function addZero(i) {

    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  export default {
    name: "AdminCDH",
    components: {ExpectedExit, JustifyAbsence, EndSessionConfirmation},

    data: () => ({
      selectUser: null,
      search: '',
      selectedMonth: null,
      selectedYear: null,
      selected: false,
      editedIndex: -1,

      headers: [

        {text: 'Dia', value: 'day', align: 'center'},
        {text: 'Entrada', value: 'entry', align: 'center'},
        {text: 'Saída', value: 'exit', align: 'center'},
        {text: 'Horas Trabalhadas', value: 'timeWorked', align: 'center'},
        {text: 'Justificativa', sortable: false, align: 'center'},


      ],
      timeRegister: [],
      users: [],
      usersIndex: -1,
      month: [
        {
          Text: 'Janeiro',
          Value: 0
        },
        {
          Text: 'Fevereiro',
          Value: 1
        },
        {
          Text: 'Março',
          Value: 2
        },
        {
          Text: 'Abril',
          Value: 3
        },
        {
          Text: 'Maio',
          Value: 4
        },
        {
          Text: 'Junho',
          Value: 5
        },
        {
          Text: 'Julho',
          Value: 6
        },
        {
          Text: 'Agosto',
          Value: 7
        },
        {
          Text: 'Setembro',
          Value: 8
        },
        {
          Text: 'Outubro',
          Value: 9
        },
        {
          Text: 'Novembro',
          Value: 10
        },

        {
          Text: 'Dezembro',
          Value: 11
        },
      ],

      year: []

    }),


    mounted() {
      this.initialize()
    },


    computed: {
      sessionButton() {
        let myDate = new Date();

        if (this.selected) return 'primary';

        // if (localStorage.getItem('sessionOpen') === "true" && Number(sessionStorage.getItem('lastDay')) === myDate.getDate()) {
        //   this.selected = true
        // }
      }
    },

    methods: {
      async initialize() {
        let myDate = new Date();
        this.selectedMonth = this.month[myDate.getMonth()];

        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].name === localStorage.getItem('name'))
            this.selectUser = this.users[i];
        }
        ;


        this.getUser();
        this.adminCdhSearch();
        this.getCdhYears();


        this.selectedYear = myDate.getFullYear();

        if (localStorage.getItem('sessionOpen') === "true" && Number(sessionStorage.getItem('lastDay')) === myDate.getDate()) {
          this.selected = true
        } else {
          this.selected = false;
          sessionStorage.setItem('lastDay', String(myDate.getDate()));
          console.log('caiu aqui1', sessionStorage.getItem('lastDay'))
        }
      }
      ,

      showJustifyAbsence(item) {
        let data = {
          day: item.day,
          month: Number(localStorage.getItem('month')),
          year: Number(localStorage.getItem('year')),
          userId: this.selectUser.id,
          currentTimeRegister: this.selectUser.currentTimeRegister
        };
        console.log('data', data)

        this.$refs.JustifyAbsence.open(data)
      },

      async sessionControl() {
        if (!this.selected) {
          this.$refs.ExpectedExit.open(this.initialize.bind(this));
        } else {
          this.$refs.EndSessionConfirmation.open(this.initialize.bind(this));
        }
      },

      async adminCdhSearch() {
        let date = new Date();
        let month, year;
        let id;
        month = this.selectedMonth.Value;


        if (this.selectedYear) {
          year = this.selectedYear
        } else {
          year = date.getFullYear();
        }

        localStorage.setItem('month', month);
        localStorage.setItem('year', year);


        if (!this.selectUser) {
          id = localStorage.getItem('id');
        } else {
          id = this.selectUser.id;
        }


        let ret = await AdminAPI.adminCdhConsult(id, month, year);
        console.log('adminCdhConsult', ret);

        //Alimenta a table
        let cdh = [];



        if (ret.data.length) {
          let myDate = new Date();

          //percorre cada sessao dentro de cada dia
          for (let i = 0; i < ret.data[0].days.length; i++) {
            for (let x = 0; x < ret.data[0].days[i].entryExit.length; x++) {
              myDate.setTime(ret.data[0].days[i].entryExit[x].entry);
              let formatedEntry = `${addZero(myDate.getHours())}:${addZero(myDate.getMinutes())}:${addZero(myDate.getSeconds())}`;
              myDate.setTime(ret.data[0].days[i].entryExit[x].exit);
              let formatedExit = `${addZero(myDate.getHours())}:${addZero(myDate.getMinutes())}:${addZero(myDate.getSeconds())}`;
              myDate.setTime(ret.data[0].days[i].timeWorked);


              let formatedTimeWorked = `${addZero(myDate.getMinutes())}`;

              let h = 0;
              while(formatedTimeWorked > 60){
                h++
                formatedTimeWorked - 60;
              }

              formatedTimeWorked = `${addZero(h)} : ${formatedTimeWorked}`;

              if (formatedExit == "NaN:NaN:NaN")
                formatedExit = "";

              cdh.push({
                day: ret.data[0].days[i].day,
                entry: formatedEntry,
                exit: formatedExit,
                timeWorked: formatedTimeWorked ,
                // timeWorked: ret.data[0].days[i].timeWorked ,
                justification: ret.data[0].days[i].justification

              });

              // let lastDay = ret.data[0].days[i].day;
              // sessionStorage.setItem('lastDay', lastDay)
            }
          }

        }
        this.timeRegister = cdh;
      }
      ,

      async getUser() {
        let ret = await AdminAPI.readAllUsers();
        console.log('getUser', ret)

        if (ret.success) {
          this.users = ret.data;

          for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].id === localStorage.getItem('id')) {
              localStorage.setItem('currentTimeRegister', this.users[i].currentTimeRegister)
            }
          }
          for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].name === localStorage.getItem('name'))
              this.selectUser = this.users[i];
          }
          ;

        }
      },

      async getCdhYears() {
        let myDate = new Date();
        let year = myDate.getFullYear();


        for (let i = 0; i < 5; i++) {
          this.year.push(year);

          year -= 1;
        }
      },

    }
  }

</script>

<style scoped>

</style>
