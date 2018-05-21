const router = require('express').Router();
const models = require('../models');


router.get('/siswa', (req, res) => {
    let page = req.query.page || 1;
    let offset = 0;
    if (page > 1) {
       offset = ((page - 1) * 10)  + 1;
    }
    //ini mengarah ke foldel models dan file user.js
    models.Users.findAndCountAll({
      limit : 10,
      offset: offset,
      order : [['id','DESC']],
    }).then((users) => {
       const alertMessage = req.flash('alertMessage');
       const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus};
      const totalPage = Math.ceil(users.count / 10);
      const pagination = {totalPage : totalPage, currentPage: page};
      res.render('siswa/index',{
        siswa: users.rows,
        alert: alert,
        pagination: pagination
        });
    });
});

router.get('/siswa/create', (req, res) => {  
  const alertMessage = req.flash('alertMessage');
  const alertStatus = req.flash('alertStatus');
  const alert = { message: alertMessage, status: alertStatus};

  let data = {
    name: req.flash('nama'),
    gender: req.flash('gender'),
    no_telp: req.flash('no_telp'),
    alamat: req.flash('alamat')
  };
  res.render('/siswa/create',{
    alert: alert,
    data: data
  });
});