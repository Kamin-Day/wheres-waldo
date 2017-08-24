require "sinatra"
require "csv"
require "pry"
require 'json'
require "net/http"
require "uri"
require "date"
require "sinatra/reloader"
require_relative "functions.rb"


# Homepage
get '/' do 
	erb :index
end


post '/check_click' do
	x = params["x"]
	y = params["y"]
	checkClick(x,y)
end

post '/new_record' do
	playerTime = params["time"]
	playerName = params["player_name"]

	saveScore(playerName,playerTime)

	erb :index
end