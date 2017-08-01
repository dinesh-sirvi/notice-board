var env = process.env.NODE_ENV || 'development';

if(env === 'development'){
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://dddd:dc7771@ds123933.mlab.com:23933/noticeboard';
}

if(env === 'test'){
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/noticeBoardTestDb';
}

if(env === 'production'){
  process.env.PORT = 6515;
  process.env.MONGODB_URI = 'mongodb://dddd:dc7771@ds123933.mlab.com:23933/noticeboard'
}
