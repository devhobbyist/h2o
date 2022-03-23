// import { Row, Col } from 'antd'

import { CSSProperties } from 'react'
import { useMobile, useMd } from 'hooks/Mobile'
import { Trans } from '@lingui/macro'

export default function VisionSection() {
  const isMobile = useMobile() // 是否是移动端
  const isMd = useMd() //
  const section: CSSProperties = {
    margin: !isMd ? '100px 40px' : '30px 40px',
    padding: !isMd ? 50 : '50px 20px 0',
    height: !isMobile ? 390 : 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#111',
    backgroundImage: !isMd
      ? `url(/assets/index/pc/big.png)`
      : `url(/assets/index/moblie/big.png)`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: !isMobile ? 'cover' : '100%',
    backgroundPosition: !isMobile ? '' : 'bottom',
    borderRadius: 30,
    overflow: 'hidden',
  }

  const h3: CSSProperties = {
    fontSize: !isMobile ? 72 : 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    lineHeight: !isMobile ? '70px' : '35px',
    marginBottom: 30,
  }

  const p: CSSProperties = {
    maxWidth: 805,
    lineHeight: '30px',
    fontSize: 21.5,
    fontWeight: 500,
    color: '#FFFFFF',
    marginBottom: 0,
    paddingBottom: !isMobile ? 0 : 170,
  }

  return (
    <section style={section}>
      <div>
        <h3 style={h3}>
          <Trans>Our Vision</Trans>
        </h3>
        <p style={p}>
          With an H₂O agreement, it is easy and quick to establish a
          decentralized contract, get input and financial support from global
          participants, and build a global community of its own. Whether  is
          DeFi, GameFi, Web3.0, SocialFi or other projects, you can get more
          powerful support here, truly realize global community governance, and
          jointly create a global blockchain ecosystem.
        </p>
      </div>
    </section>
  )
}
