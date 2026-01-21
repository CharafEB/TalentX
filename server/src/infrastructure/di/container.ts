import { createContainer, asClass, asValue, InjectionMode, InjectionModeType } from 'awilix';
import { prisma } from '../database/prisma';
import * as PrismaRepo from '../database/indexPrismaRepo';
import * as Service from '../../application/services/indexService';
import * as Controller from '../../interface/controllers/indexController';
import * as ExternalService from '../external-services/indexExternalService';

export const container = createContainer({
  injectionMode: InjectionMode.PROXY
});

export function setupContainer() {
  container.register({
    prisma: asValue(prisma),
    
    // External Services
    stripeService: asClass(ExternalService.StripeService).singleton(),
    storageGateway: asClass(ExternalService.DriveStorageGateway).singleton(),
    sheetGateway: asClass(ExternalService.GoogleSheetGateway).singleton(),

    // Repositories
    applicationRepo: asClass(PrismaRepo.PrismaApplicationRepository).singleton(),
    notificationRepo: asClass(PrismaRepo.PrismaNotificationRepository).singleton(),
    userRepo: asClass(PrismaRepo.PrismaUserRepository).singleton(),
    talentRepo: asClass(PrismaRepo.PrismaTalentRepository).singleton(),
    agencyRepo: asClass(PrismaRepo.PrismaAgencyRepository).singleton(),
    projectRepo: asClass(PrismaRepo.PrismaProjectRepository).singleton(),
    taskRepo: asClass(PrismaRepo.PrismaTaskRepository).singleton(),
    hireRequestRepo: asClass(PrismaRepo.PrismaHireRequestRepository).singleton(),
    teamRepo: asClass(PrismaRepo.PrismaTeamRepository).singleton(),
    messageRepo: asClass(PrismaRepo.PrismaMessageRepository).singleton(),
    contractRepo: asClass(PrismaRepo.PrismaContractRepository).singleton(),
    disputeRepo: asClass(PrismaRepo.PrismaDisputeRepository).singleton(),
    timeLogRepo: asClass(PrismaRepo.PrismaTimeLogRepository).singleton(),
    milestoneRepo: asClass(PrismaRepo.PrismaMilestoneRepository).singleton(),
    settingRepo: asClass(PrismaRepo.PrismaSystemSettingRepository).singleton(),

    // Services
    applicationService: asClass(Service.ApplicationService).singleton(),
    authService: asClass(Service.AuthService).singleton(),
    auditLogService: asClass(Service.AuditLogService).singleton(),
    userService: asClass(Service.UserService).singleton(),
    talentService: asClass(Service.TalentService).singleton(),
    agencyService: asClass(Service.AgencyService).singleton(),
    projectService: asClass(Service.ProjectService).singleton(),
    taskService: asClass(Service.TaskService).singleton(),
    hireRequestService: asClass(Service.HireRequestService).singleton(),
    teamService: asClass(Service.TeamService).singleton(),
    messageService: asClass(Service.MessageService).singleton(),
    notificationService: asClass(Service.NotificationService).singleton(),
    cmsService: asClass(Service.CMSService).singleton(),
    contractService: asClass(Service.ContractService).singleton(),
    disputeService: asClass(Service.DisputeService).singleton(),
    workVerificationService: asClass(Service.WorkVerificationService).singleton(),
    systemSettingService: asClass(Service.SystemSettingService).singleton(),

    // Controllers
    applicationController: asClass(Controller.ApplicationController).singleton(),
    authController: asClass(Controller.AuthController).singleton(),
    userController: asClass(Controller.UserController).singleton(),
    talentController: asClass(Controller.TalentController).singleton(),
    agencyController: asClass(Controller.AgencyController).singleton(),
    projectController: asClass(Controller.ProjectController).singleton(),
    taskController: asClass(Controller.TaskController).singleton(),
    hireRequestController: asClass(Controller.HireRequestController).singleton(),
    teamController: asClass(Controller.TeamController).singleton(),
    messageController: asClass(Controller.MessageController).singleton(),
    notificationController: asClass(Controller.NotificationController).singleton(),
    cmsController: asClass(Controller.CMSController).singleton(),
    auditLogController: asClass(Controller.AuditLogController).singleton(),
    contractController: asClass(Controller.ContractController).singleton(),
    disputeController: asClass(Controller.DisputeController).singleton(),
    workVerificationController: asClass(Controller.WorkVerificationController).singleton(),
    systemSettingController: asClass(Controller.SystemSettingController).singleton(),
  });
  return container;
}
