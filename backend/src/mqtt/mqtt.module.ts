import { Module } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { DeviceModule } from '../device/device.module';

@Module({
  imports: [DeviceModule],
  providers: [MqttService],
})
export class MqttModule {}
