# kehadiran murid api specification

## Create

Endpoint : POST /api/v1/kehadiran-murid

Header :

    - Authorization : token
    - role : guru

Request Body

- id_jadwal : required int
- murid : required array of object

```json
{
  "id_jadwal": 1,
  "murid": [
    { "id_murid": 1, "tanggal": "2023-09-19 09:0:56", "keterangan": "hadir" },
    { "id_murid": 2, "tanggal": "2023-09-19 09:10:56", "keterangan": "hadir" },
    { "id_murid": 3, "tanggal": "2023-09-19 09:01:56", "keterangan": "absen" },
    { "id_murid": 4, "tanggal": "2023-09-19 09:10:56", "keterangan": "ijin" }
  ]
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
  "errors": ["murid tidak ditemukan"]
}
```

## Update

Endpoint : PATCH /api/v1/kehadiran-murid

Header :

    - Authorization : token
    - role : guru

Request Body

- id_jadwal : required int
- murid: required array of object

```json
{
  "id_jadwal": 1,
  "murid": [
    { "id_murid": 1, "tanggal": "2023-09-19 09:0:56", "keterangan": "hadir" },
    { "id_murid": 2, "tanggal": "2023-09-19 09:10:56", "keterangan": "hadir" },
    { "id_murid": 3, "tanggal": "2023-09-19 09:01:56", "keterangan": "absen" },
    { "id_murid": 4, "tanggal": "2023-09-19 09:10:56", "keterangan": "ijin" }
  ]
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
  "errors": ["keterangan harus diisi"]
}
```

## Get by tanggal

Endpoint : GET /api/v1/:id_jadwal/kehadiran-murid?tanggal=2023-09-23

Header :

    - Authorization : token
    - role : admin

Response Body Success

```json
{
  "message": "SUCCESS",
  "data": {
    "id_jadwal": 1,
    "murid": [
      { "id_murid": 1, "tanggal": "2023-09-19 09:0:56", "keterangan": "hadir" },
      {
        "id_murid": 2,
        "tanggal": "2023-09-19 09:10:56",
        "keterangan": "hadir"
      },
      {
        "id_murid": 3,
        "tanggal": "2023-09-19 09:01:56",
        "keterangan": "absen"
      },
      { "id_murid": 4, "tanggal": "2023-09-19 09:10:56", "keterangan": "ijin" }
    ]
  }
}
```

Response Body Error

```json
{
  "errors": ["pelajaran tidak ditemukan"]
}
``
```
