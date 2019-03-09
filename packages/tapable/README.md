# Tapable

Tappable is a event-based hooks plugin library.

- event stream
- publish/subscriber design pattern

## hooks

Keywords: `sync`/`async`/`parallel`/`series`, `bail`/`waterfall`/`loop`

  + Sync*
    - SyncHook
    - SyncBailHook
    - SyncWaterfallHook
    - SyncLoopHook
  + Async*
    - AsyncParallel*
      - AsyncParallelHook
      - AsyncParallelBailHook
    - AsyncSeries*
      - AsyncSeriesHook
      - AsyncSeriesBailHook
      - AsyncSeriesWaterfallHook
