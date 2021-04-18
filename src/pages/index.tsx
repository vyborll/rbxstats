import Layout from '~/components/Layout';

export default function Home() {
  return (
    <Layout>
      <div className="mt-14">
        <div className="space-y-2">
          <h1 className="text-4xl font-semibold">Welcome to RBXStats</h1>
          <p className="text-gray-300">Quickly search and view another player's inventory or find deals on cheap collectibles.</p>
        </div>
      </div>
    </Layout>
  );
}
