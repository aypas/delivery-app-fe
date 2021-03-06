import axios from 'axios';
import { store } from '@/store/index';
import router from '@/router/index';

//error.response.detail for err msg
//error.response.status for err number

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.headers.common['Content-Type'] = "application/json";


//also, i gotta add a bunch of code to all catches to handle timeout errs
export const axiosIns = axios.create({
  baseURL: "http://127.0.0.1:8000",
  timeout: 3000,
  withCredentials: true
});

axiosIns.interceptors.response.use(function (response) {
    store.commit('errors/setErr', false);
    console.log(response, 'rep')
    return response;
  }, function (error) {
    
    if (error.response == undefined) {
      console.log("django sent an err")
      store.commit('errors/setErr', true);
      return Promise.reject(error);
    }

    if (error.response.status==401 && store.state.auth.refreshToken) {
      console.log('request to refresh has been sent...')
      axiosIns.post('api/auth/token/refresh/', {refresh: store.state.auth.refreshToken})
        .then( (response) => {
          console.log(response.data, 'this is the refresh data')
          store.commit('auth/refresh', response.data);
          return true;
      }).catch( (error) => { //errors should redirect to dashboard, and displayed to the use!
          if (error.response.status==401){
            store.commit('auth/removeAllCreds');
            console.log('if navigation guard doesnt fail here it might be good in general!!!')
            router.push('/?q=SesionExpired');
          }
          return false;
        });
    }
    return Promise.reject(error);
  });

axiosIns.interceptors.request.use(function (config) {
    if (store.state.auth.jwt) {
      config.headers.Authorization = `JWT ${store.state.auth.jwt}`;
      config.headers['Permissions'] = `${JSON.stringify(store.state.auth.authUser.of_node)}`;
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });