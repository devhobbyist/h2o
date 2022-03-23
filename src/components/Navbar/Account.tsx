// import { Button } from 'antd'
import { NetworkContext } from 'contexts/networkContext'
import { CSSProperties } from 'react'
import { useContext } from 'react'
import { Trans } from '@lingui/macro'

import Wallet from './Wallet'

export default function Account() {
  const { userAddress, signingProvider, onSelectWallet } =
    useContext(NetworkContext)

  const publishBtn: CSSProperties = {
    height: 45,
    padding: '0 20px',
    lineHeight: '45px',
    textAlign: 'center',
    background: '-webkit-linear-gradient(left, #5F81FF, #BB80FF)',
    // background: '-o-linear-gradient(left, #5F81FF, #BB80FF)',
    // background: '-moz-linear-gradient(left, #5F81FF, #BB80FF)',
    // background: 'linear-gradient(left, #5F81FF, #BB80FF)',
    fontSize: 19,
    fontWeight: 400,
    borderRadius: 30,
    color: '#fff',
    cursor: 'pointer',
  }

  if (!signingProvider) {
    return (
      // <Button onClick={onSelectWallet}>
      //   <Trans>Connect</Trans>
      // </Button>
      <div style={publishBtn} onClick={onSelectWallet}>
        <Trans>Connect</Trans>
      </div>
    )
  }

  if (!userAddress) return null

  return <Wallet userAddress={userAddress} />
}
