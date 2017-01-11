var HOST_URI = 'https://cnodejs.org/api/v1';
var GET_TOPICS = '/topics';
var GET_TOPIC_BY_ID = '/topic/';

function objZuri(obj) {
    return Object.keys(obj).map(function(k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]);
    }).join('&');
}

module.exports = {
    getTopics: function(obj) {
        return HOST_URI + GET_TOPICS + '?' + objZuri(obj);
    },
    getTopicByID: function(id, obj){
        return HOST_URI + GET_TOPIC_BY_ID + id + '?' + objZuri(obj);
    }
}