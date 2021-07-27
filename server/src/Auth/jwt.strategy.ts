import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret
    });
  }

  async validate(payload: any) {
    // return { id: payload.sub, username: payload.username };
    return { id: payload.sub,
             username: payload.username, 
             email: payload.email, 
             firstName: payload.firstName,
             lastName: payload.lastName,
             avatar: payload.avartar,
             isAdmin: payload.isAdmin,
             created_at: payload.created_at,
             updated_at: payload.updated_at };
  }
}
