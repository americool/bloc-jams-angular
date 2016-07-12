(function() {
    function SongPlayer($rootScope, Fixtures) {
        var SongPlayer = {};
/**
* @desc Object contating album information
* @type {Object}
*/        
        var currentAlbum = Fixtures.getAlbum(); 
/**
* @desc Buzz object audio file
* @type {Object}
*/
        var currentBuzzObject = null;
/**
* @function setSong
* @desc returns index (number) of song
* @param {Object} song
*/
        var getSongIndex = function(song){
            return currentAlbum.songs.indexOf(song)
        };
/**
* @function setSong
* @desc Stops currently playing song and loads new audio file as currentBuzzObject
* @param {Object} song
*/
        
        var setSong = function(song) {
            if (currentBuzzObject){
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null; 
            }
            
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function(){
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            });
            SongPlayer.currentSong = song; 
        };
        
//        currentBuzzObject.bind('volumechange', function() {
//            $rootScope.$apply(function(){
//               SongPlayer.volume = currentBuzzObject.getVolume(); 
//            });
//        });
/**
* @function playSong
* @desc Plays selected song and marks song.playing as true 
* @param {Object} song
*/
        var playSong = function(song){
            currentBuzzObject.play(); 
            song.playing = true;
            currentBuzzObject.setVolume(SongPlayer.volume);
            
        }
/**
* @function stopSong
* @desc Stops selected song and marks playing as null 
*/
        var stopSong = function(song){
            currentBuzzObject.stop(); 
            SongPlayer.currentSong.playing = null; 
        }
        
        SongPlayer.currentSong = null;
/**
* @desc Current playback time (in seconds) of currently playing song
* @type {Number}
*/
        SongPlayer.currentTime = null;
        SongPlayer.volume = 80; 
//        currentBuzzObject.setVolume(80);
/** 
* @function setCurrentTime
* @desc Set current time (in seconds) of currently playing song
* @param {Number} time 
*/
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };
        
        SongPlayer.setVolume = function(volume) {
            if (currentBuzzObject) {
                currentBuzzObject.setVolume(volume);
            }
            SongPlayer.volume = volume; 
        };
        
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong
            if (SongPlayer.currentSong !== song){
                setSong(song);
                playSong(song);
            }
            else if (!currentBuzzObject) {
                setSong(currentAlbum.songs[0]);
                playSong(currentAlbum.songs[0]);
            }
            else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
           
                
        };
        
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause(); 
            song.playing = false; 
        };
/**
* @function SongPlayer.previous
* @desc Gets current song index, then reduces by 1. If index is less than zero - stops music and sets the currently playing song to null, else it uses the current index to set the new song and plays it and updates appropriate variables. 
*/        
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--; 
            
            if (currentSongIndex < 0 ) {
                stopSong();
            }
            else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        }
/**
* @function SongPlayer.next
* @like the .previous function, but you know ...goes to the next song.
*/        
           
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++; 
            
            if (currentSongIndex > currentAlbum.songs.length - 1) {
                stopSong();
            }
            else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        }
        
        return SongPlayer; 
    }
    
    angular 
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();

