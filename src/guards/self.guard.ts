import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { USER_ROLE } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class SelfGuard implements CanActivate {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest();

        const userId = req.params.id
        const ownerId = req['user'].id

        if (!userId || !ownerId) return false

        if (userId === ownerId) return true
        const user = await this.prisma.user.findUnique({ where: { id: userId }, select: { role: true } })

        return req['user'].role === USER_ROLE.OWNER
    }
}
