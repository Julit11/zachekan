import 'reflect-metadata';
import {BehaviorSubject} from 'rxjs';

export default function SaveBehaviorSubject(defauld: any, toType?: 'number' | 'boolean' | 'object'): any {
  return function(target: Object, propertyKey: string | symbol) {
    if (typeof window !== 'undefined') {
      const uid = target.constructor.name + '/' + propertyKey.toString();

      let curVal = window.localStorage.getItem(uid);
      // const propType = Reflect.getMetadata('design:type', target, propertyKey);

      // TODO AUTOTYPE

      if (curVal === undefined || curVal === null || curVal === '') {
        curVal = defauld;
        let toSave = curVal;
        if (curVal === 'object') {
          toSave = JSON.stringify(toSave);
        }
        window.localStorage.setItem(uid, toSave);
      }

      const subject: BehaviorSubject<any> = new BehaviorSubject((filter(curVal, toType)));

      const originalNext = subject.next;
      const originalGetValue = subject.getValue;

      subject.next = function(arg: any) {
        let toSave = arg;
        if (typeof arg === 'object') {
          toSave = JSON.stringify(arg);
        }

        window.localStorage.setItem(uid, toSave !== undefined ? toSave.toString() : '');

        originalNext.call(this, arg);
      };

      subject.getValue = function() {
        const value = originalGetValue.call(this);
        return filter(value, toType);
      };

      const descriptor = Object.getOwnPropertyDescriptor(target, propertyKey)
        || {configurable: true, enumerable: true};

      descriptor.value = subject;

      return descriptor;
    } else {
      return new BehaviorSubject(undefined);
    }
  };
}


export function SaveProperty(defauld: any, toType?: 'number' | 'boolean'): any {
  return function(target: Object, propertyKey: string | symbol) {
    if (typeof window !== 'undefined') {
      const uid = target.constructor.name + '/' + propertyKey.toString();

      let curVal = filter(window.localStorage.getItem(uid), toType);

      // TODO AUTOTYPE

      if (curVal === undefined || curVal === null) {
        curVal = defauld;
        if (curVal === undefined) {
          curVal = '';
        }
        window.localStorage.setItem(uid, curVal.toString());
      }

      const descriptor = Object.getOwnPropertyDescriptor(target, propertyKey)
        || {configurable: true, enumerable: true};

      const originalGet = descriptor.get || (() => curVal);
      const originalSet = descriptor.set || (val => curVal = val);
      descriptor.get = originalGet;
      descriptor.set = function(newVal) {
        if (curVal !== newVal) {
          curVal = newVal;

          if (curVal === undefined) {
            curVal = '';
          }

          window.localStorage.setItem(uid, curVal.toString());
        }
        originalSet.call(this, newVal);
      };

      Object.defineProperty(target, propertyKey, descriptor);

      return descriptor;
    }
  };
}

function filter(value, toType: string) {
  if (value === null) {
    return null;
  }

  if (toType === 'boolean') {
    if (value.toString() !== 'true' && value.toString() !== 'false' && value.toString() !== '0' && value.toString() !== '1') {
      throw new Error('Invalid datatype');
    }
    if (value.toString() === 'true' || value.toString() === '1') {
      return true;
    } else {
      return false;
    }
  }

  if (toType === 'number') {
    return +value;
  }

  if (toType === 'object' && typeof value !== 'object') {
    return JSON.parse(value);
  }

  if (!toType && value === 'undefined') {
    return undefined;
  }

  return value;
}
