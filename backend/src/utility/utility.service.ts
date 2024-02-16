import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UtilityService {
    hashString(str: string) {
        return bcrypt.hashSync(str, 12);
    }

    compareString(plainString: string, hashedString: string) {
        return bcrypt.compareSync(plainString, hashedString);
    }
}
