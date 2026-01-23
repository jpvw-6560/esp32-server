import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { promises as fs } from 'fs';
import * as path from 'path';

@Controller('camera')
export class CameraController {
  private readonly capturesDir = path.join(__dirname, '../../public/captures');

  @Get('captures')
  async listCaptures(@Res() res: Response) {
    await this._listCaptures(res);
  }

  @Get('captures/:deviceName')
  async listCapturesByDevice(@Param('deviceName') deviceName: string, @Res() res: Response) {
    await this._listCaptures(res, deviceName);
  }

  private async _listCaptures(res: Response, deviceName?: string) {
    try {
      await fs.mkdir(this.capturesDir, { recursive: true });
      let files = await fs.readdir(this.capturesDir);
      files = files.filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg'));
      if (deviceName) {
        files = files.filter(f => f.startsWith(deviceName + '-'));
      }
      const captures = await Promise.all(
        files.map(async (filename) => {
          const filepath = path.join(this.capturesDir, filename);
          const stats = await fs.stat(filepath);
          return {
            filename,
            path: `/captures/${filename}`,
            size: stats.size,
            created: stats.birthtime,
            modified: stats.mtime
          };
        })
      );
      captures.sort((a, b) => b.created.getTime() - a.created.getTime());
      res.json({ captures });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
