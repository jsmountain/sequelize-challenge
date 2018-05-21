const router = require('express').Router();
const models = require('../models');
const Op = require('sequelize').Op

router.get('/', (req, res) => {
  res.render('main/index');
});

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

//tambah data siswa
router.get('/siswa/create', (req, res) => {  
  const alertMessage = req.flash('alertMessage');
  const alertStatus = req.flash('alertStatus');
  const alert = { message: alertMessage, status: alertStatus};

  let data = {
    nama: req.flash('nama'),
    gender: req.flash('gender'),
    no_telp: req.flash('no_telp'),
    alamat: req.flash('alamat')
  };
  res.render('siswa/create',{
    alert: alert,
    data: data
  });
});

router.post('/siswa/create', (req, res) => {
  models.Users.build(req.body).save().then(() => {
    req.flash('alertMessage','Sukses Menambahkan Data Siswa');
    req.flash('alertStatus', 'success');
    res.redirect('/siswa');
  }).catch((err) => {
    req.flash('alertMessage', err.message);
    req.flash('alertStatus', 'danger');
    req.flash('name',req.body.nama);
    req.flash('name',req.body.gender);
    req.flash('name',req.body.no_telp);
    req.flash('name',req.body.alamat);
    res.redirect('/siswa/tambah');

  });
});
//akhir tambah data siswa

//awal edit data siswa
router.get('/siswa/:id/edit', (req, res) => {
  const alertMessage = req.flash('alertMessage');
  const alertStatus = req.flash('alertStatus');
  const alert = { message: alertMessage, status: alertStatus};

  const id = req.params.id;
  models.Users.findById(id).then((users) => {
    res.render('siswa/edit',{
      alert: alert,
      siswa: users
    });
  });
});

router.post('/siswa/:id/edit', (req, res) => {

  const id = req.params.id;
  models.Users.findById(id).then((users) => {
    return users.update(req.body);
  }).then(() => {
    req.flash('alertMessage', `Sukses Mengubah Data Siswa dengan id : ${id}`);
    req.flash('alertStatus', 'success');
    res.redirect('/siswa');
  }).catch((err) => {
    req.flash('alertMessage', err.message);
    req.flash('alertStatus', 'danger');
    res.redirect('/siswa');
  })
});
//Akhir edit data siswa


//hapus data siswa
router.get('/siswa/delete/:id', (req, res) => {
  let id = req.params.id;
  models.Users.findById(id).then((users) => {
    return users.destroy();
  }).then(() => {
    req.flash('alertMessage', `Sukses Menghapus Data Siswa dengan id : ${id}`);
    req.flash('alertStatus', 'success');
    res.redirect('/siswa');

  }).catch((err) => {
    req.flash('alertMessage', err.message);
    req.flash('alertStatus', 'danger');
    res.redirect('/siswa');

  })
});
//akhit hapus data siswa

module.exports = router;