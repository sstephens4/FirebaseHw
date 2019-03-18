var config = {
    apiKey: "AIzaSyAMusjct9lbcUc8BvkBoS4FPGj4W746KNQ",
    authDomain: "fir-hw-1df05.firebaseapp.com",
    databaseURL: "https://fir-hw-1df05.firebaseio.com",
    projectId: "fir-hw-1df05",
    storageBucket: "fir-hw-1df05.appspot.com",
    messagingSenderId: "152796691853"
  };

  firebase.initializeApp(config);

  
  var database = firebase.database();
  
  // 2. Button for adding Employees
  $("#addTrain").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#nameInput").val().trim();
    var destination = $("#destInput").val().trim();
    var tarrival = moment($("#arrivInput").val().trim(), "MM/DD/YYYY").format("X");
    var frequency = $("#freqInput").val().trim();
  
    // Creates local "temporary" object for holding employee data
    var newTrain = {
      name: trainName,
      destination: destination,
      tarrival: tarrival,
      frequency: frequency
    };
  
    // Uploads employee data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.tarrival);
    console.log(newTrain.frequency);
  
    alert("CHOO-CHOO! New train successfully added");
  
    // Clears all of the text-boxes
    $("#nameInput").val("");
    $("#destInput").val("");
    $("#arrivInput").val("");
    $("#freqInput").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var dest = childSnapshot.val().role;
    var trainArriv = childSnapshot.val().start;
    var freq = childSnapshot.val().rate;
  
    // Employee Info
    console.log(trainName);
    console.log(dest);
    console.log(trainArriv);
    console.log(freq);
  
    // Prettify the employee start
    var tArriv = moment.unix(empStart).format("00:00");
  
    // Calculate the months worked using hardcore math
    // To calculate the months worked
    var trainMin = moment().diff(moment(tArriv, "X"), "minutes");
    console.log(trainMin);
  

  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(dest),
      $("<td>").text(tArriv),
      $("<td>").text(trainMin)
    );
  
    // Append the new row to the table
    $("#trainTable > tbody").append(newRow);
  });
