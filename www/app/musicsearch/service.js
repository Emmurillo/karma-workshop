(function() {
  'use strict';

  angular
    .module('musicHack.musicsearch')
    .service('SearchService', SearchService);

  SearchService.$inject = ['$http', 'env', '$stateParams'];

  /* @ngInject */
  function SearchService($http, env, $stateParams) {
    this.searchYoutubeAPI = searchYoutubeAPI;
    this.pushVideoIDToVenue = pushVideoIDToVenue;

    var ref = new Firebase(env.firebaseApiUrl);

    function searchYoutubeAPI(query) {
      var fields = 'items/id,items/snippet/title,items/snippet/description,' +
        'items/snippet/thumbnails/default,items/snippet/channelTitle';
      var params = {
        key: env.youtubeAPIKey,
        type: 'video',
        videoCategoryId: '10',
        maxResults: '10',
        part: 'id,snippet',
        fields: fields,
        q: query
      };
      return $http.get(env.youtubeAPIURL, {params: params});
    }

    function pushVideoIDToVenue(youTubeVideoInfo) {
      var videoIDPath = ref.child($stateParams.venuePath + '/queue/' +
                                  youTubeVideoInfo.videoID);
      return videoIDPath.set(youTubeVideoInfo);
    }
  }
})();
