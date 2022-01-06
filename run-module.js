const runModule = () => {
    const defineAndRequire = makeDefineAndRequire();
    const define = defineAndRequire.define;
    const req = defineAndRequire.req;

    /*DEFINE_MODULES_MARKER*/

    const resolver = req(/*ENTRY_MODULE_MARKER*/);
    resolver();
};

runModule();