const fs = require('node:fs');
const pathUtils = require('node:path');

// from Hypere source code ~ modified for buttons-test
// Copyright ~ ReforwardDev - DO NOT copy or modify 
export function exportDir(path: string) {
    let filenames = fs.readdirSync(path).filter(a => a.split('.')[0] != 'index' && !a.includes('.map')), files = filenames.map(a => pathUtils.join(path, a)), names = filenames.map(a => a.split('.')[0]);
    let items = new Map();
    for (let file of files) {
        try {
            const module: { [k: string]: any } = require(file);
            const Cmd = module.default;
            const command = !Cmd.constructor ? Cmd : new Cmd();
            items.set(command.name || file.split(/\/|\\/g).pop().split(".")[0] , command);
        } catch (_) {
            console.log('Error in importing ' + file);
        }
    }
    return {
        paths: files,
        names,
        items,
        reload: () => {
            for (const file of files) {
                const fullPath = require.resolve(file);
                delete require.cache[fullPath];
            }
            const {paths, names: names_new, items: items_new} = exportDir(path);
            files = paths;
            names = names_new;
            items = items_new;
            return true;
        }
    };
}