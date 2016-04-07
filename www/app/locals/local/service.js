(function() {
  'use strict';

  angular
  .module('musicHack.locals')
  .service('VenuePlayerService', VenuePlayerService);

  VenuePlayerService.$inject = ['$rootScope', 'env',
                                '$firebaseArray', '$stateParams'];

  /* @ngInject */
  function VenuePlayerService($rootScope, env, $firebaseArray, $stateParams) {
    var service = this;
    service.fetchQueue = fetchQueue;
    service.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    service.getSynchronizedArray = getSynchronizedArray;
    service.eraseSongFromArray = eraseSongFromArray;
    service.nowPlaying = {};
    service.deleteYoutubeIframe = deleteYoutubeIframe;

    var ref = new Firebase(env.firebaseApiUrl);
    var uid = $rootScope.authenticatedUser.uid;
    var upcomingSongs = [];
    var upcomingFirebaseSongs = [];
    var actualSong = 0;
    var player;
    var refToQueue;
    var pathToQueue;
    var musicFirebaseObject;

    function eraseSongFromArray(venueInfo, songID) {
      musicFirebaseObject = getSynchronizedArray(venueInfo);
      musicFirebaseObject.$remove(songID);
    }

    function firebaseObjectToArray(venueInfo) {
      musicFirebaseObject = getSynchronizedArray(venueInfo);
      upcomingFirebaseSongs = Object.keys(musicFirebaseObject).map
                            (function(key) {return musicFirebaseObject[key];});
      return upcomingFirebaseSongs;
    }

    function getSynchronizedArray(venueID) {
      pathToQueue = 'user/' + uid + '/locals/' + venueID + '/queue';
      refToQueue = ref.child(pathToQueue);
      var list = [];
      syncChanges(list, refToQueue);
      wrapLocalCrudOps(list, refToQueue);
      return list;
    }

    function syncChanges(list, ref) {
      ref.on('child_added', function _add(snap, prevChild) {
        var data = snap.val();
        data.$id = snap.key();
        var pos = positionAfter(list, prevChild);
        list.splice(pos, 0, data);
      });

      ref.on('child_removed', function _remove(snap) {
        var i = positionFor(list, snap.key());
        if (i > -1) {
          list.splice(i, 1);
        }
      });

      ref.on('child_changed', function _change(snap) {
        var i = positionFor(list, snap.key());
        if (i > -1) {
          list[i] = snap.val();
          list[i].$id = snap.key();
        }
      });

      ref.on('child_moved', function _move(snap, prevChild) {
        var curPos = positionFor(list, snap.key());
        if (curPos > -1) {
          var data = list.splice(curPos, 1)[0];
          var newPos = positionAfter(list, prevChild);
          list.splice(newPos, 0, data);
        }
      });
    }

    function positionFor(list, key) {
      for (var i = 0, len = list.length; i < len; i++) {
        if (list[i].$id === key) {
          return i;
        }
      }
      return -1;
    }

    function positionAfter(list, prevChild) {
      if (prevChild === null) {
        return 0;
      }else {
        var i = positionFor(list, prevChild);
        if (i === -1) {
          return list.length;
        }else {
          return i + 1;
        }
      }
    }

    function wrapLocalCrudOps(list, firebaseRef) {
      list.$remove = function(key) {
        firebaseRef.child(key).remove();
      };
    }

    function deleteYoutubeIframe() {
      player.destroy();
    }

    function onYouTubeIframeAPIReady(venueID) {
      upcomingSongs = firebaseObjectToArray(venueID);
      var actualVideoId = upcomingSongs[actualSong].videoID;
      player = new YT.Player('player', {
        videoId: actualVideoId,
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });
      service.nowPlaying = upcomingSongs[actualSong];
    }

    function onPlayerReady(event) {
      upcomingSongs = firebaseObjectToArray($stateParams.localID);
      service.nowPlaying = upcomingSongs[actualSong];
      eraseSongFromArray($stateParams.localID,
                         upcomingSongs[actualSong].videoID);
      upcomingSongs.splice(0, 1);
      event.target.playVideo();
    }

    function onPlayerStateChange(event) {
      if (event.data == YT.PlayerState.ENDED) {
        upcomingSongs = firebaseObjectToArray($stateParams.localID);
        launchNextSong(upcomingSongs[actualSong].videoID,
                       upcomingSongs[actualSong].name);
        eraseSongFromArray($stateParams.localID,
                           upcomingSongs[actualSong].videoID);
        upcomingSongs.splice(0, 1);
      }
    }

    function launchNextSong(id, title) {
      player.loadVideoById(id);
      YT.videoId = id;
      YT.videoTitle = title;
    }

    function fetchQueue(localID) {
      pathToQueue = 'user/' + uid + '/locals/' + localID + '/queue';
      refToQueue = ref.child(pathToQueue);
      var queue = $firebaseArray(refToQueue);
      return queue.$loaded();
    }
  }

})();
