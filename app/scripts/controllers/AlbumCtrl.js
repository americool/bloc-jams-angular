(function() {
    function AlbumCtrl(Fixtures, SongPlayer){
        this.theAlbum = Fixtures.getAlbum();
        this.songPlayer = SongPlayer; 
    }
    
 angular
    .module('blocJams')
    .controller('AlbumCtrl', ['Fixtures', 'SongPlayer', AlbumCtrl]);
})();