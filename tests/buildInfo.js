'use strict';

if (typeof QATesting !== 'undefined') {

	QATesting.addTest(function () {

		QATesting.log('[buildInfo] Build Number (from studio): ' + studio.buildNumber);
		QATesting.log('[buildInfo] Build Number (from process): ' + QATesting.getBuildNumber());
		if (studio.buildNumber === QATesting.getBuildNumber()) {
			QATesting.log('[buildInfo] Build Number: PASSED.', QATesting.SUCCESS);
		} else {
			QATesting.log('[buildInfo] Build Number: FAILED.', QATesting.ERROR);
		}
		QATesting.log('[buildInfo] Full Version (from studio): ' + studio.version);
		QATesting.log('[buildInfo] Full Version (from process): ' + QATesting.getVersion());
		if (studio.version === QATesting.getVersion()) {
			QATesting.log('[buildInfo] Full Version: PASSED.', QATesting.SUCCESS);
		} else {
			QATesting.log('[buildInfo] Full Version: FAILED.', QATesting.ERROR);
		}
		QATesting.log('[buildInfo] Main Product Version: ' + studio.mainProductVersion);
		if (studio.version.indexOf(studio.mainProductVersion) !== -1 && QATesting.getVersion().indexOf(studio.mainProductVersion) !== -1) {
			QATesting.log('[buildInfo] Main Product Version: PASSED.', QATesting.SUCCESS);
		} else {
			QATesting.log('[buildInfo] Main Product Version: FAILED.', QATesting.ERROR);
		}
		QATesting.log('[buildInfo] Is Enterprise: ' + studio.isEnterprise);		 
		QATesting.log('[buildInfo] PID: ' + QATesting.getPID());		 
		QATesting.log('[buildInfo] Environment Variables:');
		QATesting.log(JSON.stringify(QATesting.getEnv(), null, 4), QATesting.DEBUG);
		
		QATesting.runNext();
	});

	QATesting.loadNext();
}