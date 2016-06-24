(function() {
    function AlbumCtrl(){
        this.theAlbum = angular.copy(albumPicasso);
    }
    
 angular
    .module('blocJams')
    .controller('AlbumCtrl', AlbumCtrl);
})();