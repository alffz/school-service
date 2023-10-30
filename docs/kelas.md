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
  "nomor_ruang_kelas": 1,
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

Endpoint : PUT /api/v1/kelas/:id

Header :

    - Authorization : token
    - role : ADMIN

Request Body

- nomor : required int
- kelas : required String

```json
{
  "nomor_ruang_kelas": 1,
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
    "nomor_ruangan": 1,
    "kelas": "Kelas XII B"
  }
}
```

Response Body Error

```json
{
  "errors": ["kelas tidak ditemukan"]
}
```

## GET kelas all

Endpoint : GET /api/v1/kelas?kelas=XII&page=1&perPage=10

Header :

    - Authorization : token
    - role : ADMIN

Request params

- kelas optional
- page default 1
- perPage default 20
- sort default asc

Response Body Success

```json
{
  "message": "SUCCESS",
  "data": [
    {
      "id": 1,
      "kelas": "Kelas XII A",
      "nomor_ruang_kelas": 1
    },
    {
      "id": 2,
      "kelas": "Kelas XII B",
      "nomor_ruang_kelas": 1
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

## GET murid pada sebuah kelasm

Endpoint : GET /api/v1/:id/murid

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
