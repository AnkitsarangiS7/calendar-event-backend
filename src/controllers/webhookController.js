const Event = require('../models/Event');
const { calendar } = require('../utils/googleCalendar');

exports.handleWebhook = async (req, res) => {
  try {
    const eventNotification = req.body.message.data;

    // Process the event notification and update the local database
    const eventId = eventNotification.id;
    const eventData = await calendar.events.get({
      calendarId: 'primary',
      eventId: eventId,
    });

    await Event.findOneAndUpdate(
      { eventId: eventId },
      {
        summary: eventData.data.summary,
        startDateTime: eventData.data.start.dateTime,
        // Update other event properties as needed
      }
    );

    res.status(200).send('Webhook received and processed');
  } catch (error) {
    console.error('Error handling webhook:', error);
    res.status(500).send('An error occurred');
  }
};
