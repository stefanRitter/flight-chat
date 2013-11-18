var db = {},
    x = 'longitude',
    y = 'latitude';


db.users.insert({
  _id: 0,
  name: 'Stefan',
  email: 'stefan@stefanritter.com',
  images: ['aws//img1.jpg'],
  sports: ['tennis'],
  location: [x, y],
  buddies: [ 1, 2, 3]
});
db.users.enforceIndex({sports:1});
db.users.enforceIndex({location:'2d'});


db.requests.insert({
  _id: 0,
  location: [x,y],
  sport: 'tennis'
});
db.requests.enforceIndex({sports:1});
db.requests.enforceIndex({location:'2d'});



db.conversations.insert({
  _id: 0,
  users: [0,1],
  messages: [ {
    user: 0,
    text: 'hey you',
    img: 'aws/5.jpg'
  }]
});
db.conversations.enforceIndex({users:1});


// could just be a global javascript object
db.sports.insert({
  _id: 'tennis',
  icon: '&amp;'
});
