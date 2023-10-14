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
  "berakhir": { "jam": 10, "menit": 59 },
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

Endpoint : GET /api/v1/jadwal/hari/:hari?page=1&perPage=10

Header :

    - Authorization : token
    - role : admin

Request param

- hari : String optioanl default senin
- page : optional default 1
- perPage : optional default 20

```json
{
  "message": "SUCCESS",
  "hari": "senin",
  "data": [
    {
      "id": 1,
      "guru": "Alfri",
      "kelas": "A",
      "pelajaran": "MM",
      "mulai": "08:00",
      "berakhir": "09:00",
      "status": true
    },
    {
      "id": 2,
      "guru": "Agus",
      "kelas": "A",
      "pelajaran": "MM",
      "mulai": "08:00",
      "berakhir": "09:00",
      "status": true
    },
    {
      "id": 3,
      "guru": "Arjuna",
      "kelas": "A",
      "pelajaran": "MM",
      "mulai": "08:00",
      "berakhir": "09:00",
      "status": true
    }
  ],
  "page": {
    "perpPage": 10,
    "total": 50,
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

## GET by guru name

Endpoint : GET /api/v1/jadwal/guru?username=alfri&status=true

Header :

    - Authorization : token
    - role : admin guru

Request param

- username : required
- status : optional

```json
{
  "message": "SUCCESS",
  "data": {
    "guru": "Sinmay",
    "hari": {
      "senin": [
        {
          "id": 1,
          "kelas": "A",
          "Pelajaran": "MM",
          "jam": "08:00 - 09:00",
          "status": true
        },
        {
          "id": 1,
          "kelas": "A",
          "Pelajaran": "MM",
          "jam": "08:00 - 09:00",
          "status": true
        },
        {
          "id": 1,
          "kelas": "A",
          "Pelajaran": "MM",
          "jam": "08:00 - 09:00",
          "status": true
        }
      ],
      "selasa": [
        {
          "id": 1,
          "kelas": "A",
          "Pelajaran": "MM",
          "jam": "08:00 - 09:00",
          "status": true
        },
        {
          "id": 2,
          "kelas": "B",
          "Pelajaran": "IPA",
          "jam": "9:00 - 10:00",
          "status": true
        },
        {
          "id": 4,
          "kelas": "C",
          "Pelajaran": "IPS",
          "jam": "10:00 - 11:00",
          "status": true
        }
      ],
      "rabu": [
        {
          "id": 1,
          "kelas": "A",
          "Pelajaran": "MM",
          "jam": "08:00 - 09:00"
        },
        {
          "id": 2,
          "kelas": "B",
          "Pelajaran": "IPA",
          "jam": "9:00 - 10:00"
        },
        {
          "id": 4,
          "kelas": "C",
          "Pelajaran": "IPS",
          "jam": "10:00 - 11:00"
        }
      ]
    }
  }
}
```

Response Body Error

```json
{
  "errors": ["data tidak ditemukan"]
}
```

## GET by kelas

Endpoint : GET /api/v1/jadwal/kelas?klas=XII

Header :

    - Authorization : token
    - role : admin murid

Request params

- kelas : required

```json
{
  "message": "SUCCESS",
  "data": {
    "kelas": "XII A",
    "hari": {
      "senin": [
        {
          "id": 1,
          "guru": "Sinmay",
          "Pelajaran": "MM",
          "mulai": { "jam": 8, "menit": 0 },
          "berakhir": { "jam": 8, "menit": 0 }
        },
        {
          "id": 2,
          "kelas": "agus",
          "Pelajaran": "IPA",
          "jam": "9:00 - 10:00"
        },
        {
          "id": 4,
          "kelas": "ridwan",
          "Pelajaran": "IPS",
          "jam": "10:00 - 11:00"
        }
      ],
      "selasa": [
        {
          "id": 1,
          "kelas": "A",
          "Pelajaran": "MM",
          "jam": "08:00 - 09:00"
        },
        {
          "id": 2,
          "kelas": "B",
          "Pelajaran": "IPA",
          "jam": "9:00 - 10:00"
        },
        {
          "id": 4,
          "kelas": "C",
          "Pelajaran": "IPS",
          "jam": "10:00 - 11:00"
        }
      ],
      "rabu": [
        {
          "id": 1,
          "kelas": "A",
          "Pelajaran": "MM",
          "jam": "08:00 - 09:00"
        },
        {
          "id": 2,
          "kelas": "B",
          "Pelajaran": "IPA",
          "jam": "9:00 - 10:00"
        },
        {
          "id": 4,
          "kelas": "C",
          "Pelajaran": "IPS",
          "jam": "10:00 - 11:00"
        }
      ]
    }
  }
}
```

Response Body Error

```json
{
  "errors": ["data tidak ditemukan"]
}
```
