// import { Trans } from '@lingui/macro'
// import FeedbackFormButton from 'components/shared/FeedbackFormButton'
import { CSSProperties } from 'react'

import BigTitleSection from './BigTitleSection'
import InfoSection from './InfosSection'
import VisionSection from './VisionSection'
import Footer from './Footer'

export default function Landing() {
  const totalMaxWidth = 1400 // PC最大宽度
  const section: CSSProperties = {
    // paddingLeft: 40,
    // paddingRight: 40,
    marginTop: 40,
    marginBottom: 40,
  }

  const wrapper: CSSProperties = {
    maxWidth: totalMaxWidth,
    margin: '0 auto',
  }

  return (
    <div>
      <section style={section}>
        <div style={wrapper}>
          <BigTitleSection />
          <InfoSection />
          <VisionSection />
        </div>
      </section>
      {/* 提交反馈 */}
      {/* <FeedbackFormButton />   */}
      <Footer />
    </div>
  )
}
