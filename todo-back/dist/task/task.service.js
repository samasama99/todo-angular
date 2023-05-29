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
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_service_1 = require("../user/user.service");
const typeorm_2 = require("typeorm");
const task_entity_1 = require("./entities/task.entity");
let TaskService = class TaskService {
    constructor(taskRepository, userService) {
        this.taskRepository = taskRepository;
        this.userService = userService;
    }
    async create(createTaskDto, userId) {
        const user = await this.userService.findOne(userId);
        const newTodo = this.taskRepository.create({
            ...createTaskDto,
            user,
        });
        return this.taskRepository.save(newTodo);
    }
    async update(id, updateTaskDto) {
        const task = await this.taskRepository.findOne({
            where: {
                id: id,
            },
        });
        task.done = updateTaskDto.done;
        return this.taskRepository.save(task);
    }
    async findAll(userId) {
        const user = await this.userService.findOne(userId);
        console.table(user);
        console.table(user.tasks);
        return user.tasks;
    }
    async remove(id) {
        const task = await this.taskRepository.findOne({
            where: {
                id: id,
            },
        });
        return this.taskRepository.remove(task);
    }
};
TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        user_service_1.UserService])
], TaskService);
exports.TaskService = TaskService;
//# sourceMappingURL=task.service.js.map