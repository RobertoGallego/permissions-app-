import React from 'react'

import { useCurrentBuyerCompany } from 'src/components/presentationals/buyer-dashboard/shared/hooks'
import { getOrderItemStatusTranslation } from 'src/constants/constants'
import { useUserType } from 'src/contexts/userContext'
import { useLocale } from 'src/hooks'
import {
  BuyerOrder,
  BuyerOrderItem,
  EditOrderItemFormValue,
  FormattedPermission,
  OrderItemStatus,
  OrderStatus,
  SellerOrderItem,
} from 'src/types'
import { formatPermissions } from 'src/utils'

import { getOrderItemCancellationTranslation } from '../../OrderItem.utils'
import CancelOrderItemContextMenu from './CancelOrderItemContextMenu/CancelOrderItemContextMenu'
import EditOrderItemContextMenu from './EditOrderItemContextMenu/EditOrderItemContextMenu'

export interface StatusCellProps {
  isCancellingOrderOrOrderItem: boolean
  isDesynchronized: boolean
  isPurchaseOrderItem: boolean
  needsTraceability: boolean
  onCancel: () => void
  onEdit: (formValue: EditOrderItemFormValue) => Promise<void> | undefined
  orderItem: BuyerOrderItem | SellerOrderItem
  orderLogisticMode?: BuyerOrder['logisticMode']
  orderStatus: OrderStatus
  shippingLocationId?: Id | null
  updateOrderPermission?: FormattedPermission
}

const StatusCell = ({
  isCancellingOrderOrOrderItem,
  isDesynchronized,
  isPurchaseOrderItem,
  needsTraceability,
  onCancel,
  onEdit,
  orderItem,
  orderLogisticMode,
  orderStatus,
  shippingLocationId,
  updateOrderPermission,
}: StatusCellProps) => {
  const { isBuyer, isSeller } = useUserType()
  const locale = useLocale()
  const {
    status: itemStatus,
    resolution: itemResolution,
    statusChangedAt: itemStatusChangedDate,
    statusChangedBy: itemStatusChangedBy,
  } = orderItem

  const currentBuyerCompany = useCurrentBuyerCompany()

  const permissions = formatPermissions({
    permissions: orderItem.permissions,
  })

  const canDisplayEditOrderItem =
    ((isSeller && orderLogisticMode !== 'CD2') || !!currentBuyerCompany?.optionFlagCanEditOrder) &&
    (orderStatus === OrderStatus.DRAFT ||
      orderStatus === OrderStatus.PENDING ||
      orderStatus === OrderStatus.TO_PREPARE) &&
    (itemStatus === OrderItemStatus.ACCEPTED || itemStatus === OrderItemStatus.PENDING)

  const isNeedTracabilityVisible = isSeller && needsTraceability

  const isCancelButtonVisible =
    (isBuyer || isPurchaseOrderItem) && permissions.actions.cancel.visible

  return (
    <div>
      {(itemStatus === OrderItemStatus.CANCELLED || itemStatus === OrderItemStatus.REJECTED) && (
        <Inline alignment="center" spacing="xsmall" noWrap>
          <Chip data-e2e="order-item-status" variant="danger">
            {getOrderItemStatusTranslation(itemStatus)}
          </Chip>
          {!!itemResolution && (
            <Infotip
              data-e2e="order-item-resolution"
              helpText={getOrderItemCancellationTranslation({
                itemResolution,
                itemStatusChangedBy,
                itemStatusChangedDate,
                locale,
              })}
            />
          )}
        </Inline>
      )}

      {itemStatus === OrderItemStatus.PENDING && (
        <Chip data-e2e="order-item-status" variant="warning">
          {getOrderItemStatusTranslation(itemStatus)}
        </Chip>
      )}

      {isNeedTracabilityVisible && (
        <Chip data-e2e="order-item-status" variant="warning">
          {gettext('To complete')}
        </Chip>
      )}

      {isDesynchronized &&
        itemStatus !== OrderItemStatus.CANCELLED &&
        itemStatus !== OrderItemStatus.REJECTED && (
          <Chip data-e2e="order-item-desynchronized" variant="pending">
            {gettext('Desync.')}
          </Chip>
        )}

      {canDisplayEditOrderItem && (
        <EditOrderItemContextMenu
          onEdit={onEdit}
          orderItem={orderItem}
          shippingLocationId={shippingLocationId}
          updateOrderPermission={updateOrderPermission}
        />
      )}

      {isCancelButtonVisible && (
        <CancelOrderItemContextMenu
          cancelPermission={permissions.actions.cancel}
          isCancellingOrderOrOrderItem={isCancellingOrderOrOrderItem}
          onCancel={onCancel}
          orderItem={orderItem}
        />
      )}
    </div>
  )
}

export default StatusCell
