import { Row, Col } from 'antd'
// import { InfoCircleOutlined } from '@ant-design/icons'

import { CSSProperties } from 'react'
// import { ThemeContext } from 'contexts/themeContext'
// import TrendingProjects from 'components/Projects/TrendingProjects'
// import RankingExplanation from 'components/Projects/RankingExplanation'
// import { Trans } from '@lingui/macro'

import { useMobile } from 'hooks/Mobile'
import { Trans } from '@lingui/macro'

export default function InfosSection() {
  // const {
  //   theme: { colors },
  //   isDarkMode,
  // } = useContext(ThemeContext)

  const isMobile = useMobile() // 是否是移动端

  // const trendingProjectsStyle: CSSProperties = {
  //   // Light theme uses a slightly lighter background than background-l1
  //   backgroundColor: isDarkMode ? colors.background.l1 : '#e7e3dc80',
  //   margin: '150px 0',
  //   paddingTop: !isMobile ? 40 : 80,
  //   paddingLeft: 40,
  //   paddingRight: 40,
  //   paddingBottom: 0,
  // }

  // const headingStyles: CSSProperties = {
  //   fontWeight: 600,
  //   marginBottom: 15,
  //   fontSize: 22,
  //   marginTop: 20,
  //   display: 'flex',
  //   alignItems: 'center',
  //   flexWrap: 'wrap',
  // }
  const section: CSSProperties = {
    paddingTop: 100,
    marginLeft: 40,
    marginRight: 40,
  }
  // const div: CSSProperties = {
  //   // border: '1px solid red',
  //   // flexBasis: 'end',
  //   textAlign: !isMobile ? 'center' : 'left',
  // }

  const h3: CSSProperties = {
    fontSize: !isMobile ? 72 : 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    lineHeight: !isMobile ? '70px' : '35px',
    marginBottom: 40,
    textAlign: 'center',
  }

  const h5: CSSProperties = {
    fontSize: 22.5,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  }

  const p: CSSProperties = {
    maxWidth: 500,
    margin: !isMobile ? '0 auto' : '',
    lineHeight: '22px',
    fontSize: 14,
    padding: !isMobile ? '0 50px' : '0 20px',
    fontWeight: 500,
    color: '#FFFFFF',
  }

  return (
    <section style={section}>
      <div>
        <h3 style={h3}>
          <Trans>Why the H₂O protocol?</Trans>
        </h3>
        <Row gutter={[27, 27]} align="middle">
          {[
            {
              title: `Decentralized`,
              detail:
                'The H₂O agreement is governed by a community of H2O token holders who regularly vote on proposals Improve the content and rules of the upgrade agreement.',
            },
            {
              title: `Decentralized`,
              detail:
                'The H₂O agreement is governed by a community of H2O token holders who regularly vote on proposals Improve the content and rules of the upgrade agreement.',
            },
            {
              title: `Decentralized`,
              detail:
                'The H₂O agreement is governed by a community of H2O token holders who regularly vote on proposals Improve the content and rules of the upgrade agreement.',
            },
          ].map((data, i) => (
            <Col
              xs={24}
              md={12}
              sm={24}
              lg={8}
              style={
                {
                  // paddingBottom: 60,
                  // border: '1px solid red'
                }
              }
              key={i}
            >
              {/* <LinearGradient colors={['#fff362', '#f6d024']} start={{x:0 ,y: 1}}> */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  // rowGap: 30,  // 子项的间隔
                  width: '100%',
                  padding: '20px 20px 50px',
                  textAlign: 'center',
                  background:
                    '-webkit-linear-gradient(left bottom, #000, #141618)',
                  borderRadius: 30,
                }}
              >
                <img
                  src="/assets/index/pc/item.png"
                  style={{ minHeight: 100, margin: '10px 0 30px' }}
                  alt=""
                />
                <h5 style={h5}>
                  <Trans>{data.title}</Trans>
                </h5>
                <p style={p}>
                  <Trans>{data.detail}</Trans>
                </p>
              </div>
              {/* </LinearGradient> */}
            </Col>
          ))}
        </Row>
      </div>
    </section>
  )
}
