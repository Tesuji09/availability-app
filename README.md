# Availability app

## Concepts

**Shift**

```
shifts
{
  title: 'Breatfast',
  timeFrame: [9, 2]
}
```

A shift is daily schedule for a given time frame. Ex.: breakfast at 9 to 11,
lunch 11 to 2, closing 5 to 9.

**User**

```
users
{
  email: String,
  passwordDigest: String,
  defaultAvailability: {
    mondays: ['breakfast', 'closing'],
    tuesdays: ['breakfast']
  }
}
```

```
timeOffs
{
  user: Ref,
  isAllDay: Boolean,
  shifts: Array // [ 'breatfast', 'lunch' ]
  startsAt: Date,
  endsAt: Date,
  status: String // 'pending', 'accepted', 'cancelled'
  acceptedBy: Ref
}
```

TBD.

- An user can be either a manager and a employee (user roles!)
- Employee
  - must have a default availability
  - must be able to request time off
  - must be able to cover other employees shifts requested off


**Availability**

An availability is the fact that a worker can work during a given shift at a
given week.

- A worker would have a default availability (ex: John is generally able to work
  on breakfast shifts)
- An availability is an association of a given worker, a shift and a specific
  day
