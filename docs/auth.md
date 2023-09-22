# user login Api

## Login User

Endpoint : POST /api/v1/user/login

Request Body

- Token and or refreshToken include id,username,email,role
- email : required
- password : required
- role : required enum [admin,guru,murid]

```json
{
  "email": "alfri@gmail.com",
  "password": "string",
  "role": "admin"
}
```

Response Header Success

- cookie : token=token;refreshToken=refreshToken

Response Body Success

```json
{
  "message": "SUCCESS"
}
```

Response Body Error

```json
{
  "errors": ["Username or password wrong", "role harus diisi"]
}
```

## refresh token

Endpoint : POST /api/v1/user/refreshToken

Request Header

- cookie : refreshToken

Response Header Success

- cookie : token=token;refreshToken=refreshToken

Response Body Success

```json
{
  "message": "SUCCESS"
}
```

Response Body Error

```json
{
  "errors": ["Unauthorize"]
}
```
