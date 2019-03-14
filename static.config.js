import {Document} from './src/components/Document'

import majors from './src/core/majors'
import questions from './src/core/questions'

const majorRoutes = majors.map(major => ({
  path: '/' + major,
  component: 'src/pages/major'
}))

const steps = [1, 2, 3]

const formRoutes = majors
  .map(major =>
    steps.map(step => ({
      path: '/' + major + '/step' + step,
      component: 'src/pages/step' + step
    }))
  )
  .reduce((prev, cur) => [...prev, ...cur])

const verifyRoutes = majors.map(major => ({
  path: '/' + major + '/verify',
  component: 'src/pages/verify'
}))

const majorQuestionRoutes = majors.map(major => ({
  path: '/' + major + '/step4',
  component: 'src/pages/step4',
  getData: () => ({questions: questions[major]})
}))

export default {
  siteRoot: '/',
  Document,
  plugins: [
    'react-static-plugin-emotion',
    ['react-static-plugin-typescript', {typeCheck: false}],
    'react-static-plugin-sass'
  ],
  getSiteData: () => ({
    title: "Junior Webmaster Camp"
  }),
  getRoutes: () => [
    {
      path: '/',
      component: 'src/pages/index'
    },
    ...majorRoutes,
    ...formRoutes,
    ...verifyRoutes,
    ...majorQuestionRoutes,
    {
      path: '/thankyou',
      component: 'src/pages/thankyou'
    },
    {
      path: '/change_denied',
      component: 'src/pages/change_denied'
    },
    {
      path: '404',
      component: 'src/pages/404'
    }
  ]
}
