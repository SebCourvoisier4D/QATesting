window.QATesting = {
	ERROR: 'error',
	SUCCESS: 'success',
	INFO: 'info',
	WARNING: 'warning',
	DEBUG: 'debug',
	testFunctions: [],
	testFunctionsWithEvent: [],
	testFunctionsWithEventIndex: 0,
	events: [],

	getEnv: function (name) {
		var env = null;
		try {
			env = JSON.parse(studio.extension.storage.getItem('QATestingEnv'));
		} catch (ignore) {}
		if (env && typeof name === 'string' && typeof env[name] !== 'undefined') {
			env = env[name];
		}
		return env;
	},

	getPID: function () {
		var pid = null;
		try {
			pid = JSON.parse(studio.extension.storage.getItem('QATestingPID'));
		} catch (ignore) {}
		return pid;
	},

	getVersion: function () {
		var version = null;
		try {
			version = JSON.parse(studio.extension.storage.getItem('QATestingVersion'));
		} catch (ignore) {}
		return version;
	},

	getBuildNumber: function () {
		var buildNumber = null;
		try {
			buildNumber = JSON.parse(studio.extension.storage.getItem('QATestingBuildNumber'));
		} catch (ignore) {}
		return buildNumber;
	},
	
	log: function (message, type) {
		var formatted = '';
		if (typeof type !== 'string') {
			type = 'info';
		}
		if (typeof message !== 'string') {
			message = message.toString();
		}
		switch (type.toLowerCase()) {
			case 'error':
				formatted = '<pre style="color: red">' + message + '</pre>';
				break;
			case 'success':
				formatted = '<pre style="color: green">' + message + '</pre>';
				break;
			case 'warning':
				formatted = '<pre style="color: orange">' + message + '</pre>';
				break;
			case 'debug':
				formatted = '<pre style="color: blue; font-size: 11px;">' + message + '</pre>';
				break;
			default: 
				formatted = '<pre>' + message + '</pre>';
		}
		$('#qa-testing-log').append(formatted);
	},

	loadNext: function () {
		if (QATesting.testFiles.length > 0) {
			QATesting.load(QATesting.testFiles.shift());
		} else {
			QATesting.runNext();
		}
	},

	load: function (path) {
		var testScript = document.createElement('script'),
			now = new Date(),
			name = /\/?\\?([^\\\/]+\.js)$/i.exec(path)[1];
		testScript.type = 'application/javascript';
		testScript.src = path;
		document.getElementsByTagName('head')[0].appendChild(testScript);
		QATesting.log('Load test "' + name + '"...', QATesting.INFO);
	},

	addTest: function (test, event) {
		if (typeof event !== 'string' || !event) {
			QATesting.testFunctions.push(test);
		} else {
			QATesting.testFunctionsWithEvent.push({test: test, event: event.toLowerCase()});
		}		
	},

	runNext: function (message) {
		if (typeof message !== 'undefined') {
			if (QATesting.testFunctionsWithEventIndex < QATesting.testFunctionsWithEvent.length) {
				QATesting.testFunctionsWithEventIndex = QATesting.testFunctionsWithEventIndex + 1;
				if (QATesting.testFunctionsWithEvent[QATesting.testFunctionsWithEventIndex - 1].event === message.event.toLowerCase() || QATesting.testFunctionsWithEvent[QATesting.testFunctionsWithEventIndex - 1].event === 'any') {
					(QATesting.testFunctionsWithEvent[QATesting.testFunctionsWithEventIndex - 1].test)(message);
				}
			} else {
				QATesting.log('Tests related to the event "' + message.event + '" done.', QATesting.INFO);
				QATesting.testFunctionsWithEventIndex = 0;
			}
		} else {
			if (QATesting.testFunctions.length > 0) {
				(QATesting.testFunctions.shift())();
			} else {
				QATesting.log('Eventless tests done.', QATesting.INFO);
			}
		}
	},

	getQueryParameters: function () {
		var url = window.location.href,
		params = {};
	    url.split('?')[1].split('&').forEach(function(element) {
	        var arr = element.split('='),
	        	key = arr[0];
	        if (/\[\]$/.test(key) === true) {
	        	key = key.replace(/\[\]$/, '');
	        	if (typeof params[key] === 'undefined') {
	        		params[key] = [];
	        	}
	        	params[key].push(decodeURIComponent(arr[1]));
	        } else {
	        	params[key] = decodeURIComponent(arr[1]);
	        }
	    });
	    return params;
	}
};

$(document).ready(function () {
	var params = QATesting.getQueryParameters();
    if (params && typeof params.testFiles !== 'undefined' && params.testFiles.length) {
    	QATesting.testFiles = params.testFiles;
    	QATesting.loadNext();
    } else {
    	QATesting.log('No test to run', QATesting.WARNING);
    }
    setInterval(function() {
    	var message;
    	if (studio.extension.storage.getItem('QATesting')) {
    		try {
	    		message = JSON.parse(studio.extension.storage.getItem('QATesting'));
	    		studio.extension.storage.removeItem('QATesting');
	    		QATesting.runNext(message);
	    	} catch (e) {
	    		studio.extension.storage.removeItem('QATesting');
	    	}
    	}
	}, 250);
});