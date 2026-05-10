import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { GroupService } from 'src/messages/group-messages/group-message.service';

@Injectable()
export class GroupAdminGuard implements CanActivate {
  constructor(private groupsService: GroupService
    
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
  const request = context.switchToHttp().getRequest();
  const userId = request.user.id; 
  const groupId = request.params.groupId;
    if (!groupId)
         return false;
    const isAdmin = await this.groupsService.checkIsAdmin(groupId, userId);
    if (!isAdmin) {
      throw new ForbiddenException('أنت مش أدمن الجروب ده، مالكش صلاحية تطرد حد!');
    }
    return true;
  }
}