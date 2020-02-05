import axios from 'axios';
import store from '@/store';
import router from '@/router';


axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.headers.common['Authorization'] = `JWT ${localStorage.getItem('token')}`;
axios.defaults.headers.common['Content-Type'] = "application/json";



export const axiosIns = axios.create({
  baseURL: "http://127.0.0.1:8000",
  timeout: 1750
});

axiosIns.interceptors.response.use(function (response) {
    return response;
  }, function (error) {

    if (error.response.status==401 && store.state.auth.refreshToken) {
      console.log('error response interceptor is trigerred')
      axiosIns.post('api/auth/token/refresh/', {refresh: store.state.auth.refreshToken})
        .then( (response) => {
          store.dispatch('login', response.data);
          return true;
      }).catch( (error) => {
          if (error.response.status==401){
            store.dispatch('logout');
            router.push('home');
          }
          return false;
      }).then( (obj) => {
          console.log('final then, obj is', obj)
          if ( obj && !store.state.auth.authUser.email) {
            console.log('final then in interceptor if?')
            axiosIns.get('api/auth/user/', {timeout: 3000})
              .then( (response) => {
                store.dispatch('setUserData', response.data);
                console.log('then\'s dispatch')
            }).catch( (err) => {
                console.log('ruh oh, interceptor', err)
            });
          }
        });
      } else if (error.response.status==401 && !store.state.auth.refreshToken) {
        router.push('home')
      }
    return Promise.reject(error);
  });

axiosIns.interceptors.request.use(function (config) {
    config.headers.Authorization = `JWT ${store.state.auth.jwt}`;
    return config;
  }, function (error) {
    return Promise.reject(error);
  });