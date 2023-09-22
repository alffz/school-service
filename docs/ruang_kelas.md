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
  "nomor": 1,
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
  "nomor": 1,
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
    "nomor": 1,
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

Response Body Success

```json
{
  "message": "SUCCESS",
  "data": [
    {
      "id_kelas": 1,
      "nama": 1,
      "kapasitas": 30,
      "tersedia": true
    },
    {
      "id_kelas": 2,
      "nama": 1,
      "kapasitas": 30,
      "tersedia": true
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

## GET ruang kelas By nomor

Endpoint : GET /api/v1/ruang-kelas?nomor=1

Header :

    - Authorization : token
    - role : ADMIN

Response Body Success

```json
{
  "message": "SUCCESS",
  "data": {
    "id_kelas": 1,
    "nama": 1,
    "kapasitas": 30,
    "tersedia": true
  }
}
```

Response Body Error

```json
{
  "errors": ["Ruang kelas tidak ditemukan"]
}
```
