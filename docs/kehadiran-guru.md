# kehadiran Guru api specification

## Get by range tanggal

Endpoint : GET /api/v1/:id_jadwal/kehadiran-guru?startDate=2023-09-23&endDate=2023-10-23

Header :

    - Authorization : token
    - role : admin,guru

Response Body Success

```json
{
  "message": "SUCCESS",
  "data": {
    "pelajaran": "Matematika",
    "hadir": ["2023-09-10", "2023-09-17", "2023-09-24"],
    "absen": ["2023-09-02"]
  }
}
```

Response Body Error

```json
{
  "errors": ["startDate harus diisi"]
}
``
```
