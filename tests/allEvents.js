'use strict';

if (typeof QATesting !== 'undefined') {

	QATesting.addTest(function (message) {

		QATesting.log('[allEvents] Received the event "' + message.event + '":', QATesting.SUCCESS);
		QATesting.log(JSON.stringify(message, null, 4), QATesting.DEBUG);

		QATesting.runNext(message);
	}, 'any');

	QATesting.loadNext();
}