export const LANGUAGES = {
  ru: 'ru',
  en: 'en',
}

export const THEME = {
  dark: 'dark',
  light: 'light',
}

export const ROUTES = {
  default: '/',
  login: '/login',
  register: '/register',
  isAuthed: {
    dashboard: '/dashboard',
    dashboardNew: '/dashboard/all/new',
    dashboardEdit: (id: string) => `/dashboard/all/edit/${id}`,
    dashboardRemove: (id: string) => `/dashboard/all/remove/${id}`,
  },
}

export const EMAIL_REGEX =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
