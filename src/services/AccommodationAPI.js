import axios from 'axios';

import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class AccommodationAPI {
  static postAccommodation(accommodationData) {
    return axios.post(`${baseUrl}/guesthouses`, accommodationData);
  }
}
export default AccommodationAPI;
