import jwt from 'jsonwebtoken';
import { envs } from './envs';

export const jwtAdapter = {
  // 1. Le decimos a la función qué va a devolver
  generateToken: async (payload: any, duration: string = '2h'): Promise<string | null> => {
    
    // 2. Le decimos a la Promesa qué tipo de dato maneja internamente
    return new Promise<string | null>((resolve) => {
      jwt.sign(
        payload, 
        envs.JWT_SEED, 
        { expiresIn: duration as jwt.SignOptions['expiresIn'] }, 
        (err, token) => {
          if (err) return resolve(null);
          // 3. Aseguramos que si no hay error, resuelva el token (y si por alguna razón token no existe, resuelva null)
          resolve(token || null);
        }
      );
    });
  },

  validateToken: <T>(token: string): Promise<T | null> => {
    return new Promise<T | null>((resolve) => {
      jwt.verify(token, envs.JWT_SEED, (err, decoded) => {
        if (err) return resolve(null);
        resolve(decoded as T);
      });
    });
  }
};