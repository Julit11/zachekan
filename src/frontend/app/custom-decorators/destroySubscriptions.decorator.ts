import {Subscription} from 'rxjs';

export interface IDestroySubscriptions {
  subscriptions: Subscription[];
}
export function DestroySubscriptions<TFunction extends Function>(target: TFunction): TFunction {
  const original = target.prototype.ngOnDestroy;

  if (target.prototype.destroySubscriptions) {
    throw 'You can not use \'destroySubscriptions\' function with this decorator';
  }

  target.prototype.destroySubscriptions = function() {
    const subscriptions: Subscription[] = this.subscriptions;
    if (this.subscriptions === undefined) {
      throw 'You should install \'IDestroySubscriptions\' interface in this class';
    }
    for (const subscription of subscriptions) {
      subscription.unsubscribe();
    }
  };

  target.prototype.ngOnDestroy = function() {
    this.destroySubscriptions();
    if (original) {
      original.call(this);
    }
  };

  return target;
}
