import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { RouterReducerState, routerReducer, RouterStateSerializer } from '@ngrx/router-store';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Params } from '@angular/router';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export interface State {
  router: RouterReducerState<RouterStateUrl>
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer
};

export const getRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState;
    const { queryParams } = routerState.root;
    let state: ActivatedRouteSnapshot = routerState.root;

    while(state.firstChild) {
      state = state.firstChild;
    }

    return { url, queryParams, params: state.params };
  }
}
