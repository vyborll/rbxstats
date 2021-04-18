import { NextApiRequest, NextApiResponse } from 'next';

import { searchUsers } from '~/lib/roblox';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { username },
  } = req;

  try {
    const users = await searchUsers((username as string).toLowerCase());

    return res.json(users.data);
  } catch (err) {
    return res.status(500).json({ message: 'Server Error' });
  }
};
