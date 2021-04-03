# Employee Management Tools

Web app ini berfungsi untuk mengatur data karyawan suatu perusahaan.
Web app ini mempunyai fitur seperti dijelaskan dibawah.

Project Employee Management Tools menggunakan [Angular CLI](https://github.com/angular/angular-cli) version 8.3.14.

## Features
- Login
- Employee management list

## Login
Web app ini menggunakan fitur login untuk masuk halaman dashboard.

## Employee management list
Tabel yang berisi data karyawan dengan beberapa informasi general karyawan. Tabel menampilkan "ID","Name", "Group", "Email", "Birth Date", "Basic Salary", "Action". Data karyawan tersebut dapat di tambah, ubah, lihat, dan hapus. Berikut penjelasan fitur :

1. Create Employee
Fitur untuk menambah data karyawan
- Klik tombol add employee pada halaman employee-list.
- Isi semua field yang ada dan tekan tombol submit.

2. Edit Employee
Fitur untuk mengubah data karyawan
- Klik tombol edit pada halaman employee-list.
- Ubah Data dari karyawan dan klik save changes.

3. Detail Employee
Fitur untuk melihat data karyawan.
- Klik nama dari karyawan edit pada halaman employee-list.

4. Delete Employee
Fitur untuk menghapus data karyawan.
- Klik tombol delete pada tabel pada halaman employee-list.

5. Search karyawan dan Filter karyawan
Fitur untuk mencari spesific data karyawan.

## Cara Menjalankan web app
Web app ini berjalan pada mode dev.

1. Clone repository ini
2. Masuk pada directory file
3. Install npm module dengan cara ketik pada terminal `$npm install`.
4. Jalankan Web app dengan mengetik `ng serve`. 
5. Pada browser ketik `http://localhost:4200/`.
6. Pada halaman login, gunakan 
    admin 1 
   `User name = admin_1`
   `Password = Qwerty1!`
   
    admin 2
   `User name = admin_2`
   `Password = Qwerty2!`




