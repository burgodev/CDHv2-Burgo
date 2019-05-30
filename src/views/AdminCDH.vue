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
              v-model="selectUser"
              :items="users"
              item-text="name"
              item-value="id"
              label="Usuário"

            ></v-select>
          </v-flex>

          <v-spacer></v-spacer>

          <v-flex xs6 sm6 md2 d-flex>
            <v-select
              :items="month"
              v-model="selectedMonth"
              label="Mês"
            ></v-select>
          </v-flex>

          <v-spacer></v-spacer>

          <v-flex xs6 sm6 md2 d-flex>
            <v-select
              :items="year"
              v-model="selectedYear"
              label="Ano"
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
                  <span class="black--text"> Iniciar/Finalizar Sessão </span>
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
      month: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      year: []

    }),


    mounted() {
      this.initialize()
    },


    computed: {
      sessionButton() {
        if (this.selected) return 'primary';
      },
    },

    methods: {
      async initialize() {
        this.adminCdhSearch();
        this.getCdhYears();
        this.getUser();

        if (localStorage.getItem('sessionOpen') === "true")
          this.selected = true
        else
          this.selected = false;


        // if (localStorage.getItem('sessionOpen') == "true") {
        //   this.selected = true;
        // }
      },

      showJustifyAbsence(item) {
        this.editedIndex = this.timeRegister.indexOf(item);
        // let month = localStorage.getItem('month');
        // let year = localStorage.getItem('year');
        // let id = localStorage.getItem('id');
        // let currentTimeRegister = localStorage.getItem('currentTimeRegister');
        let data= {
            day: item.day,
            month: localStorage.getItem('month'),
            year: localStorage.getItem('year'),
            id:localStorage.getItem('id'),
            currentTimeRegister: localStorage.getItem('currentTimeRegister')
          };

        this.$refs.JustifyAbsence.open(data)


        // console.log('day', item.day, 'month', month, 'year', year, 'id', id, 'currentTimeRegister', currentTimeRegister)
        // console.log(this.timeRegister.day);
      },

      async sessionControl() {
        // let id = await localStorage.getItem('id');

        if (!this.selected) {
          this.$refs.ExpectedExit.open(this.initialize.bind(this));
          localStorage.setItem("sessionOpen", "true");
        } else {
          this.$refs.EndSessionConfirmation.open(this.initialize.bind(this));

          // let ret = await UserAPI.exit(id);
          // localStorage.setItem("sessionOpen", "false");
          // console.log('exit', ret);
        }

      },


      async adminCdhSearch() {
        let date = new Date();
        let month, year;
        let id;

        if (this.selectedMonth) {
          month = this.getCdhMonths();
        } else {
          month = date.getMonth();
        }

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
          id = this.selectUser;
        }


        let ret = await AdminAPI.adminCdhConsult(id, month, year);
        console.log('adminCdhConsult', ret);

        //Alimenta a table
        let cdh = [];
        if (ret.data.length) {
          let myDate = new Date();

          //percorre cada sessao dentro de cada dia
          for (let i = 0; i < ret.data[0].days.length; i++) {
            for (let x = 0; x < ret.data[0].days[0].entryExit.length; x++) {
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
          }
        }
        this.timeRegister = cdh;
      },

      async getUser() {
        let ret = await AdminAPI.readAllUsers();
        console.log('getUser', ret);

        if (ret.success) {
          this.users = ret.data;
          // console.log(this.users[0].id)


          for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].id === localStorage.getItem('id')) {
              localStorage.setItem('currentTimeRegister', this.users[i].currentTimeRegister)
            }
          }
          // console.log('id', id, 'currentTimeRegister', localStorage.getItem('currentTimeRegister'))

          // console.log('this.users', this.users)


          //TALVEZ BUGE COM ISSO COMENTADO, VAMO VE ->
          //   let admin = {
          //     name:
          //       localStorage.getItem('name'),
          //     id:
          //       localStorage.getItem('id')
          //   };
          //   this.users.push(admin)
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

      getCdhMonths() {

        switch (this.selectedMonth) {
          case 'Janeiro':
            return 0;
          case 'Fevereiro':
            return 1;
          case 'Março':
            return 2;
          case 'Abril':
            return 3;
          case 'Maio':
            return 4;
          case 'Junho':
            return 5;
          case 'Julho':
            return 6;
          case 'Agosto':
            return 7;
          case 'Setembro':
            return 8;
          case 'Outubro':
            return 9;
          case 'Novembro':
            return 10;
          case 'Dezembro':
            return 11;

        }
      },

    }
  }

</script>

<style scoped>

</style>
