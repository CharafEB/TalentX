import { ContractsList } from '../Legal/ContractComponents';
import { User } from '@/shared/types';

interface ProjectContractsTabProps {
    projectId: string;
    user: User;
}

export const ProjectContractsTab = ({ projectId, user }: ProjectContractsTabProps) => (
    <ContractsList projectId={projectId} currentUser={user} />
);