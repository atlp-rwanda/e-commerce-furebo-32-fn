import { jwtDecode } from "jwt-decode";

export const getIdFromToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decodedToken: any = jwtDecode(token);
      console.log(decodedToken.id)
      return decodedToken.id;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null; 
    }
  } else {
    console.log("Token not found");
    return null; 
  }
};