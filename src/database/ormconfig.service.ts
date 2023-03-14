import {Injectable, Module} from '@nestjs/common';
import {TypeOrmModuleOptions, TypeOrmOptionsFactory} from "@nestjs/typeorm";
import {DBInfo} from "../../DBInfo";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      ...DBInfo,
      "synchronize": true,
      entities:[

      ]
    };
  }
}
