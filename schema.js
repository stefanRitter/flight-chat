
db.users.insert({
  _id: 0,
  name: 'Stefan',
  email: 'stefan@stefanritter.com',
  images: ['aws//img1.jpg'],
  sports: ['tennis'],
  lo: 5.4,
  la: 85.9,
  buddies: [ 1, 2, 3]
});

db.sports.insert({
  _id: 'tennis',
  users: [ 0, 1, 2, 3, 4]
});

db.requests.insert({
  _id: 0,
  lo: 56,
  la: 40,
  sport: 'tennis'
});