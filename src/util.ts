import './kubejs-typings/src/index';

export const setGlobal = <T>(key: string, value: T) => {
    global[key] = value;
};

export const getGlobal = <T>(key: string) => {
    const value = global[key];
    if (value === undefined) throw new Error(`global[${key}] is undefined`);
    return value as T;
}

export interface KeyedIterable<K, T, D> extends Iterable<D> {
    forEach(f: (x: T, i: K) => void): void;
    entries(): IterableIterator<[K, T]>;
    keys(): IterableIterator<K>;
    values(): IterableIterator<T>;
}

declare global {
    interface Array<T> extends KeyedIterable<number, T, T> {}
    interface Map<K, V> extends KeyedIterable<K, V, [K, V]> {}
    interface Set<T> extends KeyedIterable<T, T, T> {}
}

type IterableElement<TIterable extends Iterable<unknown>> =
    TIterable extends Map<unknown, infer V> ? V :
    TIterable extends Iterable<infer T> ? T : never;

type IterableKey<TIterable extends Iterable<unknown>> =
    TIterable extends Map<infer K, unknown> ? K :
    TIterable extends Iterable<infer T> ? T : never;

export const forEach = <TIterable extends Iterable<unknown>>(iterable: TIterable, f: (t: IterableElement<TIterable>, k: IterableKey<TIterable>) => boolean | void): void => {
    type T = IterableElement<TIterable>;
    type K = IterableKey<TIterable>;

    const keyedIterable = iterable as unknown as KeyedIterable<K, T, unknown>;

    if (typeof keyedIterable.forEach === 'function') {
        keyedIterable.forEach((x, i) => f(x, i));
        return;
    } else {
        const aux = (it: Iterator<[K, T]>) => {
            const next = it.next();
            if (next.done) {
                return;
            }
            const v: [K, T] = next.value;
            if (f(v[1], v[0]) === true) {
                return;
            }
            aux(it);
        };

        const it = (iterable as unknown as KeyedIterable<K, T, unknown>).entries();
        aux(it);
    }
};

export const fold = <T, U>(iterable: Iterable<T>, f: (acc: U, t: T, i: number, abort: (result: U) => void) => U, d: U): U => {
    let i = 0;
    let done = false;
    let abortedResult = d;
    const abort = (result: U) => {
        done = true;
        abortedResult = result;
    };
    forEach(iterable, t => {
        d = f(d, t, i++, abort);
        if (done) {
            d = abortedResult;
            return true;
        }
    });
    return d;
};

export const filter = <T>(iterable: Iterable<T>, predicate: (t: T) => boolean): Iterable<T> => fold<T, T[]>(
    iterable,
    (xs, x) => {
        if (predicate(x)) {
            return xs.concat([x]);
        }
        return xs;
    },
    [],
);

export const map = <T, U>(iterable: Iterable<T>, mapper: (t: T) => U): Iterable<U> => fold<T, U[]>(
    iterable,
    (xs, x) => xs.concat([mapper(x)]),
    [],
);

export const size = (iterable: Iterable<unknown>): number => fold(
    iterable,
    (s, _) => s + 1,
    0,
);

export const find = <T>(iterable: Iterable<T>, predicate: (t: T) => boolean): T | undefined => fold<T, T | undefined>(
    iterable,
    (r, x, __, abort) => {
        if (predicate(x)) {
            abort(x);
        }

        return r;
    },
    undefined,
);

export const has = <T>(iterable: Iterable<T>, item: T): boolean => find(iterable, t => t === item) !== undefined;

export const head = <T>(iterable: Iterable<T>): T | undefined => find(iterable, () => true);