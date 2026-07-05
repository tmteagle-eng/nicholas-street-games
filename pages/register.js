import Head from 'next/head'
import AuthForm from '../components/AuthForm'
import { colors } from '../styles/tokens'

export default function Register() {
  return (
    <>
      <Head>
        <title>Create an Account — Nicholas Street Games</title>
        <meta name="description" content="Register free to unlock more time with Nickie, the Letter Me This! AI Game Master." />
      </Head>
      <section style={s.wrap}>
        <AuthForm mode="register" />
      </section>
    </>
  )
}

const s = {
  wrap: {
    minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '72px 24px',
    background: `radial-gradient(60% 70% at 50% 0%, ${colors.coral}14 0%, transparent 60%), ${colors.ground}`,
  },
}
