import { FunctionComponent } from 'react'
import { StyledMarketInfoLabel } from './MarketHeader'
import { usdFormatter } from '../utils'

interface DayHighLowProps {
  low: number
  hideLabel?: boolean
  high: number
}

const DayHighLow: FunctionComponent<DayHighLowProps> = ({
  low,
  hideLabel,
  high,
}) => {
  return (
    <div>
      {!hideLabel ? (
        <StyledMarketInfoLabel className="text-center text-th-fgd-3">
          24h Range
        </StyledMarketInfoLabel>
      ) : null}
      <div className="flex items-center">
        <div className="pr-2 text-th-fgd-1 text-xs">
          {usdFormatter.format(low)}
        </div>
        <div className="h-1.5 flex rounded bg-th-fgd-4 w-24">
          <div
            style={{
              width: `50%`,
            }}
            className="flex rounded bg-th-primary"
          ></div>
        </div>
        <div className="pl-2 text-th-fgd-1 text-xs">
          {usdFormatter.format(high)}
        </div>
      </div>
    </div>
  )
}

export default DayHighLow
