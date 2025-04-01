// import { useAuth0 } from "@auth0/auth0-react";
// import { useEffect } from "react";
// import { useCookies } from "react-cookie";
//
// export default function useGetAccessToken() {
//   const { user, getAccessTokenSilently } = useAuth0();
//   const [cookies, setCookie, removeCookie] = useCookies();
//
//   useEffect(() => {
//     const getAccessToken = async () => {
//       try {
//         if (cookies.jwt) {
//           return;
//         }
//         const accessToken = await getAccessTokenSilently();
//         setCookie("jwt", accessToken);
//       } catch (e) {
//         console.log(e);
//       }
//     };
//
//     if (user) getAccessToken();
//     else {
//       if (cookies.jwt) {
//         removeCookie("jwt");
//       }
//     }
//   }, [cookies.jwt, getAccessTokenSilently, removeCookie, setCookie, user]);
// }
