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

db.requests.insert({
  _id: 0,
  lo: 56,
  la: 40,
  sport: 'tennis'
});

db.conversations.insert({
  _id: 0,
  users: [0,1],
  messages: [ {
    user: 0,
    text: 'hey you',
    img: 'aws/5.jpg'
  }]
});

// could just be a global javascript object
db.sports.insert({
  _id: 'tennis',
  icon: '&amp;'
});
