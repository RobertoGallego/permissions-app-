import { FormattedPermissions, Permissions } from 'src/types'

import { defaultFormattedPermission, formatPermissions } from './formatPermissions'

describe('formatPermissions', () => {
  type Actions = 'update' | 'cancel' | 'create'
  type Attributes = 'seller_company_id' | 'calibre_id' | 'origin_id'

  type FormattedActions = 'update' | 'cancel' | 'create'
  type FormattedAttributes = 'sellerCompanyId' | 'calibreId' | 'originId'

  it('should return empty permissions objects, given empty permissions arrays', () => {
    const emptyPermissions: Permissions<string, string> = {
      actions: [],
      attributes: [],
    }

    const emptyFormattedPermissions: FormattedPermissions<string, string> = {
      actions: {},
      attributes: {},
    }

    expect(formatPermissions({ permissions: emptyPermissions })).toEqual(emptyFormattedPermissions)
  })

  it('should return a default permissions objects, given undefined permissions arrays', () => {
    expect(formatPermissions({ permissions: undefined })).toEqual(defaultFormattedPermission)
  })

  it('should return permissions objects matching the permissions arrays, with camelCasified properties', () => {
    const permissions: Permissions<Actions, Attributes> = {
      actions: [
        {
          name: 'cancel',
          enabled: true,
          visible: true,
          disabledReason: '',
        },
        {
          name: 'create',
          enabled: false,
          visible: false,
          disabledReason: "can't create for some reasons",
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
          name: 'seller_company_id',
          enabled: true,
          visible: true,
          disabledReason: '',
        },
        {
          name: 'calibre_id',
          enabled: false,
          visible: false,
          disabledReason: "can't update this field",
        },
        {
          name: 'origin_id',
          enabled: false,
          visible: true,
          disabledReason: "can't update this field",
        },
      ],
    }

    const formattedPermissions: FormattedPermissions<FormattedActions, FormattedAttributes> = {
      actions: {
        cancel: {
          enabled: true,
          visible: true,
          disabledReason: '',
        },
        create: {
          enabled: false,
          visible: false,
          disabledReason: "can't create for some reasons",
        },
        update: {
          enabled: false,
          visible: true,
          disabledReason: "can't update, sorry buddy",
        },
      },
      attributes: {
        sellerCompanyId: {
          enabled: true,
          visible: true,
          disabledReason: '',
        },
        calibreId: {
          enabled: false,
          visible: false,
          disabledReason: "can't update this field",
        },
        originId: {
          enabled: false,
          visible: true,
          disabledReason: "can't update this field",
        },
      },
    }

    expect(formatPermissions({ permissions })).toEqual(formattedPermissions)
  })

  it('should convert a null disabledReason into undefined', () => {
    const permissions: Permissions<'update', 'seller_company_id'> = {
      actions: [
        {
          name: 'update',
          enabled: true,
          visible: true,
          disabledReason: null,
        },
      ],
      attributes: [
        {
          name: 'seller_company_id',
          enabled: true,
          visible: true,
          disabledReason: null,
        },
      ],
    }

    const formattedPermissions: FormattedPermissions<'update', 'sellerCompanyId'> = {
      actions: {
        update: {
          enabled: true,
          visible: true,
          disabledReason: undefined,
        },
      },
      attributes: {
        sellerCompanyId: {
          enabled: true,
          visible: true,
          disabledReason: undefined,
        },
      },
    }

    expect(formatPermissions({ permissions })).toEqual(formattedPermissions)
  })
})
