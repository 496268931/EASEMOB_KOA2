import {
    getInitToken
} from '../controller/tokenController'
export const tokenRoutes = [
    
    {
      path: "/getInitToken",
      method: "post",
      action: getInitToken,
    },
]