export interface Predicate<T> {
    and(other: Predicate<T>): Predicate<T>;
    negate(): Predicate<T>;
    or(other: Predicate<T>): Predicate<T>;
    test(t: T): boolean;
}