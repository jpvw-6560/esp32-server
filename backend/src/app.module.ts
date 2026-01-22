import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MqttModule } from './mqtt/mqtt.module';
import { ModuleModule } from './module/module.module';
import { ModuleEntity } from './module/module.entity';
import { EventModule } from './event/event.module';
import { IoPointModule } from './io-point/io-point.module';
import { EventLogModule } from './event-log/event-log.module';
import { IoHistoryModule } from './io-history/io-history.module';
import { ChartConfigModule } from './chart-config/chart-config.module';
import { Mie } from './entities/mie.entity';
import { Mis } from './entities/mis.entity';
import { SystemConfig } from './entities/system-config.entity';
import { MieModule } from './mie/mie.module';
import { MisModule } from './mis/mis.module';
import { SystemConfigModule } from './system-config/system-config.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DB_HOST'),
        port: parseInt(config.get('DB_PORT'), 10) || 3306,
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_DATABASE'),
        entities: [ModuleEntity, Mie, Mis, SystemConfig],
        synchronize: false, // à désactiver en prod
        autoLoadEntities: true,
      }),
    }),
    MqttModule,
    ModuleModule,
    EventModule,
    IoPointModule,
    EventLogModule,
    IoHistoryModule,
    ChartConfigModule,
    MieModule,
    MisModule,
    SystemConfigModule,
  ],
})
export class AppModule {}
