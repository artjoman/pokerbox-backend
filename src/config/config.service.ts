import { TypeOrmModuleOptions } from '@nestjs/typeorm';
require('dotenv').config();

class ConfigService {

  constructor(private env: { [k: string]: string | undefined }) { }

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach(k => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    console.log( this.getValue('HOST'),parseInt(this.getValue('PORT')),'pb',this.getValue('PASSWORD'),this.getValue('DATABASE')
    );
    return { 
      type: 'mysql',
      host: this.getValue('HOST'),
      port: parseInt(this.getValue('PORT')),
      username: 'pb',
      password: this.getValue('PASSWORD'),
      database: this.getValue('DATABASE'),
      entities: ['dist/entities/**{.ts,.js}'],
      synchronize: false,
      logging: true,
    };
  }

  public getJwtSecret(): string {
      return this.getValue('JWT_SECRET')
  }
  
} 

const configService = new ConfigService(process.env)
  .ensureValues([
    'HOST',
    'PORT',
    'USER',
    'PASSWORD',
    'DATABASE',
    'JWT_SECRET'
  ]);

export { configService };