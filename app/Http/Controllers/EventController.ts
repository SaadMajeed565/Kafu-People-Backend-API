import { Request, Response } from 'bushjs';
import { Controller } from 'bushjs';
import { Event } from '@app/Models/Event';

export class EventController extends Controller {
  async index(request: Request, response: Response) {
    try {
      const events = await Event.all();
      this.json(response, events);
    } catch {
      response.status(500).json({ message: 'Failed to fetch events' });
    }
  }

  async show(request: Request, response: Response) {
    try {
      const param = request.params.slug;
      const isObjectId = /^[a-f0-9]{24}$/i.test(param);
      const event = isObjectId ? await Event.find(param) : await Event.findBySlug(param);
      if (!event) {
        return response.status(404).json({ message: 'Event not found' });
      }
      this.json(response, event);
    } catch {
      response.status(500).json({ message: 'Failed to fetch event' });
    }
  }

  async store(request: Request, response: Response) {
    try {
      const body = request.body as Record<string, any>;
      const { title, date, location, type, description } = body;
      const slug = body.slug || title?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      const files = (request as any).files || [];
      const images = (Array.isArray(files) ? files : []).map((f: any) => f.filename);
      const event = await Event.create({
        title, slug, date: date ? new Date(date) : undefined, location, type, description,
        images: images.length > 0 ? JSON.stringify(images) : undefined,
      });
      response.status(201).json(event);
    } catch {
      response.status(500).json({ message: 'Failed to create event' });
    }
  }

  async update(request: Request, response: Response) {
    try {
      const body = request.body as Record<string, any>;
      if (body.title && !body.slug) {
        body.slug = body.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      }
      const updated = await Event.update(request.params.id, body);
      if (!updated) {
        return response.status(404).json({ message: 'Event not found' });
      }
      this.json(response, updated);
    } catch {
      response.status(500).json({ message: 'Failed to update event' });
    }
  }

  async destroy(request: Request, response: Response) {
    try {
      const deleted = await Event.delete(request.params.id);
      if (!deleted) {
        return response.status(404).json({ message: 'Event not found' });
      }
      this.json(response, { message: 'Event deleted' });
    } catch {
      response.status(500).json({ message: 'Failed to delete event' });
    }
  }
}
