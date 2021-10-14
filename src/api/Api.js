import axios from 'axios';

const URL = 'https://api.smarkets.com';
const VERSION = 'v3';
const BASE_URL = URL + '/' + VERSION + '/';
const ENDPOINTS = {
  popularEvents: 'popular/event_ids/sport/',
  eventDetail: 'events/',
};

function GET(endpoint, params = {}, headers = {}) {
  return axios.get(BASE_URL + endpoint, {headers: headers, params: params});
}

module.exports = {
  GET,
  ENDPOINTS,
};
