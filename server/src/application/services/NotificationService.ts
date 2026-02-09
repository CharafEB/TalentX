import { INotificationRepository } from '../../domain/repositories/INotificationRepository';

export class NotificationService {
    private notificationRepo: INotificationRepository;
    constructor({ notificationRepo }: { notificationRepo: INotificationRepository }) {
        this.notificationRepo = notificationRepo;
    }

    async listNotifications(userId: string) {
        // We need a findByUserId in Repo. I think I only defined create?
        // Let's check INotificationRepository.
        // Assuming I need to add it.
        return (this.notificationRepo as any).findByUserId(userId);
    }

    async markAsRead(id: string) {
        // Need update method
        return (this.notificationRepo as any).markAsRead(id);
    }
}
