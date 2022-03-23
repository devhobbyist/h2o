// import { Row, Col, Tooltip } from 'antd'
// import { InfoCircleOutlined } from '@ant-design/icons'

import { CSSProperties } from 'react'
// import { ThemeContext } from 'contexts/themeContext'
// import TrendingProjects from 'components/Projects/TrendingProjects'
// import RankingExplanation from 'components/Projects/RankingExplanation'
// import { Trans } from '@lingui/macro'

import { useMobile } from 'hooks/Mobile'
import { Trans } from '@lingui/macro'
// import Background from '../../../images/login.jpg';

export default function BigTitleSection() {
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
    // border: '1px solid red',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    height: 600,
    // backgroundColor: '-webkit-linear-gradient(left top, red , blue)',
    backgroundImage: `url(/assets/index/pc/small.png)`,
    backgroundSize: 'cover',
    backgroundPosition: '20px 0%',
    backgroundRepeat: 'no-repeat',
  }
  const div: CSSProperties = {
    textAlign: !isMobile ? 'center' : 'left',
    paddingLeft: !isMobile ? 0 : 40,
    paddingRight: !isMobile ? 0 : 10,
    background:
      '-webkit-linear-gradient(bottom, rgba(0,0,0,1) , rgba(0,0,0,0))',
  }

  const h3: CSSProperties = {
    fontSize: !isMobile ? 72 : 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    lineHeight: !isMobile ? '70px' : '35px',
    marginBottom: 0,
  }
  const p: CSSProperties = {
    maxWidth: 500,
    margin: !isMobile ? '30px auto' : '',
    lineHeight: '30px',
    fontSize: 21.5,
    fontWeight: 500,
    color: '#FFFFFF',
  }

  // 发布项目按钮
  const publishBtn: CSSProperties = {
    width: 320,
    height: 76,
    margin: !isMobile ? '0 auto' : '',
    textAlign: 'center',
    lineHeight: '76px',
    background: '-webkit-linear-gradient(left, #5F81FF, #BB80FF)',
    // background: '-o-linear-gradient(left, #5F81FF, #BB80FF)',
    // background: '-moz-linear-gradient(left, #5F81FF, #BB80FF)',
    // background: 'linear-gradient(left, #5F81FF, #BB80FF)',
    fontSize: 25,
    fontWeight: 500,
    borderRadius: 30,
    color: '#fff',
    cursor: 'pointer',
  }

  return (
    <section style={section}>
      <div style={div}>
        <h3 style={h3}>Tart BoldlyWith Your Ideas</h3>
        <p style={p}>
          If you have an innovative idea, go ahead and build it, With
          industry-leading institutions and individuals, your ideas will be
          supported by content and funding from users around the world.
        </p>
        {/* 按钮 */}
        {/* <div style={publishBtn}>
          <Trans>Publish the project</Trans>
        </div> */}
      </div>
    </section>
  )
}
