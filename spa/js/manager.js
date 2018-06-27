const mockStoreData = [
  {
  email : 'josh@yahoo.com',
  name : "Joshua Zuo",
  role: ['employee'],
  availability: [
    {start: '6:00 AM', end: '10:00 PM'},
    {start: '6:00 AM', end: '10:00 PM'},
    {start: '6:00 AM', end: '10:00 PM'},
    {start: '6:00 AM', end: '10:00 PM'},
    {start: '6:00 AM', end: '10:00 PM'},
    {start: '6:00 AM', end: '10:00 PM'},
    {start: '6:00 AM', end: '10:00 PM'}
  ]},
    {
    email : 'jim@yahoo.com',
    name : "Jim Bob",
    role: ['employee'],
    availability: [
      {start: '6:00 AM', end: '10:00 PM'},
      {start: '6:00 AM', end: '10:00 PM'},
      {start: '6:00 AM', end: '10:00 PM'},
      {start: '6:00 AM', end: '10:00 PM'},
      {start: '6:00 AM', end: '10:00 PM'},
      {start: '6:00 AM', end: '10:00 PM'},
      {start: '6:00 AM', end: '10:00 PM'}
    ]}
]




function showStorePage() {
  showStoreData();
  $('main').show();
  $('header').show();
}


showStoreData() {

}
