import { Container } from "@modules/common/components/ui"

import ChevronDown from "@modules/common/icons/chevron-down"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type OverviewProps = {
  customer: HttpTypes.StoreCustomer | null
  orders: HttpTypes.StoreOrder[] | null
}

const Overview = ({ customer, orders }: OverviewProps) => {
  const displayIdentifier =
    customer?.phone ||
    customer?.email?.replace("@biotill.farmer", "") ||
    customer?.email ||
    "Farmer"

  return (
    <div data-testid="overview-page-wrapper" className="w-full">
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 text-white rounded-2xl p-6 mb-6 shadow-md">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-emerald-700/60 rounded-full text-xs font-semibold text-emerald-200 mb-2">
              <span>🌾</span> Verified BioTill Farmer / ನೋಂದಾಯಿತ ರೈತರು
            </div>
            <h2 className="text-2xl font-bold">
              Namaskara, {customer?.first_name || "Farmer"} {customer?.last_name || ""}!
            </h2>
            <p className="text-emerald-200 text-sm mt-0.5">
              ನಮಸ್ಕಾರ, ಬಯೋಟೀಲ್ ಕೃಷಿ ಪೋರ್ಟಲ್‌ಗೆ ಸುಸ್ವಾಗತ
            </p>
          </div>
          <div className="bg-emerald-900/80 border border-emerald-700/50 rounded-xl px-4 py-3 text-right">
            <span className="text-xs text-emerald-300 block">Mobile / Username:</span>
            <span className="font-mono font-bold text-white text-base">{displayIdentifier}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-xl font-bold">
            📦
          </div>
          <div>
            <span className="text-xs text-gray-500 font-medium">Total Orders / ಒಟ್ಟು ಆರ್ಡರ್</span>
            <div className="text-2xl font-bold text-gray-900">{orders?.length || 0}</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-xl font-bold">
            📍
          </div>
          <div>
            <span className="text-xs text-gray-500 font-medium">Farm Delivery / ವಿಳಾಸ</span>
            <div className="text-sm font-semibold text-gray-800">
              {customer?.addresses && customer.addresses.length > 0
                ? customer.addresses[0].address_1 || "Karnataka Farm"
                : "Karnataka (Direct Delivery)"}
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-xl font-bold">
            📞
          </div>
          <div>
            <span className="text-xs text-gray-500 font-medium">Agri Support Helpline</span>
            <div className="text-sm font-bold text-emerald-700">+91 94800 00000</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col py-4 border-t border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Recent Orders / ಇತ್ತೀಚಿನ ಆರ್ಡರ್‌ಗಳು</h3>
            <p className="text-xs text-gray-500">Track bio-fertilizer and pesticide farm dispatches</p>
          </div>
          <LocalizedClientLink
            href="/store"
            className="text-xs font-bold text-emerald-700 hover:underline bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200"
          >
            + Order Products / ಉತ್ಪನ್ನಗಳ ಖರೀದಿ
          </LocalizedClientLink>
        </div>

        <ul className="flex flex-col gap-y-3" data-testid="orders-wrapper">
          {orders && orders.length > 0 ? (
            orders.slice(0, 5).map((order) => {
              return (
                <li key={order.id} data-testid="order-wrapper" data-value={order.id}>
                  <LocalizedClientLink href={`/account/orders/details/${order.id}`}>
                    <Container className="bg-gray-50 hover:bg-emerald-50/50 transition border border-gray-200 rounded-xl flex justify-between items-center p-4">
                      <div className="grid grid-cols-3 text-sm gap-x-4 flex-1">
                        <div>
                          <span className="text-xs text-gray-500 block">Date Placed</span>
                          <span className="font-medium text-gray-800" data-testid="order-created-date">
                            {new Date(order.created_at).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 block">Order Number</span>
                          <span className="font-mono font-bold text-gray-900" data-testid="order-id">
                            #{order.display_id}
                          </span>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 block">Total Amount</span>
                          <span className="font-bold text-emerald-700" data-testid="order-amount">
                            {convertToLocale({
                              amount: order.total,
                              currency_code: order.currency_code,
                            })}
                          </span>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-emerald-700 pl-4" data-testid="open-order-button">
                        <ChevronDown className="-rotate-90" />
                      </button>
                    </Container>
                  </LocalizedClientLink>
                </li>
              )
            })
          ) : (
            <div className="bg-gray-50 border border-dashed border-gray-300 rounded-2xl p-8 text-center">
              <span className="text-3xl block mb-2">🌱</span>
              <p className="text-sm font-semibold text-gray-700">No orders placed yet</p>
              <p className="text-xs text-gray-500 mt-1 mb-4">
                Explore our certified bio-organic fungicides, bio-fertilizers, and bio-pesticides.
              </p>
              <LocalizedClientLink
                href="/store"
                className="inline-block bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow hover:bg-emerald-800 transition"
              >
                Browse BioTill Products
              </LocalizedClientLink>
            </div>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Overview
