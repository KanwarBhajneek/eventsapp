import {GET, ENDPOINTS} from './Api';

function getPopularEvents(sport) {
  return GET(ENDPOINTS.popularEvents + sport).then(response => response.data);
}

function getEventDetail(eventId) {
  return GET(ENDPOINTS.eventDetail + eventId).then(response => response.data);
}

module.exports = {
  getPopularEvents,
  getEventDetail,
};
