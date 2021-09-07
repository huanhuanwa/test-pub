import { cache } from './cache';

describe('cache', () => {
  it('should set \'key1\' value is string', () => {
    cache.set('key1', 'key1-value');
    const value = cache.get('key1');
    expect(value).toBe('key1-value');
  });

  it('should set \'key-object\' value is object', () => {
    const user = { name: 'name1', id: '1' };
    cache.set('key-object', user);
    const value = cache.get<{ name: string; id: string }>('key-object');
    expect(value).toEqual(user);
  });

  it('should has key2 value', () => {
    cache.set('key2', 'key2-value');
    const value = cache.has('key2');
    expect(value).toBe(true);
  });

  it('should remove key2', () => {
    cache.set('key2', 'key2-value');
    cache.remove('key2');
    expect(cache.has('key2')).toBe(false);
  });

  it('should clear all', () => {
    cache.set('key2', 'key2-value');
    cache.clear();
    expect(cache.has('key2')).toBe(false);
  });

  it('should auto remove min hits cache key:\'key:2\'', () => {
    cache.clear();
    for (let i = 1; i <= 1000; i++) {
      cache.set(`key:${i}`, `value:${i}`);
      if (i !== 2) {
        cache.get(`key:${i}`);
      }
    }
    expect(cache.has('key:2')).toBe(true);
    cache.set('key:10001', 'value:10001');
    expect(cache.has('key:2')).toBe(false);
  });

  it('should add item to list', () => {
    cache.listAdd('test', '001', 'hello');
    const list = cache.get<{ id: string; value: string }[]>('test');
    expect(list).toEqual([
      {
        id: '001',
        value: 'hello'
      }
    ]);
  });

  it('should add item to list with max', () => {
    const MAX = 4;
    cache.listAdd('key', '001', 'hello1', MAX);
    cache.listAdd('key', '002', 'hello2', MAX);
    cache.listAdd('key', '003', 'hello3', MAX);
    cache.listAdd('key', '004', 'hello4', MAX);
    cache.listAdd('key', '005', 'hello5', MAX);

    const list = cache.get<{ id: string; value: string }[]>('key');

    expect(list).toEqual([
      {
        id: '002',
        value: 'hello2'
      },
      {
        id: '003',
        value: 'hello3'
      },
      {
        id: '004',
        value: 'hello4'
      },
      {
        id: '005',
        value: 'hello5'
      }
    ]);
  });

  it('should get item value from list', () => {
    cache.listAdd('key', '002', 'hello2');
    const result = cache.listGet<string>('key', '002');
    expect(result).toBe('hello2');
  });
});
