import { JavaClass } from '../interfaces/java-class';

export interface Wrapper<T> extends JavaClass {
	unwrap(): T;
}