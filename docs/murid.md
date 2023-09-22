# Murid api specification

## Create

Endpoint : POST /api/v1/murid

Header :

    - Authorization : token
    - role : admin

Request Body

- username : required String max(50)
- email : required unique max(50)
- password : required String
- id_kelas : optional int

```json
{
  "username": "alfri",
  "email": "alfri@gmail.com",
  "password": "rahasia",
  "id_kelas": 2
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
  "errors": ["murdi harus string"]
}
```

## Update

Endpoint : PATCH /api/v1/murid/:id

Header :

    - Authorization : token
    - role : admin = all fields
           : murid = email,password

Request Body

Request Body

- username : required String max(50)
- email : required unique max(50)
- password : required String
- id_kelas : optional int

```json
{
  "username": "alfri",
  "email": "alfri@gmail.com",
  "password": "rahasia",
  "id_kelas": 2
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
  "errors": ["murid harus diisi"]
}
```

## DELETE

Endpoint : DELETE /api/v1/murid/:id

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
  "errors": ["murid tidak ditemukan"]
}
```

## GET all

Endpoint : GET /api/v1/murid?page=1&perPage=10&sort=asc

Header :

    - Authorization : token
    - role : admin = username,email,kelas
           : guru = username,email,kelas
           : murid = all

Response Body Success

```json
{
  "message": "SUCCESS",
  "data": {
    "username": "alfri",
    "email": "alfri@gmail.com",
    "password": "rahasia",
    "kelas": "XII D"
  }
}
```

Response Body Error

```json
{
  "errors": ["murid tidak ditemukan"]
}
```

## GET by id

Endpoint : GET /api/v1/murid/:id

Header :

    - Authorization : token
    - role : admin = username,email,kelas
           : guru = username,email,kelas
           : murid = all

Response Body Success

```json
{
  "message": "SUCCESS",
  "data": {
    "username": "alfri",
    "email": "alfri@gmail.com",
    "password": "rahasia",
    "kelas": "XII D"
  }
}
```

Response Body Error

```json
{
  "errors": ["murid tidak ditemukan"]
}
```

## GET By name

Endpoint : GET /api/v1/murid?nama='alfri'&page=1&perPage=10&sort=asc

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
