import { toggleContextMenuAC } from '../store/context-menu-store';

export interface IApp {
  isAuth: boolean,
  isOpenContextMenu: boolean,
  toggleContextMenu: typeof toggleContextMenuAC,
}
