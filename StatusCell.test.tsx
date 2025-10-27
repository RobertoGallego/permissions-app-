import userEvent from '@testing-library/user-event'
import each from 'jest-each'
import React from 'react'

import { AppLocale } from '@common/utils'

import * as useCurrentBuyerCompany from 'src/components/presentationals/buyer-dashboard/shared/hooks/useCurrentBuyerCompany/useCurrentBuyerCompany'
import { getOrderItemStatusTranslation } from 'src/constants/constants'
import * as UserContext from 'src/contexts/userContext'
import {
  MOCK_STORE_BUYER_COMPANY_AS_BUYER,
  MOCK_STORE_SELLER_ORDER_ITEM,
  render,
  waitFor,
} from 'src/testing'
import {
  FormattedPermission,
  OrderItemActions,
  OrderItemResolution,
  OrderItemStatus,
  OrderStatus,
  Permission,
  UserType,
} from 'src/types'
import { updateActionPermission } from 'src/utils'

import { getOrderItemCancellationTranslation } from '../../OrderItem.utils'
import StatusCell, { StatusCellProps } from './StatusCell'

describe('StatusCell component:', () => {
  const mockUpdateOrderPermission: FormattedPermission = {
    disabledReason: undefined,
    enabled: true,
    visible: true,
  }

  const hiddenCancelOrderItemPermission: Permission<OrderItemActions> = {
    disabledReason: null,
    enabled: true,
    name: 'cancel',
    visible: false,
  }

  const cancelOrderItemPermission: Permission<OrderItemActions> = {
    disabledReason: null,
    enabled: true,
    name: 'cancel',
    visible: true,
  }

  const orderItemPermissions = updateActionPermission(MOCK_STORE_SELLER_ORDER_ITEM.permissions)(
    cancelOrderItemPermission
  )

  const props: StatusCellProps = {
    isCancellingOrderOrOrderItem: false,
    isDesynchronized: false,
    isPurchaseOrderItem: false,
    needsTraceability: false,
    onCancel: () => {},
    onEdit: async () => {},
    orderItem: { ...MOCK_STORE_SELLER_ORDER_ITEM, permissions: orderItemPermissions },
    orderStatus: OrderStatus.TO_PREPARE,
    updateOrderPermission: mockUpdateOrderPermission,
  }

  beforeEach(() => {
    jest.spyOn(useCurrentBuyerCompany, 'default').mockReturnValue({
      ...MOCK_STORE_BUYER_COMPANY_AS_BUYER,
      optionFlagCanEditOrder: true,
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should display an edit button, given TO_PREPARE order status and an optionFlagCanEditOrder set to true', () => {
    const view = render(<StatusCell {...props} orderStatus={OrderStatus.TO_PREPARE} />)
    expect(view.getByTestId('edit-order-item-menu-button')).toBeInTheDocument()
  })

  it('should display an edit button, given DRAFT order status and an optionFlagCanEditOrder set to true', () => {
    const view = render(<StatusCell {...props} orderStatus={OrderStatus.DRAFT} />)
    expect(view.getByTestId('edit-order-item-menu-button')).toBeInTheDocument()
  })

  it('should display an edit button, given PENDING order status and an optionFlagCanEditOrder set to true', () => {
    const view = render(<StatusCell {...props} orderStatus={OrderStatus.PENDING} />)
    expect(view.getByTestId('edit-order-item-menu-button')).toBeInTheDocument()
  })

  it('should display an edit button, given a TO PREPARE order, a PENDING order item and an optionFlagCanEditOrder set to true', () => {
    const view = render(
      <StatusCell
        {...props}
        orderItem={{ ...MOCK_STORE_SELLER_ORDER_ITEM, status: OrderItemStatus.PENDING }}
        orderStatus={OrderStatus.TO_PREPARE}
      />
    )

    expect(view.getByTestId('edit-order-item-menu-button')).toBeInTheDocument()
  })

  it('should display an edit button, given a PENDING order, a PENDING order item and an optionFlagCanEditOrder set to true', () => {
    const view = render(
      <StatusCell
        {...props}
        orderItem={{ ...MOCK_STORE_SELLER_ORDER_ITEM, status: OrderItemStatus.PENDING }}
        orderStatus={OrderStatus.DRAFT}
      />
    )

    expect(view.getByTestId('edit-order-item-menu-button')).toBeInTheDocument()
  })

  each([
    OrderStatus.CANCELLED,
    OrderStatus.INVOICED,
    OrderStatus.INVOICING,
    OrderStatus.VALIDATED,
  ]).it('should not display an edit button, given an order status set to %s', orderStatus => {
    const view = render(<StatusCell {...props} orderStatus={orderStatus} />)

    expect(view.queryByTestId('edit-order-item-menu-button')).not.toBeInTheDocument()
  })

  describe('Buyer user', () => {
    beforeEach(() => {
      jest
        .spyOn(UserContext, 'useUserType')
        .mockReturnValue({ isBuyer: true, userType: UserType.BUYER, isSeller: false })
    })

    afterEach(() => {
      jest.restoreAllMocks()
    })

    it('should not display an edit button, given TO_PREPARE order status and an optionFlagCanEditOrder set to false', () => {
      jest.spyOn(useCurrentBuyerCompany, 'default').mockReturnValue({
        ...MOCK_STORE_BUYER_COMPANY_AS_BUYER,
        optionFlagCanEditOrder: false,
      })

      const view = render(<StatusCell {...props} orderStatus={OrderStatus.TO_PREPARE} />)
      expect(view.queryByTestId('edit-order-item-menu-button')).not.toBeInTheDocument()
    })

    it('should display "cancelled" status with an InfoTip resolution, name of the cancelling person, and date of cancellation, given CANCELLED order item status', async () => {
      const permissions = updateActionPermission(MOCK_STORE_SELLER_ORDER_ITEM.permissions)(
        hiddenCancelOrderItemPermission
      )

      const view = render(
        <StatusCell
          {...props}
          orderItem={{
            ...MOCK_STORE_SELLER_ORDER_ITEM,
            status: OrderItemStatus.CANCELLED,
            resolution: OrderItemResolution.BUYER_CANCELLATION,
            permissions,
          }}
        />
      )
      const expectedResolutionTooltip = getOrderItemCancellationTranslation({
        itemResolution: OrderItemResolution.BUYER_CANCELLATION,
        itemStatusChangedBy: MOCK_STORE_SELLER_ORDER_ITEM.statusChangedBy,
        itemStatusChangedDate: MOCK_STORE_SELLER_ORDER_ITEM.statusChangedAt,
        locale: AppLocale.EN,
      })

      expect(view.queryByTestId('cancel-order-item-menu-button')).not.toBeInTheDocument()

      expect(view.getByTestId('order-item-status')).toHaveTextContent(
        getOrderItemStatusTranslation(OrderItemStatus.CANCELLED)
      )

      expect(view.getByTestId('order-item-resolution')).toBeInTheDocument()

      userEvent.hover(view.getByTestId('order-item-resolution'))

      expect(await view.findByTestId('order-item-resolution--tooltip')).toHaveTextContent(
        expectedResolutionTooltip
      )
    })

    it('should display "rejected" status, given REJECTED order item status', () => {
      const permissions = updateActionPermission(MOCK_STORE_SELLER_ORDER_ITEM.permissions)(
        hiddenCancelOrderItemPermission
      )

      const view = render(
        <StatusCell
          {...props}
          orderItem={{
            ...MOCK_STORE_SELLER_ORDER_ITEM,
            status: OrderItemStatus.REJECTED,
            permissions,
          }}
        />
      )

      expect(view.queryByTestId('cancel-order-item-menu-button')).not.toBeInTheDocument()

      expect(view.getByTestId('order-item-status')).toHaveTextContent(
        getOrderItemStatusTranslation(OrderItemStatus.REJECTED)
      )
    })

    it('should display "pending" status, given PENDING order item status', () => {
      const view = render(
        <StatusCell
          {...props}
          orderItem={{ ...MOCK_STORE_SELLER_ORDER_ITEM, status: OrderItemStatus.PENDING }}
        />
      )

      expect(view.getByTestId('cancel-order-item-menu-button')).toBeInTheDocument()

      expect(view.getByTestId('order-item-status')).toHaveTextContent(
        getOrderItemStatusTranslation(OrderItemStatus.PENDING)
      )
    })

    it('should close contextual menu without sending "onCancel" event, clicking on "close" button', async () => {
      const onCancel = jest.fn()
      const view = render(<StatusCell {...props} onCancel={onCancel} />)

      const cancelButton = view.getByTestId('cancel-order-item-menu-button')

      userEvent.click(cancelButton)

      await waitFor(async () => {
        const abortButton = view.getByTestId('cancel-order-item-abort-button')

        expect(view.getByTestId('cancel-order-item-contextual-menu')).toBeInTheDocument()

        userEvent.click(abortButton)

        expect(await view.getByTestId('cancel-order-item-contextual-menu')).not.toBeInTheDocument()
        expect(onCancel).not.toHaveBeenCalled()
      })
    })
  })

  describe('SellerUser', () => {
    beforeEach(() => {
      jest
        .spyOn(UserContext, 'useUserType')
        .mockReturnValue({ isBuyer: false, isSeller: true, userType: UserType.SELLER })

      jest.spyOn(useCurrentBuyerCompany, 'default').mockReturnValue(undefined)
    })

    it('should not display a cancel button, even given the permission to show the cancel button', () => {
      const permissions = updateActionPermission(MOCK_STORE_SELLER_ORDER_ITEM.permissions)(
        cancelOrderItemPermission
      )

      const view = render(
        <StatusCell {...props} orderItem={{ ...MOCK_STORE_SELLER_ORDER_ITEM, permissions }} />
      )

      expect(view.queryByTestId('cancel-order-item-menu-button')).not.toBeInTheDocument()
    })

    it('should not display a cancel button, given no permission to show the cancel button', () => {
      const permissions = updateActionPermission(MOCK_STORE_SELLER_ORDER_ITEM.permissions)(
        hiddenCancelOrderItemPermission
      )

      const view = render(
        <StatusCell {...props} orderItem={{ ...MOCK_STORE_SELLER_ORDER_ITEM, permissions }} />
      )

      expect(view.queryByTestId('cancel-order-item-menu-button')).not.toBeInTheDocument()
    })

    it('should display a cancel button, given isPurchaseOrderItem set to true and given the permission to show the cancel button', () => {
      const view = render(<StatusCell {...props} isPurchaseOrderItem />)

      expect(view.getByTestId('cancel-order-item-menu-button')).toBeInTheDocument()
    })

    it('should display "To complete" status, given an order item with "needsTraceability" set to true', () => {
      const view = render(<StatusCell {...props} needsTraceability />)
      expect(view.getByTestId('order-item-status')).toHaveTextContent('To complete')
    })

    it('should display a desynchronized tag, given isDesyncrhonized set to true', () => {
      const view = render(<StatusCell {...props} isDesynchronized />)
      expect(view.getByTestId('order-item-desynchronized')).toBeInTheDocument()
    })

    it('should not display a desynchronized tag, given isDesyncrhonized set to false', () => {
      const view = render(<StatusCell {...props} isDesynchronized={false} />)
      expect(view.queryByTestId('order-item-desynchronized')).not.toBeInTheDocument()
    })

    it('should not display a desynchronized tag, given isDesynchronized set to true and itemStatus set to CANCELLED', () => {
      const view = render(
        <StatusCell
          {...props}
          isDesynchronized
          orderItem={{ ...MOCK_STORE_SELLER_ORDER_ITEM, status: OrderItemStatus.CANCELLED }}
        />
      )

      expect(view.queryByTestId('order-item-desynchronized')).not.toBeInTheDocument()
    })

    it('should not display a desynchronized tag, given isDesynchronized set to true and itemStatus set to REJECTED', () => {
      const view = render(
        <StatusCell
          {...props}
          isDesynchronized
          orderItem={{ ...MOCK_STORE_SELLER_ORDER_ITEM, status: OrderItemStatus.REJECTED }}
        />
      )

      expect(view.queryByTestId('order-item-desynchronized')).not.toBeInTheDocument()
    })

    it('should display an edit button, given DRAFT order status and no logistic mode', () => {
      const view = render(<StatusCell {...props} orderStatus={OrderStatus.DRAFT} />)
      expect(view.getByTestId('edit-order-item-menu-button')).toBeInTheDocument()
    })

    it('should display an edit button, given TO_PREPARE order status and an optionFlagCanEditOrder set to false', () => {
      jest.spyOn(useCurrentBuyerCompany, 'default').mockReturnValue({
        ...MOCK_STORE_BUYER_COMPANY_AS_BUYER,
        optionFlagCanEditOrder: false,
      })

      const view = render(<StatusCell {...props} orderStatus={OrderStatus.TO_PREPARE} />)
      expect(view.getByTestId('edit-order-item-menu-button')).toBeInTheDocument()
    })

    it('should display an edit button, given an order to prepare with a Direct logistic mode', () => {
      const view = render(
        <StatusCell {...props} orderStatus={OrderStatus.TO_PREPARE} orderLogisticMode="DIRECT" />
      )
      expect(view.getByTestId('edit-order-item-menu-button')).toBeInTheDocument()
    })

    it('should display an edit button, given an order to prepare with a CD1 logistic mode', () => {
      const view = render(
        <StatusCell {...props} orderStatus={OrderStatus.TO_PREPARE} orderLogisticMode="CD1" />
      )
      expect(view.getByTestId('edit-order-item-menu-button')).toBeInTheDocument()
    })

    it('should not display an edit button, given an order to prepare with a CD2 logistic mode', () => {
      const view = render(
        <StatusCell {...props} orderStatus={OrderStatus.TO_PREPARE} orderLogisticMode="CD2" />
      )
      expect(view.queryByTestId('edit-order-item-menu-button')).not.toBeInTheDocument()
    })
  })
})
