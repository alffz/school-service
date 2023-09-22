# Jadwal api specification

## Create

Endpoint : POST /api/v1/jadwal

Header :

    - Authorization : token
    - role : admin

Request Body

- id_pelajaran : required int
- id_guru : required int
- id_kelas : required int
- hari : required int 0-6 , 0 = minngu
- mulai : required json, {jam:1,menit:0}
- berakhir : required json, {jam:24,menit:59}
- status : required boolean default false

```json
{
  "id_pelajaran": 1,
  "id_guru": 1,
  "id_kelas": 1,
  "hari": 0,
  "mulai": { "jam": 09, "menit": 00 },
  "berakhir": { "jam": 10, "menit": 00 },
  "status": false
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
  "errors": ["pelajaran harus diisi", "jam mulai harus diisi"]
}
```

## Update

Endpoint : PATCH /api/v1/jadwal/:id

Header :

    - Authorization : token
    - role : admin

Request Body

- id_pelajaran : required int
- id_guru : required int
- id_kelas : required int
- hari : required int 0-6 , 0 = minngu
- mulai : required json, {jam:1,menit:0}
- berakhir : required json, {jam:24,menit:59}
- status : required boolean default false

```json
{
  "id_pelajaran": 1,
  "id_guru": 1,
  "id_kelas": 1,
  "hari": 0,
  "mulai": { "jam": 09, "menit": 00 },
  "berakhir": { "jam": 10, "menit": 00 },
  "status": false
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

Endpoint : DELETE /api/v1/jadwal/:id

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
  "errors": ["jadwal tidak ditemukan"]
}
```

## GET by id

Endpoint : GET /api/v1/jadwal/:id

Header :

    - Authorization : token
    - role : admin

Response Body Success

```json
{
  "message": "SUCCESS",
  "data": {
    "id_pelajaran": 1,
    "guru": "siti",
    "kelas": "X A",
    "ruang_kelas": 1,
    "hari": 0,
    "mulai": { "jam": 09, "menit": 00 },
    "berakhir": { "jam": 10, "menit": 00 },
    "status": false
  }
}
```

Response Body Error

```json
{
  "errors": ["pelajaran tidak ditemukan"]
}
```

## GET by hari

Endpoint : GET /api/v1/jadwal?hari=senin&nama=alf&status=true&page=1&perPage=10&sort=asc

Header :

    - Authorization : token
    - role : admin

Request param

- hari : required
- nama : optional
- status : optional

```json
{
  "message": "SUCCESS",
  "data": [
    {
      "siti": "XI C",
      "status": true
    },
    {
      "aira": "XII C",
      "status": true
    },
    {
      "sindi": "X C",
      "status": true
    }
  ],
  "page": {
    "size": 10,
    "total": 50,
    "totalPage": 5,
    "current": 2
  }
}
```

Response Body Error

```json
{
  "errors": ["data tidak ditemukan"]
}
```
