import { RightCircleOutlined } from '@ant-design/icons'
import { BigNumber } from '@ethersproject/bignumber'
import { Trans } from '@lingui/macro'
import { Progress, Tooltip } from 'antd'
import CurrencySymbol from 'components/shared/CurrencySymbol'
import EtherscanLink from 'components/shared/EtherscanLink'
import ProjectTokenBalance from 'components/shared/ProjectTokenBalance'
import TooltipLabel from 'components/shared/TooltipLabel'
import ETHAmount from 'components/shared/ETHAmount'

import { V1ProjectContext } from 'contexts/v1/projectContext'
import { ThemeContext } from 'contexts/themeContext'
import { useCurrencyConverter } from 'hooks/v1/CurrencyConverter'
import { useEthBalanceQuery } from 'hooks/EthBalance'
import { V1CurrencyOption } from 'models/v1/currencyOption'
import { NetworkName } from 'models/network-name'
import { CSSProperties, useContext, useMemo, useState } from 'react'
import { formatWad, fracDiv, fromWad } from 'utils/formatNumber'
import { hasFundingTarget } from 'utils/v1/fundingCycle'

import { V1CurrencyName } from 'utils/v1/currency'
import StatLine from 'components/shared/Project/StatLine'

import { V1_PROJECT_IDS } from 'constants/v1/projectIds'
import { readNetwork } from 'constants/networks'
import { V1_CURRENCY_USD } from 'constants/v1/currency'

import BalancesModal from './modals/BalancesModal'

export default function Paid() {
  const [balancesModalVisible, setBalancesModalVisible] = useState<boolean>()
  const {
    theme: { colors },
  } = useContext(ThemeContext)

  const {
    projectId,
    currentFC,
    balanceInCurrency,
    balance,
    owner,
    earned,
    overflow,
  } = useContext(V1ProjectContext)

  const converter = useCurrencyConverter()
  const { data: ownerBalance } = useEthBalanceQuery(owner)

  const overflowInCurrency = converter.wadToCurrency(
    overflow ?? 0,
    V1CurrencyName(currentFC?.currency.toNumber() as V1CurrencyOption),
    'ETH',
  )

  const percentPaid = useMemo(
    () =>
      balanceInCurrency && currentFC?.target
        ? fracDiv(balanceInCurrency.toString(), currentFC.target.toString()) *
          100
        : 0,
    [balanceInCurrency, currentFC],
  )

  // Percent overflow of target
  const percentOverflow = fracDiv(
    (overflowInCurrency?.sub(currentFC?.target ?? 0) ?? 0).toString(),
    (currentFC?.target ?? 0).toString(),
  )

  const primaryTextStyle: CSSProperties = {
    fontWeight: 500,
    fontSize: '1.1rem',
    lineHeight: 1,
  }

  const secondaryTextStyle: CSSProperties = {
    textTransform: 'uppercase',
    color: colors.text.tertiary,
    fontSize: '0.8rem',
    fontWeight: 500,
  }

  if (!currentFC) return null

  const spacing =
    hasFundingTarget(currentFC) && currentFC.target.gt(0) ? 15 : 10

  const formatCurrencyAmount = (amt: BigNumber | undefined) => {
    if (!amt) return null

    return currentFC.currency.eq(V1_CURRENCY_USD) ? (
      <span>
        <Tooltip
          title={
            <span>
              <CurrencySymbol currency="ETH" />
              {formatWad(converter.usdToWei(fromWad(amt)), {
                precision: 2,
                padEnd: true,
              })}
            </span>
          }
        >
          <CurrencySymbol currency="USD" />
          {formatWad(amt, { precision: 2, padEnd: true })}
        </Tooltip>
      </span>
    ) : (
      <span>
        <CurrencySymbol currency="ETH" />
        {formatWad(amt, { precision: 2, padEnd: true })}
      </span>
    )
  }

  const isConstitutionDAO =
    readNetwork.name === NetworkName.mainnet &&
    projectId?.eq(V1_PROJECT_IDS.CONSTITUTION_DAO)

  return (
    <div>
      <StatLine
        statLabel={<Trans>Volume</Trans>}
        statLabelTip={
          <Trans>
            The total amount received by this project through Juicebox since it
            was created.
          </Trans>
        }
        statValue={
          <span style={primaryTextStyle}>
            {isConstitutionDAO && (
              <span style={secondaryTextStyle}>
                <CurrencySymbol currency="USD" />
                {formatWad(converter.wadToCurrency(earned, 'USD', 'ETH'), {
                  precision: 2,
                  padEnd: true,
                })}{' '}
              </span>
            )}
            <span
              style={{
                color: isConstitutionDAO
                  ? colors.text.brand.primary
                  : colors.text.primary,
              }}
            >
              <ETHAmount amount={earned} />
            </span>
          </span>
        }
        style={{ marginBottom: spacing }}
      />

      <StatLine
        statLabel={<Trans>In Juicebox</Trans>}
        statLabelTip={
          <Trans>The balance of this project in the Juicebox contract.</Trans>
        }
        statValue={
          <div
            style={{
              ...primaryTextStyle,
              color: isConstitutionDAO
                ? colors.text.primary
                : colors.text.brand.primary,
              marginLeft: 10,
            }}
          >
            {currentFC.currency.eq(V1_CURRENCY_USD) ? (
              <span style={secondaryTextStyle}>
                <ETHAmount amount={balance} precision={2} padEnd={true} />{' '}
              </span>
            ) : (
              ''
            )}
            {formatCurrencyAmount(balanceInCurrency)}
          </div>
        }
      />

      {hasFundingTarget(currentFC) &&
        (currentFC.target.gt(0) ? (
          <StatLine
            statLabel={<Trans>Distributed</Trans>}
            statLabelTip={
              <Trans>
                The amount that has been distributed from the Juicebox balance
                in this funding cycle, out of the current funding target. No
                more than the funding target can be distributed in a single
                funding cycle—any remaining ETH in Juicebox is overflow, until
                the next cycle begins.
              </Trans>
            }
            statValue={
              <div
                style={{
                  ...secondaryTextStyle,
                  color: colors.text.primary,
                }}
              >
                {formatCurrencyAmount(currentFC.tapped)} /{' '}
                {formatCurrencyAmount(currentFC.target)}
              </div>
            }
          />
        ) : (
          <div
            style={{
              ...secondaryTextStyle,
              textAlign: 'right',
            }}
          >
            <TooltipLabel
              tip={
                <Trans>
                  The target for this funding cycle is 0, meaning all funds in
                  Juicebox are currently considered overflow. Overflow can be
                  redeemed by token holders, but not distributed.
                </Trans>
              }
              label={<Trans>100% overflow</Trans>}
            />
          </div>
        ))}

      {hasFundingTarget(currentFC) &&
        currentFC.target.gt(0) &&
        (overflow?.gt(0) ? (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Progress
              style={{
                width: (1 - percentOverflow) * 100 + '%',
                minWidth: 10,
              }}
              percent={100}
              showInfo={false}
              strokeColor={colors.text.brand.primary}
            />
            <div
              style={{
                minWidth: 4,
                height: 15,
                borderRadius: 2,
                background: colors.text.primary,
                marginLeft: 5,
                marginRight: 5,
                marginTop: 3,
              }}
            ></div>
            <Progress
              style={{
                width: percentOverflow * 100 + '%',
                minWidth: 10,
              }}
              percent={100}
              showInfo={false}
              strokeColor={colors.text.brand.primary}
            />
          </div>
        ) : (
          <Progress
            percent={percentPaid ? Math.max(percentPaid, 1) : 0}
            showInfo={false}
            strokeColor={colors.text.brand.primary}
          />
        ))}

      <StatLine
        statLabel={<Trans>In wallet</Trans>}
        statLabelTip={
          <>
            <p>
              <Trans>
                The balance of the wallet that owns this Juicebox project.
              </Trans>
            </p>{' '}
            <EtherscanLink value={owner} type="address" />
          </>
        }
        style={{
          marginTop: spacing,
        }}
        statValue={
          <span>
            <span style={secondaryTextStyle}>
              <ProjectTokenBalance
                style={{ display: 'inline-block' }}
                wallet={owner}
                projectId={BigNumber.from('0x01')}
                hideHandle
              />{' '}
              +{' '}
            </span>
            <span style={primaryTextStyle}>
              <ETHAmount amount={ownerBalance} precision={2} padEnd={true} />
            </span>
          </span>
        }
      />

      <div
        style={{
          textAlign: 'right',
        }}
      >
        <span
          style={{ ...secondaryTextStyle, cursor: 'pointer' }}
          onClick={() => setBalancesModalVisible(true)}
        >
          <Trans>All assets</Trans> <RightCircleOutlined />
        </span>
      </div>

      <BalancesModal
        visible={balancesModalVisible}
        onCancel={() => setBalancesModalVisible(false)}
      />
    </div>
  )
}
