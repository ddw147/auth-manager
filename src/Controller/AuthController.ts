import { Request, Response } from "express";
import Joi from "joi";
import {createUser, isValidLogin} from '../Service/AuthService' 

const loginSchema = Joi.object({
  username: Joi.string().alphanum().required(),
  password: Joi.string().alphanum().required(),
}).required();
 async function login(request: Request, response: Response) {
  const {value, error } = loginSchema.validate(request.body);
  console.error(value,error)
 
  if(error){
    return response.status(400).json({ message: 'Bad Request' });
  }
  const { username, password } = request.body;
  const user = await isValidLogin(username, password)
  if(!user) {
    return response.status(400).json({ message: 'Invalid credentials'});
  }
  
  response.send("login successfull");
}

async function register(request:Request,response:Response) {
  const { error } = loginSchema.validate(request.body);
  console.error(error)
  if(error){
    return response.status(400).json({ message: 'Bad Request' });
  }
  try{
    const user  = await createUser(request.body.username, request.body.password);
    response.send({id:user.id})
  }catch(error){
    if(error.message==="Username already exists"){
      return response.status(400).json({ message: error.message });
    }
    throw error;
  }
  



} 

export { login,register };
