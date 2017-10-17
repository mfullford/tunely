/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */


/* hard-coded data! */
var sampleAlbums = [];
sampleAlbums.push({
             artistName: 'Ladyhawke',
             name: 'Ladyhawke',
             releaseDate: '2008, November 18',
             genres: [ 'new wave', 'indie rock', 'synth pop' ]
           });
sampleAlbums.push({
             artistName: 'The Knife',
             name: 'Silent Shout',
             releaseDate: '2006, February 17',
             genres: [ 'synth pop', 'electronica', 'experimental' ]
           });
sampleAlbums.push({
             artistName: 'Juno Reactor',
             name: 'Shango',
             releaseDate: '2000, October 9',
             genres: [ 'electronic', 'goa trance', 'tribal house' ]
           });
sampleAlbums.push({
             artistName: 'Philip Wesley',
             name: 'Dark Night of the Soul',
             releaseDate: '2008, September 12',
             genres: [ 'piano' ]
           });
/* end of hard-coded data */




$(document).ready(function() {
  console.log('app.js loaded!');
  
  $.get('/api/albums', function(albums) {
    console.log(albums)
    albums.forEach(function(album) {
        renderAlbum(album);
    });
  });

  $("#albumform").submit(function(event) {
    event.preventDefault();
    console.log(this);
    var formData = $(this).serialize();
    console.log(formData);
        $(this).trigger("reset");
    $.post('/api/albums', formData, function(album) {
      console.log(album);
      renderAlbum(album);
    });
  });
});

$('#albums').on('click', '.add-song', function(e) {
    var currentAlbumId= $(this).parents('.album').data('album-id');
    console.log('id',id);
    $('#songModal').data('album-id', currentAlbumId);
    $('#songModal').modal();
  });

$('#saveSong').on('click', handleNewSongSubmit);

$('#albums').on('click', '.delete-album', handleDeleteAlbumClick);

function handleDeleteAlbumClick(e) {
  var albumId = $(this).parents('.album').data('album-id');
  console.log('someone wants to delete album id=' + albumId );
  $.ajax({
    method: 'DELETE',
    url: ('/api/albums/' + albumId),
    success: function() {
      console.log("He's dead Jim");
      $('[data-album-id='+ albumId + ']').remove();
    }
  });
}

function handleNewSongSubmit(e) {
  var albumId = $('#songModal').data('album-id');
  var songName = $('#songName').val();
  var trackNumber = $('#trackNumber').val();

  var formData = {
    name: songName,
    trackNumber: trackNumber
  };

  return handleNewSongSubmit;

  var postURL = '/api/albums/' + albumId + '/songs';
   console.log('posting to ', postUrl, ' with data ', formData);

  $.post(postUrl, formData)
    .success(function(song) {
      console.log('song', song);

      $.get('/api/albums/' + albumId).success(function(album) {
        //remove old entry
        $('[data-album-id='+ albumId + ']').remove();
        // render a replacement
        renderAlbum(album);
      });

      //clear form
      $('#songName').val('');
      $('#trackNumber').val('');
      $('#songModal').modal('hide');

  });

  };

function buildSongsHtml(songs) {
  var songText = "  – ";
  songs.forEach(function(song) { 
    songText = songText + "(" + song.trackNumber + ") " + song.name + " – "; }); 
    var songsHtml = " " + " " + songText + " " + " "; 
    return songsHtml; 
}



// this function takes a single album and renders it to the page
function renderAlbum(album) {
  console.log('rendering album:', album);

  var albumHtml =
  "        <!-- one album -->" +
  "        <div class='row album' data-album-id='" + album._id + "'>" +
  "          <div class='col-md-10 col-md-offset-1'>" +
  "            <div class='panel panel-default'>" +
  "              <div class='panel-body'>" +
  "              <!-- begin album internal row -->" +
  "                <div class='row'>" +
  "                  <div class='col-md-3 col-xs-12 thumbnail album-art'>" +
  "                     <img src='" + "http://placehold.it/400x400'" +  " alt='album image'>" +
  "                  </div>" +
  "                  <div class='col-md-9 col-xs-12'>" +
  "                    <ul class='list-group'>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Album Name:</h4>" +
  "                        <span class='album-name'>" + album.name + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Artist Name:</h4>" +
  "                        <span class='artist-name'>" +  album.artistName + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Released date:</h4>" +
  "                        <span class='album-releaseDate'>" + album.releaseDate + "</span>" +
  "                      </li>" +

        buildSongsHtml(album.songs) +

  // "                      <li class='list-group-item'>" +
  // "                     <h4 class='inline-header'>Songs:</h4>"
  // "                      <span>  – (1) Famous – (2) All of the Lights – (3) Guilt Trip – (4) Paranoid – (5) Ultralight Beam – (6) Runaway – (7) Stronger – </span>"
  // "                      </li>" +
  "                    </ul>" +
  "                  </div>" +
  "                </div>" +
  "                <!-- end of album internal row -->" +

  "              </div>" + // end of panel-body

  "              <div class='panel-footer'>" +
  "                <button class='btn btn-primary add-song'>Add Song</button>" +
  "                 <button class='btn btn-danger delete-album'>Delete Album</button>" +
  "              </div>" +

  "            </div>" +
  "          </div>" +
  "          <!-- end one album -->";

  // render to the page with jQuery
$("#albums").append(albumHtml);
}





