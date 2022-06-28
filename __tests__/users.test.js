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
  it('signs up a new user with mock data', () => {
    const res = await request(app).post('/api/v1/users').send(mockUser);

    expect(res.body).toEqual({
      id: expect.any(String),
      email: 'test@example.com'
    })
  });

  it('signs in an existing user', () => {
    
  });

  it('returns the current user if they are logged in', () => {
    
  });

  it('errors if the user is not logged in', () => {
    
  });

  it('deletes the session for a user', () => {
    
  });
  afterAll(() => {
    pool.end();
  });
});
