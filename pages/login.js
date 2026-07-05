import Head from 'next/head'
import AuthForm from '../components/AuthForm'
import { colors } from '../styles/tokens'

export default function Login() {
  return (
    <>
      <Head>
        <title>Sign In — Nicholas Street Games</title>
        <meta name="robots" content="noindex" />
      </Head>
      <section style={s.wrap}>
        <AuthForm mode="login" />
      </section>
    </>
  )
}

const s = {
  wrap: {
    minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '72px 24px',
    background: `radial-gradient(60% 70% at 50% 0%, ${colors.teal}14 0%, transparent 60%), ${colors.ground}`,
  },
}
