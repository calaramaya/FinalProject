//click handlers and ajax
$(function () {

    //click handler for new vehicle
    $("addVehicle").on("submit", function (event) {
        //so that it doesn't preventdefault on a submit
        event.preventDefault();

        //declaration for user input
        let newVehicle = {
            vehicle: $("#vehicle").val().trim().toLowerCase()
        };
        //dont want the user having a blank input
        if (newVehicle.vehicle !== "") {

       //send POST and new vehicle name     
        $.ajax("/api/vehicles", {
            type: "POST",
            data: newVehicle
        }).then(
            function () {
                console.log("new vehicle has been added");
                //reload just to get list that's updated
                location.reload();
            }
        );
        //reset it
        $("#vehicle").val("");
    }
});
});