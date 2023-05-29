"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const task_entity_1 = require("../task/entities/task.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
let UserService = class UserService {
    constructor(userRepository, taskRepository) {
        this.userRepository = userRepository;
        this.taskRepository = taskRepository;
    }
    create(createUserDto) {
        const user = this.userRepository.create({ ...createUserDto });
        return this.userRepository.save(user);
    }
    findAll() {
        return this.userRepository.find();
    }
    findOne(id) {
        return this.userRepository.findOneOrFail({
            where: {
                id: id,
            },
            relations: ['tasks'],
        });
    }
    async update(id, updateUserDto) {
        let user = await this.findOne(id);
        user.name = updateUserDto.name;
        this.userRepository.save(user);
    }
    async remove(id) {
        const user = await this.userRepository.findOneOrFail({
            where: {
                id: id,
            },
            relations: ['tasks'],
        });
        ;
        user.tasks.map(task => this.taskRepository.remove(task));
        return await this.userRepository.remove(user);
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map