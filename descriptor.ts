export const trycatch = (desc: string) => {
  return (target: any, name: any, descriptor: any) => {
    const method = descriptor.value;
    descriptor.value = (...args: any[]) => {
      const errHandler = (error: any) => {
        const param = args.length !== 0 ? JSON.stringify(args) : '';
        console.error(`(${desc}) 失敗: ${name}(${param}) =>`, error.stack);
        return error;
      }
      if (method.toString().trim().match(/awaiter/) || method.toString().trim().match(/Promise/)) {
        const ret: Promise<Response> = method.apply(target, args);
        ret.catch(errHandler);
        return ret;
      } else {
        let ret;
        try {
          ret = method.apply(target, args);
        } catch (error) {
          errHandler(error);
        }
        return ret;
      }
    }
  }
};
