const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

const mockUser = { email: 'test@example.com', password: '123456' };

const registerAndLogin = async (userProps = {}) => {
  //?? difference
  const agent = request.agent(app);
  const user = await UserService.create({ ...mockUser, ...userProps });
  const { email } = user;
  await agent.post('/api/v1/users/sessions').send({ email, password });
  return [agent, user];
}

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('signs up a new user with mock data', async () => {
    const res = await request(app).post('/api/v1/users').send(mockUser);

    expect(res.body).toEqual({
      id: expect.any(String),
      email: 'test@example.com'
    })
  });

  it.skip('signs in an existing user', () => {
    //can't figure out how to test this one until I add delete session
  });

  it.skip('returns the current user if they are logged in', () => {
    
  });

  it.skip('errors if the user is not logged in', () => {
    
  });

  it.skip('deletes the session for a user', () => {
    const [agent] = await registerAndLogin();
    const res = await agent.delete('/api/v1/users/sessions');
    expect(res.status).toBe(204);
  });
  
  afterAll(() => {
    pool.end();
  });
});
