import { Observable, ObservableInput } from '../Observable';
import { Scheduler } from '../Scheduler';
import { ArrayObservable } from '../observable/ArrayObservable';
import { MergeAllOperator } from './mergeAll';
import { isScheduler } from '../util/isScheduler';

/**
 * Creates an output Observable which concurrently emits all values from every
 * given input Observable.
 *
 * <span class="informal">Flattens multiple Observables together by blending
 * their values into one Observable.</span>
 *
 * <img src="./img/merge.png" width="100%">
 *
 * `merge` subscribes to each given input Observable (either the source or an
 * Observable given as argument), and simply forwards (without doing any
 * transformation) all the values from all the input Observables to the output
 * Observable. The output Observable only completes once all input Observables
 * have completed. Any error delivered by an input Observable will be immediately
 * emitted on the output Observable.
 *
 * @example <caption>Merge together two Observables: 1s interval and clicks</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var timer = Rx.Observable.interval(1000);
 * var clicksOrTimer = clicks.merge(timer);
 * clicksOrTimer.subscribe(x => console.log(x));
 *
 * @example <caption>Merge together 3 Observables, but only 2 run concurrently</caption>
 * var timer1 = Rx.Observable.interval(1000).take(10);
 * var timer2 = Rx.Observable.interval(2000).take(6);
 * var timer3 = Rx.Observable.interval(500).take(10);
 * var concurrent = 2; // the argument
 * var merged = timer1.merge(timer2, timer3, concurrent);
 * merged.subscribe(x => console.log(x));
 *
 * @see {@link mergeAll}
 * @see {@link mergeMap}
 * @see {@link mergeMapTo}
 * @see {@link mergeScan}
 *
 * @param {Observable} other An input Observable to merge with the source
 * Observable. More than one input Observables may be given as argument.
 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
 * Observables being subscribed to concurrently.
 * @param {Scheduler} [scheduler=null] The Scheduler to use for managing
 * concurrency of input Observables.
 * @return {Observable} an Observable that emits items that are the result of
 * every input Observable.
 * @method merge
 * @owner Observable
 */
export function merge<T, R>(...observables: Array<ObservableInput<any> | Scheduler | number>): Observable<R> {
  return this.lift.call(mergeStatic<T, R>(this, ...observables));
}

/* tslint:disable:max-line-length */
export interface MergeSignature<T> {
  (scheduler?: Scheduler): Observable<T>;
  (concurrent?: number, scheduler?: Scheduler): Observable<T>;
  <T2>(v2: ObservableInput<T2>, scheduler?: Scheduler): Observable<T | T2>;
  <T2>(v2: ObservableInput<T2>, concurrent?: number, scheduler?: Scheduler): Observable<T | T2>;
  <T2, T3>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, scheduler?: Scheduler): Observable<T | T2 | T3>;
  <T2, T3>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, concurrent?: number, scheduler?: Scheduler): Observable<T | T2 | T3>;
  <T2, T3, T4>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, scheduler?: Scheduler): Observable<T | T2 | T3 | T4>;
  <T2, T3, T4>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, concurrent?: number, scheduler?: Scheduler): Observable<T | T2 | T3 | T4>;
  <T2, T3, T4, T5>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, scheduler?: Scheduler): Observable<T | T2 | T3 | T4 | T5>;
  <T2, T3, T4, T5>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, concurrent?: number, scheduler?: Scheduler): Observable<T | T2 | T3 | T4 | T5>;
  <T2, T3, T4, T5, T6>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>, scheduler?: Scheduler): Observable<T | T2 | T3 | T4 | T5 | T6>;
  <T2, T3, T4, T5, T6>(v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>, concurrent?: number, scheduler?: Scheduler): Observable<T | T2 | T3 | T4 | T5 | T6>;
  (...observables: Array<ObservableInput<T> | Scheduler | number>): Observable<T>;
  <R>(...observables: Array<ObservableInput<any> | Scheduler | number>): Observable<R>;
}
/* tslint:enable:max-line-length */

/* tslint:disable:max-line-length */
export function mergeStatic<T>(v1: ObservableInput<T>, scheduler?: Scheduler): Observable<T>;
export function mergeStatic<T>(v1: ObservableInput<T>, concurrent?: number, scheduler?: Scheduler): Observable<T>;
export function mergeStatic<T, T2>(v1: ObservableInput<T>, v2: ObservableInput<T2>, scheduler?: Scheduler): Observable<T | T2>;
export function mergeStatic<T, T2>(v1: ObservableInput<T>, v2: ObservableInput<T2>, concurrent?: number, scheduler?: Scheduler): Observable<T | T2>;
export function mergeStatic<T, T2, T3>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, scheduler?: Scheduler): Observable<T | T2 | T3>;
export function mergeStatic<T, T2, T3>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, concurrent?: number, scheduler?: Scheduler): Observable<T | T2 | T3>;
export function mergeStatic<T, T2, T3, T4>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, scheduler?: Scheduler): Observable<T | T2 | T3 | T4>;
export function mergeStatic<T, T2, T3, T4>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, concurrent?: number, scheduler?: Scheduler): Observable<T | T2 | T3 | T4>;
export function mergeStatic<T, T2, T3, T4, T5>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, scheduler?: Scheduler): Observable<T | T2 | T3 | T4 | T5>;
export function mergeStatic<T, T2, T3, T4, T5>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, concurrent?: number, scheduler?: Scheduler): Observable<T | T2 | T3 | T4 | T5>;
export function mergeStatic<T, T2, T3, T4, T5, T6>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>, scheduler?: Scheduler): Observable<T | T2 | T3 | T4 | T5 | T6>;
export function mergeStatic<T, T2, T3, T4, T5, T6>(v1: ObservableInput<T>, v2: ObservableInput<T2>, v3: ObservableInput<T3>, v4: ObservableInput<T4>, v5: ObservableInput<T5>, v6: ObservableInput<T6>, concurrent?: number, scheduler?: Scheduler): Observable<T | T2 | T3 | T4 | T5 | T6>;
export function mergeStatic<T>(...observables: (ObservableInput<T> | Scheduler | number)[]): Observable<T>;
export function mergeStatic<T, R>(...observables: (ObservableInput<any> | Scheduler | number)[]): Observable<R>;
/* tslint:enable:max-line-length */
/**
 * Creates an output Observable which concurrently emits all values from every
 * given input Observable.
 *
 * <span class="informal">Flattens multiple Observables together by blending
 * their values into one Observable.</span>
 *
 * <img src="./img/merge.png" width="100%">
 *
 * `merge` subscribes to each given input Observable (as arguments), and simply
 * forwards (without doing any transformation) all the values from all the input
 * Observables to the output Observable. The output Observable only completes
 * once all input Observables have completed. Any error delivered by an input
 * Observable will be immediately emitted on the output Observable.
 *
 * @example <caption>Merge together two Observables: 1s interval and clicks</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var timer = Rx.Observable.interval(1000);
 * var clicksOrTimer = Rx.Observable.merge(clicks, timer);
 * clicksOrTimer.subscribe(x => console.log(x));
 *
 * @example <caption>Merge together 3 Observables, but only 2 run concurrently</caption>
 * var timer1 = Rx.Observable.interval(1000).take(10);
 * var timer2 = Rx.Observable.interval(2000).take(6);
 * var timer3 = Rx.Observable.interval(500).take(10);
 * var concurrent = 2; // the argument
 * var merged = Rx.Observable.merge(timer1, timer2, timer3, concurrent);
 * merged.subscribe(x => console.log(x));
 *
 * @see {@link mergeAll}
 * @see {@link mergeMap}
 * @see {@link mergeMapTo}
 * @see {@link mergeScan}
 *
 * @param {Observable} input1 An input Observable to merge with others.
 * @param {Observable} input2 An input Observable to merge with others.
 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
 * Observables being subscribed to concurrently.
 * @param {Scheduler} [scheduler=null] The Scheduler to use for managing
 * concurrency of input Observables.
 * @return {Observable} an Observable that emits items that are the result of
 * every input Observable.
 * @static true
 * @name merge
 * @owner Observable
 */
export function mergeStatic<T, R>(...observables: Array<ObservableInput<any> | Scheduler | number>): Observable<R> {
 let concurrent = Number.POSITIVE_INFINITY;
 let scheduler: Scheduler = null;
  let last: any = observables[observables.length - 1];
  if (isScheduler(last)) {
    scheduler = <Scheduler>observables.pop();
    if (observables.length > 1 && typeof observables[observables.length - 1] === 'number') {
      concurrent = <number>observables.pop();
    }
  } else if (typeof last === 'number') {
    concurrent = <number>observables.pop();
  }

  if (scheduler === null && observables.length === 1) {
    return <Observable<R>>observables[0];
  }

  return new ArrayObservable(<any>observables, scheduler).lift(new MergeAllOperator<R>(concurrent));
}
