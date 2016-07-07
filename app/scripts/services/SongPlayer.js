(function() {
    function SongPlayer(Fixtures) {
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
            SongPlayer.currentSong = song; 
        };
/**
* @function playSong
* @desc Plays selected song and marks song.playing as true 
* @param {Object} song
*/
        var playSong = function(song){
            currentBuzzObject.play(); 
            song.playing = true; 
        }
        
        SongPlayer.currentSong = null;
        
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong
            if (SongPlayer.currentSong !== song){
                setSong(song);
                playSong(song);
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
                currentBuzzObject.stop(); 
                SongPlayer.currentSong.playing = null; 
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
        .factory('SongPlayer', SongPlayer)
})();

