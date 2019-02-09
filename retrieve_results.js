var AWS = require('aws-sdk');

var region_name = 'us-east-1';
var endpoint = 'https://mturk-requester-sandbox.us-east-1.amazonaws.com';

// Uncomment this line to use in production
//var endpoint = 'https://mturk-requester.us-east-1.amazonaws.com';

AWS.config.update({ region: 'us-east-1', 
            endpoint: endpoint });
                    
var mturk = new AWS.MTurk();

var sandbox = true;


var myHITId = '3YGYP13643MI6XYNV2H9SLS6Z6NRNL'; 


mturk.listAssignmentsForHIT({HITId: myHITId}, function (err, assignmentsForHIT) {
    if (err) {
        console.log(err.message);
    } else {
        console.log('Completed Assignments found: ' + assignmentsForHIT.NumResults);
        for (var i = 0; i < assignmentsForHIT.NumResults; i++) {
            console.log('Answer from Worker with ID - ' + assignmentsForHIT.Assignments[i].WorkerId + ': ', assignmentsForHIT.Assignments[i].Answer);
            console.log(assignmentsForHIT); 
            // Approve the work so the Worker is paid with and optional feedback message  
            /* If you are running this script more than once with the same HITId, then after the first time running
            you will get an error in terminal saying This operation can be called with a status of: Submitted, because
            this part of the listAssignmentsForHIT function is for approving the assignment and paying the worker. 
             */   
                 
            mturk.approveAssignment({
                AssignmentId: assignmentsForHIT.Assignments[i].AssignmentId,
                RequesterFeedback: 'Thanks for the great work!',
            }, function (err) {
                if (err) {
                    console.log(err, err.stack);
                }
            }); 
        }
    }
});



