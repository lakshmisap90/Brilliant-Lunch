/**
 * main.js
 * handles events and dom manipulations
 *
 */

//Sample stub data for lunch events
var eventsData = [{
        start: 225,
        end: 285
    },
    {
        start: 210,
        end: 270
    },
    {
        start: 180,
        end: 240
    },
    {
        start: 240,
        end: 300
    },
    {
        start: 300,
        end: 360
    },
    {
        start: 270,
        end: 330
    },
    {
        start: 270,
        end: 330
    },
    {
        start: 360,
        end: 420
    }
];

/**
 * Method  to accept stub data and perform below functions
 * - Create rows based on overlap criteria
 * -Internally calls method to create div structure to render events on UI
 *
 */
function matchLunchEvent(eventsData) {
    var rows = []; //used to store processed event object
    $('#eventDisplayArea').empty(); //empty constents
    eventsData = assignColorIndication(eventsData); //Method to calculates overlap values
    initiateEventsFormatting(eventsData, rows); //Method to create  rows based on overlap criteria
    renderUI(rows); //Method to display segregates rows containing event objects
}

/**
 * Method  to create rows out of events data
 */
function initiateEventsFormatting(events, rows) {
    while (true) {
        var result = createRow(events);
        rows.push(result.row);
        if (result.noOverlapEvents.length) {
            events = result.noOverlapEvents;
        } else {
            break; //Exit loop once noOverlapEvents array is empty and no more events are available to be compared
        }
    }
}

/**
 * Method  to create row of events
 */
function createRow(events) {
    //Create first row and first column with Nikki's object array
    //row stores the complete formatted events array object
    var row = {
        columns: [{
            events: [events.shift()]
        }]
    };

    return {
        noOverlapEvents: processEvent(events), //Pass events array which excludes Nikki's object
        row: row
    }

    /**
     * Method  to check if an evnt is processed ie.placed in a column and track no overlapping events
     */
    function processEvent(remainingEvents) {
        var temp = []; //stores the list of items which doesnt overlap with already formed column items
        while (true) {
            //Loop current event items
            for (var i in remainingEvents) {
                var isProcessed = processRow(remainingEvents[i], row); //returns boolean if all event objects are placed in column array
                //track event item which does not overlap with exisisting row column arrays
                if (!isProcessed) {
                    temp.push(remainingEvents[i]);
                }
            };
            /* RemainingEvents will now hold temp(non overlapping arrays) and the loop inspect
            continued till temp becomes empty */
            if (remainingEvents.length !== temp.length) {
                remainingEvents = temp.slice(0);
                temp = [];
            } else {
                break; //If no element exists in remainingEvents array
            }
        }
        return temp;
    }
}

/**
 * Method  to check if overlap exists and placed in appropriate column stack
 */
function processRow(event, row) {
    var isProcessed = false;
    var hasPrevOverlap = false;
    //Loop through row column events to check for overlap with current event
    for (var i in row.columns) {
        /*Check if it overlaps with exisitng column
        Yes - > Continue to check with next columns*/
        if (hasOverlap(event, row.columns[i].events)) {
            hasPrevOverlap = true;
            continue;
        }
        /*If event overlaps with previous column array then put it into current column array and continue
        with next item */
        if (hasPrevOverlap) {
            row.columns[i].events.push(event);
            isProcessed = true;
            break;
        }
    }

    //If it overlaps with exisitng row and not places anywhere then put it into a new column array
    if (hasPrevOverlap && !isProcessed) {
        row.columns.push({
            events: [event]
        });
        isProcessed = true;
    }
    return isProcessed;
}

/**
 * Method  to check if the currentEvent has overlap with events in previous column stack
 */
function hasOverlap(event, eventsToCheck) {
    for (var i = 0; i < eventsToCheck.length; i++) {
        if ((event.start > eventsToCheck[i].start && event.start < eventsToCheck[i].end) ||
            (event.end > eventsToCheck[i].start && event.end < eventsToCheck[i].end) ||
            (event.start === eventsToCheck[i].start && event.end === eventsToCheck[i].end)) {
            return true;
        }
    }
    return false;
}

/**
 * Method  to create skeleton div structure for the  formatted events data and append it to DOM
 */
function renderUI(rows) {
    for (var i = 0; i < rows.length; i++) {
        var columnWidth = 600 / rows[i].columns.length;
        var rowDiv = "",
            columnDiv = "",
            columnGroup = "",
            eventItem = "";
        for (var j = rows[i].columns.length - 1; j >= 0; j--) {
            var columns = rows[i].columns[j].events;
            eventItem = "";
            for (var k = 0; k < columns.length; k++) {
                eventItem = eventItem + '<div class="event-item" style="width:' + columnWidth + 'px;top:' + columns[k].start + 'px;"><div style="background-color:' + columns[k].color + '"></div><div>' + columns[k].label + '</div></div>';
            }
            columnGroup = columnGroup + '<div class="column" style="width:' + columnWidth + 'px;">' + eventItem + '</div>';
        }
        rowDiv = rowDiv + '<div class="row">' + columnGroup + '</div>';
        $('#eventDisplayArea').append(rowDiv);
    }
}

/**
 * Method  to identify overlap match and assign color codes based on usecase of events
 */
function assignColorIndication(data) {
    var finalArray = []; //stores formatted events data
    var overLappingArray = []; //stores set of overlapping arrays
    var oReferenceObject = data[0]; //Assuming Niki's data will be firts element
    data[0]["label"] = "Me"; //Assign lunch event as "Me" assuming first entry will be for Nikki
    data[0]["top"] = data[0].start;
    data[0]["color"] = "green";
    data[0]["position"] = 1;
    data[0]["id"] = 0;
    finalArray.push(data[0]);
    //Loop through every item in eventsdata to calculate overlap value and assign respective color codes
    for (var i = 1; i < data.length; i++) {
        data[i]["id"] = i;
        /*
         * Usecase-1
         * Event Planned earlier than Nikki and overlaps with Nikki's time slot
         **/
        if (data[i].start < oReferenceObject.start) {
            if (data[i].end - oReferenceObject.start > 30) {
                data[i]["color"] = "green";
            } else {
                data[i]["color"] = "#4f85f0";
            }
            data[i]["overlap"] = data[i].end - oReferenceObject.start;
            data[i]["label"] = "Brilliant Lunch";
            finalArray.push(data[i]);
        }
        /*
         * Usecase-2
         * Event planned later than Nikki and overlaps with Nikki's time slot
         **/
        if (data[i].start > oReferenceObject.start) {
            if (oReferenceObject.end - data[i].start > 30) {
                data[i]["color"] = "green";
            } else {
                data[i]["color"] = "#4f85f0";
            }
            data[i]["overlap"] = oReferenceObject.end - data[i].start;
            data[i]["label"] = "Brilliant Lunch";
            finalArray.push(data[i]);
        }
        /*
         * Usecase-3
         * Event never matches with Nikki's timeslot
         **/
        if ((data[i].start > oReferenceObject.end) || (data[i].end < oReferenceObject.start)) {
            data[i]["color"] = "#4f85f0";
            data[i]["overlap"] = 0;
        }
    }

    var bIfAnyOverLapExists = false; //declaring bIfAnyOverLapExists to false
    var overlappingSameSlotEvents = []; //stores set of overlapping elements
    //Looping finalArray to find if overlapping exists
    for (var i = 1; i < finalArray.length; i++) {
        if (finalArray[i].overlap > 30) {
            bIfAnyOverLapExists = true; //set to true if overlap value is greater than 30
            overLappingArray.push(finalArray[i]);
        }
    }

    //Sorting overlap array to derive the item with highest overlap value
    overLappingArray.sort(function(a, b) {
        return b.overlap - a.overlap;
    });

    /* If there exists one or set of overlapping array then picking the first element whihc has higher
    overlap value */
    if (overLappingArray.length > 0) {
        var matchedEvent = overLappingArray[0];
        for (var i = 1; i < finalArray.length; i++) {
            //If ID of first element with highest overlap value matches with any of element in finalArray
            if (matchedEvent["id"] == finalArray[i].id) {
                finalArray[i].color = "green";
            } else {
                finalArray[i].color = "#4f85f0";
            }
        }
    }

    //If no event overlaps with nikki's event then conclude the color of display
    !bIfAnyOverLapExists ? finalArray[0].color = "black" : '';
    return finalArray;
}

//On Document ready event
$(document).ready(function() {
    matchLunchEvent(eventsData);
});