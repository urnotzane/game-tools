import Home from '@/views/Home/Home.vue';
import LolView from '@/views/Lol/LolView.vue'

export const routes = [
  { path: '/', component: Home },
  { path: '/lol', component: LolView },
  { path: '/valorant', component: Home },
]