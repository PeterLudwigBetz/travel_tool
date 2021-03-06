import axios from 'axios';
import {resolveBaseUrl} from '.';

const baseUrl = resolveBaseUrl();

class TripsAPI {
  static getTrips() {
    return axios.get(`${baseUrl}/trips`);
  }

  static updateTrip(tripId, tripData) {
    return axios.put(`${baseUrl}/trips/${tripId}`, tripData);
  }
}

export default TripsAPI;
