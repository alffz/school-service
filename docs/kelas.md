# Kelas api specification

## Create

Endpoint : POST /api/v1/kelas

Header :

    - Authorization : token
    - role : ADMIN

Request Body

- nomor : required int
- kelas : required String

```json
{
  "nomor_ruangan": 1,
  "kelas": "X A"
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
  "errors": ["kelas harus string"]
}
```

## Update

Endpoint : PATCH /api/v1/kelas/:id

Header :

    - Authorization : token
    - role : ADMIN

Request Body

- nomor : required int
- kelas : required String

```json
{
  "nomor_ruangan": 1,
  "kelas": "X A"
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
  "errors": ["kelas harus diisi"]
}
```

## DELETE

Endpoint : DELETE /api/v1/kelas/:id

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
  "errors": ["kelas tidak ditemukan"]
}
```

## GET kelas by id

Endpoint : GET /api/v1/kelas/:id

Header :

    - Authorization : token
    - role : ADMIN

Response Body Success

```json
{
  "message": "SUCCESS",
  "data": {
    "kelas": "Kelas XII B",
    "nomor_ruangan": 1
  }
}
```

Response Body Error

```json
{
  "errors": ["kelas tidak ditemukan"]
}
```

## GET kelas By name

Endpoint : GET /api/v1/kelas?kelas=XII&page=1&perPage=10&sort=asc

Header :

    - Authorization : token
    - role : ADMIN

Response Body Success

```json
{
  "message": "SUCCESS",
  "data": [
    {
      "id": 1,
      "kelas": "Kelas XII A",
      "nomor_ruangan": 1
    },
    {
      "id": 2,
      "kelas": "Kelas XII B",
      "nomor_ruangan": 1
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

## GET jadwal pada sebuah kelas

Endpoint : GET /api/v1/:id_kelas/jadwal

Header :

    - Authorization : token
    - role : admin,murid

Response Body Success

```json
{
  "message": "SUCCESS",
  "data": {
    "kelas": "XI A",
    "senin": [
      {
        "pelajaran": "IPS",
        "guru": "sindi",
        "mulai": { "jam": 9, "menit": 00 },
        "berakhir": { "jam": 10, "menit": 00 }
      },
      {
        "pelajaran": "IPA",
        "guru": "Aira",
        "mulai": { "jam": 10, "menit": 00 },
        "berakhir": { "jam": 11, "menit": 00 }
      }
    ],
    "selasa": [
      {
        "pelajaran": "Matematika",
        "guru": "alfri",
        "mulai": { "jam": 8, "menit": 00 },
        "berakhir": { "jam": 9, "menit": 00 }
      },
      {
        "pelajaran": "IPA",
        "guru": "Aira",
        "mulai": { "jam": 9, "menit": 00 },
        "berakhir": { "jam": 10, "menit": 00 }
      }
    ]
  }
}
```

Response Body Error

```json
{
  "errors": ["kelas tidak ditemukan"]
}
```

## GET murid pada sebuah kelas

Endpoint : GET /api/v1/:id_kelas/murid

Header :

    - Authorization : token
    - role : admin,murid

Response Body Success

```json
{
  "message": "SUCCESS",
  "data": {
    "kelas": "XI A",
    "murid": [
      {
        "id": 1,
        "nama": "Alfri"
      },
      {
        "id": 2,
        "nama": "Siti"
      }
    ]
  }
}
```

Response Body Error

```json
{
  "errors": [" kelas tidak ditemukan"]
}
```
