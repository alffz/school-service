# kehadiran murid api specification

## Create

Endpoint : POST /api/v1/kehadiran-murid-dan-guru

Header :

    - Authorization : token
    - role : guru

Request Body

- id_jadwal : required int
- id_guru : requred int
- tanggal : required
- murid : required array of object

```json
{
  "id_jadwal": 1,
  "id_guru": 1,
  "murid": [
    { "id": 1, "keterangan": "hadir" },
    { "id": 2, "keterangan": "hadir" },
    { "id": 3, "keterangan": "absen" },
    { "id": 4, "keterangan": "ijin" }
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

## Get kehadiran murid by jadwal &tanggal

Endpoint : GET /api/v1/kehadiran/murid?id_jadwal=1&tanggal=2023-09-23

Header :

    - Authorization : token
    - role : admin,guru

Request params

- id_jadwal : required int
- tanggal : iso sitring (toISOString)

Response Body Success

```json
{
  "message": "SUCCESS",
  "data": {
    "id_jadwal": 1,
    "kelas": "A",
    "tanggal": "2023-09-19 09:0:56",
    "murid": [
      { "id_murid": 1, "nama": "alfir", "keterangan": "hadir" },
      { "id_murid": 2, "nama": "rian", "keterangan": "hadir" },
      { "id_murid": 3, "nama": "habib", "keterangan": "hadir" },
      { "id_murid": 4, "nama": "ijol", "keterangan": "ijin" },
      { "id_murid": 5, "nama": "gunaw", "keterangan": "absen" }
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

## Get kehadiran guru by tanggal

Endpoint : GET /api/v1/:id_jadwal/kehadiran-guru?tanggal=2023-09-23

Header :

    - Authorization : token
    - role : admin,guru

Request params

- id_jadwal : required int
- tanggal : iso sitring (toISOString)

Response Body Success

```json
{
  "message": "SUCCESS",
  "data": {
    "id_jadwal": 1,
    "kelas": "A",
    "tanggal": "2023-09-19 09:0:56",
    "murid": [
      { "id_murid": 1, "nama": "alfir", "keterangan": "hadir" },
      { "id_murid": 2, "nama": "rian", "keterangan": "hadir" },
      { "id_murid": 3, "nama": "habib", "keterangan": "hadir" },
      { "id_murid": 4, "nama": "ijol", "keterangan": "ijin" },
      { "id_murid": 5, "nama": "gunaw", "keterangan": "absen" }
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
