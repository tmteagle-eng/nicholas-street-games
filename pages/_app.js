import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { Analytics } from '@vercel/analytics/react'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: 64 }}>
        <Component {...pageProps} />
      </main>
      <Footer />

      <style global jsx>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
          font-family: 'Nunito', sans-serif;
          background: #FBFAF5;
          color: #1D2624;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }
        a { color: inherit; }
        img { display: block; max-width: 100%; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 100% { transform: rotate(45deg) translateY(0); }
          50%       { transform: rotate(45deg) translateY(5px); }
        }
        .fade-up { animation: fadeUp 0.7s both; }
        .fade-up-1 { animation: fadeUp 0.7s 0.1s both; }
        .fade-up-2 { animation: fadeUp 0.7s 0.2s both; }
        .fade-up-3 { animation: fadeUp 0.7s 0.3s both; }
        .fade-up-4 { animation: fadeUp 0.7s 0.4s both; }
        .fade-up-5 { animation: fadeUp 0.7s 0.5s both; }
        .fade-up-6 { animation: fadeUp 0.7s 0.6s both; }

        .color-bar {
          height: 6px;
          background: linear-gradient(90deg, #20B2AA 0%, #F5C518 33%, #E85D3D 66%, #3a7d44 100%);
        }

        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .stack-mobile { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <Analytics />
    </>
  )
}
