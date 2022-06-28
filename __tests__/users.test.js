const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const mockUser = { email: 'test@example.com', password: '123456' };

const registerAndLogin = async (userProps = {}) => {
  //?? difference
  const agent = request.agent(app);
}

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('signs up a new user with mock data', () => {
    
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
