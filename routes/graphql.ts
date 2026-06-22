import { Application, auth, Request, Response } from 'bushjs';
import { schema, rootValue } from '@app/GraphQL/Schema';

/**
 * Loads the JWT user when an Authorization header is present.
 * Does not return 401 so GraphiQL GET in development still works; use resolvers to enforce auth.
 */
const attachGraphqlUser = {
  async handle(request: Request, response: Response, next: () => Promise<void>): Promise<void> {
    await auth.user(request, 'api');
    await next();
  },
};

export function registerRoutes(app: Application) {
  app.graphql('/graphql', schema, rootValue, [attachGraphqlUser]);
}
