import {
  BuyerOrderItemActions,
  BuyerOrderItemAttributes,
  FormattedBuyerOrderItemPermissions,
  FormattedOrderItemPermissions,
  OrderActions,
  OrderAttributes,
  OrderItemActions,
  OrderItemAttributes,
  Permissions,
} from 'src/types'
import { formatPermissions } from 'src/utils'

export const MOCK_ORDER_PERMISSIONS: Permissions<
  OrderActions & OrderItemActions,
  OrderAttributes & OrderItemAttributes
> = {
  actions: [
    {
      name: 'approve',
      enabled: true,
      visible: true,
      disabledReason: null,
    },
    {
      name: 'cancel',
      enabled: true,
      visible: true,
      disabledReason: null,
    },
    {
      name: 'prepare',
      enabled: true,
      visible: true,
      disabledReason: null,
    },
    {
      name: 'update',
      enabled: true,
      visible: true,
      disabledReason: null,
    },
    {
      name: 'add_order_item',
      enabled: true,
      visible: true,
      disabledReason: '',
    },
  ],
  attributes: [
    {
      name: 'buyer_company_id',
      enabled: true,
      visible: true,
      disabledReason: '',
    },
    {
      name: 'comment',
      enabled: true,
      visible: true,
      disabledReason: '',
    },
    {
      name: 'delivery_date',
      enabled: true,
      visible: true,
      disabledReason: '',
    },
    {
      name: 'delivery_location_id',
      enabled: true,
      visible: true,
      disabledReason: '',
    },
    {
      name: 'entered_price_unit_id',
      enabled: true,
      visible: true,
      disabledReason: '',
    },
    {
      name: 'gln_association_id',
      enabled: true,
      visible: true,
      disabledReason: '',
    },
    {
      name: 'items',
      enabled: true,
      visible: true,
      disabledReason: '',
    },
    {
      name: 'marketplace_id',
      enabled: true,
      visible: true,
      disabledReason: '',
    },
    {
      name: 'price',
      enabled: true,
      visible: true,
      disabledReason: '',
    },
    {
      name: 'printed',
      enabled: true,
      visible: true,
      disabledReason: '',
    },
    {
      name: 'po_number',
      enabled: true,
      visible: true,
      disabledReason: '',
    },
    {
      name: 'provider_comment_delivery_note',
      enabled: true,
      visible: true,
      disabledReason: '',
    },
    {
      name: 'provider_internal_comment_order_note',
      enabled: true,
      visible: true,
      disabledReason: '',
    },
    {
      name: 'quantity',
      enabled: true,
      visible: true,
      disabledReason: '',
    },
    {
      name: 'quantity_unit_id',
      enabled: true,
      visible: true,
      disabledReason: '',
    },
    {
      name: 'shipping_date',
      enabled: true,
      visible: true,
      disabledReason: '',
    },
    {
      name: 'shipping_location_id',
      enabled: true,
      visible: true,
      disabledReason: '',
    },
    {
      name: 'status',
      enabled: true,
      visible: true,
      disabledReason: '',
    },
    {
      name: 'tour_id',
      enabled: true,
      visible: true,
      disabledReason: '',
    },
    {
      name: 'tour_pickup_time',
      enabled: true,
      visible: true,
      disabledReason: '',
    },
  ],
}

export const MOCK_ORDER_PERMISSIONS_NOT_VISIBLE: Permissions<
  OrderActions & OrderItemActions,
  OrderAttributes & OrderItemAttributes
> = {
  actions: [
    {
      name: 'add_order_item',
      enabled: true,
      visible: false,
      disabledReason: "can't update, sorry buddy",
    },
    {
      name: 'cancel',
      enabled: true,
      visible: false,
      disabledReason: "can't update, sorry buddy",
    },
    {
      name: 'prepare',
      enabled: true,
      visible: false,
      disabledReason: "can't update, sorry buddy",
    },
    {
      name: 'update',
      enabled: true,
      visible: false,
      disabledReason: "can't update, sorry buddy",
    },
  ],
  attributes: [],
}

export const MOCK_ORDER_PERMISSIONS_DISABLED: Permissions<
  OrderActions & OrderItemActions,
  OrderAttributes & OrderItemAttributes
> = {
  actions: [
    {
      name: 'add_order_item',
      enabled: false,
      visible: true,
      disabledReason: "can't update, sorry buddy",
    },
    {
      name: 'cancel',
      enabled: false,
      visible: true,
      disabledReason: "can't update, sorry buddy",
    },
    {
      name: 'prepare',
      enabled: false,
      visible: true,
      disabledReason: "can't update, sorry buddy",
    },
    {
      name: 'update',
      enabled: false,
      visible: true,
      disabledReason: "can't update, sorry buddy",
    },
  ],
  attributes: [
    {
      name: 'buyer_company_id',
      enabled: false,
      visible: true,
      disabledReason: "can't change buyer_company_id, sorry buddy",
    },
    {
      name: 'comment',
      enabled: false,
      visible: true,
      disabledReason: "can't change comment, sorry buddy",
    },
    {
      name: 'delivery_date',
      enabled: false,
      visible: true,
      disabledReason: "can't change delivery_date, sorry buddy",
    },
    {
      name: 'delivery_location_id',
      enabled: false,
      visible: true,
      disabledReason: "can't change delivery_location_id, sorry buddy",
    },
    {
      name: 'entered_price_unit_id',
      enabled: false,
      visible: true,
      disabledReason: "can't change entered_price_unit_id, sorry buddy",
    },
    {
      name: 'gln_association_id',
      enabled: false,
      visible: true,
      disabledReason: "can't change gln_association_id, sorry buddy",
    },
    {
      name: 'items',
      enabled: false,
      visible: true,
      disabledReason: "can't change items, sorry buddy",
    },
    {
      name: 'marketplace_id',
      enabled: false,
      visible: true,
      disabledReason: "can't change marketplace_id, sorry buddy",
    },
    {
      name: 'price',
      enabled: false,
      visible: true,
      disabledReason: "can't change price, sorry buddy",
    },
    {
      name: 'printed',
      enabled: false,
      visible: true,
      disabledReason: "can't change printed, sorry buddy",
    },
    {
      name: 'po_number',
      enabled: false,
      visible: true,
      disabledReason: "can't change po_number, sorry buddy",
    },
    {
      name: 'provider_comment_delivery_note',
      enabled: false,
      visible: true,
      disabledReason: "can't change provider_comment_delivery_note, sorry buddy",
    },
    {
      name: 'provider_internal_comment_order_note',
      enabled: false,
      visible: true,
      disabledReason: "can't change provider_internal_comment_order_note, sorry buddy",
    },
    {
      name: 'quantity',
      enabled: false,
      visible: true,
      disabledReason: "can't change quantity, sorry buddy",
    },
    {
      name: 'quantity_unit_id',
      enabled: false,
      visible: true,
      disabledReason: "can't change quantity_unit_id, sorry buddy",
    },
    {
      name: 'shipping_date',
      enabled: false,
      visible: true,
      disabledReason: "can't change shipping_date, sorry buddy",
    },
    {
      name: 'shipping_location_id',
      enabled: false,
      visible: true,
      disabledReason: "can't change shipping_location_id, sorry buddy",
    },
    {
      name: 'status',
      enabled: false,
      visible: true,
      disabledReason: "can't change status, sorry buddy",
    },
    {
      name: 'tour_id',
      enabled: false,
      visible: true,
      disabledReason: "can't change tour_id, sorry buddy",
    },
    {
      name: 'tour_pickup_time',
      enabled: false,
      visible: true,
      disabledReason: "can't change tour_pickup_time, sorry buddy",
    },
  ],
}

export const MOCK_ORDER_FORMATTED_PERMISSIONS = formatPermissions({
  permissions: MOCK_ORDER_PERMISSIONS,
})

export const MOCK_ORDER_FORMATTED_PERMISSIONS_NOT_VISIBLE = formatPermissions({
  permissions: MOCK_ORDER_PERMISSIONS_NOT_VISIBLE,
})

export const MOCK_ORDER_FORMATTED_PERMISSIONS_DISABLED = formatPermissions({
  permissions: MOCK_ORDER_PERMISSIONS_DISABLED,
})

export const MOCK_BUYER_ORDER_ITEM_PERMISSIONS: Permissions<
  BuyerOrderItemActions,
  BuyerOrderItemAttributes
> = {
  actions: [
    {
      name: 'add_dispatch_quantities',
      enabled: true,
      visible: true,
      disabledReason: null,
    },
    {
      name: 'cancel',
      enabled: true,
      visible: true,
      disabledReason: null,
    },
    {
      name: 'update',
      enabled: true,
      visible: true,
      disabledReason: null,
    },
    {
      name: 'update_dispatch_quantities',
      enabled: true,
      visible: true,
      disabledReason: null,
    },
  ],
  attributes: [
    {
      name: 'price',
      enabled: true,
      visible: true,
      disabledReason: null,
    },
    {
      name: 'entered_price_unit_id',
      enabled: true,
      visible: true,
      disabledReason: null,
    },
    {
      name: 'quantity',
      enabled: true,
      visible: true,
      disabledReason: null,
    },
    {
      name: 'quantity_unit_id',
      enabled: true,
      visible: true,
      disabledReason: null,
    },
  ],
}

export const MOCK_BUYER_ORDER_ITEM_FORMATTED_PERMISSIONS: FormattedBuyerOrderItemPermissions =
  formatPermissions({
    permissions: MOCK_BUYER_ORDER_ITEM_PERMISSIONS,
  }) as FormattedBuyerOrderItemPermissions

export const MOCK_SELLER_ORDER_ITEM_PERMISSIONS: Permissions<
  OrderItemActions,
  OrderItemAttributes
> = {
  actions: [
    {
      name: 'cancel',
      enabled: true,
      visible: true,
      disabledReason: null,
    },
    {
      name: 'update',
      enabled: true,
      visible: true,
      disabledReason: null,
    },
  ],
  attributes: [
    {
      name: 'price',
      enabled: true,
      visible: true,
      disabledReason: null,
    },
    {
      name: 'entered_price_unit_id',
      enabled: true,
      visible: true,
      disabledReason: null,
    },
    {
      name: 'quantity',
      enabled: true,
      visible: true,
      disabledReason: null,
    },
    {
      name: 'quantity_unit_id',
      enabled: true,
      visible: true,
      disabledReason: null,
    },
  ],
}

export const MOCK_SELLER_ORDER_ITEM_FORMATTED_PERMISSIONS = formatPermissions({
  permissions: MOCK_SELLER_ORDER_ITEM_PERMISSIONS,
}) as FormattedOrderItemPermissions
