var AWS = require('aws-sdk');

var region_name = 'us-east-1';
var endpoint = 'https://mturk-requester-sandbox.us-east-1.amazonaws.com';

// Uncomment this line to use in production
//var endpoint = 'https://mturk-requester.us-east-1.amazonaws.com';

AWS.config.update({ region: 'us-east-1', 
		    endpoint: endpoint });
					
var mturk = new AWS.MTurk();

// This will return $10,000.00 in the MTurk Developer Sandbox
// Docs here: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/MTurk.html#getAccountBalance-property
mturk.getAccountBalance({}, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});

var sandbox = true; 

var params = { 
	AssignmentDurationInSeconds: 60*30, 
	Description: 'Choose a label for different images',
	LifetimeInSeconds: 60*60, 
	Reward: '0.50',
	Title: 'Label Images', 
	Keywords: 'question, answer, research', 
	MaxAssignments: 10, 
	Question: 
		`<ExternalQuestion xmlns="http://mechanicalturk.amazonaws.com/AWSMechanicalTurkDataSchemas/2006-07-14/ExternalQuestion.xsd">
  		<ExternalURL>https://s3.us-east-2.amazonaws.com/veariver-imagelabel/noncrowdform_sentiment.html</ExternalURL>
  	<FrameHeight>400</FrameHeight>
	</ExternalQuestion>`
}; 

mturk.createHIT(params, function(err, data) {
	if (err) console.log(err, err.stack); 
	else {
		console.log(data); 
		hitURL = `https://${sandbox ? "workersandbox" : "worker"}.mturk.com/projects/${data.HIT.HITGroupId}/tasks`
     	console.log("\nA task was created at:",hitURL)
	}	 
}); 
