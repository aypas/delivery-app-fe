import axios from 'axios';
import { store } from '@/store/index';
import router from '@/router/index';

//guessing this has to do with the main.js created, but when refresh fails, another request is sent...no need for that
//also a bunch of other issue, like for one, the request which failed should be sent again on succesful retrieval of token...
//that might have to do with the finally of the statement
//maybe add a datetime object in state, such that if less time.now-state.time<1 min, send again on final then...



axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.headers.common['Content-Type'] = "application/json";


//also, i gotta add a bunch of code to all catchs to handle timeout errs
export const axiosIns = axios.create({
  baseURL: "http://127.0.0.1:8000",
  timeout: 1750
});

axiosIns.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    console.log(error)
    if (error.response.status==401 && store.state.auth.refreshToken) {
      console.log('request to refresh has been sent...')
      axiosIns.post('api/auth/token/refresh/', {refresh: store.state.auth.refreshToken})
        .then( (response) => {
          console.log(response.data, 'this is the refresh data')
          store.commit('auth/refresh', response.data);
          return true;
      }).catch( (error) => { //errors should redirect to dashboard, and displayed to the use!
          if (error.response==="undefined"){
            router.push('home?q=unknown-error');
          }
          if (error.response.status==401){
            store.commit('auth/removeAllCreds');
            router.push('home?q=logout');
          }
          return false;
      })
    }
    return Promise.reject(error);
  });

axiosIns.interceptors.request.use(function (config) {
    if (store.state.auth.jwt) {
      config.headers.Authorization = `JWT ${store.state.auth.jwt}`;
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });