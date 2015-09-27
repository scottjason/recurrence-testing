### stanza-recurring-events

#### Relevant Files

Client:

https://github.com/scottjason/recurrence-testing/blob/master/client/scripts/controllers/landing.js

Server:

https://github.com/scottjason/recurrence-testing/blob/master/server/controllers/index.js

Their is an array of recurring activity objects on the client. They have the correct start and end dates. They share a common recurringId for when we want to associate a group of recurring activites.

The client sends up each object (however many at a time defined by asyncEachLimit) to be saved as a new activity. 

The first occurence (the first activity) will have both of these props set to true:

```javascript	
	activity.isReucurring
	activity.isFirstOccurence
```

After save, if it is the first occurrence (the first object in the array of objects being passed up by the client), it calls the exports.onFirstOccurence method. This is where I'm thinking you'd do your logic with the props
you need. They are availble in that function body under the req.savedActivity.recurrence object.

If it's not the first occurence, the recurring activity is saved and passed back to the client with the required mongo id.

When the frequency is "Weekly", the recurring activity objects passed up via asyncEachLimit look like this:

```javascript
  activity: {
    category: 'e48e4220-68a1-0d5f-d59b-2e47874650cf',
    isRecurring: true,
    isFirstOccurence: true,
    recurringId: 'f3827392-d7ba-adb7-e9fb-5ba478d7cf98',
    name: 'ng-Pandas vs bk-Buffalos',
    description: 'See The ng-Pandas Like You\'ve Never Seen Them Before!',
    dates: {
      start: '2015-09-02T07:00:00.000Z',
      end: '2015-09-02T07:30:00.000Z'
    },
    recurrence: {
      frequency: 'WEEKLY',
      interval: 1,
      byDay: 'MO,WE,FR',
      expires: '2015-10-01T07:00:00.000Z'
    }
  }
}
```

