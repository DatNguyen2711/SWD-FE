import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import authApi from '../../libs/axios';
import { List, Pagination } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

function getRelativeTime(updatedDate) {
  const now = new Date();
  const updated = new Date(updatedDate);
  const diff = now.getTime() - updated.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  if (weeks > 0) {
    return `${weeks} weeks ago`;
  } else if (days > 0) {
    return `${days} days ago`;
  } else if (hours > 0) {
    return `${hours} hours ago`;
  } else if (minutes > 0) {
    return `${minutes} minutes ago`;
  } else {
    return `${seconds} seconds ago`;
  }
}

const ClassProject = () => {
  const { id: classId } = useParams();
  const [projectList, setProjectList] = useState([])

  useEffect(() => {
    async function fetchStudent() {
      await authApi.get(`/api/v1/class/get-detail/${classId}`)
        .then((res) => setProjectList(res.data.data.projects))
    }
    fetchStudent();
  }, [classId]);



  return (
    <div>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {projectList.map((project) => (
          <ListItem>
            <ListItemAvatar>
              <Avatar src={project.avatar} />
            </ListItemAvatar>
            <ListItemText primary={project.name}
              secondary={`Created at ${getRelativeTime(project.createdDate)}`} />
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default ClassProject
