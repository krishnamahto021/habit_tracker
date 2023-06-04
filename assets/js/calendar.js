$(document).ready(function () {
  $('#calendar').fullCalendar({
    defaultView: 'month',
    events: [],
    eventColor: '#378006',
  });
});

// Function to update calendar
function updateCalendar() {
  // Make an AJAX request to the server
  $.ajax({
    url: '/users/update-calendar',
    method: 'GET',
    success: function(data) {
      const isStreak = data.data.isStreak;
      console.log(isStreak);
      if (isStreak) {
        // Apply styling for streak to the current day
        const today = new Date().toISOString().split('T')[0];
        const calendarElement = $(`td[data-date="${today}"]`);
        if (calendarElement.length > 0) {
          calendarElement.css('background-color', '#378006');
        }
      }
    },
    error: function(xhr, status, error) {
      console.error('Failed to check overall streak:', error);
    }
  });
}

// Call the function to check overall streak
updateCalendar();


