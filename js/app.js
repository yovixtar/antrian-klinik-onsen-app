if (window.openDatabase) {
  var mydb = openDatabase("klinik", '1.0', "WebSQL Database", 2 * 1024 * 1024);
  mydb.transaction(function (tx) {
    tx.executeSql
      ("create table if not exists user (username varchar (25) primary key, password varchar(25))");
    tx.executeSql("insert into user values ('admin','admin')");
  });

  localStorage.setItem("id", 0);
  (localStorage.getItem("nama") != null) ? localStorage.removeItem('nama') : "";
  (localStorage.getItem("dokter") != null) ? localStorage.removeItem('dokter') : "";
} else {
  alert("Browser tidak mendukung WebSql");
}

function login() {
  var username = document.getElementById("username").value;
  mydb.transaction(function (tx) {
    tx.executeSql("select * from user where username = ?", [username], validasi);
  });
}
function validasi(transaction, result) {
  var pass = document.getElementById("password").value;
  if (result.rows.length == 0) {
    alert("username salah");
    reset_username();
    reset_password();
  } else {
    var row = result.rows.item(0);
    if (row.password == pass) {
      myNavigator.pushPage('beranda');
      reset_username();
      reset_password();
    } else {
      alert("password salah");
      reset_password();
    }
  }
}

function reset_username() {
  document.getElementById("username").value = "";
}
function reset_password() {
  document.getElementById("password").value = "";
}

window.fn = {};

window.fn.open = function () {
  var menu = document.getElementById('menu');
  menu.open();
};
window.fn.load = function (page) {
  var content = document.getElementById('content');
  var menu = document.getElementById('menu');
  content.load(page)
    .then(menu.close.bind(menu));
};

function simpan() {
  var id = parseInt(localStorage.getItem("id")) + 1;
  var nama = document.getElementById("nama_pengantri").value;
  var dokter = document.getElementById("dokter_spesialis").value;

  localStorage.setItem("id", id);
  localStorage.setItem("nama", nama);
  localStorage.setItem("dokter", dokter);

  ons.notification.toast('Data berhasil disimpan', { timeout: 1000, animation: 'fall' });

  fn.load('antrianpage');
}
