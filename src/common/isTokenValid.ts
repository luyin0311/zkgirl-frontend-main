export const isTokenExpired = (token: string) => Date.now() >= JSON.parse(atob(token.split('.')[1])).exp * 1000;

export const isTokenValid = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return false;
  }
  try {
    return !isTokenExpired(token);
  } catch (e) {
    return false;
  }
};
