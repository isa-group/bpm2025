import { createRouter, createWebHashHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../components/TabsPage.vue'
import AuthPage from "@/views/auth/AuthPage.vue";
import ProfilePage from "@/views/auth/ProfilePage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/home'
  },

  {
    path: '/tabs/',
    component: TabsPage,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        redirect: '/tabs/home'
      },
      {
        path: 'home',
        component: () => import('@/views/TabHome.vue')
      },
      {
        path: 'calendar/:id?',
        name: 'agenda',
        component: () => import('@/views/calendar/TabAgenda.vue'),
      },
      {
        path: '/calendar-view',
        name: 'CalendarView',
        component: () => import('@/views/calendar/TabCalendar.vue')
      },
      {
        path: 'attendees',
        component: () => import('@/views/attendees/TabAttendees.vue'),
      },
      {
        path: '/attendee/:id',
        name: 'AttendeeDetail',
        component: () => import('@/views/attendees/TabAttendeeDetail.vue')
      },
      {
        path: 'images/:forceReload?',
        component: () => import('@/views/gallery/TabGallery.vue')
      },
      {
        path: 'images/myGallery',
        component: () => import('@/views/gallery/TabMyGallery.vue')
      },
      {
        path: 'singleimage/:imageId',
        component: () => import('@/views/gallery/TabGallerySingleImage.vue')
      },
      {
        path: 'messages',
        component: () => import('@/views/messages/TabMessages.vue')
      },
      {
        path: 'page/:id',
        component: () => import('@/views/pages/TabSinglePage.vue')
      },
      {
        path: 'about',
        component: () => import('@/views/TabAbout.vue')
      }
    ]
  },
  {
    path: '/auth/',
    component: AuthPage,
    children: [
      {
        path: '',
        redirect: '/auth/login'
      },
      {
        path: 'login',
        component: () => import('@/views/auth/AuthLogin.vue')
      },
      {
        path: 'register/:token',
        component: () => import('@/views/auth/AuthRegister.vue'),
        props: true // Pass route.params to the component as props
      },
      {
        path: 'login/resetpassword',
        component: () => import('@/views/auth/AuthResetPassword.vue')
      },
      {
        path: 'login/resetpassword/:token',
        component: () => import('@/views/auth/AuthResetPasswordWithToken.vue'),
        props: true // Pass route.params to the component as props
      }
    ]
  },
  {
    path: '/profile/',
    component: ProfilePage,
    children: [
      {
        path:'',
        redirect: '/profile/settings'
      },
      {
        path:'settings',
        component: () => import('@/views/auth/ProfileSettings.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    //Authentication check
    const token = localStorage.getItem('accessToken');
    if (token) {
      return next();
    }
    return next('/auth/login');
  }
  next();
})


export default router
