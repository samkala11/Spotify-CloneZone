Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show, :index]
    resource :session, only: [:create, :destroy]

    resources :songs, only: [:index]
    get '/songs/all', to: 'songs#getall'
    get 'songs/artist', to: 'songs#songs_for_artist'
    get 'songs/image', to: 'songs#get_artist_image'
    resources :albums, only: [:index, :show]
    resources :artists, only: [:index, :show]

    resources :playlists, only: [:show, :index]

    resources :playlistsongs

    resources :follows 

  end
  
  root to: "static_pages#root"

end
