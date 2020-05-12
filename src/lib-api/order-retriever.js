import klarnaApiCall from './util/klarna-utils';
import { fetchCrystallizeOrder } from './crystallize-order-handler';
// eslint-disable-next-line consistent-return

export async function orderRetriever(
  paymentMethod,
  isCrystallizeRequest,
  { orderId }
) {
  try {
    switch (paymentMethod) {
      case 'klarna':
        return klarnaApiCall({
          uri: `/ordermanagement/v1/orders/${orderId}`,
          method: 'GET'
        });
      case 'stripe':
        // TODO: implement 3D secure callbacks from Stripe
        break;
      default:
        if (isCrystallizeRequest) return fetchCrystallizeOrder(orderId);

        throw new Error(
          `Please provide a Payment Method(${paymentMethod}) or make this a Crystallize request by using isCrystallizeRequest(${isCrystallizeRequest})`
        );
    }
  } catch (error) {
    return Promise.reject(error);
  }
}