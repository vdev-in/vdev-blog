import Head from 'next/head'
import Link from 'next/link'
import ReactHtmlParser from 'react-html-parser';
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Home({blog}) {
  return (
    <div className='container'>
      <Head>
        <title>{blog?.title}</title>
        <link rel="icon" href="/logo-white.png" />
        <meta name="description" content={blog?.author.displayName + ' Publish "' + blog?.title + '" on ' + new Date(blog?.createdAt).toLocaleTimeString(undefined, { year: "numeric", month: "long", day: "numeric" })} />
        <meta property="og:title" content={blog?.title} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={'https://blog.vdev.in/'+ blog?.url} key="ogurl" />
        <meta property="og:image" content={blog?.imgurl} key="ogimage" />
        <meta property="og:site_name" content='Vdev Blog' key="ogsitename" />
        <meta property="og:description" content={blog?.author.displayName + ' Publish "' + blog?.title + '" on ' + new Date(blog?.createdAt).toLocaleTimeString(undefined, { year: "numeric", month: "long", day: "numeric" })} key="ogdesc" />
        <meta name="twitter:card" content="summary" key="twcard" />
        <meta name="twitter:site" content='vimalverma_in' key="twhandle" />
      </Head>
      <Header/>
      <article className='main'>
      <div className='blog'>
        <h1>{blog.title}</h1>
        <img style={{width:'100%', maxHeight: '500px', objectFit: 'cover'}} src={blog.imgurl} alt='blog' />
        <div style={{display:'flex', alignItems:'center', justifyContent:'center', margin:'20px 0'}}>
          <img style={{width:'80px', borderRadius:'50%', margin:'0px 20px'}} src={blog.author.imgurl} alt="userimg"/>
          <div>
            <Link href={'/@'+blog.username} target='blank'>{blog.author.displayName}</Link><br/>
            <code>Published at {new Date(blog.createdAt).toLocaleTimeString(undefined, { year: "numeric", month: "long", day: "numeric" })}</code>
          </div>
        </div>
        <div className='ck_content'>{ReactHtmlParser(blog.body)}</div>
        <Link href={'/'}><button>Read More.........</button></Link>
      </div>
      </article>
      <Footer/>
    </div>
  )
}


export async function getServerSideProps({params}){
  try {
    const res = await fetch(`https://api.vdev.in/blog/${params.url}`)
    var data = await res.json()
  } catch (error) {
    console.log(error)
  }
  if (!data) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return{
    props:{blog : data}
  }
}