<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card-text>
                    <v-text-field dark
                                  ref="name"
                                  v-model="user.login"
                                  color="primary"
                                  placeholder="Username"
                                  required
                    ></v-text-field>

                    <v-text-field dark
                                  v-model="user.password"
                                  :append-icon="show1 ? 'visibility' : 'visibility_off'"
                                  :type="show1 ? 'text' : 'password'"
                                  placeholder="Password"
                                  name="input-10-1"
                                  color="primary"
                                  counter
                                  @click:append="show1 = !show1"
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


                <v-btn class="custom-btn" @click="login" outline round small text>Login</v-btn>


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
                let ret = await OpenAPI.login({login: this.user.login, password: this.user.password});

                if (ret.success) {
                    localStorage.setItem('authenticationKey', ret.data.authenticationKey);
                    localStorage.setItem('accessKey', ret.data.accessKey);
                    localStorage.setItem('id', ret.data.id);
                    localStorage.setItem('name', ret.data.name)
                    localStorage.setItem('isLogged', 'true');
                    console.log(localStorage.getItem('isLogged'));

                    this.$router.replace('/UserCDH')
                }
            },
        }
    }
</script>

<style>




</style>


