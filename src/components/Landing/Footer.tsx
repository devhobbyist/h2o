import { CSSProperties } from 'react'
import { useMobile } from 'hooks/Mobile'

export default function Footer() {
  const isMobile = useMobile() // 是否是移动端
  const footerBox: CSSProperties = {
    maxWidth: 1400,
    margin: '0 auto',
    padding: '50px 40px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: !isMobile ? 'row' : 'column',
    justifyContent: !isMobile ? 'space-between' : 'center',
  }
  const main: CSSProperties = {
    padding: '10px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: !isMobile ? 'flex-start' : 'center',
    justifyContent: 'center',
  }
  const contact: CSSProperties = {
    display: 'flex',
    fontSize: 15,
    fontWeight: 400,
    color: '#FFF',
  }
  const contacts = [
    {
      label: 'Discord',
      logo: '/assets/bolt.png',
      link: 'https://baidu.ccom',
    },
    {
      label: 'Twitter',
      logo: '/assets/bolt.png',
      link: 'https://twitter.ccom',
    },
  ]

  return (
    <div style={footerBox}>
      <div style={main}>
        <img
          style={{ width: '100px' }}
          src="/assets/index/pc/logo.png"
          alt=""
        />
        <p style={{ margin: '10px 0 0' }}>
          Copyright © 2022 H₂O. All rights reserved.
        </p>
      </div>
      <div>
        <div style={contact}>
          {contacts.map((data, i) => (
            <div
              key={i}
              style={{ cursor: 'pointer', marginRight: 20 }}
              onClick={() => window.open(data.link)}
            >
              <img
                style={{ height: 20, marginRight: 7 }}
                src={data.logo}
                alt=""
              />
              <span>{data.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
