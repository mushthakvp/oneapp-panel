 //const baseD = "localhost";
 const baseD = "liveraapp.com";
export const getCookie = (name) => {
  const currentDomain = window.location.hostname;
  // if (currentDomain !== baseD) {
  //   console.log(currentDomain,'35t634634346');
    
  //   // If the current domain doesn't match baseD, return null or handle as needed
  //   console.warn(`Cookies can only be read from the domain: ${baseD}`);
  //   return null;
  // }
  const cookieArr = document.cookie.split(";");
  for (let i = 0; i < cookieArr.length; i++) {
    const cookie = cookieArr[i].trim();
    if (cookie.startsWith(name + "=")) {
      return decodeURIComponent(cookie.substring(name.length + 1));
    }
  }
  return null;
};



export const setUserDataCookie = (userData) => {
  const { email, name, role, token } = userData;

  document.cookie = `email=${encodeURIComponent(
    email
  )}; path=/; domain=${baseD}; secure; samesite=Lax`;

  document.cookie = `name=${encodeURIComponent(
    name
  )}; path=/; domain=${baseD}; secure; samesite=Lax`;

  document.cookie = `role=${encodeURIComponent(
    role
  )}; path=/; domain=.${baseD}; secure; samesite=Lax`;

  document.cookie = `token=${encodeURIComponent(
    token
  )}; path=/; domain=.${baseD}; secure; samesite=Lax`;

  console.log("User cookies set successfully!");
};

export const cookieLogout = () => {
  const cookies = ["email", "name", "role", "token"];

  // Clear cookies
  cookies.forEach((cookie) => {
    // Clear with .domain
    document.cookie = `${cookie}=; path=/; domain=.${baseD}; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; samesite=Lax`;
    // Clear without .domain
    document.cookie = `${cookie}=; path=/; domain=${baseD}; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; samesite=Lax`;
  });

  // Clear localStorage
  localStorage.clear();

  
  // Clear sessionStorage
  sessionStorage.clear();

  window.location.href = "/auth";
  console.log("User cookies cleared successfully!");
};

