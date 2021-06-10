import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Link from 'next/link'

export default function Home({blog}) {
  return (
    <div className='container'>
      <Head>
        <title>Vdev Blog</title>
        <link rel="icon" href="/logo-white.png" />
        <meta name="description" content="Read and publish article retated to developement, Programming, story and News for free" />
        <meta property="og:title" content="Read and publish article" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content='https://blog.vdev.in/' key="ogurl" />
        <meta property="og:image" content='/logo-white.png' key="ogimage" />
        <meta property="og:site_name" content='Vdev Blog' key="ogsitename" />
        <meta property="og:description" content='Read and publish article retated to developement, Programming, story and News for free' key="ogdesc" />
        <meta name="twitter:card" content="summary" key="twcard" />
        <meta name="twitter:site" content='vimalverma_in' key="twhandle" />
      </Head>
      <Header/>

      <main className='main'>
        {blog.map((item) => {
        return <div key={item.url} className='bloghome'>
            <div className='blogleft'>
            <Link href={item.url} target='blank'>
            <img style={{width:'100%', maxHeight: '200px'}} src={item.imgurl} alt='blog' />
            </Link>
            </div>
            <div className='blogright'>
            <h1>{item.title.substring(0,200)}</h1>
            <code>By <Link href={'/@'+item.username} target='blank'>{item.author.displayName}</Link> on {new Date(item.createdAt).toLocaleTimeString(undefined, { year: "numeric", month: "long", day: "numeric" })}</code><br/><br/>
            <Link href={item.url} target='blank'>
                <button style={{margin:'0px'}}>Read More <i class="fas fa-glasses"></i></button>
            </Link>
            </div>
        </div>
        })}
      </main>
    <Footer/>
    </div>
  )
}

export async function getServerSideProps({params}){
  try {
    const res = await fetch(`https://api.vdev.in/blog`)
    var data = await res.json()
  } catch (error) {
    console.log(error)
  }
  return{
    props:{blog : data}
  }
}