import Home from '@/views/Home/Home.vue';
import LolView from '@/views/Lol/LolView.vue'
import LolMenus from '@/views/Lol/modules/LolMenus.vue'
import BpView from '@/views/Lol/modules/bp/Bp.vue'
import CreateLobby from '@/views/Lol/modules/gameUtils/CreateLobby.vue'
import { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  { path: '/home', component: Home },
  {
    path: '/lol', component: LolView, children: [
      { path: '', component: LolMenus },
      { path: 'bp', component: BpView },
      { path: 'createLobby', component: CreateLobby },
    ]
  },
  { path: '/valorant', component: Home },
]