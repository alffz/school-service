export const reducer = (a, b) => {
  return a - b;
};
const cookie = [
  "dfakfjafsdfsg=adfa",
  "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluMSIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNjkzODEzOTkxLCJleHAiOjE2OTM4MTQwMDF9.bemhtPMz5w23p_3IowNQEqIqaiYBNDcfkc90LhVAJh8; Path=/",
  "refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluMSIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNjkzODEzOTkxLCJleHAiOjE2OTM4MTQwMTF9.lHcLpuuaJXEZE6AW9aDNFLfKTl5hf_oyR9BtFf-EHTI; Path=/",
];
const cookies = (cookies) => {
  const cookie = cookies.reduce((acc, curr) => {
    const [key, value] = curr.split("=");
    acc[key] = value.split(";")[0];
    return acc;
  }, {});
  return cookie;
};

// const token = cookies(cookie);
// console.log(token.refreshToken);

function user() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ usename: "afl", age: 27 });
    }, 3000);
  });
}
const usenames = (name) => {
  const user = { age: 22 };
  user.name = name;
  console.log(user);
};
async function getUser() {
  const ref = true;

  try {
    if (ref) {
      const { usename } = await user();
      return usenames(usename);
    }
  } catch (err) {}
}

// getUser();
// const string = "";
// const num = string || 1;
// console.log(string);
// console.log(num);

const users = "admin";
const userFields = {
  admin: ["username", "email", "password", "id_kelas"],
  guru: ["username", "email", "password"],
};
const allowedFields = userFields[users];
const data = {
  username: "foo",
  email: "foo@gmail.com",
  password: "123",
  id_kelas: 1,
};

const request = {};
for (let value of allowedFields) {
  // console.log(value);
  request[value] = data[value];
}
// console.log(request);

const reqs = (data, allowedFields) => {
  const request = {};
  for (let value of allowedFields) {
    // console.log(value);
    request[value] = data[value];
  }
  return request;
};
console.log(reqs(data, allowedFields));

export const requestFiltered = (data, allowedFields) => {
  const keys = Object.keys(data);
  const allowedAllFields = keys.every((filed) => allowedFields.includes(filed));

  if (!allowedAllFields) {
    const notAllowed = keys.filter((field) => !allowedFields.includes(field));
    throw new ResponseError(403, `kolom ${notAllowed} tidak diijinkan`);
  }

  const request = {};
  for (let value of allowedFields) {
    request[value] = data[value];
  }
  return request;
};

export const requestFiltered1 = (data, allowedFields) => {
  const keys = Object.keys(data);
  const allowedAllFields = keys.every((filed) => allowedFields.includes(filed));

  if (!allowedAllFields) {
    const notAllowed = keys.filter((field) => !allowedFields.includes(field));
    throw new ResponseError(403, `kolom ${notAllowed} tidak diijinkan`);
  }

  return data;
};

export const requestFiltered2 = (data, allowedFields) => {
  const keys = Object.keys(data);
  const notAllowed = keys.filter((field) => !allowedFields.includes(field));

  if (notAllowed.length > 0) {
    throw new ResponseError(403, `kolom ${notAllowed} tidak diijinkan`);
  }

  return data;
};
