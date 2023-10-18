# Guru api specification

## Create

Endpoint : POST /api/v1/guru

Header :

    - Authorization : token
    - role : ADMIN

Request Body

- username : required max (50)
- email : unique required max(50)
- password : required

```json
{
  "username": "alfri",
  "email": "foo@gmail.com",
  "password": "string"
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
  "errors": ["username not null", "email already registered"]
}
```

## Update

Endpoint : PUT /api/v1/guru/:id

Header :

    - Authorization : token
    - role : ADMIN

Request Body

- username : required max (50)
- email : unique required max(50)
- password : required
- id_kelas : optional

```json
{
  "username": "alfri",
  "email": "foo@gmail.com",
  "password": "string",
  "id_kelas": 1
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
  "errors": ["username not null", "email already registered"]
}
```

## DELETE

Endpoint : DELETE /api/v1/guru/:id

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
  "errors": ["User not found"]
}
```

## GET guru by id

Endpoint : GET /api/v1/guru/:id

Header :

    - Authorization : token
    - role : ADMIN

Response Body Success

```json
{
  "message": "SUCCESS",
  "data": {
    "username": "alfri",
    "email": "alfri@gmail.com",
    "kelas": "XI A"
  }
}
```

Response Body Error

```json
{
  "errors": ["user not found"]
}
```

## GET guru

Endpoint : GET /api/v1/guru?username=alfri&page=1&pageSize=10&sort=asc

Header :

    - Authorization : token
    - role : admin,murid,guru

Request params

- username : optioanl
- page : optioanl default 1
- perPage : optional default 20

Response Body Success

```json
{
  "message": "SUCCESS",
  "data": [
    {
      "id_guru": 1,
      "username": "alfri",
      "email": "alfir@gmail.com",
      "kelas": "XI A"
    },
    {
      "id_guru": 2,
      "username": "alex",
      "email": "alex@gmail.com",
      "kelas": "XI "
    }
  ]
}
```

Response Body Error

```json
{
  "errors": ["User not found"]
}
```

## GET jadwal guru

Endpoint : GET /api/v1/:id_guru/jadwal

Header :

    - Authorization : token
    - role : admin,guru

Response Body Success

```json
{
  "message": "SUCCESS",
  "data": {
    "senin": [
      {
        "kelas": "XI A",
        "pelajaran": "IPS",
        "mulai": { "jam": 9, "menit": 00 },
        "berakhir": { "jam": 10, "menit": 00 }
      },
      {
        "kelas": "XI B",
        "pelajaran": "IPA",
        "mulai": { "jam": 10, "menit": 00 },
        "berakhir": { "jam": 11, "menit": 00 }
      }
    ],
    "selasa": [
      {
        "kelas": "XII A",
        "pelajaran": "IPS",
        "mulai": { "jam": 9, "menit": 00 },
        "berakhir": { "jam": 10, "menit": 00 }
      },
      {
        "kelas": "XII B",
        "pelajaran": "IPA",
        "mulai": { "jam": 10, "menit": 00 },
        "berakhir": { "jam": 11, "menit": 00 }
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
