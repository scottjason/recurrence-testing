### stanza-recurring-events

The recurring activity objects passed up via asyncEachLimit look like this:

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
