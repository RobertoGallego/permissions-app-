import { reduce } from 'lodash'

import { camelCasifyProperties } from 'src/services/Api.utils'
import {
  FormattedPermission,
  FormattedPermissions,
  OrderFormattedActions,
  OrderFormattedAttributes,
  Permission,
  Permissions,
} from 'src/types'

export const defaultFormattedPermission: FormattedPermissions<
  OrderFormattedActions,
  OrderFormattedAttributes
> = {
  actions: {
    approve: { enabled: true, disabledReason: '', visible: true },
    cancel: { enabled: true, disabledReason: '', visible: true },
    prepare: { enabled: true, disabledReason: '', visible: true },
    update: { enabled: true, disabledReason: '', visible: true },
    addOrderItem: { enabled: true, disabledReason: '', visible: true },
  },
  attributes: {
    buyerCompanyId: { enabled: true, disabledReason: '', visible: true },
    comment: { enabled: true, disabledReason: '', visible: true },
    deliveryDate: { enabled: true, disabledReason: '', visible: true },
    deliveryLocationId: { enabled: true, disabledReason: '', visible: true },
    enteredPriceUnitId: { enabled: true, disabledReason: '', visible: true },
    glnAssociationId: { enabled: true, disabledReason: '', visible: true },
    items: { enabled: true, disabledReason: '', visible: true },
    marketplaceId: { enabled: true, disabledReason: '', visible: true },
    price: { enabled: true, disabledReason: '', visible: true },
    printed: { enabled: true, disabledReason: '', visible: true },
    poNumber: { enabled: true, disabledReason: '', visible: true },
    providerCommentDeliveryNote: { enabled: true, disabledReason: '', visible: true },
    providerInternalCommentOrderNote: { enabled: true, disabledReason: '', visible: true },
    quantity: { enabled: true, disabledReason: '', visible: true },
    quantityUnitId: { enabled: true, disabledReason: '', visible: true },
    shippingDate: { enabled: true, disabledReason: '', visible: true },
    shippingLocationId: { enabled: true, disabledReason: '', visible: true },
    status: { enabled: true, disabledReason: '', visible: true },
    tourId: { enabled: true, disabledReason: '', visible: true },
    tourPickupTime: { enabled: true, disabledReason: '', visible: true },
  },
}

interface FormatPermissionsArgs<TActions extends string, TAttributes extends string> {
  permissions: Permissions<TActions, TAttributes> | undefined
}

type FormatPermissionsResult<
  TFormattedActions extends string,
  TFormattedAttributes extends string,
> =
  | FormattedPermissions<TFormattedActions, TFormattedAttributes>
  | FormattedPermissions<OrderFormattedActions, OrderFormattedAttributes>

export const formatPermissions = <
  TActions extends string,
  TAttributes extends string,
  TFormattedActions extends string,
  TFormattedAttributes extends string,
>({
  permissions,
}: FormatPermissionsArgs<TActions, TAttributes>): FormatPermissionsResult<
  TFormattedActions,
  TFormattedAttributes
> => {
  if (!permissions) {
    return defaultFormattedPermission
  }

  const formattedActions = reduce<
    Permission<TActions>,
    Record<TFormattedActions, FormattedPermission>
  >(
    permissions.actions,
    (formattedPermissions, permission) => ({
      ...formattedPermissions,
      [permission.name]: {
        enabled: permission.enabled,
        disabledReason: permission.disabledReason ?? undefined,
        visible: permission.visible,
      },
    }),
    {} as Record<TFormattedActions, FormattedPermission>
  )

  const formattedAttributes = reduce<
    Permission<TAttributes>,
    Record<TFormattedAttributes, FormattedPermission>
  >(
    permissions.attributes,
    (formattedPermissions, permission) => ({
      ...formattedPermissions,
      [permission.name]: {
        enabled: permission.enabled,
        disabledReason: permission.disabledReason ?? undefined,
        visible: permission.visible,
      },
    }),
    {} as Record<TFormattedAttributes, FormattedPermission>
  )

  return {
    actions: camelCasifyProperties(formattedActions),
    attributes: camelCasifyProperties(formattedAttributes),
  }
}
