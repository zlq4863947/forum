import { trycatch } from './descriptor';
import * as assert from 'power-assert';

class Test {
  @trycatch('syncOK実行')
  syncOK() {
    return 'ok';
  }

  @trycatch('syncNG実行')
  syncNG() {
    throw new Error('同期関数が失敗');
  }

  @trycatch('asyncOK実行')
  asyncOK() {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        resolve('ok');
      }, 1000)
    )
  }

  @trycatch('asyncNG実行')
  asyncNG() {
    return new Promise(function (resolve, reject) {
      reject(new Error('非同期関数が失敗'));
    });
  }
}

const test = new Test();
const testSyncOK = () => {
  assert(test.syncOK() === 'ok');
};

const testAsyncNG = async (done: any) => {
  await test.asyncNG().then((e: any) => {
  }).catch(() => done());
}

describe('descriptorのテスト', () => {

  it('should do testSyncOK', testSyncOK);
  it('should do testSyncNG', test.syncNG);
  it('should do testAsyncOK', test.asyncOK);
  it('should do testAsyncNG', function (done) {
    testAsyncNG(done);
  });
});
