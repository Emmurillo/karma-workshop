(function() {
  'use strict';

  angular
    .module('musicHack.musicsearch')
    .controller('MusicSearchCtrl', MusicSearchCtrl);

  MusicSearchCtrl.$inject = ['SearchService', '$ionicPopup'];

  /* @ngInject */
  function MusicSearchCtrl(SearchService, $ionicPopup) {
    var vm = this;
    vm.videos = {};
    vm.search = search;
    vm.addSongToQueue = addSongToQueue;

    function search() {
      SearchService.searchYoutubeAPI(vm.searchQuery)
        .then(setVideos)
        .catch(handleSearchFailure);
    }

    function setVideos(result) {
      vm.videos = result.data.items;
    }

    function handleSearchFailure(error) {
      $ionicPopup.alert({
        title: 'Ha ocurrido un error',
        template: error.data.error.message
      });
    }

    function addSongToQueue(videoParameters) {
      var videoInfo = {};
      videoInfo.videoID = videoParameters.id.videoId;
      videoInfo.name = videoParameters.snippet.title;
      videoInfo.description = videoParameters.snippet.description;
      videoInfo.coverArtURL = videoParameters.snippet.thumbnails.default.url;
      SearchService.pushVideoIDToVenue(videoInfo)
        .then(handleSaveSongSuccess)
        .catch(handleSearchFailure);
    }

    function handleSaveSongSuccess() {
      $ionicPopup.alert({
        title: '¡Muy Bien!',
        template: 'Has agregado una canción a la lista de reproducción'
      });
    }
  }
})();
