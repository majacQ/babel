function dec(fn, context) {
  context.addInitializer((instance) => {
    instance[context.name + 'Context'] = context;
  });

  return function () {
    return fn.call(this) + 1;
  }
}

class Foo {
  value = 1;

  @dec
  a() {
    return this.value;
  }

  @dec
  ['b']() {
    return this.value;
  }
}

let foo = new Foo();

const aContext = foo['aContext'];
const bContext = foo['bContext'];

expect(foo.a()).toBe(2);
expect(foo.b()).toBe(2);
foo.value = 123;
expect(foo.a()).toBe(124);
expect(foo.b()).toBe(124);

expect(aContext.name).toBe('a');
expect(aContext.kind).toBe('method');
expect(aContext.isStatic).toBe(false);
expect(aContext.isPrivate).toBe(false);
expect(typeof aContext.addInitializer).toBe('function');
expect(typeof aContext.setMetadata).toBe('function');
expect(typeof aContext.getMetadata).toBe('function');

expect(bContext.name).toBe('b');
expect(bContext.kind).toBe('method');
expect(bContext.isStatic).toBe(false);
expect(bContext.isPrivate).toBe(false);
expect(typeof bContext.addInitializer).toBe('function');
expect(typeof bContext.setMetadata).toBe('function');
expect(typeof bContext.getMetadata).toBe('function');
