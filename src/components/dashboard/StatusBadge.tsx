import React from 'react';
import Badge from '../ui/Badge';
import { HomeworkStatus } from '../../types/homework';

interface StatusBadgeProps {
  status: HomeworkStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  switch (status) {
    case 'published':
      return <Badge variant="success">Publié</Badge>;
    case 'draft':
      return <Badge variant="warning">Brouillon</Badge>;
    default:
      return <Badge>Inconnu</Badge>;
  }
};

export default StatusBadge;