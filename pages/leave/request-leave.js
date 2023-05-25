import React from 'react';
import TitleBar from '../../components/titlebar';
import Base from '../../components/base';
import AddBlog from '../../components/leave/addLeave';

import Card from 'antd/lib/card';

const CreateBlog = (props) => {
  const routes = [
    {
      path: '/',
      name: 'Home',
    },
      {
        path: '/leave/request-leave',
        name: 'Request Leave',
      },
 
  ];
  const query = `query($date: Date!){
    dailyAttendance(date: $date)
    {
      date
      membersPresent
      {
        member
        {
          username
          firstName
          lastName
          profile{
            profilePic
          }
        }
        lastSeen
        firstSeen
        duration
      }
      membersAbsent
      {
        member
        {
          username
          firstName
          lastName
          profile{
            profilePic
          }
          avatar 
          {
             githubUsername
          }
        }
        lastSeen
      }
    }
  }`;

  return (
    <Base title="Submit a leave request to your mentors | Leave Request" {...props}>
      <TitleBar routes={routes} title="Leave Request" subTitle="Submit a leave request to your mentors " />
      <div className="m-4">
        <Card bordered={false}>
          <AddBlog />
        </Card>
      </div>
    </Base>
  );
};

export default CreateBlog;

