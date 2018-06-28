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




function showStorePage(data) {
  console.log('showstorepage')
  showStoreData(mockStoreData);
  $('#go').hide();
  $('main').show();
  $('header').show();
  $('#saveAvail').replaceWith(
    `<button type="submit" class="btn btn-outline-white btn-lg" id="addEmp" data-toggle="modal" data-target="#modalAddUser">Add Employee
      <i class="fa fa-user-plus ml-2"></i>
    </button>`
  );
  addUser();
}

function addUser() {
  $('#addEmp').click((e) => {
    e.preventDefault();
    displayUser();
  });
}

function displayUser() {

}


function showStoreData(data) {
  const html = data.map( user => {
  return(
    `<div class="col-lg-3 col-md-12 mb-4">
      <div class="card">
        <div class="card-header">
          <h4 class="btn btn-in w-100 text-muted" data-toggle="collapse" data-target="#${user.name.replace(/\s+/g, '')}Info" aria-expanded="false" aria-controls="${user.name.replace(/\s+/g, '')}Info">
            <strong>${user.name}</strong>
          </h4>
        </div>
        <div class="collapse" id="${user.name.replace(/\s+/g, '')}Info">
        <div class="card-body text-muted">
          <section><h6>Sunday</h6> <p>Start: ${user.availability[0].start} to ${user.availability[0].end}</p></section><hr>
          <section><h6>Monday</h6> <p>Start: ${user.availability[1].start} to ${user.availability[1].end}</p></section><hr>
          <section><h6>Tuesday</h6> <p>Start: ${user.availability[2].start} to ${user.availability[2].end}</p></section><hr>
          <section><h6>Wednesday</h6> <p>Start: ${user.availability[3].start} to ${user.availability[3].end}</p></section><hr>
          <section><h6>Thursday</h6> <p>Start: ${user.availability[4].start} to ${user.availability[4].end}</p></section><hr>
          <section><h6>Friday</h6> <p>Start: ${user.availability[5].start} to ${user.availability[5].end}</p></section><hr>
          <section><h6>Saturday</h6> <p>Start: ${user.availability[6].start} to ${user.availability[6].end}</p></section><hr>
          </select>
        </div>
        </div>
      </div>
    </div>`);
  })
  $('#avail').html(html)
}
