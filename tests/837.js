'use strict';

if (typeof QATesting !== 'undefined') {

	QATesting.addTest(function () {

		var params = QATesting.getQueryParameters();
		if (params && typeof params.testFiles !== 'undefined' && params.testFiles.length > 0) {
			QATesting.log('[#837] Opening a page with parameters in the page url: PASSED.', QATesting.SUCCESS);
		} else {
			QATesting.log('[#837] Opening a page with parameters in the page url: FAILED.', QATesting.ERROR);
		}

		QATesting.runNext();
	});

	QATesting.loadNext();
}