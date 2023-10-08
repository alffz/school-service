# Ruang kelas api specification

## Create

Endpoint : POST /api/v1/ruang-kelas

Header :

    - Authorization : token
    - role : ADMIN

Request Body

- nomor : required Int max (50)
- kapsitas : required int
- tersedia : boolean default true

```json
{
  "nomor_ruangan": 1,
  "kapasitas": 30,
  "tersedia": true
}
```

Response Body Success

```json
{
  "message": "SUCCESS"
}
```

Response Body Error

```json
{
  "errors": ["nomor harus diisi", "kapasitas harus angka"]
}
```

## Update

Endpoint : PATCH /api/v1/ruang-kelas/:id

Header :

    - Authorization : token
    - role : ADMIN

Request Body

- nomor : required Int max (50)
- kapsitas : required int
- tersedia : boolean default true

```json
{
  "nomor_ruangan": 1,
  "kapasitas": 30,
  "tersedia": true
}
```

Response Body Success

```json
{
  "message": "SUCCESS"
}
```

Response Body Error

```json
{
  "errors": ["nomor harus diisi", "kapasitas harus angka"]
}
```

## DELETE

Endpoint : DELETE /api/v1/ruang-kelas/:id

Header :

    - Authorization : token
    - role : ADMIN

Response Body Success

```json
{
  "message": "SUCCESS"
}
```

Response Body Error

```json
{
  "errors": ["ruang kelas tidak ditemukan"]
}
```

## GET ruang kelas by id

Endpoint : GET /api/v1/ruang-kelas/:id

Header :

    - Authorization : token
    - role : ADMIN

Response Body Success

```json
{
  "message": "SUCCESS",
  "data": {
    "nomor_ruangan": 1,
    "kapasitas": 30,
    "tersedia": true
  }
}
```

Response Body Error

```json
{
  "errors": ["ruang kelas tidak ditemukan"]
}
```

## GET ruang kelas

Endpoint : GET /api/v1/ruang-kelas?page=1&perPage=10&sort=asc

Header :

    - Authorization : token
    - role : ADMIN

Request params

- kapasitas : optional int

Response Body Success

```json
{
  "message": "SUCCESS",
  "data": [
    {
      "id_ruang_kelas": 1,
      "nomor_ruangan": 1,
      "kapasitas": 30,
      "tersedia": true
    },
    {
      "id_ruang_kelas": 2,
      "nomor_ruangan": 2,
      "kapasitas": 30,
      "tersedia": true
    }
  ],
  "page": {
    "perPage": 10,
    "total": 50,
    "totalPage": 5,
    "current": 2
  }
}
```

Response Body Error

```json
{
  "errors": ["Ruang kelas tidak ditemukan"]
}
```

## GET ruang kelas by nomor ruangan

Endpoint : GET /api/v1/ruang-kelas/nomor/:nomor_ruangan

Header :

    - Authorization : token
    - role : ADMIN

Request params

- kapasitas : optional int

Response Body Success

```json
{
  "message": "SUCCESS",
  "data": [
    {
      "id": 1,
      "nomor_ruangan": 1
    },
    {
      "id": 2,
      "nomor_ruangan": 10
    }
  ]
}
```

Response Body Error

```json
{
  "errors": ["Ruang kelas tidak ditemukan"]
}
```
