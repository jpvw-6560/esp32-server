import { Injectable } from '@nestjs/common';

@Injectable()
export class DeviceService {
  updateMie(mac: string, mie: any) {
    // TODO: Implémenter la logique de mise à jour du cache ou de la base de données pour MIE
    console.log(`[DeviceService] updateMie: ${mac}`, mie);
  }

  updateHmi(mac: string, hmi: any) {
    // TODO: Implémenter la logique de mise à jour du cache ou de la base de données pour HMI
    console.log(`[DeviceService] updateHmi: ${mac}`, hmi);
  }

  updateAck(ackId: string, ack: any) {
    // TODO: Implémenter la logique de mise à jour du cache ou de la base de données pour ACK
    console.log(`[DeviceService] updateAck: ${ackId}`, ack);
  }
}
