import {
  register
} from '../controller/userController'
export const userRoutes = [
  {
    path: "/users/register",
    method: "post",
    action: register,
  },
  
]