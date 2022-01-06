const makeDefineAndRequire = (debug) => {
    debug = debug || false;
    const mods = {};
    const log = () => debug && console.log.apply(console, arguments);

    const define = (m, redeps, f) => {
        const deps = redeps.slice(2);
        mods[m] = [deps, f];
    };

    const maxDepth = 100;
    function resolveDeps(deps, cachedDeps, depth, prevDeps) {
        if (depth > maxDepth) {
            throw new Error(`Exceeded max depth (${maxDepth})`);
        }

        if (deps.length === 0) return [];

        const dep = deps[0];
        depth = depth || 1;
        prevDeps = prevDeps || [];

        const continueResolveDeps = (currentDep) =>
            [currentDep].concat(resolveDeps(deps.slice(1), cachedDeps, depth, prevDeps))
        ;

        const allDeps = prevDeps.concat([dep]);
        log(`resolveDep ${allDeps.join(' -> ')} ${depth}`);
        const mod = mods[dep];
        const cachedDep = cachedDeps[dep] || (mod[2] && (() => mod[2]));

        if (cachedDep) {
            log(`found cached dep: ${dep}`);
            return continueResolveDeps(cachedDep);
        }

        log(`building dep: ${dep}`);
        const modDeps = mod[0];
        const f = mod[1];
        const resolvedSubDeps = resolveDeps(modDeps, cachedDeps, depth + 1, allDeps);

        const resolvedDep = () => {
            log(`resolveModule: ${dep}`);
            const m = mod[2];
            if (m) { log(`found cached module: ${dep}`); return m; }
            mod[2] = {};
            log(`resolving module: ${dep}`);
            f.apply(null, [null, mod[2]].concat(resolvedSubDeps.map(g => g())));
            return mod[2];
        };

        cachedDeps[dep] = resolvedDep;
        log(`finished building dep: ${dep}`);

        return continueResolveDeps(resolvedDep);
    }

    function req() {
        const deps = [].slice.call(arguments);
        const cachedDeps = {};
        const resolvedDeps = resolveDeps(deps, cachedDeps);
        if (resolvedDeps.length > 1)
            return resolvedDeps;
        else
            return resolvedDeps[0];
    }

    return { define: define, req: req };
};