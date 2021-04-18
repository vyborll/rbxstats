import axios from 'axios';

import redis from '~/lib/redis';
import { UserData, SearchUserData, UserInventory, UserInventoryItem } from '~/types/User';

// Half a day
const EX_SECONDS = 86400 / 2;

const API_USERS = 'https://users.roblox.com';
const API_INVENTORY = 'https://inventory.roblox.com';

export async function getRedisCache(key: string) {
  const cache = await redis.get(key);
  if (cache) return JSON.parse(cache);

  return false;
}

export async function searchUsers(username: string): Promise<SearchUserData | null> {
  username = username.trim();
  const cache = await getRedisCache(`players:${username}`);
  if (cache) return cache;

  try {
    const resp = await axios.get(`${API_USERS}/v1/users/search`, {
      params: {
        keyword: username,
      },
    });

    await redis.set(`players:${username}`, JSON.stringify(resp.data), 'ex', EX_SECONDS);

    return resp.data;
  } catch (err) {
    return null;
  }
}

export async function getUserData(id: number): Promise<UserData | null> {
  const cache = await getRedisCache(`user:${id}`);
  if (cache) return cache;

  try {
    const resp = await axios.get(`${API_USERS}/v1/users/${id}`);

    console.log(resp.data);

    await redis.set(`user:${id}`, JSON.stringify(resp.data), 'ex', EX_SECONDS);

    return resp.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function getUserInventory(id: number, amount: 100 | 'full'): Promise<UserInventory | null> {
  const cache = await getRedisCache(`inventory:${id}`);
  if (cache) return cache;

  try {
    const resp = await axios.get(`${API_INVENTORY}/v1/users/${id}/assets/collectibles`, {
      params: {
        limit: 100,
      },
    });

    await redis.set(`inventory:${id}`, JSON.stringify(resp.data), 'ex', EX_SECONDS);

    return resp.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function getFullInventory(id: number): Promise<UserInventoryItem[] | null> {
  const cache = await getRedisCache(`inventory:${id}`);
  if (cache) return cache;

  let counting: boolean = true;
  let inventory: UserInventoryItem[] = [];
  let cursor = '';

  try {
    let resp;

    while (counting) {
      if (!cursor) {
        resp = await axios.get(`${API_INVENTORY}/v1/users/${id}/assets/collectibles`, {
          params: {
            limit: 100,
          },
        });
      } else {
        resp = await axios.get(`${API_INVENTORY}/v1/users/${id}/assets/collectibles`, {
          params: {
            limit: 100,
            cursor,
          },
        });
      }

      inventory = [...inventory, ...resp.data.data];

      if (resp.data.nextPageCursor) {
        cursor = resp.data.nextPageCursor;
      } else {
        counting = false;
      }
    }

    redis.set(`inventory:${id}`, JSON.stringify(inventory), 'ex', EX_SECONDS);

    return inventory;
  } catch (err) {
    console.error(err);
    return null;
  }
}
