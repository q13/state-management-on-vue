/**
 * provide/inject hoist
 */
import { defineComponent, reactive, toRaw, getCurrentInstance } from 'vue';

const hoistValues = new Map();
const hoistKeys = new WeakMap();

export function provide(key, value) {
  const currentInstance = getCurrentInstance();
  // 存储 value
  const valueList = hoistValues[key] || [];
  if (!valueList.some((item) => {
    if (item['instance'] === currentInstance) {
      item['value'] = value; // 直接替换
      return true;
    }
  })) {
    valueList.push({
      instance: currentInstance,
      value
    });
  }
  hoistValues[key] = valueList;
  // resolve异步inject
  if (hoistValues[key].__p) {
    hoistValues[key].__resolve(valueList[0].value);
  }

  // 存储 key
  hoistKeys.set(currentInstance, (hoistKeys.get(currentInstance) || []).filter((item) => {
    return item !== key;
  }).concat(key));

  // 随组件销毁数据源
  const hooks = currentInstance['bum'] || [];
  hooks.unshift(() => {
    const keys = hoistKeys.get(currentInstance) || [];
    keys.forEach((key) => {
      const valueList = hoistValues[key] || [];
      hoistValues[key] = valueList.filter((item) => {
        return item['instance'] !== currentInstance;
      });
    });
    hoistKeys.delete(currentInstance);
    console.log('hoist', hoistKeys, hoistValues);
  });
  currentInstance['bum'] = hooks;
  // console.log('currentInstance', currentInstance);
}

export function inject(key) {
  const valueList = hoistValues[key] || [];
  if (valueList.length) {
    return valueList[valueList.length - 1]['value'];
  }
}

export function injectAsync(key) {
  const valueList = hoistValues[key] || [];
  if (valueList.length) {
    delete hoistValues[key].__p;
    delete hoistValues[key].__resolve;
    return new Promise((resolve) => {
      resolve(valueList[valueList.length - 1]['value']);
    });
  } else {
    hoistValues[key] = [];
    let promise = hoistValues[key].__p;
    if (!promise) {
      promise = new Promise((resolve) => {
        hoistValues[key].__resolve = resolve;
      });
      hoistValues[key].__p = promise;
    }
    return promise;
  }
}

/**
 * 输出 [state, setState] 值形式, 依赖Object.assign浅merge
 * @param { any } state - 待分发的状态
 */
export function useStateSimple(state, interceptor = (_ => _)) {
  return [readonly(state), (data) => {
    Object.assign(state, interceptor(data));
  }];
}
