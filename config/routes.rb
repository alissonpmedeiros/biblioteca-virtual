Rails.application.routes.draw do

  scope '/api' do
    mount_devise_token_auth_for 'User', at: '/auth'
    resources :groups
  end

  root "home#index"

  resources :books
  resources :authors
  resources :categories
  resources :users
  resources :states
  resources :addresses
  resources :loans
  resources :fines
  resources :request_books


  get '/search_authors', to: 'authors#searchAuthors'
  get '/search_books', to: 'books#searchBooks'
  get '/search_loans', to: 'loans#searchLoans'
end
