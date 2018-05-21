'use strict';
module.exports = (sequelize, DataTypes) => {
  //Users harus sama dengan database
  var Users = sequelize.define('Users', {
  	//ini harus sama dengan database
    nama: DataTypes.STRING,
    gender: DataTypes.STRING,
    no_telp: DataTypes.STRING,
    alamat: DataTypes.STRING,
  }, {
    underscored: true,
  });
  Users.associate = function(models) {
    // associations can be defined here
    //isi kalo ada relasi
  };
  return Users;
};