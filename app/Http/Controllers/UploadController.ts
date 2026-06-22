import { Request, Response } from 'bushjs';
import { Controller } from 'bushjs';
import { Upload } from '@app/Models/Upload';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export class UploadController extends Controller {
  async store(request: Request, response: Response) {
    try {
      const file = (request as any).file;
      if (!file) {
        return response.status(400).json({ message: 'No file uploaded' });
      }

      const filePath = file.path || path.join(process.cwd(), 'storage', 'uploads', file.filename);
      const content = fs.readFileSync(filePath, 'utf-8');
      const records = parse(content, { columns: true, skip_empty_lines: true });

      const upload = await Upload.create({
        fileName: file.originalname || file.filename,
        records: JSON.stringify(records),
        uploadedAt: new Date(),
      });

      response.status(201).json(upload);
    } catch {
      response.status(500).json({ message: 'Failed to upload file' });
    }
  }

  async index(request: Request, response: Response) {
    try {
      const uploads = await Upload.all();
      this.json(response, uploads);
    } catch {
      response.status(500).json({ message: 'Failed to fetch uploads' });
    }
  }

  async verify(request: Request, response: Response) {
    try {
      const query = request.query as Record<string, string>;
      const referenceNo = query.referenceNo;
      if (!referenceNo) {
        return response.status(400).json({ message: 'Reference number is required' });
      }

      const uploads = await Upload.all();
      for (const upload of uploads) {
        let records: any[];
        try {
          records = JSON.parse((upload as any).records || '[]');
        } catch {
          continue;
        }
        const match = records.find(
          (r: any) => r.ReferenceNo === referenceNo || r.referenceNo === referenceNo
        );
        if (match) {
          return this.json(response, { verified: true, record: match, upload });
        }
      }

      this.json(response, { verified: false, message: 'Reference number not found' });
    } catch {
      response.status(500).json({ message: 'Verification failed' });
    }
  }

  async destroy(request: Request, response: Response) {
    try {
      const deleted = await Upload.delete(request.params.id);
      if (!deleted) {
        return response.status(404).json({ message: 'Upload not found' });
      }
      this.json(response, { message: 'Upload deleted' });
    } catch {
      response.status(500).json({ message: 'Failed to delete upload' });
    }
  }
}
