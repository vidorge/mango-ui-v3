import { useEffect, useState } from 'react'
import FloatingElement from './FloatingElement'
import OpenOrdersTable from './OpenOrdersTable'
import BalancesTable from './BalancesTable'
import PositionsTable from './PerpPositionsTable'
import TradeHistoryTable from './TradeHistoryTable'
import { useRouter } from 'next/router'
// import FeeDiscountsTable from './FeeDiscountsTable'

const TABS = [
  'Balances',
  'Open Orders',
  'Perp Positions',
  // 'Fees',
  'Trade History',
]

const UserInfoTabs = ({ activeTab, setActiveTab }) => {
  const handleTabChange = (tabName) => {
    setActiveTab(tabName)
  }

  return (
    <div>
      <div className={`sm:hidden`}>
        <label htmlFor="tabs" className={`sr-only`}>
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className={`block w-full pl-3 pr-10 py-2 bg-th-bkg-2 border border-th-fgd-4 focus:outline-none sm:text-sm rounded-md`}
          onChange={(e) => handleTabChange(e.target.value)}
        >
          {TABS.map((tabName) => (
            <option key={tabName} value={tabName}>
              {tabName}
            </option>
          ))}
        </select>
      </div>
      <div className={`hidden sm:block`}>
        <div className={`border-b border-th-fgd-4`}>
          <nav className={`-mb-px flex space-x-6`} aria-label="Tabs">
            {TABS.map((tabName) => (
              <a
                key={tabName}
                onClick={() => handleTabChange(tabName)}
                className={`whitespace-nowrap pt-2 pb-4 px-1 border-b-2 font-semibold cursor-pointer default-transition hover:opacity-100
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
      </div>
    </div>
  )
}

const TabContent = ({ activeTab }) => {
  switch (activeTab) {
    case 'Open Orders':
      return <OpenOrdersTable />
    case 'Balances':
      return <BalancesTable />
    case 'Trade History':
      return <TradeHistoryTable />
    case 'Perp Positions':
      return <PositionsTable />
    // case 'Fees':
    //   return <FeeDiscountsTable /> // now displayed in trade form. may add back when MRSRM deposits are supported
    default:
      return <BalancesTable />
  }
}

const UserInfo = () => {
  const { asPath } = useRouter()
  const [activeTab, setActiveTab] = useState('')

  useEffect(() => {
    asPath.includes('perp') ? setActiveTab(TABS[2]) : setActiveTab(TABS[0])
  }, [asPath])

  return (
    <FloatingElement>
      <UserInfoTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <TabContent activeTab={activeTab} />
    </FloatingElement>
  )
}

export default UserInfo
