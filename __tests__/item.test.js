const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');
const Item = require('../lib/models/Item');

const mockUser = {
  email: 'test@example.com',
  password: '123456',
};

const registerAndLogin = async (userProps = {}) => {
  const agent = request.agent(app);
  const user = await UserService.create({ ...mockUser, ...userProps });
  const { email } = user;
  const password = userProps.password ?? mockUser.password;
  await agent.post('/api/v1/users/sessions').send({ email, password });
  return [agent, user];
}

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('allow user to create a new shopping item', async () => {
    const [agent, user] = await registerAndLogin();
    const resp = await agent.post('/api/v1/items').send({ description: 'bread', qty: 1 });
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      description: 'bread',
      qty: 1,
      user_id: user.id,
      bought: false,
    });
  });

  it('should return all items associated to the user', async () => {
    const [agent] = await registerAndLogin();
    await agent.post('/api/v1/items').send({ description: 'bread', qty: 1 });
    const resp = await agent.get('/api/v1/items');
    expect(resp.status).toEqual(200);
    expect(resp.body.length).toEqual(1);
  });

  it('should return error if the user is not signed in', async () => {
    const resp = await request(app).get('/api/v1/items');
    expect(resp.status).toEqual(401);
  });

  it('should allow user to update an item if they are signed in', async () => {
    const [agent, user] = await registerAndLogin();
    const item = await Item.insert({ description: 'bread', qty: 1, user_id: user.id });
    const resp = await agent.get('/api/v1/items');
    expect(resp.status).toEqual(200);
    expect(resp.body.length).toEqual(1);
    const res = await agent.put(`/api/v1/items/${item.id}`).send({ bought: true });
    console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ...item, bought: true });
  });

  it('should not allow users who are not signed in to update an item', async () => {

  });

  it('should delete items for authorized users', async () => {

  });

  afterAll(() => {
    pool.end();
  });
});
