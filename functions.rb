require "sinatra"
require "csv"
require "pry"
require 'json'
require "net/http"
require "uri"
require "date"

def checkClick(x, y)
	gotHim = false
	xGood = false	
	yGood = false
	xMin = 0
	xMax = 0
	yMin = 0
	yMax = 0
	CSV.foreach("heresWaldo.txt", {headers: true, return_headers: false}) do |row|			
		xMin = row["xMin"]
		xMax = row["xMax"]
		yMin = row["yMin"]
		yMax = row["yMax"]	 
			
 
	end
	if x >= xMin && x <= xMax
			

		xGood = true
	end
	if y >= yMin && y <= yMax
			

		yGood = true
	end
	if xGood == true && yGood == true
			

		gotHim = true
		return "true"
	else
		return "false"
	end
end


def saveScore(pName, time)
	if pName == ""
		pName = "Anon"
	end
	record = pName + "," + time
	File.open("records.txt", "a") do |line|
		line.puts record
	end
end


# @highScores = {}
# def filterHighScore
# 	highS = []
# 	highSort = []
# 	scoreHolder = []

# 	CSV.foreach("records.txt", {headers: true, return_headers: false}) do |row|			
# 		highS.push(row["Time"])
# 	end
# 	highSort = highS.sort

# 	highSort.each do |score|
# 		CSV.foreach("records.txt", {headers:true, return_headers: false}) do |row|
# 			if score == row["Time"]
# 				scoreHolder.push(row["Name"])
# 			end
# 		end
# 	end
# 	listForm = "<table><tr><th>Player Name</th><th>Time</th></tr>"

# 	0.upto(highSort.length - 1) do |i|
		
#   		listForm += "<tr><td>" + scoreHolder[i] + "</td><td>" + highSort[i] + "</td></tr>"
# 	end
# 	listForm += "</table>"



# 	# CSV.foreach("records.txt", {headers: true, return_headers: false}) do |row|			
# 	# 	@highScores[row["Name"]] = []
# 	# end
# 	# CSV.foreach("records.txt", {headers: true, return_headers: false}) do |row|			
# 	# 	@highScores[row["Name"]].push(row["Time"])
# 	# end
# 	# binding.pry
# 	# puts @highScores
# 	# puts "shit" 
# end

def createLoadList 
	highS = []
	highSort = []
	scoreHolder = []

	CSV.foreach("records.txt", {headers: true, return_headers: false}) do |row|			
		highS.push(row["Time"])
	end
	highSort = highS.sort

	highSort.each do |score|
		CSV.foreach("records.txt", {headers:true, return_headers: false}) do |row|
			if score == row["Time"]
				scoreHolder.push(row["Name"])
			end
		end
	end
	listForm = "<table><tr><th>Player Name</th><th>Time</th></tr>"

	0.upto(highSort.length - 1) do |i|
		
  		listForm += "<tr><td>" + scoreHolder[i] + "</td><td>" + highSort[i] + "</td></tr>"
	end
	listForm += "</table>"
	return listForm
end



# def createLoadList 
# 	pName = []  #Array to hold save time information
# 	pTime = []	 #Array to hold save color information
# 	CSV.foreach("records.txt", {headers: true, return_headers: false}) do |row|			

# 	  pName.push(row["Name"])
# 	  pTime.push(row["Time"])
# 	end
# 	listForm = "<table><tr><th>Player Name</th><th>Time</th></tr>"

# 	0.upto(pName.length - 1) do |i|
		
#   		listForm += "<tr><td>" + pName[i] + "</td><td>" + pTime[i] + "</td></tr>"
# 	end
# 	listForm += "</table>"
# 	return listForm
# end



