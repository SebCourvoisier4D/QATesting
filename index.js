'use strict';

var actions = {};

/*
 * qatesting_run
 *
 */
actions.qatesting_run = function qatesting_run(message) {
	if (message.event !== 'onStudioStart') {
		var i,
			len,
			testFiles = [],
			testsFolder = new studio.Folder(studio.extension.getFolder().path + 'tests');
		if (testsFolder && testsFolder.files) {
			for (i = 0, len = testsFolder.files.length; i < len; i = i + 1) {
				if (/\.js$/i.test(testsFolder.files[i].name) === true) {
					testFiles.push(testsFolder.files[i].getURL(true));
				}
			}
		}
		studio.extension.storage.setItem('QATestingEnv', JSON.stringify(process.env));
		studio.extension.storage.setItem('QATestingPID', JSON.stringify(process.pid));
		studio.extension.storage.setItem('QATestingVersion', JSON.stringify(process.version));
		studio.extension.storage.setItem('QATestingBuildNumber', JSON.stringify(process.buildNumber));
		studio.extension.openPageInTab(
		    'webzone.html',
		    'QA Testing',
		    false,
		    false,
		    true,
		    '',
		    testFiles.map(function (item) {
				return 'testFiles[]=' + item;
			}).join('&')
		);
	}
	return true;
};

/*
 * qatesting_start
 *
 */
actions.qatesting_start = function qatesting_start(message) {
	if (message.event === 'onStudioStart') {
		studio.extension.storage.setItem('QATesting', JSON.stringify(message));
	}
	return true;
};

/*
 * qatesting_any
 *
 */
actions.qatesting_any = function qatesting_any(message) {
	studio.extension.storage.setItem('QATesting', JSON.stringify(message));
	return true;
};

/*
 * handleMessage
 *
 */
exports.handleMessage = function handleMessage(message) {
	var actionName = message.action;
	if (!actions.hasOwnProperty(actionName)) {
		return actions['qatesting_any'](message);
	}
	return actions[actionName](message);
};