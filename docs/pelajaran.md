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

Endpoint : PUT /api/v1/pelajaran/:id

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

Endpoint : GET /api/v1/pelajaran?page=1&perPage=10

Header :

    - Authorization : token
    - role : admin,guru,murid

Response Body Success

```json
{
  "message": "SUCCESS",
  "data": [
    {
      "id": 1,
      "pelajaran": "IPA"
    },
    {
      "id": 2,
      "pelajaran": "IPS"
    }
  ],
  "page": {
    "perPage": 20,
    "total": 100,
    "totalPage": 5,
    "current": 1
  }
}
```

Response Body Error

```json
{
  "errors": ["data tidak ditemukan"]
}
```
