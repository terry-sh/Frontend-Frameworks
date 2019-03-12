# Tapable

Tappable is a event-based hooks plugin library.

- event stream
- publish/subscriber design pattern

## hooks

Keywords: `sync`/`async`(`parallel`/`series`), `bail`/`waterfall`/`loop`

  + Sync* 只能使用 sync 类的 tap（不能使用 tapSync, tapPromise）
    - `SyncHook` 
    - `SyncBailHook` 如果某一个订阅有返回非`false`值（`null`,`undefined`,`false`, `0`等）；则后面的所有的订阅将不触发
    - `SyncWaterfallHook` 订阅的返回值，会被当成新的参数，传递给下一个订阅
    - `SyncLoopHook` 如果当然的订阅返回 `true`，则循环执行当然的订阅；直到返回 `undefined`，执行下一个订阅
  + Async*
    - AsyncParallel* 异步并行执行（同时执行多个任务）
      - `AsyncParallelHook`
      - `AsyncParallelBailHook` 由于是同时执行多个订阅，所以要在订阅触发的时候返回值，否则将不生效
    - AsyncSeries* 异步串行执行（只能同时执行一个任务）
      - `AsyncSeriesHook`
      - `AsyncSeriesBailHook`
      - `AsyncSeriesWaterfallHook`

# `HookMap`

# `MultiHook`