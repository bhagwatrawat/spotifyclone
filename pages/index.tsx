import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Sidebar from '../components/sidebar'
import Center from '../components/center'
import { getSession } from 'next-auth/react'
import Player from '../components/player';
const Home: NextPage = () => {
  return (
    <div className=" bg-black h-screen overflow-hidden ">
      <main className="flex">
       <Sidebar/>
       <Center/>
      </main>
      <div className="sticky bottom-0 text-white">
        <Player/>
      </div>
    </div>
  )
}

export default Home

export async function getServerSideProps(context:object){
  const session = await getSession(context);
  return {
    props: {
      session,
    }
  }
}
