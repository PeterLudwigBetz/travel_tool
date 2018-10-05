import axios from 'axios';
import Cookies from 'cookies-js';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class AccommodationAPI {
  static postAccommodation(accommodationData) {
    return axios.post(`${baseUrl}/guesthouses`, accommodationData);
  }
  static getAccommodationCentres() {
    return axios.get(`${baseUrl}/guesthouses`);
  }
  static editAccommodation(accommodationData, guestHouseId) {
    console.log(guestHouseId)
    return axios.put(`${baseUrl}/guesthouses/${guestHouseId}`, accommodationData);
  }
  static setToken () {
    const token = Cookies.get('jwt-token');
    axios.defaults.headers.common['Authorization'] = token;
  } 
}

export default AccommodationAPI;
