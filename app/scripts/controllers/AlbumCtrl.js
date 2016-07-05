(function() {
    function AlbumCtrl(Fixtures){
        this.theAlbum = Fixtures.getAlbum();
    }
    
 angular
    .module('blocJams')
    .controller('AlbumCtrl', ['Fixtures', AlbumCtrl]);
})();