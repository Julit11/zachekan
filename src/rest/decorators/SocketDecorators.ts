export function OnSuccess(eventName, errorEventName?, needThrowErrorInEvent?: boolean) {
  return (target: object, propertyKey: string, descriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function() {
      try {
        this.socket.emit(eventName, await originalMethod.apply(this, arguments));
      } catch (e) {
        if (errorEventName) {
          this.socket.emit(errorEventName, needThrowErrorInEvent ? e : undefined);
        }
      }
    };

    return descriptor;
  };
}
