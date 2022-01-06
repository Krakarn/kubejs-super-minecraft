export interface JavaClass {
    getClass(): JavaClassDescriptor;
}

export interface JavaClassDescriptor {
    getName(): string;
}