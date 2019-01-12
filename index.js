const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.LatestTen = functions.database.ref('/id/{pushID}/{item}')
    .onCreate((snapshot, context) => {
      // Grab the current value of what was written to the Realtime Database.
	 if(snapshot.numChildren()>10)
	  {
		  
		  let childCount=0;
		  const updates={};
		  snapshot.forEach((child)=>{
			  if(++childCount<=snapshot.numChildren()-10){
				  updates[child.key]=null;
		  }
	  });
	  return snapshot.ref.parent.set(updates);
	  }
	  else{
		   return snapshot.ref.parent.set(snapshot);
	  }
    });
	
	