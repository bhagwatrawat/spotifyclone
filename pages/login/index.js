import { useSession, signIn, signOut, getProviders } from "next-auth/react";

export default function Component({ providers }) {
  console.log(providers);
  return (
    <div className="flex flex-col bg-black min-h-screen items-center justify-center">
      <img className="w-52 mb-5" src="https:links.papareact.com/9xl" alt="" />
      <button
        className="bg-[#18D860] hover:bg-[#18D851] text-white p-5 rounded-full"
        onClick={() => signIn(providers.spotify.id, { callbackUrl: "/" })}
      >
        Login with {providers.spotify.name}
      </button>
    </div>
  );
}
export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
