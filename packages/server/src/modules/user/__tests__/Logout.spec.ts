import callLogoutResolver from '../test-utils/callLogoutResolver';

const clearCookie = jest.fn();

describe('#LogoutResolver', () => {
  beforeEach(() => jest.clearAllMocks());

  it('returns true when destroy function returns no error', async () => {
    const destroy = jest.fn().mockImplementation(fn => fn(false));
    const response = await callLogoutResolver({ destroy } as any, clearCookie);
    expect(response.data).toEqual({
      logout: true,
    });
    expect(destroy).toBeCalled();
    expect(clearCookie).toBeCalledWith('qid');
  });

  it('returns null when destroy function returns error and does not call clearCookie function', async () => {
    const destroy = jest.fn().mockImplementation(fn => fn(true));
    const response = await callLogoutResolver({ destroy } as any, clearCookie);
    expect(response.data).toBeNull();
    expect(destroy).toBeCalled();
    expect(clearCookie).not.toBeCalled();
  });
});
