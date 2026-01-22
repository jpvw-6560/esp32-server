import { Injectable, OnModuleInit, OnModuleDestroy, Inject, forwardRef } from '@nestjs/common';
import { DeviceService } from '../device/device.service';
import * as mqtt from 'mqtt';

@Injectable()
export class MqttService implements OnModuleInit, OnModuleDestroy {
  private client: mqtt.MqttClient;

  constructor(
    private readonly deviceService: DeviceService,
  ) {}

  onModuleInit() {
    // Connexion au broker MQTT
    this.client = mqtt.connect(process.env.MQTT_BROKER || 'mqtt://localhost');


    this.client.on('connect', () => {
      console.log('✅ MQTT connecté');
      // Souscription aux topics principaux comme dans esp_server
      const topics = ['esp/+/mie', 'esp/+/hmi', 'esp/ack/+'];
      topics.forEach((topic) => {
        this.client.subscribe(topic, (err) => {
          if (!err) console.log(`✅ Abonné à ${topic}`);
          else console.error(`❌ Erreur abonnement à ${topic}`, err);
        });
      });
    });

    // Handler de messages MQTT
    this.client.on('message', (topic, message) => {
      // Dispatcher selon le topic
      try {
        if (/^esp\/.+\/mie$/.test(topic)) {
          this.handleMieMessage(topic, message);
        } else if (/^esp\/.+\/hmi$/.test(topic)) {
          this.handleHmiMessage(topic, message);
        } else if (/^esp\/ack\/.+$/.test(topic)) {
          this.handleAckMessage(topic, message);
        } else {
          console.log(`📡 [MQTT] Message reçu sur ${topic}: ${message.toString()}`);
        }
      } catch (e) {
        console.error(`[MQTT] Erreur traitement message sur ${topic}:`, e);
      }
    });

    this.client.on('error', (err) => {
      console.error('⚠️ Erreur MQTT', err);
    });
  }

  // Handlers à compléter avec la logique métier
  private handleMieMessage(topic: string, message: Buffer) {
    const match = topic.match(/^esp\/(.+)\/mie$/);
    const mac = match ? match[1] : undefined;
    let mie: any = null;
    try {
      mie = JSON.parse(message.toString());
    } catch (e) {
      console.error(`[MQTT] [MIE] Erreur parsing JSON sur ${topic}:`, e);
      return;
    }
    this.deviceService.updateMie(mac, mie);
  }

  private handleHmiMessage(topic: string, message: Buffer) {
    const match = topic.match(/^esp\/(.+)\/hmi$/);
    const mac = match ? match[1] : undefined;
    let hmi: any = null;
    try {
      hmi = JSON.parse(message.toString());
    } catch (e) {
      console.error(`[MQTT] [HMI] Erreur parsing JSON sur ${topic}:`, e);
      return;
    }
    this.deviceService.updateHmi(mac, hmi);
  }

  private handleAckMessage(topic: string, message: Buffer) {
    const match = topic.match(/^esp\/ack\/(.+)$/);
    const ackId = match ? match[1] : undefined;
    let ack: any = null;
    try {
      ack = JSON.parse(message.toString());
    } catch (e) {
      console.error(`[MQTT] [ACK] Erreur parsing JSON sur ${topic}:`, e);
      return;
    }
    this.deviceService.updateAck(ackId, ack);
  }

  publish(topic: string, payload: any) {
    if (this.client) {
      this.client.publish(topic, JSON.stringify(payload));
      console.log(`📤 Message publié sur ${topic}`);
    }
  }

  onModuleDestroy() {
    if (this.client) {
      this.client.end();
      console.log('MQTT déconnecté');
    }
  }
}
