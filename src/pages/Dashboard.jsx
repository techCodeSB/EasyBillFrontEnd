import React from 'react'
import Nav from '../components/Nav'
import SideNav from '../components/SideNav';
import MyBreadCrumb from '../components/BreadCrumb';

document.title = 'Dashboard';

const Dashboard = () => {
  return (
    <>
      <Nav />
      <main id='main'>
        <SideNav />
        <div className='content__body'>
          <MyBreadCrumb title={"Dashboard"} links={[
            { name: "Dashboard", link: "/admin/dashboard" },
            { name: "Analytics", link: null }
          ]} />

          
        </div>
      </main>
    </>
  )
}

export default Dashboard