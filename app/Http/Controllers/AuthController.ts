import { Request, Response, Auth, auth } from 'bushjs';
import { Controller } from 'bushjs';
import { User } from '@app/Models/User';

export class AuthController extends Controller {
  async login(request: Request, response: Response) {
    try {
      const body = request.body as Record<string, any>;
      const { email, password } = body;

      if (!email || !password) {
        return response.status(422).json({ message: 'Email and password are required' });
      }

      const success = await auth.attempt(request, { email, password }, 'api');
      if (!success) {
        return response.status(401).json({ message: 'Invalid credentials' });
      }

      this.json(response, {
        message: 'Login successful',
        token: request.token,
        role: (request.user as any)?.role || 'admin',
      });
    } catch (error) {
      response.status(500).json({ message: 'Login failed' });
    }
  }

  async signup(request: Request, response: Response) {
    try {
      const body = request.body as Record<string, any>;
      const { email, password } = body;

      if (!email || !password) {
        return response.status(422).json({ message: 'Email and password are required' });
      }

      const existing = await User.findByEmail(email);
      if (existing) {
        return response.status(422).json({ message: 'User already exists' });
      }

      const hashedPassword = await Auth.hashPassword(password);
      await User.create({ email, password: hashedPassword, role: 'admin' });

      response.status(201).json({ message: 'Admin created successfully' });
    } catch (error) {
      response.status(500).json({ message: 'Signup failed' });
    }
  }

  async logout(request: Request, response: Response) {
    auth.logout(request);
    this.json(response, { message: 'Logged out' });
  }
}
