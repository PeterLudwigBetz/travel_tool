import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class AccommodationAPI {
  static postAccommodation(accommodationData) {
    return axios.post(`${baseUrl}/guesthouses`, accommodationData);
  }
  static getAccommodationCentres() {
    return axios.get(`${baseUrl}/guesthouses`);
  }
}

export default AccommodationAPI;
