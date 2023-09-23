# Admin api specification

## Create

Endpoint : POST /api/v1/admin

Header :

    - Authorization : token
    - role : admin

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

Endpoint : PATCH /api/v1/admin/:id

Header :

    - Authorization : token
    - role : admin

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

## DELETE

Endpoint : DELETE /api/v1/user/:id

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
  "errors": ["User not found"]
}
```

## GET all

Endpoint : GET /api/v1/admin?page=1&perPage=10

Header :

    - Authorization : token
    - role : admin

Response Body Success

```json
{
  "message": "SUCCESS",
  "data": [
    {
      "user_id": 1,
      "username": "alfri",
      "email": "alfir@gmail.com"
    },
    {
      "user_id": 2,
      "username": "alex",
      "email": "alex@gmail.com"
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
  "errors": ["User not found"]
}
```
