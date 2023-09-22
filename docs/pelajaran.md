# Pelajaran api specification

## Create

Endpoint : POST /api/v1/pelajaran

Header :

    - Authorization : token
    - role : admin

Request Body

- pelajaran : required String max(50)

```json
{
  "pelajaran": "IPA"
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
  "errors": ["pelajaran harus string"]
}
```

## Update

Endpoint : PATCH /api/v1/pelajaran/:id

Header :

    - Authorization : token
    - role : admin

Request Body

- pelajaran : required String max(50)

```json
{
  "pelajaran": "IPA"
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
  "errors": ["pelajaran harus diisi"]
}
```

## DELETE

Endpoint : DELETE /api/v1/pelajaran/:id

Header :

    - Authorization : token
    - role : admin

Response Body Success

```json
{
  "message": "SUCCESS"
}
```

Response Body Error

```json
{
  "errors": ["pelajaran tidak ditemukan"]
}
```

## GET by id

Endpoint : GET /api/v1/pelajaran/:id

Header :

    - Authorization : token
    - role : admin

Response Body Success

```json
{
  "message": "SUCCESS",
  "data": {
    "id_pelajaran": 1,
    "pelajaran": "IPA"
  }
}
```

Response Body Error

```json
{
  "errors": ["pelajaran tidak ditemukan"]
}
```

## GET

Endpoint : GET /api/v1/pelajaran?page=1&perPage=10&sort=asc

Header :

    - Authorization : token
    - role : admin,guru,murid

Response Body Success

```json
{
  "message": "SUCCESS",
  "data": [
    {
      "username": "alfri",
      "email": "alfri@gmail.com",
      "kelas": "XII D",
      "guru": "Siti aira"
    },
    {
      "username": "alfri",
      "email": "alfri@gmail.com",
      "kelas": "XII D",
      "guru": "siti aira"
    }
  ]
}
```

Response Body Error

```json
{
  "errors": ["data tidak ditemukan"]
}
```
