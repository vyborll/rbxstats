import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import Layout from '~/components/Layout';

interface UserState {
  displayName: string;
  id: number;
  name: string;
  previousUsernames: string[];
}

export default function Players() {
  const [value, setValue] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [users, setUsers] = React.useState<UserState[]>([]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value.trim());
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value || loading) return;

    setLoading(true);

    const resp = await axios.get('/api/players', {
      params: {
        username: value.toLocaleLowerCase(),
      },
    });

    setUsers(resp.data);
    setValue('');
    setLoading(false);
  };

  return (
    <Layout>
      <div className="mt-14">
        <h1 className="text-4xl">Search Players</h1>

        <form onSubmit={handleSubmit}>
          <div className="mt-5 flex flex-row space-x-3">
            <input
              onInput={handleInput}
              className="w-full p-3 text-black focus:outline-none rounded-sm"
              value={value}
              type="text"
              name="username"
              autoComplete="off"
            />
            <button className="bg-blue-600 py-2 px-6 rounded-sm">Search</button>
          </div>
        </form>
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {users.map((user, i) => (
          <div className="flex flex-col bg-darkgray-800 p-4 rounded-md text-center space-y-5" key={i}>
            <span className="truncate">{user.displayName}</span>

            <div className="flex flex-row justify-center items-center">
              <img
                className="rounded-full w-20 h-20 border bg-gray-600"
                src={`https://www.roblox.com/bust-thumbnail/image?userId=${user.id}&width=420&height=420&format=png`}
              />
            </div>

            <Link href={`/players/${user.id}`}>
              <a className="btn bg-blue-600 rounded-sm py-2">View Profile</a>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
}
