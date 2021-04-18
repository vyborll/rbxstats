import { NextPageContext } from 'next';

import { getFullInventory, getUserData } from '~/lib/roblox';
import Layout from '~/components/Layout';

function Id({ user, inventory, stats }) {
  return (
    <Layout>
      <div className="mt-14 mb-14 space-y-6">
        <div className="m-auto w-2/3 sm:w-1/3 bg-darkgray-800 p-4 rounded-md">
          {user ? (
            <div className="flex flex-col justify-center items-center space-y-4">
              <div className="text-2xl font-bold">{user.name}</div>
              <div>
                <img
                  className="w-20 h-20 rounded-full border bg-gray-500"
                  src={`https://www.roblox.com/bust-thumbnail/image?userId=${user.id}&width=420&height=420&format=png`}
                />
              </div>
              <div>
                <div className="flex flex-row">
                  <div className="w-14">RAP:</div>
                  <span className="text-green-400 font-bold">R$ {stats.rap.toLocaleString()}</span>
                </div>
                <div className="flex flex-row">
                  <div className="w-14">Value:</div>
                  <span className="text-green-400 font-bold">R$ {stats.rap.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="bg-darkgray-800 p-4 rounded-md">
          <h2 className="text-2xl mb-4">{user.name}'s Inventory (First 100 Collectibles)</h2>

          <div className="grid lg:grid-cols-4 gap-4">
            {inventory.map((item, i) => {
              return i <= 100 ? (
                <div key={i} className="flex flex-col justify-center items-center bg-darkgray-900 p-4 h-56 rounded-md space-y-4">
                  <div>
                    <img
                      className="w-20 h-20"
                      src={`https://www.roblox.com/asset-thumbnail/image?assetId=${item.assetId}&width=100&height=100&format=png`}
                    />
                  </div>
                  <div className="text-center text-sm font-bold truncate w-full">{item.name}</div>
                  <div>
                    <div className="flex flex-row text-sm">
                      <div className="w-14">RAP:</div>
                      <span className="text-green-400 font-semibold">
                        R$ {item.recentAveragePrice ? item.recentAveragePrice.toLocaleString() : 0}
                      </span>
                    </div>
                    <div className="flex flex-row text-sm">
                      <div className="w-14">Value:</div>
                      <span className="text-green-400 font-semibold">
                        R$ {item.recentAveragePrice ? item.recentAveragePrice.toLocaleString() : 0}
                      </span>
                    </div>
                  </div>
                </div>
              ) : null;
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async (ctx: NextPageContext) => {
  const id = parseInt(ctx.query.id as string);
  if (isNaN(id)) return { props: { user: null } };

  const user = await getUserData(Number(id));
  const inventory = (await getFullInventory(user.id)).sort((a, b) => a.recentAveragePrice - b.recentAveragePrice).reverse();

  const rap = inventory.reduce((a, b) => a + b.recentAveragePrice, 0);

  return { props: { user: user ?? null, inventory: inventory ?? null, stats: { rap } } };
};

export default Id;
