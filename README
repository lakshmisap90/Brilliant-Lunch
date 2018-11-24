# Project Overview

Brilliant Lunch
Creating mapping logic to match lunch event with Nikki's lunch event timings

# Functional requirements
How to find the exact match event?
1) Overlap time of event is greater than 30
2) If more than 1 exists from previous condition then select the one who will meet Nikki first
3) If more than 1 exists from above conditions with overlapping time slots then pick a random event

# How will be event object structured?
- matchLunchEvent() method accepts objects with start and end time values only
- Functions inside matchLunchEvent() will eventually format the object values with below keys so that it can be used in DOM rendering
			overlap -> holds the overlap time gap with reference to Nikki's time slots
			label -> holds the event name as 'Brilliant Lunch' for all events other than nikki
			color -> holds color code for event representation
								blue - Indication for Non overlapping or less related event
								green - Indication for event will result as most matched
			id -> holds unique identifier value which will be used when events are of same timings

# What will be the order of execution?
- Calculate overlap time, color code, label text for event objects in raw array  by comparing to Nikki's event as reference
- Track overlapping events separately and find the most related event comparing to Nikki's event
- Format the raw array into rows as first level and rows containing columns as second level to decide the structure of rendering
- Create DOM structure dynamically by looping the formatted array and append to UI

# Calculation of event object properties
- store Nikki's event as first object and its values are defined
- Loop through raw array using possibility of  below use cases
  1) Event Planned earlier than Nikki and overlaps with Nikki's time slot
  2) Event planned later than Nikki and overlaps with Nikki's time slot
  3) Event never matches with Nikki's timeslot
		 => It will result in event object populated with comparing only to Nikki's event events Data
- create array of only overlapping events with and sort it with overlap time as only they have chance of getting matched and first element will hold high relation to Nikki's event
- During the process of finding overlapping object a flag is maintained to track if of presence of overlap to decide on Nikki's color code as green/black respectively

# How is the raw array formatted to get the render structure?
    - Below is the structure followed to format array
							eventsData
								__|__
							|       |
						Row1    Row2
						_|_
					 	 |
					col-1
					_|______
				| | | ....|
			event-1.......event-n

	*Rows:
		- row will always hold array of columns which has overlap among the columns in that row or row can also hold single event of array if it doesn't overlap with any
 	*columns:
		- columns will hold set of events which has overlapping elements only among them and is used to calculate display width of each event
	*event
		-event object which holds the event details

Process:
1) First Row gets created with first entry in column array with Nikki's event object
2) A method is created to accept rows data and current event object considered for evaluation
3) hasPrevOverlap and isProcessed are 2 flags which will determine if the event has an overlapping time slot and is placed in columns arrays

Conditional flags:
    hasOverlap - If element overlaps with current column array
		hasPrevOverlap - Element overlaps with previous array so push it to new column array
	  nooverlap - IF element doesnt overlap with any of current row column items






