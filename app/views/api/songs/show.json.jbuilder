@all_songs.each do |song|
  json.set! song.id do
    json.extract! song, :id, :title
    if song.mp3song.attached?
      json.songUrl url_for(song.mp3song)
    else
      json.songUrl ""
    end

    if song.songimage.attached?
      json.songImageUrl url_for(song.songimage)
    else 
      json.songImageUrl ""
    end

    json.artist song.artist.name
    json.artistId song.artist.id
  end
end
