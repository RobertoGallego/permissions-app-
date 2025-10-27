export interface Permission<T> {
  enabled: boolean
  name: T
  disabledReason: string | null
  visible: boolean
}

export interface Permissions<TActions extends string, TAttributes extends string> {
  actions: Permission<TActions>[]
  attributes: Permission<TAttributes>[]
}

export interface FormattedPermission {
  enabled: boolean
  disabledReason?: string
  visible: boolean
}

export interface FormattedPermissions<TActions extends string, TAttributes extends string> {
  actions: Record<TActions, FormattedPermission>
  attributes: Record<TAttributes, FormattedPermission>
}
