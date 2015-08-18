## All Purpose QA Testing Extension

This Extension aims to provide an all purpose fondation for _quickly_ testing incoming features in the Studio (it's not related to the automated process, but rather to the manual validation tasks).

### Usage

I used to tweak and trick the [UnitTest](https://github.com/SebCourvoisier4D/UnitTest.git) extension in order to quickly validate bugs and new features in the extension API of the Studio, but it became quite laborious.

So here's the simplest thing I could come up with using this separate "QA Testing" extension:

1. Create a new JS file in the "tests" folder of this extension ;
2. This JS file should respect the following structure:


        if (typeof QATesting !== 'undefined') { // ADVISED

            // REGISTER YOUR TEST AS A FUNCTION:
    	    QATesting.addTest(function () { 

    		    // Do whatever you want here...
                if (yourStuffIsOK) {
                    QATesting.log('My test: PASSED.', QATesting.SUCCESS);
                } else {
                    QATesting.log('My test: FAILED.', QATesting.ERROR);
                }

    		    QATesting.runNext(); // REQUIRED
    	    });

    	    QATesting.loadNext(); // REQUIRED
        }

And that's it: the new JS file will be automatically run when the "Run tests" action of the extension will be called.

No test framework (no Mocha, no Chai, etc.): just do whatever you want and display relevant logs in the end. Period.

### Event handling

A test can also be registred to be run only when a given Studio event has been triggered:



        if (typeof QATesting !== 'undefined') { // ADVISED

            // REGISTER YOUR TEST AS A FUNCTION:
    	    QATesting.addTest(function (message) { // **HERE WE GET A message ARGUMENT!**

    		    // Do whatever you want here...
                if (yourStuffIsOK) {
                    QATesting.log('My test: PASSED.', QATesting.SUCCESS);
                } else {
                    QATesting.log('My test: FAILED.', QATesting.ERROR);
                }

    		    QATesting.runNext(message); // REQUIRED **PASS THE GIVEN message TO THE NEXT TEST!**
    	    }, 'onSolutionOpened'); // REQUIRED **SET THE EVENT NAME, OR 'any' FOR ALL EVENTS!**

    	    QATesting.loadNext(); // REQUIRED
        }


### Version

0.0.2

### Changelog

 * [18/08/2015]: 0.0.2 - Add event handling + a test triggered by every event.
 * [17/08/2015]: 0.0.1 - Testing card [#847](https://trello.com/c/B9rpMWQP) __Opening a page with parameters in the page url__.

