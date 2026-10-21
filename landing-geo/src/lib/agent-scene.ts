export type SceneState = {
  initialized: boolean;
  entered: boolean;
  inView: boolean;
  visible: boolean;
  reduced: boolean;
  paused: boolean;
};

export type SceneEvent =
  | { type: 'environment'; inView: boolean; visible: boolean; reduced: boolean }
  | { type: 'toggle' };

export const initialScene: SceneState = {
  initialized: false,
  entered: false,
  inView: false,
  visible: true,
  reduced: false,
  paused: false,
};

export function sceneReducer(state: SceneState, event: SceneEvent): SceneState {
  if (event.type === 'environment') {
    return {
      ...state,
      initialized: true,
      entered: state.entered || (event.inView && event.visible && !event.reduced),
      inView: event.inView,
      visible: event.visible,
      reduced: event.reduced,
    };
  }
  return { ...state, paused: !state.paused };
}

export function scenePlayback(state: SceneState) {
  const animated = state.initialized && state.entered && !state.reduced;
  const playing = animated && state.inView && state.visible && !state.paused;
  return { animated, playing };
}
