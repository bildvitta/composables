import { useAppCanWrapper } from './use-app-can-wrapper'
import { type AppCanWrapperStore } from './use-app-can-wrapper.type'

import { describe, it, expect } from 'vitest'

const storeList: AppCanWrapperStore[] = [
  {
    mainCompanyOptions: [
      {
        label: 'Company 02',
        value: 'company-uuid02'
      }
    ],
    currentMainCompany: 'company-uuid02',
    isSuperuser: false,
    companyPermissions: {
      'company-uuid01': ['companies.list', 'companies.show'],
      'company-uuid02': ['users.list', 'users.show', 'companies.delete', 'users.dashboard', 'settings.edit'],
      'company-uuid03': ['companies.list', 'companies.show', 'companies.delete', 'users.edit'],
      'company-uuid04': ['settings.create', 'companies.show', 'companies.delete'],
      'company-uuid05': ['approvals.delete', 'companies.delete']
    }
  },

  {
    mainCompanyOptions: [
      {
        label: 'Company 02',
        value: 'company-uuid02'
      }
    ],
    currentMainCompany: 'company-uuid02',
    isSuperuser: true,
    companyPermissions: {
      'company-uuid01': ['companies.list'],
      'company-uuid02': ['users.list'],
      'company-uuid03': [],
      'company-uuid04': ['settings.create'],
      'company-uuid05': ['approvals.delete']
    }
  }
]

describe.each(storeList)('Permissionamento -> isSuperuser: $isSuperuser', (store) => {
  const {
    can,
    canList,
    canCreate,

    canByPermission,
    canEdit,
    canDelete,
    canShow
  } = useAppCanWrapper({ store })

  const { isSuperuser } = store

  it(`can -> isSuperUser: ${isSuperuser}`, () => {
    expect(can('users', { action: 'dashboard' })).toBe(true)
    expect(can('users', { action: 'list' })).toBe(true)
    expect(can('settings', { action: 'dashboard' })).toBe(isSuperuser)
    expect(can('settings', { action: '' })).toBe(isSuperuser)
    expect(can('settings', { action: 'create' })).toBe(true)
    expect(can({ users: { action: 'create' }, settings: { action: 'create' } })).toBe(true)
    expect(can({ users: { action: 'create' }, companies: { action: 'create' } })).toBe(isSuperuser)
  })

  it(`canList -> isSuperUser: ${isSuperuser}`, () => {
    expect(canList('users')).toBe(true)
    expect(canList('companies')).toBe(true)
    expect(canList('settings')).toBe(isSuperuser)
    expect(canList(['users', 'settings'])).toBe(true)
    expect(canList(['users', 'settings'])).toBe(true)
    expect(canList(['approvals', 'settings'])).toBe(isSuperuser)
  })

  it(`canCreate -> isSuperUser: ${isSuperuser}`, () => {
    expect(canCreate('users')).toBe(isSuperuser)
    expect(canCreate('companies')).toBe(isSuperuser)
    expect(canCreate('settings')).toBe(true)
    expect(canCreate(['users', 'settings'])).toBe(true)
    expect(canCreate(['approvals', 'users'])).toBe(isSuperuser)
  })

  it(`canByPermission -> isSuperUser: ${isSuperuser}`, () => {
    expect(canByPermission('users', { company: 'company1', action: 'dashboard' })).toBe(isSuperuser)
    expect(canByPermission('users', { company: 'company-uuid01', action: 'edit' })).toBe(isSuperuser)
    expect(canByPermission('users', { company: 'company-uuid03', action: 'edit' })).toBe(true)
    expect(canByPermission('users', { company: 'company-uuid04', action: 'dashboard' })).toBe(true)
    expect(canByPermission('users', { company: 'company-uuid05', action: 'edit' })).toBe(isSuperuser)

    expect(canByPermission({ users: { action: 'edit', company: ['company-uuid03'] } })).toBe(true)
    expect(canByPermission({ users: { action: 'edit', company: 'company-uuid03' } })).toBe(true)

    expect(canByPermission(
      {
        users: {
          action: 'edit',
          company: 'company-uuid03'
        },
        settings: {
          action: 'create',
          company: 'company-uuid04'
        }
      }
    )).toBe(true)

    expect(canByPermission(
      {
        users: {
          action: 'edit',
          company: 'company-uuid03'
        },
        settings: {
          action: 'create',
          company: 'company-uuid04'
        }
      }
    )).toBe(true)
  })

  it(`canEdit -> isSuperUser: ${isSuperuser}`, () => {
    expect(canEdit('users', { company: ['company-uuid01', 'company-uuid02'] })).toBe(isSuperuser)
    expect(canEdit('settings', { company: 'company-uuid05' })).toBe(true)
    expect(canEdit('users', { company: 'company-uuid03' })).toBe(true)

    expect(canEdit({
      settings: {
        company: 'company-uuid05'
      },

      users: {
        company: 'company-uuid03'
      }
    })).toBe(true)

    expect(canEdit({
      companies: {
        company: 'company-uuid05'
      },

      users: {
        company: 'company-uuid03'
      }
    })).toBe(true)
  })

  it(`canDelete -> isSuperUser: ${isSuperuser}`, () => {
    expect(canDelete('users', { company: ['company-uuid01', 'company-uuid02'] })).toBe(isSuperuser)
    expect(canDelete('companies', { company: 'company-uuid02' })).toBe(true)
    expect(canDelete('companies', { company: 'company-uuid01' })).toBe(true)

    expect(canDelete({
      companies: {
        company: 'company-uuid02'
      },

      users: {
        company: 'company-uuid03'
      }
    })).toBe(true)

    expect(canDelete({
      companies: {
        company: 'company-uuid02'
      },

      users: {
        company: 'company-uuid01'
      }
    })).toBe(true)
  })

  it(`canShow -> isSuperUser: ${isSuperuser}`, () => {
    expect(canShow('users', { company: ['company-uuid01', 'company-uuid02'] })).toBe(true)
    expect(canShow('companies', { company: 'company-uuid02' })).toBe(isSuperuser)
    expect(canShow('companies', { company: 'company-uuid01' })).toBe(true)

    expect(canShow({
      companies: {
        company: 'company-uuid02'
      },

      users: {
        company: 'company-uuid03'
      }
    })).toBe(true)

    expect(canShow({
      companies: {
        company: 'company-uuid02'
      },

      users: {
        company: 'company-uuid01'
      }
    })).toBe(true)
  })
})
