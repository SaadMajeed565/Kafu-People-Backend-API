import { Request, Response } from 'bushjs';
import { Controller } from 'bushjs';
import { Registration } from '@app/Models/Registration';

export class RegistrationController extends Controller {
  async store(request: Request, response: Response) {
    try {
      const body = request.body as Record<string, any>;
      const refNo = `KAFU-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
      const registration = await Registration.create({
        firstName: body.firstName,
        lastName: body.lastName,
        gender: body.gender,
        age: body.age ? parseInt(body.age, 10) : undefined,
        email: body.email,
        city: body.city,
        course: body.course,
        education: body.education,
        highestDegree: body.highestDegree,
        referenceNo: refNo,
      });
      response.status(201).json(registration);
    } catch {
      response.status(500).json({ message: 'Failed to submit registration' });
    }
  }

  async index(request: Request, response: Response) {
    try {
      const registrations = await Registration.all();
      this.json(response, registrations);
    } catch {
      response.status(500).json({ message: 'Failed to fetch registrations' });
    }
  }

  async destroy(request: Request, response: Response) {
    try {
      const deleted = await Registration.delete(request.params.id);
      if (!deleted) {
        return response.status(404).json({ message: 'Registration not found' });
      }
      this.json(response, { message: 'Registration deleted' });
    } catch {
      response.status(500).json({ message: 'Failed to delete registration' });
    }
  }
}
