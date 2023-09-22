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

getUser();
