import { useState } from 'react'
import Router from 'next/router'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import { AreaChart, Area, ReferenceLine, XAxis, YAxis, Tooltip } from 'recharts'
import { getTokenBySymbol } from '@blockworks-foundation/mango-client'
import useMangoStore from '../stores/useMangoStore'
import useMangoGroupConfig from '../hooks/useMangoGroupConfig'
import { usdFormatter } from '../utils'
import TopBar from '../components/TopBar'
import PageBodyContainer from '../components/PageBodyContainer'
import DayHighLow from '../components/DayHighLow'
import Button from '../components/Button'

const TABS = ['spot', 'perp']

const priceHistory = [
  { time: 1, price: 100 * Math.random() },
  { time: 2, price: 100 * Math.random() },
  { time: 3, price: 100 * Math.random() },
  { time: 4, price: 100 * Math.random() },
  { time: 5, price: 100 * Math.random() },
  { time: 6, price: 100 * Math.random() },
  { time: 7, price: 100 * Math.random() },
]

export default function Markets() {
  const [activeTab, setActiveTab] = useState(TABS[0])
  const mangoGroup = useMangoStore((s) => s.selectedMangoGroup.current)
  const mangoCache = useMangoStore((s) => s.selectedMangoGroup.cache)
  const mangoConfig = useMangoStore((s) => s.selectedMangoGroup.config)
  const groupConfig = useMangoGroupConfig()
  const spot = groupConfig.spotMarkets
  const perp = groupConfig.perpMarkets

  const handleTabChange = (tabName) => {
    setActiveTab(tabName)
  }

  const markets = activeTab === 'spot' ? spot : perp

  return (
    <div className={`bg-th-bkg-1 text-th-fgd-1 transition-all`}>
      <TopBar />
      <PageBodyContainer>
        <div className="flex flex-col sm:flex-row pt-8 pb-3 sm:pb-6 md:pt-10">
          <h1 className={`text-th-fgd-1 text-2xl font-semibold`}>Markets</h1>
        </div>
        <div className="p-6 rounded-lg bg-th-bkg-2">
          <div className="border-b border-th-fgd-4 mb-4">
            <nav className={`-mb-px flex space-x-6`} aria-label="Tabs">
              {TABS.map((tabName) => (
                <a
                  key={tabName}
                  onClick={() => handleTabChange(tabName)}
                  className={`capitalize pb-4 px-1 border-b-2  whitespace-nowrapfont-semibold cursor-pointer default-transition hover:opacity-100
                  ${
                    activeTab === tabName
                      ? `border-th-primary text-th-primary`
                      : `border-transparent text-th-fgd-4 hover:text-th-primary`
                  }
                `}
                >
                  {tabName}
                </a>
              ))}
            </nav>
          </div>
          {mangoGroup ? (
            <div className={`flex flex-col py-4`}>
              <div className={`-my-2 overflow-x-auto`}>
                <div className={`align-middle inline-block min-w-full`}>
                  <Table className="min-w-full divide-y divide-th-bkg-2">
                    <Thead>
                      <Tr className="text-th-fgd-3 text-xs">
                        <Th
                          scope="col"
                          className={`px-3 py-3 text-left font-normal`}
                        >
                          Market
                        </Th>
                        <Th
                          scope="col"
                          className={`px-3 py-3 text-right font-normal`}
                        >
                          Price
                        </Th>
                        <Th
                          scope="col"
                          className={`px-3 py-3 text-right font-normal`}
                        >
                          24h Change
                        </Th>
                        <Th
                          scope="col"
                          className={`px-3 py-3 text-center font-normal`}
                        >
                          24h Range
                        </Th>
                        <Th
                          scope="col"
                          className={`px-3 py-3 text-right font-normal`}
                        >
                          24h Volume
                        </Th>
                        <Th
                          scope="col"
                          className={`px-3 py-3 text-center font-normal`}
                        >
                          Price/Time
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {markets.map((m, i) => {
                        const token = getTokenBySymbol(
                          mangoConfig,
                          m.baseSymbol
                        )
                        const tokenIndex = mangoGroup.getTokenIndex(
                          token.mintKey
                        )
                        return (
                          <Tr
                            key={i}
                            className={`border-b border-th-bkg-3
                  ${i % 2 === 0 ? `bg-th-bkg-3` : `bg-th-bkg-2`}
                `}
                          >
                            <Td
                              className={`px-3 py-3 text-xs text-th-fgd-1 whitespace-nowrap`}
                            >
                              <div className="flex items-center">
                                <img
                                  alt=""
                                  width="20"
                                  height="20"
                                  src={`/assets/icons/${m.baseSymbol.toLowerCase()}.svg`}
                                  className={`mr-2.5`}
                                />
                                <div>{m.name}</div>
                              </div>
                            </Td>
                            <Td
                              className={`px-3 py-3 text-right text-xs text-th-fgd-1 whitespace-nowrap`}
                            >
                              {usdFormatter.format(
                                +mangoGroup.getPrice(tokenIndex, mangoCache)
                              )}
                            </Td>
                            <Td
                              className={`px-3 py-3 text-right text-xs text-th-green whitespace-nowrap`}
                            >
                              +2.30%
                            </Td>
                            <Td
                              className={`flex md:h-20 items-center justify-center px-3 py-3 text-xs text-th-fgd-1 whitespace-nowrap`}
                            >
                              <DayHighLow
                                low={
                                  +mangoGroup.getPrice(tokenIndex, mangoCache) /
                                  1.023
                                }
                                hideLabel
                                high={
                                  +mangoGroup.getPrice(tokenIndex, mangoCache) *
                                  1.023
                                }
                              />
                            </Td>
                            <Td
                              className={`px-3 py-3 text-right text-xs text-th-fgd-1 whitespace-nowrap`}
                            >
                              {usdFormatter.format(
                                +mangoGroup.getPrice(tokenIndex, mangoCache) *
                                  100
                              )}
                            </Td>
                            <Td
                              className={`px-3 py-3 text-xs text-th-fgd-1 whitespace-nowrap`}
                            >
                              <AreaChart
                                width={120}
                                height={48}
                                data={priceHistory}
                              >
                                {/* <ReferenceLine
                                  y={0}
                                  stroke="#FF9C24"
                                  strokeDasharray="3 3"
                                  strokeOpacity={0.6}
                                /> */}
                                <Area
                                  isAnimationActive={false}
                                  type="monotone"
                                  dataKey="price"
                                  stroke="#FF9C24"
                                  fill="#FF9C24"
                                  fillOpacity={0.1}
                                />
                                <XAxis dataKey="time" hide />
                                <YAxis dataKey="price" hide />
                                {/* <Tooltip
                              content={tooltipContent}
                              position={{ x: 0, y: -50 }}
                            /> */}
                              </AreaChart>
                            </Td>
                            <Td
                              className={`px-3 py-3 text-xs text-th-fgd-1 whitespace-nowrap`}
                            >
                              <Button
                                className="flex h-8 items-center justify-center sm:ml-2 pt-0 pb-0 pl-3 pr-3 text-xs"
                                onClick={() =>
                                  Router.push(`${activeTab}/${m.baseSymbol}`)
                                }
                              >
                                Trade
                              </Button>
                            </Td>
                          </Tr>
                        )
                      })}
                    </Tbody>
                  </Table>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </PageBodyContainer>
    </div>
  )
}
