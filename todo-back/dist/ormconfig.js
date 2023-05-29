"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    type: 'sqlite',
    database: 'db',
    entities: [
        process.cwd() + '/dist/*/entities/*.entity.js',
    ],
    synchronize: true,
    logging: true
};
//# sourceMappingURL=ormconfig.js.map