<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card-text>
          <v-text-field
            ref="name"
            v-model="user.login"
            placeholder="Username"
            required
            prepend-inner-icon="person"
          ></v-text-field>


          <v-text-field
            v-model="user.password"
            :append-icon="show1 ? 'visibility' : 'visibility_off'"
            :type="show1 ? 'text' : 'password'"
            placeholder="Password"
            name="input-10-1"
            counter
            @click:append="show1 = !show1"
            prepend-inner-icon="vpn_key"
          ></v-text-field>
        </v-card-text>

        <v-spacer></v-spacer>
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            class="my-0"
            @click="resetForm"
            v-on="on"
          >
            <v-icon>refresh</v-icon>
          </v-btn>
        </template>


        <v-btn class="custom-btn white--text" @click="login" outline round small text>Login</v-btn>


      </v-flex>
    </v-layout>


  </v-container>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {
    OpenAPI,
  } from '../requests';

  @Component({
    components: {},
  })
  export default {

    data() {
      return {
        show1: false,
        user: {
          login: 'admin@admin.com',
          password: 'admin',
        },
      }
    },

    methods: {
      async login() {
        localStorage.clear();
        let ret = await OpenAPI.login({login: this.user.login, password: this.user.password});
        console.log('login', ret)

        if (ret.success) {
          localStorage.setItem('authenticationKey', ret.data.authenticationKey);
          localStorage.setItem('accessKey', ret.data.accessKey);
          localStorage.setItem('id', ret.data.id);
          localStorage.setItem('name', ret.data.name)

          ret.data.isAdm ?
            (this.$router.replace('/AdminCDH'), localStorage.setItem('isAdm', 'true')) :
            (this.$router.replace('/UserCDH'), localStorage.setItem('isAdm', 'false'));

        }
      },
    }
  }
</script>

<style>

  .primaryText {
    color: #f8b91b !important;
  }


</style>


